import { useSnackbar } from 'notistack';

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
  squareID: string;
  user?: User;
}

const Square = ({ squareID, user = null }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const tribe = getTribe(squareID);

  const handleSubmit = async () => {
    try {
      await createContent({
        data: '<h1>Hello</h1>', // TODO de-serialize https://docs.slatejs.org/walkthroughs/06-saving-to-a-database
        squareId: squareID,
      });

      enqueueSnackbar('Post Created Successfully');
    } catch (error) {
      enqueueSnackbar(error.message);
    }
  };

  return (
    <Page
      header={tribe && <Header tribeID={tribe.id} />}
      subHeader={
        user && (
          <Box className="card--rounded-white">
            <CreateContentForm user={user} onSubmit={handleSubmit} />
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
