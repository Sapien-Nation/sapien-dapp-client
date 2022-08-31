import _isEmpty from 'lodash/isEmpty';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';

// constants
import { View } from 'constants/tribe';
import { Role } from 'tools/constants/tribe';

// components
import { ErrorView, NotFound, Query } from 'components/common';
import {
  BadgesView,
  Channel,
  ChannelHeaderPlaceholder,
  ContentView,
  MainChannel,
  RoomView,
  UpgradeView,
  ThreadRoomView,
} from 'components/tribe';

// hooks
import { useGetCurrentView, useTribe } from 'hooks/tribe';

// providers
import { Web3Provider } from 'wallet/providers';
import ThreadRoomProxy from 'components/tribe/views/rooms/thread';

const TribePage = () => {
  const { query } = useRouter();

  const viewID = query.viewID as string;
  const tribeID = query.tribeID as string;

  const view = useGetCurrentView();

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
            {() => (
              <Query api={`/core-api/tribe/${tribeID}/members`}>
                {() => <BadgesView />}
              </Query>
            )}
          </Query>
        );
      }
      case View.Content:
        return <ContentView />;
      case View.Room: {
        if (query.thread) {
          return (
            <Query
              api={`/core-api/room/${query.thread}`}
              ignoreError
              loader={null}
            >
              {({ private: isPrivate, name }) => (
                <ThreadRoomView
                  isPrivate={isPrivate}
                  name={name}
                  isMember={true}
                  threadID={query.thread as string}
                />
              )}
            </Query>
          );
        }

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
        return (
          <Query
            api={`/core-api/channel/${viewID}`}
            loader={<ChannelHeaderPlaceholder />}
          >
            {() => <Channel />}
          </Query>
        );
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
                  {() => (
                    <div className="overflow-auto">
                      <UpgradeView />
                    </div>
                  )}
                </Query>
              </Web3Provider>
            )}
          </Query>
        );
      }
      case View.NotFound:
        return <NotFound message="You don't have access to see this content" />;
      default:
        return <NotFound message="You don't have access to see this content" />;
    }
  };

  return (
    <ErrorBoundary FallbackComponent={() => <ErrorView />}>
      {renderView()}
    </ErrorBoundary>
  );
};

export default TribePage;
