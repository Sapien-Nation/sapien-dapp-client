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

export const useTribe = (tribeID: string): ProfileTribe => {
  const { cache } = useSWRConfig();

  return cache.get('/api/v3/profile/tribes').find(({ id }) => id === tribeID);
};

export const useMainTribe = (): { tribeID: string } => {
  const { cache } = useSWRConfig();

  const tribe: ProfileTribe = cache.get('/api/v3/profile/tribes')[0];

  return { tribeID: tribe.id };
};

export const useTribeRooms = (tribeID: string) => {
  const { cache } = useSWRConfig();
  const tribes: Array<ProfileTribe> = cache.get('/api/v3/profile/tribes');

  const tribe = tribes.find(({ id }) => id === tribeID);

  if (tribe) {
    return [
      {
        type: View.Room,
        name: 'general',
        id: '123456789',
      },
      {
        type: View.Room,
        name: 'random',
        id: '987654321',
      },
    ];
  }

  return [];
};

export const useGetCurrentView = (
  tribeID: string,
  viewID: string
): CurrentView => {
  const { cache } = useSWRConfig();

  const tribe: ProfileTribe = cache
    .get('/api/v3/profile/tribes')
    .find(({ id }) => id === tribeID);
  const rooms = useTribeRooms(tribe.id);

  const views = [
    {
      type: View.HomeFeed,
      name: 'sapien',
      id: 'home',
    },
    ...rooms,
  ];

  return views.find(({ id }) => id === viewID);
};
