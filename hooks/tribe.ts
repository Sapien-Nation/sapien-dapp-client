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
        type: View.HomeFeed,
        name: 'sapien',
        id: 'home',
      },
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

export const useMainTribe = (): { tribeID: string } => {
  const { cache } = useSWRConfig();

  const tribe: ProfileTribe = cache.get('/api/v3/profile/tribes')[0];

  return { tribeID: tribe.id };
};

export const useGetCurrentView = (
  tribeID: string,
  viewID: string
): CurrentView => {
  const { cache } = useSWRConfig();

  const tribes: Array<ProfileTribe> = cache.get('/api/v3/profile/tribes');

  const views = [
    {
      type: View.HomeFeed,
      name: 'sapien',
      id: 'home',
    },
  ];

  return views.find(({ id }) => id === viewID);
};
