import { useRouter } from 'next/router';
import { useEffect } from 'react';

// components
import { Layout } from 'components/common';

// context
import { useAuth } from 'context/user';

const StorePage = () => {
  const { push } = useRouter();
  const { me } = useAuth();

  useEffect(() => {
    if (me === null) {
      push('/register');
    }
  }, [me, push]);

  return <h1>Badges Store Page</h1>;
};

StorePage.Layout = Layout;

export default StorePage;
