import { useEffect } from 'react';

// next
import { useRouter } from 'next/router';

// components
import Layout from './Layout';

const IndexPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/client/1'); // TODO remove this with correct "Main" tribe logic
  }, [push]);

  return null;
};

IndexPage.Layout = Layout;

export default IndexPage;
