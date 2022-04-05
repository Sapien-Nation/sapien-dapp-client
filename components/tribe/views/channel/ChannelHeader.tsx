import { DocumentDuplicateIcon } from '@heroicons/react/outline';

// components
import DefaultCover from './DefaultCover';

// types
import type { Channel } from 'tools/types/channel';

interface Props {
  channel: Channel;
}

const ChannelHeader = ({ channel }: Props) => {
  return (
    <div className="bg-sapien-neutral-600 p-3 rounded-xl mb-4">
      {channel.cover ? (
        <div className="shadow-md rounded-lg relative w-full h-56">
          {/* @ts-ignore */}
          <img
            alt={channel.name}
            src={channel.cover}
            className="object-fill w-full h-full"
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
            <div className="w-40 h-40 ml-8 -mt-16 rounded-xl flex-shrink-0 bg-sapien-neutral-200 shadow shadow-sapien-neutral-600" />
          )}
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col justify-center ml-12">
            <h1 className="text-xl">{channel.name}</h1>
            <h2 className="text-gray-500">3000 members</h2>
          </div>
          <div className="flex items-center mr-5">
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 rounded-l-md border-0 bg-primary-200 font-medium focus:outline-none"
            >
              Invite
            </button>
            <button
              type="button"
              className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border-l bg-primary-200 font-medium focus:outline-none mr-3"
            >
              <DocumentDuplicateIcon className="w-6" />
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border-0 px-4 py-2 text-base font-medium bg-primary-200"
            >
              Follow
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
