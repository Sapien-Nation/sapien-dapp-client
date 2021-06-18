import useSWR from 'swr';

// types
import type { Tribe } from 'tools/types/tribeBar';

export const getTribes = (): Array<Tribe> => {
  return useSWR('/api/profile/tribes').data ?? [];
};

export const getTribe = (squareid: string): Tribe | null => {
  const tribes: Array<Tribe> = useSWR('/api/profile/tribes').data ?? null;
  const tribeFromMainSquare = tribes?.find(
    ({ mainSquareId }) => mainSquareId === squareid
  );

  if (tribeFromMainSquare) return tribeFromMainSquare;

  return null;
};
