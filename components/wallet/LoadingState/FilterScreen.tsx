import { tw } from 'twind';

const FilterScreen = () => {
  return (
    <div className={tw`flex w-full h-96 absolute`}>
      <div className={tw`flex animate-pulse w-full px-5 py-1`}>
        <div className={tw`w-12 bg-gray-300 h-12 rounded-full `}></div>
        <div className={tw`flex flex-col space-y-3`}>
          <div className={tw`w-36 bg-gray-300 h-6 rounded-md `}></div>
          <div className={tw`w-24 bg-gray-300 h-6 rounded-md `}></div>
        </div>
      </div>
    </div>
  );
};

export default FilterScreen;
