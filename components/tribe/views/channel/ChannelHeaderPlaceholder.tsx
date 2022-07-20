import { DocumentDuplicateIcon } from '@heroicons/react/outline';

const ChannelHeaderPlaceholder = () => {
  return (
    <div className="h-full flex flex-row bg-sapien-neutral-800">
      <div className="flex-1 lg:rounded-3xl p-5 overflow-y-auto">
        <div className="grid gap-4">
          <div className="bg-sapien-neutral-600 p-3 rounded-xl mb-4">
            <div className="bg-gradient-to-r bg-sapien-neutral-200 min-h-250 shadow-md rounded-lg relative flex justify-center items-center" />
            <div className="flex flex-col md:flex-row">
              <div className="relative">
                <div className="w-40 h-40 ml-8 -mt-16 rounded-xl flex-shrink-0 bg-sapien-neutral-200 shadow shadow-sapien-neutral-600 flex items-center justify-center font-bold text-xl"></div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center mt-3 items-center sm:justify-between w-full">
                <div className="flex flex-col justify-center sm:ml-12">
                  <h1 className="text-xl text-center sm:text-left animate-pulse">
                    ...
                  </h1>
                  <h2 className="text-gray-500 mb-4 sm:mb-0 animate-pulse">
                    loading members
                  </h2>
                </div>
                <div className="flex items-center sm:mr-5">
                  <button
                    onClick={() => {}}
                    disabled
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 rounded-l-md border-0 bg-primary-200 font-medium focus:outline-none animate-pulse"
                  >
                    ...
                  </button>
                  <button
                    onClick={() => {}}
                    disabled
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border-l bg-primary-200 font-medium focus:outline-none mr-3"
                  >
                    <DocumentDuplicateIcon className="w-6" />
                  </button>
                </div>
              </div>
            </div>
            <p className="ml-8 mt-8 text-gray-500 animate-pulse">...</p>
          </div>

          <div className="mt-4 min-h-400">
            <ul></ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelHeaderPlaceholder;
