import _isEmpty from 'lodash/isEmpty';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';

// constants
import { View } from 'constants/tribe';

// components
import { Head, ErrorView } from 'components/common';
import { RoomView } from 'components/tribe';

// hooks
import { useGetCurrentView } from 'hooks/tribe';

// types
import type { NextPage } from 'next';

interface Props {
  tribeID: string;
  viewID: string;
}

const TribePage = ({ tribeID, viewID }: Props) => {
  const view = useGetCurrentView(tribeID as string, viewID as string);

  const renderView = () => {
    switch (view.type) {
      case View.Room:
        return <RoomView />;
      default:
        return <h1>TODO</h1>;
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorView}>{renderView()}</ErrorBoundary>
  );
};

const TribePageProxy: NextPage = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  return (
    <>
      <Head title="Home" />
      <TribePage tribeID={tribeID as string} viewID={viewID as string} />
    </>
  );
};

export default TribePageProxy;
