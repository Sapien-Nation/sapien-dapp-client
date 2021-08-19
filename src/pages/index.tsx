import { useRouter } from 'next/router';
import { useEffect } from 'react';

// components
import { Layout, Redirect } from 'components/common';

// context
import { useAuth } from 'context/user';

const IndexPage = () => {
  const router = useRouter();
  const { me } = useAuth();

  useEffect(() => {
    if (me === null) {
      router.push('/register');
    }
  }, [me, router]);

  return <Redirect to="/client/sapien" />;
};

IndexPage.Layout = Layout;

export default IndexPage;
