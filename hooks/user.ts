import { useSWRConfig } from 'swr';

// context
import { useAuth } from 'context/user';

// types
import type { TribeBadge } from 'tools/types/tribe';

// TODO move to tools
interface UserBadge {
  id: string;
}

export const useUserBadges = (): Array<TribeBadge> => {
  const { me } = useAuth();
  const { cache } = useSWRConfig();

  return cache.get(`/core-api/user/${me.id}/badges`);
};

export const useUserBadge = (badgeID: string): UserBadge => {
  const { me } = useAuth();
  const { cache } = useSWRConfig();

  return cache.get(`/core-api/user/badges/${badgeID}`);
};
