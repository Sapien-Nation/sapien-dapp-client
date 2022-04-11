import { DocumentDuplicateIcon } from '@heroicons/react/outline';
import { useCopyToClipboard } from 'react-use';
import { useRouter } from 'next/router';

// components
import DefaultCover from './DefaultCover';

// constants
import { ToastType } from 'constants/toast';

// hooks
import { useToast } from 'context/toast';

// types
import type { MainFeedTribe } from 'tools/types/tribe';

interface Props {
  tribe: MainFeedTribe;
}

const MainChannelHeader = ({ tribe }: Props) => {
  const toast = useToast();
  const { query } = useRouter();
  const { tribeID } = query;
  const [_, copyToClipboard] = useCopyToClipboard();

  const handleCopyToClipboard = () => {
    copyToClipboard(`${window?.location.origin}/join/${tribeID}`);
    toast({
      message: 'Copied to clipboard',
      type: ToastType.Success,
    });
  };

  return (
    <div className="bg-sapien-neutral-600 p-3 pb-6 rounded-xl mb-4">
      {tribe.cover ? (
        <div className="shadow-md rounded-lg relative w-full h-56">
          {/* @ts-ignore */}
          <img
            alt={tribe.name}
            src={tribe.cover}
            className="object-fill w-full h-full rounded-lg"
          />
        </div>
      ) : (
        <DefaultCover />
      )}
      <div className="flex flex-col md:flex-row">
        <div className="relative">
          {tribe.avatar ? (
            <img
              className="w-40 h-40 mr-auto ml-auto sm:mr-0 sm:ml-8 -mt-16 rounded-xl flex-shrink-0"
              src={tribe.avatar}
              alt=""
            />
          ) : (
            <div className="w-40 h-40 mr-auto ml-auto sm:mr-0 sm:ml-8 -mt-16 rounded-xl flex-shrink-0 bg-gradient-to-b from-purple-700 via-purple-300 to-purple-500  shadow shadow-sapien-neutral-600" />
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-center mt-3 items-center sm:justify-between w-full">
          <div className="flex flex-col justify-center sm:ml-12">
            <h1 className="text-xl text-center sm:text-left">{tribe.name}</h1>
            <h2 className="text-gray-500 mb-4 sm:mb-0">{tribe.membersCount} members</h2>
          </div>
          <div className="flex items-center sm:mr-5">
            <button
              onClick={handleCopyToClipboard}
              type="button"
              className="relative inline-flex items-center px-4 py-2 rounded-l-md border-0 bg-primary-200 font-medium focus:outline-none"
            >
              Invite
            </button>
            <button
              onClick={handleCopyToClipboard}
              type="button"
              className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border-l bg-primary-200 font-medium focus:outline-none mr-3"
            >
              <DocumentDuplicateIcon className="w-6" />
            </button>
          </div>
        </div>
      </div>
      {tribe.description && (
        <p className="ml-8 mt-8 text-gray-500">{tribe.description}</p>
      )}
    </div>
  );
};

export default MainChannelHeader;
