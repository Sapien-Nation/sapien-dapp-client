import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import { useSWRInfinite } from 'swr';

// api
import axios from 'api';

// utils
import { serialize } from 'utils/slate';

// types
import type { Descendant } from 'slate';

// context
import { useAuth } from 'context/user';

// mui
import { Box, Fade, Typography } from '@material-ui/core';

// api
import { createContent } from 'api/content';

// hooks
import { getTribe } from 'hooks';

// components
import {
  ContentFeedSkeleton,
  Page,
  PostComposerSkeleton,
  Query,
} from 'components/common';
import { CreateContentForm, ContentItem } from 'components/content';
import { Header } from 'components/square';
import Layout from 'pages/Layout';

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
  console.log(isCreating);
  const { me } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const { id: tribeID } = getTribe(String(squareID));
  const {
    data,
    error: swrError,
    setSize,
    size,
    mutate,
  } = useSWRInfinite(
    (...rest) =>
      getKey(...rest, `/api/v3/tribe/${tribeID}/square/${squareID}/feed`),
    fetcher
  );

  const handleSubmit = async (content: Array<Descendant>) => {
    setIsCreating(true);
    try {
      await createContent({
        data: content.map((node: any) => serialize(node)).join(''),
        squareId: squareID,
      });

      enqueueSnackbar('Post Created Successfully');

      mutate();
    } catch (error) {
      enqueueSnackbar(error.message);
    }
    setIsCreating(false);
  };

  const content = data?.length ? data.map(({ data }) => data).flat() : [];
  const isLoadingInitialData = !data && !swrError;
  const isEmpty = data?.[0].data?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);

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
      <>
        <InfiniteScrollComponent
          dataLength={content.length}
          hasMore={!false}
          loader={null}
          next={() => {
            setSize(size + 1);
          }}
        >
          {isEmpty || isReachingEnd ? (
            <Box className="card--rounded-white" padding={4} textAlign="center">
              <Typography>
                There are no more posts{' '}
                <span aria-label="No more posts" role="img">
                  🙈
                </span>
              </Typography>
            </Box>
          ) : null}
          {/* <Fade unmountOnExit in={isCreating}>
            <div>
              <ContentFeedSkeleton />
            </div>
          </Fade> */}
          <Box display="grid" style={{ gap: '16px' }}>
            {isCreating
              ? [[{}], ...content]
              : content.map((content, index) => (
                  <>
                    {isCreating && index === 0 ? (
                      <Fade unmountOnExit in={isCreating}>
                        <div>
                          <ContentFeedSkeleton />
                        </div>
                      </Fade>
                    ) : (
                      <ContentItem key={content.id} content={content} />
                    )}
                  </>
                ))}
          </Box>
        </InfiniteScrollComponent>
        {isLoadingInitialData && (
          <>
            <ContentFeedSkeleton />
            <ContentFeedSkeleton />
            <ContentFeedSkeleton />
          </>
        )}
      </>
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
