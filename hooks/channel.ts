import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

// types
import type { ChannelContributor } from 'tools/types/channel';

export const useChannelContributors = (): ChannelContributor => {
  const { query } = useRouter();
  const { cache } = useSWRConfig();

  const channelID = query.viewID as string;
  return cache.get(`/core-api/channel/${channelID}/contributors`);
};

export const useChannelPermissions = (
  channelID: string,
  permissionList: Array<string>
): Array<boolean> => {
  const { cache } = useSWRConfig();

  const channel = cache.get(`/core-api/channel/${channelID}`);

  if (channel?.permissions) {
    return permissionList.map((permission) => channel.permissions[permission]);
  }

  return permissionList.map(() => false);
};
