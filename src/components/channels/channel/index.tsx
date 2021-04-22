// types
import type { Channel } from 'tools/types/channel';

// context
import { useNavigation } from 'context/tribes';

// mui
import { Box } from '@material-ui/core';

// components
import Filters from './Filters';
import Header from './Header';
import Query from 'components/query';

const ChannelView = () => {
  const [navigation] = useNavigation();

  return (
    <>
      <Query apiUrl={`/api/channels/channel/${navigation.secondary}`}>
        {({ channel }: { channel: Channel }) => <Header channel={channel} />}
      </Query>
      <Box marginTop={3}>
        <Filters
          onSort={() => {}}
          onSortCreator={() => {}}
          onSortDate={() => {}}
        />
      </Box>
    </>
  );
};

export default ChannelView;
