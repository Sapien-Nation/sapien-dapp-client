import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

// types
import type { SafeMultisigTransactionListResponse } from '@gnosis.pm/safe-service-client';

export const useGnosisPendingTransactions =
  (): SafeMultisigTransactionListResponse => {
    const { cache } = useSWRConfig();
    const { query } = useRouter();

    const tribeID = query.tribeID as string;

    return cache.get(`/core-api/tribe/${tribeID}/pending/transactions`);
  };
