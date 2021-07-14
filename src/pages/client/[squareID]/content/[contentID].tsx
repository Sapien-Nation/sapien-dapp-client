import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSWRInfinite } from 'swr';
import InfiniteScrollComponent from 'react-infinite-scroll-component';

// api
import axios from 'api';

// components
import Layout from 'pages/Layout';
import {
  ContentDetailSkeleton,
  FeedSkeleton,
  Page,
  Query,
} from 'components/common';
import {
  ContentItem,
  EmptyFeed,
  NewContentPlaceholder,
} from 'components/content';
import { ReplyItem } from 'components/reply';

// mui
import { Box } from '@material-ui/core';

// types
import type { Content as ContentType } from 'tools/types/content';

// mocks
import { mockContent } from 'tools/mocks/content';

interface Props {
  contentID: string;
}

const fetcher = (url) =>
  axios
    .get(url)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.error));

const getKey = (pageIndex, previousPageData, apiUrl) => {
  if (previousPageData && !previousPageData.nextCursor) return null;

  if (pageIndex === 0) return apiUrl;

  return `${apiUrl}?nextCursor=${previousPageData.nextCursor}`;
};

const Content = ({ contentID }: Props) => {
  const [isCreating] = useState(false);

  const {
    data: swrData,
    error: swrError,
    setSize,
    size,
    mutate,
  } = useSWRInfinite(
    (...rest) => getKey(...rest, `/api/v3/post/${contentID}/replies`),
    { fetcher, revalidateOnMount: true }
  );

  const replies = swrData?.map(({ data: posts }) => posts) ?? [];
  const content = replies ? [].concat(...replies) : [];
  const isLoadingInitialData = !replies && !swrError;
  const isEmpty = swrData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (swrData && swrData[swrData.length - 1]?.length < 20);

  return (
    <Page>
      <>
        <Query
          api={`/post/${contentID}`}
          loader={<ContentDetailSkeleton />}
          options={{
            fetcher: () =>
              mockContent({
                data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur scelerisque velit et orci pulvinar, ut viverra nibh pretium. Suspendisse ultrices nisi metus, eu suscipit magna commodo non. Donec consequat diam quis placerat accun fusce. Porttitor ante a interdum aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam consectetur bibendum turpis vitae suscipit. Nam eget lorem tempor, ornare mi vitae, tempus enim. Donec maximus tortor in dolor ullamcorper, in lacinia libero eleifend. Nam convallis quam lacus, non feugiat sapien sollicitudin quis. Donec lobortis varius orci non laoreet. Curabitur finibus dui vel sodales hendrerit. Aenean eu ligula mi. Nunc sagittis sapien id tellus efficitur maximus. Fusce risus libero, consequat sed sapien in, dapibus rutrum turpis. Nam pretium sapien non sem porttitor, et rhoncus enim accumsan. In lacus ipsum, bibendum at faucibus nec, fringilla a dolor. Proin sit amet enim vitae quam eleifend vulputate.',
              }),
          }}
        >
          {(content: ContentType) => (
            <ContentItem
              content={content}
              mutate={() => mutate()}
              variant="detail"
            />
          )}
        </Query>
        <InfiniteScrollComponent
          key={contentID}
          dataLength={content.length}
          hasMore={!isEmpty}
          loader={null}
          next={() => setSize(size + 1)}
        >
          {(isEmpty || isReachingEnd) && <EmptyFeed />}
          <Box display="grid" style={{ gap: '16px' }}>
            <NewContentPlaceholder open={isCreating} />
            {content.map((reply) => (
              <ReplyItem key={reply.id} mutate={mutate} reply={reply} />
            ))}
          </Box>
          {isLoadingInitialData && <FeedSkeleton />}
        </InfiniteScrollComponent>
      </>
    </Page>
  );
};

const ContentPage = () => {
  const { query } = useRouter();

  if (!query.contentID) return null;

  return (
    <Query api="/api/v3/profile/tribes">
      {() => <Content contentID={String(query.contentID)} />}
    </Query>
  );
};

ContentPage.Layout = Layout;

export default ContentPage;
