import Layout from 'pages/Layout';

// hooks
import { getTribes } from 'hooks/tribeBar';

// types
import type { TribeMedia } from 'tools/types/tribe/view';

// next
import { useRouter } from 'next/router';

// mui
import { Box } from '@material-ui/core';

// components
import { Header } from 'components/square';
import { Query } from 'components/common';

// Remove this
import { mockTribeMedia } from 'tools/mocks/tribe/view';

const TribePage = () => {
  const tribes = getTribes();
  const { query } = useRouter();

  const selectedTribe = tribes.find(
    ({ mainSquareId }) => mainSquareId === query.squareid
  );

  return (
    <Box display="grid" gap={3}>
      <Query
        apiUrl={selectedTribe ? `/api/tribe/media/${selectedTribe.id}` : ''}
        options={{ fetcher: () => mockTribeMedia() }}
      >
        {({ avatar, cover }: TribeMedia) => (
          <Header avatar={avatar} cover={cover} />
        )}
      </Query>
    </Box>
  );
};

TribePage.Layout = Layout;

export default TribePage;
