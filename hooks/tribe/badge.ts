import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

// types
import type { TribeBadge } from 'tools/types/tribe';

interface Transaction {
  // TODO move to tools when we got the full data type
  id: string;
}

export const useTribeBadges = (): Array<TribeBadge> => {
  const { query } = useRouter();
  const { cache } = useSWRConfig();

  const tribeID = query.tribeID as string;

  return cache.get(`/core-api/tribe/${tribeID}/badges`);
};

export const useBadgeTransactions = (badgeID: string): Array<Transaction> => {
  const { query } = useRouter();
  const { cache } = useSWRConfig();

  const tribeID = query.tribeID as string;

  return cache.get(`/core-api/tribe/${tribeID}/safe/transactions`);
};
