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

export const useTribeChannels = (tribeID: string) => {
  const { cache } = useSWRConfig();
  const tribe: ProfileTribe = cache
    .get('/api/v3/profile/tribes')
    .find(({ id }) => id === tribeID);

  return tribe
    ? tribe.channels.map(({ name, id }) => ({
        type: View.Channel,
        name,
        id,
      }))
    : [];
};

export const useTribeRooms = (tribeID: string) => {
  const { cache } = useSWRConfig();
  const tribe: ProfileTribe = cache
    .get('/api/v3/profile/tribes')
    .find(({ id }) => id === tribeID);

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
  const channels = useTribeChannels(tribe.id);

  const views = [
    {
      type: View.MainChannel,
      name: tribe.name,
      id: 'home',
    },
    ...channels,
    ...rooms,
  ];

  const view = views.find(({ id }) => id === viewID);

  if (view) return view;

  return {
    type: View.NotFound,
    name: 'not_found',
    id: 'not_found',
  };
};
