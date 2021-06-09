import useSWR from 'swr';

// types
import type { Tribe } from 'tools/types/tribeBar';

export const getTribes = (): Array<Tribe> => {
  return useSWR('/api/profile/tribes').data ?? [];
};

export const getTribe = (squareID: string): Tribe => {
  const tribes: Array<Tribe> = useSWR('/api/profile/tribes').data ?? [];
  const tribeFromMainSquare = tribes.find(
    ({ mainSquareId }) => mainSquareId === squareID
  );

  if (tribeFromMainSquare) return tribeFromMainSquare;

  // TODO need to loop over tribes[i].squares to find if squareID its inside tribe
  return {} as Tribe;
};
