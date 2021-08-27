import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// components
const DynamicLayout = dynamic<any>(
  () => import('components/common').then((mod) => mod.Layout) as any,
  { ssr: false }
);

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

StorePage.Layout = DynamicLayout;

export default StorePage;
