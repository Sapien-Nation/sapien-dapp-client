import { useEffect } from 'react';

// next
import { useRouter } from 'next/router';

// hooks
import { getTribes } from 'hooks';

// components
import Layout from './Layout';

const IndexPage = () => {
  const tribes = getTribes();
  const { push } = useRouter();

  useEffect(() => {
    if (tribes?.length) {
      push(`/client/${tribes[0].mainSquareId}`);
    }
  }, [tribes, push]);

  return null;
};

IndexPage.Layout = Layout;

export default IndexPage;
