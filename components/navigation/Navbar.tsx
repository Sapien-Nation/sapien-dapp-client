import { tw } from 'twind';
import { Search } from 'components/common';

const Navbar = () => {
  return (
    <div className={tw`bg-white shadow`}>
      <div
        className={tw`flex-1 flex items-center justify-center lg:justify-end h-16 px-2 sm:px-4 lg:px-8`}
      >
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
