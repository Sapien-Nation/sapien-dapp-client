import useSWR from 'swr';

// types
import type { Tribe } from 'tools/types/tribeBar';

export const getTribes = (): Array<Tribe> => {
  return (
    useSWR('/api/v3/profile/tribes', { revalidateOnMount: true }).data ?? []
  );
};

export const getTribe = (squareID: string): Tribe => {
  const tribes: Array<Tribe> =
    useSWR('/api/v3/profile/tribes', { revalidateOnMount: false }).data ?? [];

  // Getting tribe from
  // mainSquareID
  // name - This only apply for the Sapien tribe
  const tribeFromMainSquare = tribes?.find(
    ({ name, mainSquareId }) => mainSquareId === squareID || name === squareID
  );

  if (tribeFromMainSquare) return tribeFromMainSquare;

  // Getting tribe from squares Array
  // TODO cleanup
  let tribeFromSquares = null;

  tribes.map((tribe) => {
    const { squares } = tribe;
    const tribeSquare = squares.find(({ id }) => id === squareID);
    if (tribeSquare) {
      tribeFromSquares = tribe;
    }
  });

  if (tribeFromSquares) return tribeFromSquares;

  // @ts-ignore
  return {};
};
