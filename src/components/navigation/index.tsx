import { useState } from 'react';

// components
import TribeBar from 'components/navigation/TribeBar';
import TribeNavigation from 'components/navigation/TribeNavigation';
import CreateTribeModal from 'components/tribe/CreateTribeModal';

// mocks
import { mockTribes } from 'mocks/tribe';

const Navbar: React.FC = () => {
  const [showCreateTribeModal, setShowCreateTribeModal] = useState(false);

  return (
    <>
      <TribeBar
        tribes={mockTribes()}
        setShowCreateTribeModal={setShowCreateTribeModal}
      />
      <TribeNavigation />
      {showCreateTribeModal && (
        <CreateTribeModal onClose={() => setShowCreateTribeModal(false)} />
      )}
    </>
  );
};

export default Navbar;
