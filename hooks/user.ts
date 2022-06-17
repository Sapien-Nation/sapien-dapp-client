import { useSWRConfig } from 'swr';

// context
import { useAuth } from 'context/user';

// types
import type { ProfileTribe, TribeBadge } from 'tools/types/tribe';

// TODO move to tools
interface UserBadge {
  id: string;
  avatar: string;
  badgeBadgeId: string;
  badgeDescription: string;
  badgeId: string;
  badgeInternalAttributes: { color: string };
  badgeMedia: {};
  badgeName: string;
  color: string;
  description: string;
  name: string;
  parentId: string;
  tribes: Array<{
    id: string;
    apps: Array<{ name: string; image: string }>;
    rooms: Array<{ id: string; name: string; url: string }>;
  }>;
}

export const useUserBadges = (): Array<TribeBadge> => {
  const { me } = useAuth();
  const { cache } = useSWRConfig();

  return cache.get(`/core-api/user/${me.id}/badges`);
};

export const useUserBadge = (badgeID: string): UserBadge => {
  const { cache } = useSWRConfig();

  return cache.get(`/core-api/badge/${badgeID}`);
};
