const DiscoveryNavigation = () => {
  return (
    <div className="w-full">
      <div>
        <span className="px-4 py-2 mt-4 text-xs w-full flex justify-between items-center uppercase text-sapien-neutral-200 font-bold">
          Popular Topics
        </span>
        <nav className="mt-2">
          <span
            className={
              'h-10 relative w-full cursor-pointer tracking-wide items-center font-bold uppercase text-xs flex rounded-lg focus:outline-none px-2 py-2 bg-sapien-neutral-800 hover:bg-sapien-neutral-800'
            }
          >
            All Topics
          </span>
        </nav>
      </div>
    </div>
  );
};

export default DiscoveryNavigation;
