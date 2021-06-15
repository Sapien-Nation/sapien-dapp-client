import Layout from 'pages/Layout';

//types
import type { Content as ContentType } from 'tools/types/content';

// next
import { useRouter } from 'next/router';

// mui
import { Box } from '@material-ui/core';

// components
import { Header } from 'components/square';
import { CursorQuery } from 'components/common';
import Content from 'components/content/ContentItem';

interface Props {
  squareID: string;
}

const Square = ({ squareID }: Props) => (
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
  </Box>
);

const SquarePage = () => {
  const { query } = useRouter();
  const { squareid } = query;

  if (!squareid) return null;

  return <Square squareID={String(squareid)} />;
};

SquarePage.Layout = Layout;

export default SquarePage;
