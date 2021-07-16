import { useRouter } from 'next/router';
import { useSWRInfinite } from 'swr';
import InfiniteScrollComponent from 'react-infinite-scroll-component';

// api
import axios from 'api';

// components
import Layout from 'pages/Layout';
import { ReplyItem } from 'components/reply';
import { EmptyFeed } from 'components/content';
import ContentDetail from 'components/content/ContentDetail';
import { FeedSkeleton, Page, Query } from 'components/common';

// mui
import { Box } from '@material-ui/core';

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
        <ContentDetail contentID={contentID} mutateReply={() => mutate()} />
        <InfiniteScrollComponent
          key={contentID}
          dataLength={content.length}
          hasMore={!isEmpty}
          loader={null}
          next={() => setSize(size + 1)}
        >
          {(isEmpty || isReachingEnd) && <EmptyFeed />}
          <Box display="grid" style={{ gap: '16px' }}>
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
