import { parse } from 'node-html-parser';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useSWRInfinite } from 'swr';
import InfiniteScrollComponent from 'react-infinite-scroll-component';

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
import { Header } from 'components/tribe';
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
  const { me, isLoggingIn } = useAuth();

  // Sapien its an special "tribe" that don't have a mainSquareID
  // but it renders all exactly as a normal Square, thats why we check
  // for query.squareID to see if we are trying to render the sapien tribe
  const isSapienTribe = squareID === 'sapien';
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
      getKey(
        ...rest,
        isSapienTribe
          ? '/api/v3/tribe/sapien/feed'
          : `/api/v3/tribe/${tribeID}/square/${squareID}/feed`
      ),
    { fetcher, revalidateOnMount: true }
  );

  const handleSubmit = async (content: Array<Descendant>) => {
    setIsCreating(true);
    try {
      const dataSerialized = content
        .map((node: any) => serialize(node))
        .join('');

      const body = {
        data: dataSerialized,
        squareId: squareID,
      };

      const rawHTML = parse(dataSerialized);
      const preview =
        rawHTML.querySelector('img')?.rawAttributes?.['data-fileKey'];

      if (preview) {
        // @ts-ignore
        body.preview = preview;
      }

      await createContent(body);

      mutate();

      enqueueSnackbar('Post created successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } catch (error) {
      enqueueSnackbar('Oops, something went wrong. Please try again.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
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
      header={<Header tribeID={isSapienTribe ? 'sapien' : tribeID} />}
      subHeader={
        <Box className="card--rounded-white" padding={3}>
          {me && <CreateContentForm user={me} onSubmit={handleSubmit} />}
          {!me && isLoggingIn && <PostComposerSkeleton />}
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
