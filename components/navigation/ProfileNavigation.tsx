const DiscoveryNavigation = () => {
  return (
    <div className="w-full">
      <div>
        <span className="px-4 py-2 mt-4 text-xs w-full flex justify-between items-center uppercase text-sapien-neutral-200 font-bold">
          Profile Settings
        </span>
        <nav className="mt-2">
          <span
            className={
              'relative w-full cursor-pointer tracking-wide items-center font-bold uppercase font-medium text-xs flex rounded-lg focus:outline-none px-4 py-2 bg-primary-200'
            }
          >
            General
          </span>
        </nav>
      </div>
    </div>
  );
};

export default DiscoveryNavigation;
