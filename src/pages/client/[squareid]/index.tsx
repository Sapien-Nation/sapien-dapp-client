import { mutate } from 'swr';

// types
import type { Content } from 'tools/types/content';
import type { User } from 'tools/types/user';

// next
import { useRouter } from 'next/router';

// context
import { useAuth } from 'context/user';

// mui
import { Box } from '@material-ui/core';

// api
import { createContent } from 'api/content';

// hooks
import { getTribe } from 'hooks';

// components
import { CursorQuery, Page } from 'components/common';
import { CreateContentForm, ContentItem } from 'components/content';
import { Header } from 'components/square';
import Layout from 'pages/Layout';

interface Props {
  squareid: string;
  user?: User;
}

const handleFormSubmit = async (values) => {
  try {
    const response = await createContent(values);
    mutate('', (posts) => [...posts, response], false);
  } catch (err) {
    console.log('Error: ', err);
  }
};

const Square = ({ squareid, user = null }: Props) => {
  const tribe = getTribe(squareid);
  return (
    <Page
      header={tribe && <Header tribeID={tribe.id} />}
      subHeader={
        user && (
          <Box className="card--rounded-white">
            <CreateContentForm
              handleContentSubmit={handleFormSubmit}
              user={user}
            />
          </Box>
        )
      }
    >
      <Box maxWidth="78rem" style={{ margin: '0 auto' }}>
        <CursorQuery
          hasNextPage
          baseApiUrl={`/api/square/${squareid}/feed`}
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
  const { squareid } = query;

  if (!squareid) return null;

  return <Square squareid={String(squareid)} user={me} />;
};

SquarePage.Layout = Layout;

export default SquarePage;
