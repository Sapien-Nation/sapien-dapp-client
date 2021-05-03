// types
import type { Tribe } from 'tools/types/tribe';

import useSWR, { SWRConfiguration } from 'swr';

export const useFollowedTribes = (
  SWROptions: SWRConfiguration = {}
): { tribes: Array<Tribe> } => {
  return (
    useSWR('/api/tribes/followed', { revalidateOnMount: false, ...SWROptions })
      .data || []
  );
};
