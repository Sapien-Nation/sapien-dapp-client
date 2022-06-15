import { useSWRConfig } from 'swr';

// types
import type { TribeBadge } from 'tools/types/tribe';

// TODO move to tools
interface UserBadge {
  id: string;
}

export const useUserBadges = (): Array<TribeBadge> => {
  const { cache } = useSWRConfig();

  return cache.get(`/core-api/user/badges`);
};

export const useUserBadge = (badgeID: string): UserBadge => {
  const { cache } = useSWRConfig();

  return cache.get(`/core-api/user/badges/${badgeID}`);
};
