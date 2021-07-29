import useSWR from 'swr';

// types
import type { Tribe } from 'tools/types/tribeBar';

export const getTribes = (): Array<Tribe> => {
  return (
    useSWR('/api/v3/profile/tribes', { revalidateOnMount: false }).data ?? []
  );
};

export const getTribe = (squareID: string): Tribe => {
  const tribes: Array<Tribe> =
    useSWR('/api/v3/profile/tribes', { revalidateOnMount: false }).data ?? {};

  const tribeFromMainSquare = tribes?.find(
    ({ mainSquareId }) => mainSquareId === squareID
  );

  if (tribeFromMainSquare) return tribeFromMainSquare;

  return {} as Tribe;
};