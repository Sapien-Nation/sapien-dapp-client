import { Menu, Transition } from '@headlessui/react';
import {
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { Fragment, useEffect, useState, useRef } from 'react';

// constants
import { MessageType } from 'tools/constants/rooms';

// helpers
import { formatDateRelative } from 'utils/date';

// types
import type { RoomMessage } from 'tools/types/room';

interface Props {
  isAContinuosMessage: boolean;
  message: RoomMessage;
}

const Message = ({
  isAContinuosMessage,
  message: {
    sender: { avatar, displayName },
    createdAt,
    content,
    type,
  },
}: Props) => {
  const [messageFocused, setMessageFocused] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setMessageFocused(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const renderBody = () => {
    if (type === MessageType.OptimisticWithAttachment)
      return <span>TODO handle UI for Optimistic Attachments</span>;

    if (type === MessageType.Optimistic) {
      return (
        <p
          className={
            isAContinuosMessage
              ? 'text-sm text-white/30'
              : 'pl-52 text-sm text-white/30'
          }
        >
          {content}
        </p>
      );
    }

    return (
      <p
        className={
          isAContinuosMessage
            ? 'text-sm text-white/80 group'
            : 'pl-52 text-sm text-white/80 group'
        }
      >
        <span className="text-[10px] hidden group-hover:block absolute left-12 text-gray-400">
          {!isAContinuosMessage
            ? new Date(createdAt).toLocaleString('en-US', {
                hour: 'numeric',
                hour12: true,
              })
            : ''}
        </span>{' '}
        {content}
      </p>
    );
  };
  return (
    <li
      data-testid="room-message"
      ref={messageRef}
      className={`py-2 ${
        messageFocused ? 'bg-gray-800' : ''
      } hover:bg-gray-800 rounded-md px-6 flex justify-between items-start group`}
    >
      <div className="flex space-x-3">
        {isAContinuosMessage && (
          <>
            {avatar ? (
              <img
                className="h-10 w-10 rounded-full"
                src={avatar}
                alt=""
                data-testid="message-avatar"
              />
            ) : (
              <div
                className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                data-testid="message-avatar"
              >
                {displayName[0].toUpperCase()}
              </div>
            )}
          </>
        )}
        <div className="flex-1 space-y-1">
          {isAContinuosMessage && (
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold">{displayName}</h3>
              <time
                data-testid="message-timestamp"
                className="text-xs text-white"
              >
                {formatDateRelative(createdAt)}
              </time>
            </div>
          )}
          {renderBody()}
        </div>
      </div>
      {/* <Menu
        as="div"
        className={`${
          messageFocused ? 'block' : 'hidden'
        } relative leading-[0] group-hover:block -right-4 w-12`}
      >
        <Menu.Button className="inline-flex justify-center w-full text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <DotsVerticalIcon
            onClick={() => {
              setMessageFocused(true);
            }}
            className="w-5 text-gray-400"
          />
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
                {({ active }) => {
                  return (
                    <button
                      className={
                        active
                          ? 'bg-gray-800 text-white group flex rounded items-center w-full px-2 py-2 text-sm'
                          : 'text-gray-400 group flex rounded items-center w-full px-2 py-2 text-sm'
                      }
                    >
                      <PencilAltIcon className="w-5 mr-2" />
                      Edit
                    </button>
                  );
                }}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={
                      active
                        ? 'bg-gray-800 text-white group flex rounded items-center w-full px-2 py-2 text-sm'
                        : 'text-gray-400 group flex rounded items-center w-full px-2 py-2 text-sm'
                    }
                  >
                    <TrashIcon className="w-5 mr-2" />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu> */}
    </li>
  );
};

export default Message;
