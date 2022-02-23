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

export const useIsValidView = (tribeID: string, viewID: string): boolean => {
  const { cache } = useSWRConfig();

  const tribes: Array<ProfileTribe> = cache.get('/api/v3/profile/tribes');

  const tribe = tribes.find(({ id }) => id === tribeID);

  if (tribe) {
    const views = [
      {
        type: View.homeFeed,
        name: 'sapien',
        // TODO rename to tribe.mainChanelId
        id: tribe.mainSquareId,
      },
      ...tribe.channels.map((channel) => ({
        ...channel,
        type: View.Channel,
      })),
    ];

    const view = views.find(({ id }) => id === viewID);

    if (view) return true;
    return false;
  }

  return false;
};

export const useTribe = (tribeID: string): ProfileTribe => {
  const { cache } = useSWRConfig();

  return cache.get('/api/v3/profile/tribes').find(({ id }) => id === tribeID);
};

export const useMainSquare = () => {
  const { cache } = useSWRConfig();

  const tribe: ProfileTribe = cache.get('/api/v3/profile/tribes')[0];

  // TODO rename to tribe.mainChanelId
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
      type: View.HomeFeed,
      name: 'sapien',
      // TODO rename to tribe.mainChanelId
      id: tribe.mainSquareId,
    },
    ...tribe.channels.map((channel) => ({
      ...channel,
      type: View.Channel,
    })),
  ];

  return views.find(({ id }) => id === viewID);
};
