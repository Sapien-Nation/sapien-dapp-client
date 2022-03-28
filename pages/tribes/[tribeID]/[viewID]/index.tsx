import _isEmpty from 'lodash/isEmpty';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';

// constants
import { View } from 'constants/tribe';

// components
import { Head, ErrorView, Redirect } from 'components/common';
import { RoomView } from 'components/tribe';

// hooks
import { useGetCurrentView, useTribeRooms } from 'hooks/tribe';

// types
import type { NextPage } from 'next';

interface Props {
  tribeID: string;
  viewID: string;
}

const RedirectToGeneral = ({ tribeID }: { tribeID: string }) => {
  const [{ id }] = useTribeRooms(tribeID);

  return <Redirect path={`/tribes/${tribeID}/${id}`} />;
};

const TribePage = ({ tribeID, viewID }: Props) => {
  const view = useGetCurrentView(tribeID as string, viewID as string);

  const renderView = () => {
    switch (view.type) {
      case View.Room:
        return <RoomView />;
      case View.HomeFeed:
        return <RedirectToGeneral tribeID={tribeID} />;
      default:
        return <Head title="Home" />;
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
      <Head title="Sapien" />
      <TribePage tribeID={tribeID as string} viewID={viewID as string} />
    </>
  );
};

export default TribePageProxy;
