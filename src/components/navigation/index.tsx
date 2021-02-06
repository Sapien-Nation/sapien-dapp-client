import { useState } from 'react';

// types
import type { Tribe } from 'types/tribe';

// components
import CreateTribeModal from 'components/tribe/CreateTribeModal';
import TribeBar from 'components/navigation/TribeBar';
import TribeNavigation from 'components/navigation/TribeNavigation';
import Query from 'components/query';

// mocks
import { mockTribes } from 'mocks/tribe';

export enum Dialog {
  CreateTribe,
  DiscoverTribes
}

const Navbar: React.FC = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  return (
    <Query apiUrl="get-tribes-todo" fetcher={() => Promise.resolve(mockTribes())}>
      {(tribes: Array<Tribe>) => (
        <>
          <TribeBar
            tribes={tribes}
            setShowCreateTribeModal={() => setDialog(Dialog.CreateTribe)}
          />
          <TribeNavigation />
          {dialog === Dialog.CreateTribe && (
            <CreateTribeModal onClose={() => setDialog(null)} />
          )}
        </>
      )}
    </Query>
  );
};

export default Navbar;
