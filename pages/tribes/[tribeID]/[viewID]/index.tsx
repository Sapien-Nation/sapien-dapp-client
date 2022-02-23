import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';

// api
import { notificationInstance } from 'api';

// constants
import { View } from 'constants/tribe';

// components
import { ErrorView, Query, Redirect } from 'components/common';
import {
  ChannelView,
  FavoritesView,
  HomeFeedView,
  NotificationView,
} from 'components/tribe';

// hooks
import { useGetCurrentView, useIsValidView } from 'hooks/tribe';

// types
import type { NextPage } from 'next';
import type { Channel } from 'tools/types/channel';
import type { MainFeedTribe } from 'tools/types/tribe';

interface Props {
  tribeID: string;
  viewID: string;
  isNotificationsView: boolean;
  isFavoritesView: boolean;
}

const TribePage = ({
  tribeID,
  viewID,
  isNotificationsView,
  isFavoritesView,
}: Props) => {
  const view = useGetCurrentView(tribeID as string, viewID as string);

  const renderView = () => {
    if (isFavoritesView) {
      return <FavoritesView />;
    }

    if (isNotificationsView) {
      return (
        <Query
          api="/api/v3/notification/all"
          loader={null}
          options={{
            fetcher: async (url) =>
              notificationInstance.get(url).then((res) => res.data),
          }}
        >
          {() => <NotificationView tribeID={tribeID as string} />}
        </Query>
      );
    }

    switch (view.type) {
      case View.Room:
        return <h1>TODO Room</h1>;
      case View.Channel:
        return (
          <Query api={`/api/v3/channel/${viewID}`}>
            {(channel: Channel) => (
              <ChannelView channel={channel} channelID={viewID} />
            )}
          </Query>
        );
      case View.HomeFeed:
        return (
          <Query api={`/api/v3/tribe/${tribeID}`}>
            {(tribe: MainFeedTribe) => <HomeFeedView tribe={tribe} />}
          </Query>
        );
    }
  };

  // TODO ErrorBoundaries
  return (
    <ErrorBoundary FallbackComponent={ErrorView}>{renderView()}</ErrorBoundary>
  );
};

const TribePageProxy: NextPage = (props) => {
  const { asPath, query } = useRouter();
  const { tribeID, viewID } = query;

  const isValidView = useIsValidView(tribeID as string, viewID as string);

  // NOTE
  // I don't like this, but due POC, we will check this 2 routes manually, it might just grow to n = 3
  const isNotificationsView = asPath === `/tribes/${tribeID}/notifications`;
  const isFavoritesView = asPath === `/tribes/${tribeID}/favorites`;

  if (
    isValidView === false &&
    isNotificationsView === false &&
    isFavoritesView === false
  )
    return <Redirect path="/" />;

  return (
    <TribePage
      tribeID={tribeID as string}
      viewID={viewID as string}
      isNotificationsView={isNotificationsView}
      isFavoritesView={isFavoritesView}
    />
  );
};

export default TribePageProxy;
