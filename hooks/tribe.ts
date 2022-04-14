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
    ? tribe.channels.map(({ avatar, membersCount, name, id }) => ({
        avatar,
        type: View.Channel,
        membersCount,
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

  return tribe?.rooms?.map(({ name, id }) => ({
    type: View.Room,
    name,
    id,
  }));
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
    {
      type: View.Content,
      name: 'content',
      id: 'content',
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
