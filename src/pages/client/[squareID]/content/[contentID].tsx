import { useRouter } from 'next/router';
import { useLocalStorage } from 'react-use';

// components
import { ReplyItem } from 'components/reply';
import ContentDetail from 'components/content/ContentDetail';
import {
  FeedSkeleton,
  LayoutWithWidgets as Layout,
  Page,
  Query,
} from 'components/common';
import { Widgets } from 'components/widgets';

// mui
import { Box, Button } from '@material-ui/core';

// types
import type { Content as ContentType } from 'tools/types/content';

interface Props {
  contentID: string;
}

enum RepliesViewTypes {
  Head = 'head',
  Tail = 'tail',
  All = 'all',
}

// TODO use react-window
const Content = ({ contentID }: Props) => {
  const [view, setView] = useLocalStorage(
    'replies-feed-type',
    RepliesViewTypes.Head
  );
  const apiUrl = `/api/v3/post/${contentID}/replies?viewType=${view}`;

  return (
    <>
      <Page>
        <>
          <ContentDetail apiUrl={apiUrl} contentID={contentID} />
          <Query api={apiUrl} loader={<FeedSkeleton />}>
            {(replies: Array<ContentType>) => (
              <Box display="grid" style={{ gap: '16px' }}>
                {replies.map((reply) => (
                  <ReplyItem key={reply.id} apiUrl={apiUrl} reply={reply} />
                ))}
              </Box>
            )}
          </Query>
          {view === RepliesViewTypes.Head && (
            <Button
              onClick={() => {
                setView(RepliesViewTypes.All);
              }}
            >
              Load more
            </Button>
          )}
        </>
      </Page>
      <Widgets />
    </>
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
