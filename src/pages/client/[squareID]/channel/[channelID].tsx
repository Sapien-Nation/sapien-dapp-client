import { useRouter } from 'next/router';

// components
import { Query, LayoutWithWidgets, LayoutSkeleton } from 'components/common';
import { Channel } from 'components/channel';

const ChannelPage = () => {
  const { query } = useRouter();

  if (!query.channelID) return null;

  return (
    <Query api="/api/v3/profile/tribes" loader={<LayoutSkeleton />}>
      {() => <Channel channelID={String(query.channelID)} />}
    </Query>
  );
};

ChannelPage.Layout = LayoutWithWidgets;

export default ChannelPage;
