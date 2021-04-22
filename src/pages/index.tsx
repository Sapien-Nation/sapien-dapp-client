/* istanbul ignore file */

// components
import Layout from './Layout';
import Query from 'components/query';

// types
import { Tribe } from 'tools/types/tribe';

// next
import { useRouter } from 'next/router';

const IndexPage = () => {
  const { push } = useRouter();

  return (
    <Query
      apiUrl="/api/tribes/followed"
      loader={null}
      options={{
        onSuccess: ({ tribes }: { tribes: Array<Tribe> }) => {
          push(`/client/${tribes[0].id}`);
        },
      }}
    />
  );
};

IndexPage.Layout = Layout;

export default IndexPage;
