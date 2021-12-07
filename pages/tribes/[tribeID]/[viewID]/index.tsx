import { useRouter } from 'next/router';

// constants
import { View } from 'constants/tribe';

// components
import { Query } from 'components/common';
import { ChannelView, MainSquareView, SquareView } from 'components/tribe';

// hooks
import { useGetCurrentView } from 'hooks/tribe';

// types
import type { NextPage } from 'next';
import type { Square } from 'tools/types/square';

const TribePage: NextPage = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const view = useGetCurrentView(tribeID as string, viewID as string);

  const renderView = () => {
    switch (view.type) {
      case View.Channel:
        return <ChannelView />;
      case View.Square:
        return (
          <Query api={`/api/v3/tribe/${tribeID}/square/${viewID}`}>
            {(square: Square) => <SquareView square={square} />}
          </Query>
        );
      case View.MainSquare:
        return (
          <Query api={`/api/v3/tribe/${tribeID}/square/${viewID}`}>
            {(square: Square) => <MainSquareView square={square} />}
          </Query>
        );
    }
  };

  return <>{renderView()}</>;
};

export default TribePage;
