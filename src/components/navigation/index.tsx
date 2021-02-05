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

const Navbar: React.FC = () => {
  const [showCreateTribeModal, setShowCreateTribeModal] = useState(false);

  return (
    <Query apiUrl="get-tribes-todo" fetcher={() => Promise.resolve(mockTribes())}>
      {(tribes: Array<Tribe>) => (
        <>
          <TribeBar
            tribes={tribes}
            setShowCreateTribeModal={setShowCreateTribeModal}
          />
          <TribeNavigation />
          {showCreateTribeModal && (
            <CreateTribeModal onClose={() => setShowCreateTribeModal(false)} />
          )}
        </>
      )}
    </Query>
  );
};

export default Navbar;
