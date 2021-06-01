import useSWR from 'swr';

// types
import type { Tribe } from 'tools/types/tribeBar';

export const getTribes = (): Array<Tribe> => {
  return useSWR('/api/profile/tribes').data ?? [];
};
