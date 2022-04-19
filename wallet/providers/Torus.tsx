import DirectWebSdk from '@toruslabs/customauth';
import * as Sentry from '@sentry/nextjs';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

// api
import { refresh as refreshTokenAPI } from 'api/authentication';

// context
import { useAuth } from 'context/user';
import { TorusKey } from '@toruslabs/customauth';

// types
import type { User } from 'tools/types/user';

const debugTorus = false;
const walletIsMainnet = Boolean(
  process.env.NEXT_PUBLIC_WALLET_IS_MAINNET === 'true'
);
const walletVerifier = process.env.NEXT_PUBLIC_WALLET_VERIFIER;
const walletSubVerifier = process.env.NEXT_PUBLIC_WALLET_SUB_VERIFIER;

interface Torus {
  error: Error | null;
  isReconnecting: boolean;
  isReady: boolean;
  torusKeys: TorusKey | null;
  retryConnect: () => Promise<void>;
  torusSDK: DirectWebSdk | null;
}

const TorusContext = createContext<Torus>({
  error: null,
  isReady: false,
  isReconnecting: false,
  torusKeys: null,
  retryConnect: async () => {},
  torusSDK: null,
});

interface TorusProviderProps {
  children: React.ReactNode;
}

const TorusProvider = ({ children }: TorusProviderProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [torusSDK, setTorusSDK] = useState<DirectWebSdk | null>(null);
  const [torusKeys, setTorusKeys] = useState<TorusKey | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const { me } = useAuth();
  const [tokens] = useLocalStorage<null | {
    torus: string;
    refresh: string;
  }>('tokens', null);

  const initializeTorusKeys = async (
    initOptions: {
      skipSw?: boolean;
      skipInit?: boolean;
      skipPrefetch?: boolean;
    },
    {
      user,
      tokens,
    }: {
      user: User;
      tokens: {
        torus: string;
        refresh: string;
      };
    }
  ) => {
    const TorusDirectSDK = new DirectWebSdk({
      baseUrl:
        typeof window === 'undefined'
          ? '/api/serviceworker'
          : `${window.location.origin}/api/serviceworker`,
      enableLogging: Boolean(debugTorus),
      network: walletIsMainnet ? 'mainnet' : 'testnet',
    });
    try {
      await TorusDirectSDK.init(initOptions);

      const torusKeys = await TorusDirectSDK.getAggregateTorusKey(
        walletVerifier,
        user.id,
        [
          {
            verifier: walletSubVerifier,
            idToken: tokens.torus,
          },
        ]
      );

      setTorusSDK(TorusDirectSDK);
      return torusKeys;
    } catch (err) {
      if (err.message === 'Duplicate token found') {
        try {
          const { token: refreshedTorusToken } = await refreshTokenAPI(
            tokens.refresh,
            'torus'
          );

          const torusKeys = await TorusDirectSDK.getAggregateTorusKey(
            walletVerifier,
            user.id,
            [
              {
                verifier: walletSubVerifier,
                idToken: refreshedTorusToken,
              },
            ]
          );

          setTorusSDK(TorusDirectSDK);
          return torusKeys;
        } catch (err) {
          Sentry.captureException(err);
          return Promise.reject(err);
        }
      } else {
        Sentry.captureException(err);
        return Promise.reject(err);
      }
    }
  };

  useEffect(() => {
    const initKeys = async () => {
      try {
        const keys = await initializeTorusKeys(
          { skipSw: true },
          { user: me, tokens: { torus: tokens.torus, refresh: tokens.refresh } }
        );
        setTorusKeys(keys);
      } catch (err) {
        setError(err);
      }
    };

    if (torusKeys === null) {
      initKeys();
    }
  }, []);

  const handleRetry = async () => {
    try {
      setIsReconnecting(true);
      const keys = await initializeTorusKeys(
        { skipSw: true },
        { user: me, tokens: { torus: tokens.torus, refresh: tokens.refresh } }
      );
      setIsReconnecting(false);
      setTorusKeys(keys);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <TorusContext.Provider
      value={{
        isReady: true,
        torusKeys: null,
        error: null,
        retryConnect: handleRetry,
        torusSDK,
        isReconnecting,
      }}
    >
      {children}
    </TorusContext.Provider>
  );
};

function useTorus() {
  const context = useContext(TorusContext);

  if (context === undefined) {
    throw new Error('useTorus must be used within a TorusProvider');
  }
  return context;
}

export { TorusProvider, useTorus };
