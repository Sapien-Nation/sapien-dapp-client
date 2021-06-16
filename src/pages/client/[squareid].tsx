import Layout from 'pages/Layout';

//types
import type { Content as ContentType } from 'tools/types/content';

// next
import { useRouter } from 'next/router';

import { useAuth } from 'context/user';

// mui
import { Box } from '@material-ui/core';

// components
import CreateContentForm from 'components/content/CreateContentForm';
import { Header } from 'components/square';
import { CursorQuery } from 'components/common';
import Content from 'components/content/ContentItem';

interface Props {
  squareID: string;
  user?: {
    username: string;
  };
}

const Square = ({ squareID, user }: Props) => (
  <Box display="grid" gap={3}>
    <Header squareID={String(squareID)} />
    <Box maxWidth="78rem" style={{ margin: '0 auto' }}>
      <CursorQuery
        hasNextPage
        baseApiUrl={`/api/square/${squareID}/feed`}
        loadingComponent={<span>LOADING....</span>}
        renderItem={(content: ContentType) => <Content content={content} />}
      />
    </Box>
    <CreateContentForm
      user={{ avatar: 'https://i.pravatar.cc/300', username: user.username }}
    />
  </Box>
);

const SquarePage = () => {
  const { query } = useRouter();
  const { me } = useAuth();
  const { squareid } = query;

  if (!squareid) return null;
  if (!me) return null;

  return <Square squareID={String(squareid)} user={me} />;
};

SquarePage.Layout = Layout;

export default SquarePage;
