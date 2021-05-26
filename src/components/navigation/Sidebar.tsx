// components
import TribeBar from './TribeBar';
import TribeNavigation from './TribeNavigation';

const Sidebar = () => {
  return (
    <nav aria-label="Main navigation" style={{ gridArea: 'sidebar' }}>
      <TribeBar />
      <TribeNavigation />
    </nav>
  );
};

export default Sidebar;
