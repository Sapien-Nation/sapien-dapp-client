// types
import type { Channel } from 'tools/types/channel';
import type { Post as PostType } from 'tools/types/post';

// next
import { useRouter } from 'next/router';

// mui
import { Box } from '@material-ui/core';

// components
import Layout from 'pages/Layout';
import { Container, CursorQuery, Page, Query } from 'components/common';
import { Filters, Header } from 'components/channels/channel';
import Post from 'components/post';

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
        {({ channel }: { channel: Channel }) => (
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
            <CursorQuery
              hasNextPage
              baseApiUrl={`/api/channel/feed/${id}`}
              height={900}
              itemSize={540}
              loadingComponent={<span>LOADING....</span>}
              renderItem={(post: PostType) => <Post post={post} />}
              width="100%"
            />
          </Page>
        )}
      </Query>
    </Container>
  );
};

ChannelPage.Layout = Layout;

export default ChannelPage;
