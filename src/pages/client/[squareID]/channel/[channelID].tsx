import { useEffect } from 'react';
import { useRouter } from 'next/router';

// components
import { LayoutWithWidgets } from 'components/common';
import { Channel } from 'components/channel';

// context
import { useAuth } from 'context/user';

const ChannelPage = () => {
  const { push, query } = useRouter();
  const { me } = useAuth();

  useEffect(() => {
    if (me === null) {
      push('/register');
    }
  }, [me, push]);

  if (!query.channelID) return null;

  return <Channel channelID={String(query.channelID)} />;
};

ChannelPage.Layout = LayoutWithWidgets;

export default ChannelPage;
