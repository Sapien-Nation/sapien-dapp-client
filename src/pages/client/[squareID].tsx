// types
import type { Content } from 'tools/types/content';
import type { User } from 'tools/types/user';

// next
import { useRouter } from 'next/router';

// context
import { useAuth } from 'context/user';

// mui
import { Box } from '@material-ui/core';

// hooks
import { getTribe } from 'hooks';

// components
import { CursorQuery, Page } from 'components/common';
import { CreateContentForm, ContentItem } from 'components/content';
import { Header } from 'components/square';
import Layout from 'pages/Layout';

interface Props {
  squareID: string;
  user?: User;
}

const Square = ({ squareID, user = null }: Props) => {
  const tribe = getTribe(squareID);
  return (
    <Page
      header={tribe && <Header tribeID={tribe.id} />}
      subHeader={
        user && (
          <Box className="card--rounded-white">
            <CreateContentForm user={user} />
          </Box>
        )
      }
    >
      <Box maxWidth="78rem" style={{ margin: '0 auto' }}>
        <CursorQuery
          hasNextPage
          baseApiUrl={`/api/square/${squareID}/feed`}
          loadingComponent={null}
          renderItem={(content: Content) => <ContentItem content={content} />}
        />
      </Box>
    </Page>
  );
};

const SquarePage = () => {
  const { me } = useAuth();
  const { query } = useRouter();
  const { squareID } = query;

  if (!squareID) return null;

  return <Square squareID={String(squareID)} user={me} />;
};

SquarePage.Layout = Layout;

export default SquarePage;
