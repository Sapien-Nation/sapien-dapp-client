import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import { useSWRInfinite } from 'swr';

// api
import axios from 'api';
import { createContent } from 'api/content';

// context
import { useAuth } from 'context/user';

// components
import {
  FeedSkeleton,
  Page,
  PostComposerSkeleton,
  Query,
} from 'components/common';
import Layout from 'pages/Layout';
import { Header } from 'components/square';
import {
  CreateContentForm,
  ContentItem,
  EmptyFeed,
  NewContentPlaceholder,
} from 'components/content';

// hooks
import { getTribe } from 'hooks';

// utils
import { serialize } from 'utils/slate';

// types
import type { Descendant } from 'slate';

// mui
import { Box } from '@material-ui/core';

interface Props {
  squareID: string;
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

const Square = ({ squareID }: Props) => {
  const [isCreating, setIsCreating] = useState(false);
  const { me } = useAuth();
  const { id: tribeID } = getTribe(String(squareID));
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: swrData,
    error: swrError,
    setSize,
    size,
    mutate,
  } = useSWRInfinite(
    (...rest) =>
      getKey(...rest, `/api/v3/tribe/${tribeID}/square/${squareID}/feed`),
    { fetcher, revalidateOnMount: true }
  );

  const handleSubmit = async (content: Array<Descendant>) => {
    setIsCreating(true);
    try {
      await createContent({
        data: content.map((node: any) => serialize(node)).join(''),
        squareId: squareID,
      });

      mutate();

      enqueueSnackbar('Post Created Successfully');
    } catch (error) {
      enqueueSnackbar(error.message);
    }
    setIsCreating(false);
  };

  const data = swrData?.map(({ data: posts }) => posts);
  const content = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !swrError;
  const isEmpty = swrData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (swrData && swrData[swrData.length - 1]?.length < 20);

  return (
    <Page
      header={<Header tribeID={tribeID} />}
      subHeader={
        <Box className="card--rounded-white">
          {me ? (
            <CreateContentForm user={me} onSubmit={handleSubmit} />
          ) : (
            <PostComposerSkeleton />
          )}
        </Box>
      }
    >
      <InfiniteScrollComponent
        key={squareID}
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
  );
};

const SquarePage = () => {
  const { query } = useRouter();

  if (!query.squareID) return null;

  return (
    <Query api="/api/v3/profile/tribes">
      {() => <Square squareID={String(query.squareID)} />}
    </Query>
  );
};

SquarePage.Layout = Layout;

export default SquarePage;
