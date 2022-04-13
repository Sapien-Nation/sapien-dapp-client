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

interface Torus {
  error: Error | null;
  isReady: boolean;
  torusKeys: TorusKey | null;
  retryConnect: () => Promise<void>;
}

const TorusContext = createContext<Torus>({
  error: null,
  isReady: false,
  torusKeys: null,
  retryConnect: async () => {},
});

interface TorusProviderProps {
  children: React.ReactNode;
}

const TorusProvider = ({ children }: TorusProviderProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [torusKeys, setTorusKeys] = useState<TorusKey | null>(null);

  const { me } = useAuth();
  const [{ torus, refresh }] = useLocalStorage<null | {
    torus: string;
    refresh: string;
  }>('tokens', null);

  useEffect(() => {
    const initKeys = async () => {
      try {
        const keys = await initializeTorusKeys(
          { skipSw: true },
          { user: me, tokens: { torus, refresh } }
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
    const TorusDirectSDK = new DirectWebSdk({
      baseUrl:
        typeof window === 'undefined'
          ? '/api/serviceworker'
          : `${window.location.origin}/api/serviceworker`,
      enableLogging: Boolean(debugTorus),
      network: walletIsMainnet ? 'mainnet' : 'testnet',
    });
    try {
      const { token: refreshedTorusToken } = await refreshTokenAPI(
        refresh,
        'torus'
      );

      const torusKeys = await TorusDirectSDK.getAggregateTorusKey(
        walletVerifier,
        me.id,
        [
          {
            verifier: walletSubVerifier,
            idToken: refreshedTorusToken,
          },
        ]
      );

      setTorusKeys(torusKeys);
    } catch (err) {
      Sentry.captureException(err);
      return Promise.reject(err);
    }
  };

  return (
    <TorusContext.Provider
      value={{
        isReady: torusKeys !== null,
        torusKeys,
        error,
        retryConnect: handleRetry,
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
