// components
import TribeBar from './TribeBar';

const Sidebar = () => {
  return (
    <nav aria-label="Main navigation" style={{ gridArea: 'sidebar' }}>
      <TribeBar />
    </nav>
  );
};

export default Sidebar;
