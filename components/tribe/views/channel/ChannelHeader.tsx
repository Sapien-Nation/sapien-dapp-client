import { DocumentDuplicateIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useCopyToClipboard } from 'react-use';

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
          <img
            alt={channel.name}
            src={channel.cover}
            className="object-fill w-full h-full rounded-lg"
          />
        </div>
      ) : (
        <div className="bg-gradient-to-r bg-sapien-neutral-200 min-h-250 shadow-md rounded-lg relative flex justify-center items-center" />
      )}
      <div className="flex flex-col md:flex-row">
        <div className="relative">
          {channel.avatar ? (
            <img
              className="w-40 h-40 mr-auto ml-auto sm:mr-0 sm:ml-8 -mt-16 rounded-xl flex-shrink-0"
              src={channel.avatar}
              alt=""
            />
          ) : (
            <div className="w-40 h-40 mr-auto ml-auto sm:mr-0 sm:ml-8 -mt-16 rounded-xl flex-shrink-0 bg-sapien-neutral-200 shadow shadow-sapien-neutral-600 flex items-center justify-center font-extrabold text-xl">
              {channel.name[0].toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-center mt-3 items-center sm:justify-between w-full">
          <div className="flex flex-col justify-center sm:ml-12">
            <h1 className="text-xl text-center sm:text-left">{channel.name}</h1>
            <h2 className="text-gray-500 mb-4 sm:mb-0">
              {channel.membersCount} members
            </h2>
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
            <button
              onClick={handleWriteAnArticle}
              type="button"
              className="relative inline-flex items-center px-4 py-2 rounded-md border-0 bg-primary-200 font-medium focus:outline-none"
            >
              Write an Article
            </button>
          </div>
        </div>
      </div>
      {channel.description && (
        <p className="ml-8 mt-8 text-gray-500 whitespace-pre-line line-clamp-5">
          {channel.description}
        </p>
      )}
    </div>
  );
};

export default ChannelHeader;
