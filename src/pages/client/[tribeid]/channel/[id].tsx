// next
import { useRouter } from 'next/router';

// mui
import { Box } from '@material-ui/core';

// components
import Layout from 'pages/Layout';
import { Filters, Header } from 'components/channels/channel';
import { Container, Page, Query } from 'components/common';

const ChannelPage = () => {
  const { query } = useRouter();
  const { id } = query;
  return (
    <Container
      secondary={
        <Box>
          <h1>Todo Panel</h1>
        </Box>
      }
    >
      <Query apiUrl={`/api/channel/${id}`} loader={null}>
        {({ channel }: any) => (
          <Page
            filters={
              <Filters
                onSort={() => {}}
                onSortCreator={() => {}}
                onSortDate={() => {}}
              />
            }
            header={<Header channel={channel} />}
          >
            <h1>TODO</h1>
          </Page>
        )}
      </Query>
    </Container>
  );
};

ChannelPage.Layout = Layout;

export default ChannelPage;
