// context
import { useAuth } from 'context/user';

// components
import TribeBar from './TribeBar';

const Sidebar = () => {
  const { me } = useAuth();

  if (!me) return null;

  return (
    <nav aria-label="Main navigation" style={{ gridArea: 'sidebar' }}>
      <TribeBar />
    </nav>
  );
};

export default Sidebar;
