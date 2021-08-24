import { useRouter } from 'next/router';
import { useEffect } from 'react';

// components
import { LayoutWithWidgets as Layout } from 'components/common';
import { Square } from 'components/square';

// context
import { useAuth } from 'context/user';

const SquarePage = () => {
  const { push, query } = useRouter();
  const { me } = useAuth();

  useEffect(() => {
    if (me === null && query && query.squareID !== 'sapien') {
      push('/register');
    }
  }, [me, push, query]);

  if (!query.squareID) return null;

  return <Square squareID={String(query.squareID)} />;
};

SquarePage.Layout = Layout;

export default SquarePage;
