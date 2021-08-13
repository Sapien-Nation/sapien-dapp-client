import { useRouter } from 'next/router';

// components
import { LayoutWithWidgets } from 'components/common';
import { Square } from 'components/square';

const SquarePage = () => {
  const { query } = useRouter();

  if (!query.squareID) return null;

  return <Square isMainSquare={false} squareID={String(query.squareID)} />;
};

SquarePage.Layout = LayoutWithWidgets;

export default SquarePage;
