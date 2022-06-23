import _isEmpty from 'lodash/isEmpty';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// constants
import { View } from 'constants/tribe';
import { Role } from 'tools/constants/tribe';

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

// hooks
import { useGetCurrentView, useTribe } from 'hooks/tribe';

// providers
import { Web3Provider } from 'wallet/providers';

// types
import type { NextPage } from 'next';

interface Props {
  tribeID: string;
  viewID: string;
}

const TribePage = ({ tribeID, viewID }: Props) => {
  const view = useGetCurrentView(tribeID as string, viewID as string);

  const { role } = useTribe(tribeID as string);

  const renderView = () => {
    switch (view.type) {
      case View.Badges: {
        const isTribeOwnerOrTribeAdmin =
          role === Role.Owner || role === Role.Admin;
        if (isTribeOwnerOrTribeAdmin === false) {
          return (
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
                  alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
              </div>
              <div className="px-4 py-4 flex flex-col gap-4 absolute justify-center items-center w-full text-center h-full">
                <p>You don&apos;t have access to see this view </p>
              </div>
            </div>
          );
        }

        return (
          <Query api={`/core-api/tribe/${tribeID}/badges`} loader={null}>
            {() => <BadgesView />}
          </Query>
        );
      }
      case View.Content:
        return <ContentView />;
      case View.Room: {
        return (
          <Query api={`/core-api/room/${viewID}`} ignoreError loader={null}>
            {({ message, name }) => (
              <RoomView
                isMember={Boolean(message) === false}
                name={name}
                roomID={viewID}
                tribeID={tribeID}
              />
            )}
          </Query>
        );
      }
      case View.Channel:
        return <Channel />;
      case View.MainChannel:
        return <MainChannel />;
      case View.Upgrade: {
        const isTribeOwnerOrTribeAdmin =
          role === Role.Owner || role === Role.Admin;
        if (isTribeOwnerOrTribeAdmin === false) {
          return (
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
                  alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
              </div>
              <div className="px-4 py-4 flex flex-col gap-4 absolute justify-center items-center w-full text-center h-full">
                <p>You don&apos;t have access to see this view </p>
              </div>
            </div>
          );
        }

        return (
          <Query api={`/core-api/tribe/${tribeID}/members`} loader={null}>
            {() => (
              <Web3Provider>
                <Query
                  api={`/core-api/tribe/${tribeID}/upgrade-status`}
                  loader={null}
                >
                  {() => <UpgradeView />}
                </Query>
              </Web3Provider>
            )}
          </Query>
        );
      }
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
