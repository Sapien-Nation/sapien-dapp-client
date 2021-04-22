// types
import type { Channel } from 'tools/types/channel';

// next
import { useRouter } from 'next/router';

// mui
import { Box } from '@material-ui/core';

// components
import Filters from './Filters';
import Header from './Header';
import Query from 'components/query';

const ChannelView = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <>
      <Query apiUrl={`/api/channel/${id}`}>
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
