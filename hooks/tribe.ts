import { useSWRConfig } from 'swr';

// constants
import { View } from 'constants/tribe';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface CurrentView {
  id: string;
  name: string;
  type: View;
}

export const useMainSquare = () => {
  const { cache } = useSWRConfig();

  const tribe: ProfileTribe = cache.get('/api/v3/profile/tribes')[0];

  return { tribeID: tribe.id, viewID: tribe.mainSquareId };
};

export const useGetCurrentView = (
  tribeID: string,
  viewID: string
): CurrentView => {
  const { cache } = useSWRConfig();

  const tribes: Array<ProfileTribe> = cache.get('/api/v3/profile/tribes');

  const tribe = tribes.find(({ id }) => id === tribeID);

  const views = [
    {
      type: View.MainSquare,
      name: 'sapien',
      id: tribe.mainSquareId,
    },
    ...tribe.channels.map((channel) => ({
      ...channel,
      type: View.Channel,
    })),
    ...tribe.squares.map((square) => ({
      ...square,
      type: View.Square,
    })),
  ];

  return views.find(({ id }) => id === viewID);
};
