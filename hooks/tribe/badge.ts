import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

// context
import { useAuth } from 'context/user';

// types
import type { TribeBadge, BadgeTransaction } from 'tools/types/tribe';
import type { RoomBadge } from 'tools/types/room';

export const useTribeBadges = (): {
  myBadges: Array<TribeBadge>;
  otherBadges: Array<TribeBadge>;
} => {
  const { query } = useRouter();
  const { cache } = useSWRConfig();

  const tribeID = query.tribeID as string;

  return cache.get(`/core-api/tribe/${tribeID}/badges`);
};

export const useTribeUserBadges = (): Array<TribeBadge> => {
  const { me } = useAuth();
  const { query } = useRouter();
  const { cache } = useSWRConfig();

  const tribeID = query.tribeID as string;

  return cache.get(`/core-api/user/${me.id}/badges?tribeId=${tribeID}`);
};

export const useBadgeTransactions = (
  badgeID: string
): Array<BadgeTransaction> => {
  const { query } = useRouter();
  const { cache } = useSWRConfig();

  const tribeID = query.tribeID as string;

  return cache.get(`/core-api/tribe/${tribeID}/safe/transactions/${badgeID}`);
};

export const useRoomBadges = (roomID: string): Array<RoomBadge> => {
  const { cache } = useSWRConfig();

  return cache.get(`/core-api/room/${roomID}/badges`);
};
