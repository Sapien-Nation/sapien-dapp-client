const FilterScreen = () => {
  return (
    <div className="flex w-full h-96 absolute">
      <div className="flex animate-pulse w-full px-5 py-1">
        <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
        <div className="flex flex-col space-y-3">
          <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
          <div className="w-24 bg-gray-300 h-6 rounded-md "></div>
        </div>
      </div>
    </div>
  );
};

export default FilterScreen;
