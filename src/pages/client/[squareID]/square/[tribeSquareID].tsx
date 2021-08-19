import { useEffect } from 'react';
import { useRouter } from 'next/router';

// components
import { LayoutWithWidgets } from 'components/common';
import { Square } from 'components/square';

// context
import { useAuth } from 'context/user';

const SquarePage = () => {
  const { push, query } = useRouter();
  const { me } = useAuth();

  useEffect(() => {
    if (me === null) {
      push('/register');
    }
  }, [me, push]);

  if (!query.squareID) return null;

  return <Square isMainSquare={false} squareID={String(query.squareID)} />;
};

SquarePage.Layout = LayoutWithWidgets;

export default SquarePage;
