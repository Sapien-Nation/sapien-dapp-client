import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

// types
import type { TribeBadge, BadgeTransaction } from 'tools/types/tribe';

export const useTribeBadges = (): Array<TribeBadge> => {
  const { query } = useRouter();
  const { cache } = useSWRConfig();

  const tribeID = query.tribeID as string;

  return cache.get(`/core-api/tribe/${tribeID}/badges`);
};

export const useTribeUserBadges = (): Array<TribeBadge> => {
  const { query } = useRouter();
  const { cache } = useSWRConfig();

  const tribeID = query.tribeID as string;

  return cache.get(`/core-api/user/badges?tribeId=${tribeID}`);
};

export const useBadgeTransactions = (
  badgeID: string
): Array<BadgeTransaction> => {
  const { query } = useRouter();
  const { cache } = useSWRConfig();

  const tribeID = query.tribeID as string;

  return cache.get(`/core-api/tribe/${tribeID}/safe/transactions/${badgeID}`);
};
