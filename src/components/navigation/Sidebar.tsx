import { useRouter } from 'next/router';

// context
import { useAuth } from 'context/user';

// components
import TribeBar from './TribeBar';
import DiscoveryNavigation from './DiscoveryNavigation';
import TribeNavigation from './TribeNavigation';

const Sidebar = () => {
  const { me } = useAuth();
  const { asPath } = useRouter();

  if (!me) return null;

  const showDiscoveryBar = asPath.includes('discovery');
  return (
    <nav aria-label="Main navigation" style={{ gridArea: 'sidebar' }}>
      <TribeBar />
      {showDiscoveryBar && <DiscoveryNavigation />}
      {showDiscoveryBar === false && <TribeNavigation />}
    </nav>
  );
};

export default Sidebar;
