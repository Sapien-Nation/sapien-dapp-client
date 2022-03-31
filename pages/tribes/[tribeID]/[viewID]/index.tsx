import _isEmpty from 'lodash/isEmpty';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';

// constants
import { View } from 'constants/tribe';

// components
import { Head, ErrorView, NotFound } from 'components/common';
import { Channel, ContentView, MainChannel, RoomView } from 'components/tribe';

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
      case View.Content:
        return <ContentView />;
      case View.Room:
        return <RoomView />;
      case View.Channel:
        return <Channel />;
      case View.MainChannel:
        return <MainChannel />;
      case View.NotFound:
        return <NotFound message="You dont have access to see this content" />;
      default:
        return <NotFound message="You dont have access to see this content" />;
    }
  };

  return (
    <ErrorBoundary FallbackComponent={() => <ErrorView />}>
      {renderView()}
    </ErrorBoundary>
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
