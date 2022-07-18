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
