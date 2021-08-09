import { useRouter } from 'next/router';

// components
import { Page, Query, LayoutWithWidgets } from 'components/common';
import { Widgets } from 'components/widgets';

interface Props {
  squareID: string;
}

const Square = ({ squareID }: Props) => {
  return (
    <>
      <Page>
        <h1>TODO Square Page: {squareID}</h1>
      </Page>
      <Widgets />
    </>
  );
};

const SquarePage = () => {
  const { query } = useRouter();

  if (!query.tribeSquareID) return null;

  return (
    <Query api="/api/v3/profile/tribes">
      {() => <Square squareID={String(query.tribeSquareID)} />}
    </Query>
  );
};

SquarePage.Layout = LayoutWithWidgets;

export default SquarePage;
