import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import useSWR from 'swr';

// utils
import { serialize } from 'utils/slate';

// types
import type { Content } from 'tools/types/content';
import type { Descendant } from 'slate';
import type { SquareFeed } from 'tools/types/square/view';
// context
import { useAuth } from 'context/user';

// mui
import { Box } from '@material-ui/core';

// api
import { createContent } from 'api/content';

// hooks
import { getTribe } from 'hooks';

// components
import { Page, Query } from 'components/common';
import { CreateContentForm, ContentItem } from 'components/content';
import { Header } from 'components/square';
import Layout from 'pages/Layout';

interface Props {
  squareID: string;
}

const Square = ({ squareID }: Props) => {
  const [contentFeed, setContentFeed] = useState<Array<Content>>([]);
  const [cursor, setCursor] = useState('');
  const [tempCursor, setTempCursor] = useState('');

  const { me } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { id: tribeID } = getTribe(String(squareID));

  const params = cursor ? `?cursor=${cursor}` : '';
  const apiUrl = `/api/tribe/${tribeID}/square/${squareID}/feed${params}`;

  useSWR(apiUrl, {
    onSuccess: (data: SquareFeed) => {
      setTempCursor(data.nextCursor);
      setContentFeed([...contentFeed, ...data.data]);
    },
  });

  const handleSubmit = async (content: Array<Descendant>) => {
    try {
      await createContent({
        data: content.map((node: any) => serialize(node)).join(''),
        squareId: squareID,
      });

      enqueueSnackbar('Post Created Successfully');
    } catch (error) {
      enqueueSnackbar(error.message);
    }
  };

  return (
    <Page
      header={<Header tribeID={tribeID} />}
      subHeader={
        me && (
          <Box className="card--rounded-white">
            <CreateContentForm user={me} onSubmit={handleSubmit} />
          </Box>
        )
      }
    >
      <InfiniteScrollComponent
        dataLength={contentFeed.length}
        hasMore={Boolean(tempCursor)}
        loader={null}
        next={() => setCursor(tempCursor)}
      >
        {contentFeed.map((content) => (
          <Box key={content.id} marginY={2}>
            <ContentItem content={content} />
          </Box>
        ))}
      </InfiniteScrollComponent>
    </Page>
  );
};

const SquarePage = () => {
  const { query } = useRouter();

  if (!query.squareID) return null;

  return (
    <Query api="/api/profile/tribes">
      {() => <Square squareID={String(query.squareID)} />}
    </Query>
  );
};

SquarePage.Layout = Layout;

export default SquarePage;
