import { useRouter } from 'next/router';

// components
import { LayoutWithWidgets as Layout } from 'components/common';
import { Square } from 'components/square';

const SquarePage = () => {
  const { query } = useRouter();

  if (!query.squareID) return null;

  return <Square squareID={String(query.squareID)} />;
};

SquarePage.Layout = Layout;

export default SquarePage;
