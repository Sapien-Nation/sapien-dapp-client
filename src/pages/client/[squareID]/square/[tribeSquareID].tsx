import { useRouter } from 'next/router';

// components
import { Query, LayoutWithWidgets, LayoutSkeleton } from 'components/common';
import { Square } from 'components/square';

const SquarePage = () => {
  const { query } = useRouter();

  if (!query.tribeSquareID) return null;

  return (
    <Query api="/api/v3/profile/tribes" loader={<LayoutSkeleton />}>
      {() => <Square squareID={String(query.tribeSquareID)} />}
    </Query>
  );
};

SquarePage.Layout = LayoutWithWidgets;

export default SquarePage;
