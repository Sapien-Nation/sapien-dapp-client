import { useState } from 'react';
import { useSWRInfinite } from 'swr';
import InfiniteScrollComponent from 'react-infinite-scroll-component';

// api
import axios from 'api';

// context
import { useAuth } from 'context/user';

// components
import { FeedSkeleton, Page, PostComposerSkeleton } from 'components/common';
import Header from 'components/channel/Header';
import {
  CreateContentForm,
  ContentItem,
  EmptyFeed,
  NewContentPlaceholder,
} from 'components/content';
import { Widgets } from 'components/widgets';

// mui
import { Box } from '@material-ui/core';

interface Props {
  channelID: string;
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

export const Channel = ({ channelID }: Props) => {
  const [isCreating, setIsCreating] = useState(false);
  const { me, isLoggingIn } = useAuth();

  const {
    data: swrData,
    error: swrError,
    setSize,
    size,
    mutate,
  } = useSWRInfinite(
    (...rest) => getKey(...rest, `/api/v3/channel/${channelID}/feed`),
    { fetcher, revalidateOnMount: true }
  );

  const data = swrData?.map(({ data: posts }) => posts);
  const content = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !swrError;
  const isEmpty = swrData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (swrData && swrData[swrData.length - 1]?.length < 20);

  return (
    <>
      <Page
        header={<Header channelID={channelID} />}
        subHeader={
          <>
            {me && (
              <Box className="card--rounded-white" padding={3}>
                <CreateContentForm
                  setIsCreating={setIsCreating}
                  squareID={channelID}
                  user={me}
                  onSave={() => mutate()}
                />
              </Box>
            )}
            {!me && isLoggingIn && <PostComposerSkeleton />}
          </>
        }
      >
        <InfiniteScrollComponent
          key={channelID}
          dataLength={content.length}
          hasMore={!isEmpty}
          loader={null}
          next={() => setSize(size + 1)}
        >
          {(isEmpty || isReachingEnd) && <EmptyFeed />}
          <Box display="grid" style={{ gap: '16px' }}>
            <NewContentPlaceholder open={isCreating} />
            {content.map((content) => (
              <ContentItem key={content.id} content={content} mutate={mutate} />
            ))}
          </Box>
          {isLoadingInitialData && <FeedSkeleton />}
        </InfiniteScrollComponent>
      </Page>
      {me && <Widgets />}
    </>
  );
};
