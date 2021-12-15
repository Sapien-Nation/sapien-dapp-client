import { useRouter } from 'next/router';

// constants
import { View } from 'constants/tribe';

// components
import { Query, Redirect } from 'components/common';
import { ChannelView, MainSquareView, SquareView } from 'components/tribe';

// hooks
import { useGetCurrentView, useIsValidView } from 'hooks/tribe';

// types
import type { NextPage } from 'next';
import type { MainSquare, Square } from 'tools/types/square';

interface Props {
  tribeID: string;
  viewID: string;
}

const TribePage = ({ tribeID, viewID }: Props) => {
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
          <Query api={`/api/v3/mainsquare/${viewID}`}>
            {(square: MainSquare) => <MainSquareView square={square} />}
          </Query>
        );
    }
  };

  return <>{renderView()}</>;
};

const TribePageProxy: NextPage = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const isValidView = useIsValidView(tribeID as string, viewID as string);

  if (isValidView === false) return <Redirect path="/" />;

  return <TribePage tribeID={tribeID as string} viewID={viewID as string} />;
};

export default TribePageProxy;
