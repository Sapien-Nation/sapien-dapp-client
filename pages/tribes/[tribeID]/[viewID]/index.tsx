import { useRouter } from 'next/router';

// constants
import { View } from 'constants/tribe';

// components
import { ChannelView, MainSquareView, SquareView } from 'components/tribe';

// hooks
import { useGetCurrentView } from 'hooks/tribe';

// types
import type { NextPage } from 'next';

const TribePage: NextPage = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const view = useGetCurrentView(tribeID as string, viewID as string);

  const renderView = () => {
    switch (view.type) {
      case View.Channel:
        return <ChannelView />;
      case View.Square:
        return <ChannelView />;
      case View.MainSquare:
        return <MainSquareView />;
    }
  };

  return <>{renderView()}</>;
};

export default TribePage;
