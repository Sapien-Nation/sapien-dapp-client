import { useRouter } from 'next/router';

// components
import { LayoutWithWidgets as Layout, Query } from 'components/common';
import { Square } from 'components/square';

const SquarePage = () => {
  const { query } = useRouter();

  if (!query.squareID) return null;

  return (
    <Query api="/api/v3/profile/tribes">
      {() => <Square squareID={String(query.squareID)} />}
    </Query>
  );
};

SquarePage.Layout = Layout;

export default SquarePage;
