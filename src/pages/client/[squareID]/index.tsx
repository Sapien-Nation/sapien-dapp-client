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
import { Box } from '@material-ui/core';

// api
import { createContent } from 'api/content';

// hooks
import { getTribe } from 'hooks';

// components
import { Page, PostComposerSkeleton, Query } from 'components/common';
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
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
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
        {isEmpty ? <p>No Posts Yet</p> : null}
        {isReachingEnd ? <p>No More Posts</p> : null}
        {isCreating ? <span>Adding new item....</span> : null}
        <InfiniteScrollComponent
          dataLength={content.length}
          hasMore={!isEmpty}
          loader={null}
          next={() => {
            setSize(size + 1);
          }}
        >
          {content.map((content) => (
            <Box key={content.id} marginY={2}>
              <ContentItem content={content} />
            </Box>
          ))}
        </InfiniteScrollComponent>
        {isLoadingMore ? <span>Loading...</span> : null}
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
