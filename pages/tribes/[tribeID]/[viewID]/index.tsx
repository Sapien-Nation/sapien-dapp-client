import { useRouter } from 'next/router';

// api
import { notificationInstance } from 'api';

// constants
import { View } from 'constants/tribe';

// components
import { Query, Redirect } from 'components/common';
import {
  ChannelView,
  MainSquareView,
  NotificationView,
  SquareView,
} from 'components/tribe';

// hooks
import { useGetCurrentView, useIsValidView } from 'hooks/tribe';

// types
import type { NextPage } from 'next';
import type { MainSquare, Square } from 'tools/types/square';

interface Props {
  tribeID: string;
  viewID: string;
  isNotificationsView: boolean;
}

const TribePage = ({ tribeID, viewID, isNotificationsView }: Props) => {
  const view = useGetCurrentView(tribeID as string, viewID as string);

  const renderView = () => {
    if (isNotificationsView)
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

    switch (view.type) {
      case View.Channel:
        return <ChannelView />;
      case View.MainSquare:
        return (
          <Query api={`/api/v3/mainsquare/${viewID}`}>
            {(square: MainSquare) => <MainSquareView square={square} />}
          </Query>
        );
      case View.Square:
        return (
          <Query api={`/api/v3/tribe/${tribeID}/square/${viewID}`}>
            {(square: Square) => <SquareView square={square} />}
          </Query>
        );
    }
  };

  return <>{renderView()}</>;
};

const TribePageProxy: NextPage = () => {
  const { asPath, query } = useRouter();
  const { tribeID, viewID } = query;

  const isValidView = useIsValidView(tribeID as string, viewID as string);
  const isNotificationsView = asPath === `/tribes/${tribeID}/notifications`;

  if (isValidView === false && isNotificationsView === false)
    return <Redirect path="/" />;

  return (
    <TribePage
      tribeID={tribeID as string}
      viewID={viewID as string}
      isNotificationsView={isNotificationsView}
    />
  );
};

export default TribePageProxy;
