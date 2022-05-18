import { useSWRConfig } from 'swr';

// types
import type { TribeBadge } from 'tools/types/tribe';

export const useTribeBadges = (tribeID: string): Array<TribeBadge> => {
  const { cache } = useSWRConfig();

  return cache.get(`/core-api/tribe/${tribeID}/vault`).badges;
};
