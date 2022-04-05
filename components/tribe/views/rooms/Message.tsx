import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

// helpers
import { formatDateRelative } from 'utils/date';

// types
import type { ISOString } from 'tools/types/common';

interface Message {
  authorID: string;
  id: string;
  avatarUrl: string;
  createdAt: ISOString;
  displayName: string;
  message: string;
}
interface Props {
  isAContinuosMessage: boolean;
  message: Message;
}

const Message = ({
  isAContinuosMessage,
  message: { avatarUrl, createdAt, displayName, message },
}: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="py-2 hover:bg-gray-800 rounded-md px-6 flex justify-between items-start group">
      <div className="flex space-x-3">
        {isAContinuosMessage && (
          <img className="h-10 w-10 rounded-full" src={avatarUrl} alt="" />
        )}
        <div className="flex-1 space-y-1">
          {isAContinuosMessage && (
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">{displayName}</h3>
              <p className="text-xs text-gray-500">
                {formatDateRelative(createdAt)}
              </p>
            </div>
          )}
          <p
            className={
              isAContinuosMessage
                ? 'text-sm text-gray-500'
                : 'pl-[52px] text-sm text-gray-500'
            }
          >
            {message}
          </p>
        </div>
      </div>
      <Menu as="div" className="relative hidden group-hover:block -right-4 w-12">
        <Menu.Button className="inline-flex absolute justify-center w-full text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <DotsVerticalIcon className='w-5 text-gray-400'/>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 right-0 w-56 -top-3 origin-top-right bg-black divide-y divide-gray-800 rounded-md shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-sapien-80 text-white' : 'text-gray-400'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <PencilAltIcon className='w-5 mr-2' />
                    Edit
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-sapien-80 text-white' : 'text-gray-400'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <TrashIcon className='w-5 mr-2' />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Message;
