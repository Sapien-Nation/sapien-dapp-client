import useSWR from 'swr';

// types
import type { Tribe } from 'tools/types/tribeBar';

export const getTribes = (): Array<Tribe> => {
  return useSWR('/api/profile/tribes', { revalidateOnMount: false }).data ?? [];
};

export const getTribe = (squareID: string): Tribe | null => {
  const tribes: Array<Tribe> =
    useSWR('/api/profile/tribes', { revalidateOnMount: false }).data ?? null;
  const tribeFromMainSquare = tribes?.find(
    ({ mainSquareId }) => mainSquareId === squareID
  );

  if (tribeFromMainSquare) return tribeFromMainSquare;

  return null;
};
