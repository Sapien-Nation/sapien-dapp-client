import { useEffect } from 'react';

// next
import { useRouter } from 'next/router';

// context
import { useAuth } from 'context/user';

// hooks
import { getTribes } from 'hooks';

// components
import Layout from './Layout';

const Index = () => {
  const tribes = getTribes();
  const { push } = useRouter();

  useEffect(() => {
    if (tribes?.length) {
      push(`/client/${tribes[0].mainSquareId}`);
    }
  }, [tribes, push]);

  return null;
};

const IndexPage = () => {
  const { me } = useAuth();

  if (!me) return null;

  return <Index />;
};

IndexPage.Layout = Layout;

export default IndexPage;
