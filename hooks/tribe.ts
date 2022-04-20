import { useSWRConfig } from 'swr';

// constants
import { View } from 'constants/tribe';
import { ContentMimeType, ContentType } from 'tools/constants/content';

// types
import type { ProfileTribe } from 'tools/types/tribe';
import type { Content } from 'tools/types/content';

interface CurrentView {
  id: string;
  name: string;
  type: View;
}

export const useWelcomeMessage = (tribe: ProfileTribe): Content => {
  return {
    id: 'sapien_welcome_message',
    body: `<div style='padding: 0px 15px 20px;max-width: 1200px;margin: 0 auto;'>
            <div>&nbsp;</div>
            <h1 style='font-size:32px;text-align:center;font-weight:bold;color:#A185F2;line-height:normal;'>Hello fellow Sapiens, welcome to the Sapien Nation!</h1>
            <p>&nbsp;</p>
            <p><span style="font-size: 14pt;">Today marks the beginning of our journey together, and it’s one that I am honored to be able to share with all of you. If there is one thing that I have learned throughout my time with Sapien it is this — <em>with the right people and shared belief, anything is possible.</em></span></p>
            <p>&nbsp;</p>
            <p><span style="font-size: 14pt;">A nation is no more than its people, and as long as we stand together, no challenge is too great for us to face.</span></p>
            <p>&nbsp;</p>
            <p><span style="font-size: 14pt;">Together we can reclaim our shared reality and purpose so that we may direct our attention and effort to the things that really matter… <br></span></p>
            <p>&nbsp;</p>
            <p><span style="font-size: 14pt;"><strong>To protecting our shared home, the Earth.</strong></span></p>
            <p><span style="font-size: 14pt;"><strong>To elevating and empowering our Tribes.</strong></span></p>
            <p><span style="font-size: 14pt;"><strong>Toward building a future that puts Humans First.</strong><br></span></p>
            <p>&nbsp;</p>
            <p><em><strong><span style="font-size: 14pt;color:#A185F2;">Rob Giometti</span></strong></em></p>
            <p><span style="text-decoration: underline;"><span style="font-size: 10pt;"><strong>Founding Member of the Sapien Nation</strong></span></span></p>
          </div>
    `,
    group: {
      id: tribe.id,
      name: tribe.name,
      avatar: tribe.avatar,
    },
    createdAt: '2022-04-20T21:09:44.645Z',
    type: ContentType.POST,
    owner: {
      id: '10_000_000',
      displayName: 'Robert Giometti',
      userName: 'robgiometti',
      avatar:
        'https://cdn.discordapp.com/avatars/187385335725031424/ed2e737cb7906bbdf658a178ff5908d6.webp?size=128',
    },
    imagePreview: null,
    mimeType: ContentMimeType.Html,
  };
};

export const useSapienTribe = (): ProfileTribe => {
  const { cache } = useSWRConfig();

  return cache.get('/api/v3/profile/tribes')[0];
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
