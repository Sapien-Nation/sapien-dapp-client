// types
import type { Channel } from 'tools/types/channel';

// context
import { useNavigation } from 'context/tribes';

// components
import Header from './Header';
import Query from 'components/query';

const ChannelView = () => {
  const [navigation] = useNavigation();

  return (
    <Query apiUrl={`/api/channels/channel/${navigation.secondary}`}>
      {({ channel }: { channel: Channel }) => <Header channel={channel} />}
    </Query>
  );
};

export default ChannelView;
