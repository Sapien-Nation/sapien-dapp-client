import Layout from 'pages/Layout';

// next
import { useRouter } from 'next/router';

// mui
import { Box } from '@material-ui/core';

// components
import { Header } from 'components/square';

const TribePage = () => {
  const { query } = useRouter();
  const { squareid } = query;

  return (
    <Box display="grid" gap={3}>
      {squareid && <Header squareID={String(squareid)} />}
    </Box>
  );
};

TribePage.Layout = Layout;

export default TribePage;
