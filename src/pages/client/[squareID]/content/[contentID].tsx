import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'react-use';

// components
const DynamicLayoutSkeleton = dynamic<any>(
  () => import('components/common').then((mod) => mod.LayoutSkeleton) as any,
  { ssr: false }
);
const DynamicReplyItem = dynamic<any>(
  () => import('components/reply').then((mod) => mod.ReplyItem) as any,
  { ssr: false }
);
const DynamicContentDetail = dynamic<any>(
  () => import('components/content/ContentDetail') as any,
  { ssr: false }
);
const DynamicFeedSkeleton = dynamic<any>(
  () => import('components/common').then((mod) => mod.FeedSkeleton) as any,
  { ssr: false }
);
const DynamicLayout = dynamic<any>(
  () => import('components/common').then((mod) => mod.LayoutWithWidgets) as any,
  { ssr: false, loading: () => <DynamicLayoutSkeleton /> }
);
const DynamicPage = dynamic<any>(
  () => import('components/common').then((mod) => mod.Page) as any,
  { ssr: false }
);
const DynamicQuery = dynamic<any>(
  () => import('components/common').then((mod) => mod.Query) as any,
  { ssr: false }
);
const DynamicWidgets = dynamic<any>(
  () => import('components/widgets').then((mod) => mod.Widgets) as any,
  { ssr: false }
);

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
      <DynamicPage>
        <>
          <DynamicContentDetail apiUrl={apiUrl} contentID={contentID} />
          <DynamicQuery api={apiUrl} loader={<DynamicFeedSkeleton />}>
            {(replies: Array<ContentType>) => (
              <Box display="grid" style={{ gap: '16px' }}>
                {replies.map((reply) => (
                  <DynamicReplyItem
                    key={reply.id}
                    apiUrl={apiUrl}
                    reply={reply}
                  />
                ))}
              </Box>
            )}
          </DynamicQuery>
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
      </DynamicPage>
      <DynamicWidgets />
    </>
  );
};

const ContentPage = () => {
  const { query } = useRouter();

  if (!query.contentID) return null;

  return <Content contentID={String(query.contentID)} />;
};

ContentPage.Layout = DynamicLayout;

export default ContentPage;
