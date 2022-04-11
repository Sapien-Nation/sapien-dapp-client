import { DocumentDuplicateIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useCopyToClipboard } from 'react-use';

// components
import DefaultCover from './DefaultCover';

// constants
import { ToastType } from 'constants/toast';

// hooks
import { useToast } from 'context/toast';

// types
import type { Channel } from 'tools/types/channel';

interface Props {
  channel: Channel;
  handleWriteAnArticle: () => void;
}

const ChannelHeader = ({ channel, handleWriteAnArticle }: Props) => {
  const toast = useToast();
  const { query } = useRouter();
  const [_, copyToClipboard] = useCopyToClipboard();

  const { tribeID } = query;

  const handleCopyToClipboard = () => {
    copyToClipboard(`${window?.location.origin}/join/${tribeID}`);
    toast({
      message: 'Copied to clipboard',
      type: ToastType.Success,
    });
  };

  return (
    <div className="bg-sapien-neutral-600 p-3 rounded-xl mb-4">
      {channel.cover ? (
        <div className="shadow-md rounded-lg relative w-full h-56">
          {/* @ts-ignore */}
          <img
            alt={channel.name}
            src={channel.cover}
            className="object-fill w-full h-full rounded-lg"
          />
        </div>
      ) : (
        <DefaultCover />
      )}
      <div className="flex">
        <div className="relative">
          {channel.avatar ? (
            <img
              className="w-40 h-40 ml-8 -mt-16 rounded-xl flex-shrink-0"
              src={channel.avatar}
              alt=""
            />
          ) : (
            <div className="w-40 h-40 ml-8 -mt-16 rounded-xl flex-shrink-0 bg-gradient-to-r from-purple-200 via-purple-100 to-purple-700 shadow shadow-sapien-neutral-600" />
          )}
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col justify-center ml-12">
            <h1 className="text-xl">{channel.name}</h1>
            <h2 className="text-gray-500">3000 members</h2>
          </div>
          <div className="flex items-center mr-5">
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
            <button
              onClick={handleWriteAnArticle}
              type="button"
              className="relative inline-flex items-center px-4 py-2 rounded-l-md border-0 bg-primary-200 font-medium focus:outline-none"
            >
              Write an Article
            </button>
          </div>
        </div>
      </div>
      {channel.description && (
        <p className="ml-8 mt-8 text-gray-500">{channel.description}</p>
      )}
    </div>
  );
};

export default ChannelHeader;
