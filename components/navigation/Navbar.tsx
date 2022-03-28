// components
import { Search } from 'components/common';

// context
import { useAuth } from 'context/user';

const Navbar = () => {
  return (
    <div className="shadow">
      <div className="flex-1 flex items-center justify-center lg:justify-end h-16 px-2 sm:px-4 lg:px-8">
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
