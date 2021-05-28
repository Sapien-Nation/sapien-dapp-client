// context
import { useAuth } from 'context/user';

// components
import TribeBar from './TribeBar';
import TribeNavigation from './TribeNavigation';

const Sidebar = () => {
  const { me } = useAuth();

  if (!me) return null;

  return (
    <nav aria-label="Main navigation" style={{ gridArea: 'sidebar' }}>
      <TribeBar />
      <TribeNavigation />
    </nav>
  );
};

export default Sidebar;
