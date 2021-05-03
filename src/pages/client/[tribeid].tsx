/* istanbul ignore file */
import Layout from 'pages/Layout';

// next
import { useRouter } from 'next/router';

const TribePage = () => {
  const { query } = useRouter();

  return <h1>Tribe Page {query.tribeid}</h1>;
};

TribePage.Layout = Layout;

export default TribePage;
