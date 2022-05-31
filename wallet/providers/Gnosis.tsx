import SafeServiceClient from '@gnosis.pm/safe-service-client';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import { ethers } from 'ethers';
import { createContext, useContext, useEffect, useState } from 'react';

// api
import { connectWallet } from 'wallet/api';

// context
import { useTribe } from 'hooks/tribe';
import { useRouter } from 'next/router';

// types
import type { SafeMultisigTransactionListResponse } from '@gnosis.pm/safe-service-client';

interface Gnosis {
  error: Error | null;
  connecting: boolean;
  gnosisAPI: {
    getAllPendingTransactions: () => Promise<SafeMultisigTransactionListResponse>;
  };
}

const GnosisContext = createContext<Gnosis>({
  error: null,
  connecting: false,
  gnosisAPI: {
    getAllPendingTransactions: async () => ({
      count: 0,
      next: undefined,
      previous: undefined,
      results: [],
    }),
  },
});

interface GnosisProviderProps {
  children: React.ReactNode;
}

const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_PROVIDER
);
const txServiceUrl = process.env.NEXT_PUBLIC_SAFESERVICE_URL;
console.log({ some: process.env.NEXT_PUBLIC_RPC_PROVIDER });
console.log({ txServiceUrl });
const GnosisProvider = ({ children }: GnosisProviderProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [safeService, setSafeService] = useState<SafeServiceClient | null>(
    null
  );

  const { query } = useRouter();

  const tribeID = query.tribeID as string;
  const tribe = useTribe(tribeID);

  const getEthAdapter = async () => {
    try {
      const { key } = await connectWallet();
      const safeOwner = new ethers.Wallet(`0x${key}`, provider);

      return new EthersAdapter({
        ethers,
        signer: safeOwner,
      });
    } catch (err) {
      return Promise.reject(typeof err === 'string' ? err : err.message);
    }
  };

  const getAllPendingTransactions =
    async (): Promise<SafeMultisigTransactionListResponse> => {
      try {
        const pendingTxs = await safeService.getPendingTransactions(
          tribe.safeAddress
        );
        console.log({ pendingTxs });
        return {
          count: 0,
          next: undefined,
          previous: undefined,
          results: [],
        };
      } catch (err) {
        return Promise.reject(err.message);
      }
    };

  useEffect(() => {
    const initGnosisSDK = async () => {
      try {
        const ethAdapter = await getEthAdapter();

        const SafeServiceClientSDK = new SafeServiceClient({
          txServiceUrl,
          ethAdapter,
        });

        setSafeService(SafeServiceClientSDK);
      } catch (err) {
        setError(err);
      }
    };

    if (safeService === null) {
      initGnosisSDK();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GnosisContext.Provider
      value={{
        connecting: safeService === null,
        error: error,
        gnosisAPI: {
          getAllPendingTransactions,
        },
      }}
    >
      {children}
    </GnosisContext.Provider>
  );
};

function useGnosis() {
  const context = useContext(GnosisContext);

  if (context === undefined) {
    throw new Error('useGnosis must be used within a GnosisProvider');
  }
  return context;
}

export { GnosisProvider, useGnosis };
