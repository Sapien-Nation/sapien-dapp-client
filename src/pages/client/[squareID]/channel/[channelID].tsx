import { useRouter } from 'next/router';

// components
import { LayoutWithWidgets } from 'components/common';
import { Channel } from 'components/channel';

const ChannelPage = () => {
  const { query } = useRouter();

  if (!query.channelID) return null;

  return <Channel channelID={String(query.channelID)} />;
};

ChannelPage.Layout = LayoutWithWidgets;

export default ChannelPage;
