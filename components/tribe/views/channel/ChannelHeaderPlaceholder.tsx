// components
import DefaultCover from './DefaultCover';

const ChannelHeaderPlaceholder = () => {
  return (
    <div className="bg-sapien-neutral-600 p-3 rounded-xl mb-4">
      <DefaultCover />
      <div className="relative">
        <div className="w-40 h-40 ml-8 -mt-16 rounded-xl flex-shrink-0 bg-sapien-neutral-200 shadow shadow-sapien-neutral-600" />

        <div className="flex justify-between w-full">
          <div className="flex flex-col justify-center ml-5">
            <h1 className="text-xl">...</h1>
            <h2 className="text-gray-500"></h2>
          </div>
        </div>
      </div>
      <p className="ml-8 mt-8 text-gray-500">...</p>
    </div>
  );
};

export default ChannelHeaderPlaceholder;
