import _isEmpty from 'lodash/isEmpty';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// constants
import { View } from 'constants/tribe';

// components
import { SEO, ErrorView, NotFound, Query } from 'components/common';
import {
  BadgesView,
  Channel,
  ContentView,
  MainChannel,
  RoomView,
  UpgradeView,
} from 'components/tribe';
const PassportView = dynamic(() =>
  import('components/tribe').then((views) => views.PassportView)
);

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
      case View.Badges:
        return <BadgesView />;
      case View.Passport:
        return <PassportView />;
      case View.Content:
        return <ContentView />;
      case View.Room: {
        return (
          <Query api={`/core-api/room/${viewID}`} ignoreError loader={null}>
            {({ message, name }) => (
              <RoomView isMember={Boolean(message) === false} name={name} />
            )}
          </Query>
        );
      }
      case View.Channel:
        return <Channel />;
      case View.MainChannel:
        return <MainChannel />;
      case View.Upgrade:
        return <UpgradeView />;
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
      <SEO title="Sapien" />
      <TribePage tribeID={tribeID as string} viewID={viewID as string} />
    </>
  );
};

export default TribePageProxy;
