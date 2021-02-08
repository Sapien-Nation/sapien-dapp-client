import { useState } from 'react';

// types
import type { Tribe } from 'types/tribe';

// components
import { CreateTribeModal } from 'components/tribe/modals';
import TribeBar from 'components/navigation/TribeBar';
import TribeNavigation from 'components/navigation/TribeNavigation';
import Query from 'components/query';

export enum Dialog {
  CreateTribe,
  DiscoverTribes
}

const Navbar: React.FC = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  return (
    <Query apiUrl="api/tribes">
      {({ tribes }: { tribes: Array<Tribe> }) => (
        <>
          <TribeBar
            setShowCreateTribeModal={() => setDialog(Dialog.CreateTribe)}
            tribes={tribes}
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
