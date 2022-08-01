import { DocumentIcon, EmojiHappyIcon } from '@heroicons/react/outline';
import { Popover, Transition } from '@headlessui/react';
import { RefreshIcon, TrashIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, Fragment } from 'react';
import Linkify from 'linkify-react';
import { Picker } from 'emoji-mart';

// api
import { deleteMessage } from 'api/room';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// constants
import { MessageType } from 'tools/constants/rooms';
import MessageOwnerMenu from './MessageOwnerMenu';
import DeleteMessageDialog from '../dialogs/DeleteMessageDialog';

// hooks
import { useTribeRooms } from 'hooks/tribe';
import { useRoomMembers } from 'hooks/room';

// helpers
import { formatDateRelative } from 'utils/date';
import { renderContent } from '../helpers';

// types
import type { RoomMessage } from 'tools/types/room';

const isSameOriginURL = (url): URL | null => {
  if (typeof window === 'undefined') return null;

  const linkURL = new URL(url);

  if (window.location.origin === linkURL.origin) return linkURL;

  return null;
};

interface Props {
  addMessageManually: (content: string) => void;
  isAMessageContinuation: boolean;
  message: RoomMessage;
  removeMessageFromFeed: (messageID: string) => void;
}

enum Dialog {
  DeleteMessage,
}

const Message = ({
  addMessageManually,
  isAMessageContinuation,
  message,
  removeMessageFromFeed,
}: Props) => {
  const [dialog, setDialog] = useState(null);
  const [messageFocused, setMessageFocused] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const messageRef = useRef(null);

  const toast = useToast();
  const { me } = useAuth();
  const { push, query } = useRouter();

  const roomID = query.viewID as string;
  const tribeID = query.tribeID as string;
  const tribeRooms = useTribeRooms();
  const roomMembers = useRoomMembers(roomID);
  const {
    sender: { id: messageOwnerID, avatar, username, badges },
    createdAt,
    content,
    type,
    mentions,
    reactions,
  } = message;

  const isMeMention = content.search(new RegExp(`<@${me.id}>`, 'g')) >= 0;

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

  const getMessageClassName = () => {
    if (message.type === MessageType.OptimisticWithError) {
      return 'py-2 border-l-4 border-l-red-400 flex justify-between items-start group bg-red-500/50 px-10 -mx-5 relative';
    }

    if (messageFocused) {
      return 'py-2 bg-gray-800 hover:bg-gray-800 px-10 -mx-5 flex justify-between items-start group relative';
    }

    if (isMeMention) {
      return 'py-2 hover:bg-yellow-900/40 border-l-4 border-l-yellow-700 flex justify-between items-start group bg-yellow-900/25 px-10 -mx-5 relative';
    }

    return 'py-2 hover:bg-gray-800 px-10 -mx-5 flex justify-between items-start group relative overflow-hidden';
  };

  const handleRemoveFailedMessage = async () => {
    try {
      await removeMessageFromFeed(message.id);
    } catch (err) {
      toast({ message: err });
    }
  };

  const handleRetryFailedMessage = async () => {
    try {
      const messageContent = message.content;
      await removeMessageFromFeed(message.id);

      await addMessageManually(messageContent);
    } catch (err) {
      console.error({ message: err });
    }
  };

  const handleRemoveMessage = async () => {
    try {
      await removeMessageFromFeed(message.id);

      await deleteMessage(roomID, message.id);
    } catch (err) {
      toast({ message: err });
    }
  };

  const renderBody = () => {
    if (type === MessageType.OptimisticWithAttachment)
      return (
        <div
          className="h-16  bg-sapien-neutral-600 rounded flex items-center"
          style={{ width: 500 }}
        >
          <div className="px-4">
            <DocumentIcon className="w-12 h-12" />
          </div>
          <div>
            <p className="text-sm  animate-pulse">Uploading Files</p>
            <span className="text-xs text-gray-300">Wait a second...</span>
          </div>
        </div>
      );

    if (type === MessageType.OptimisticWithError) {
      return (
        <p
          className={
            isAMessageContinuation
              ? 'text-md text-white whitespace-pre-line break-words'
              : 'pl-52 text-md text-white whitespace-pre-line break-words'
          }
          style={{ wordBreak: 'break-word' }}
        >
          {renderContent(content, roomMembers, tribeRooms, tribeID)}
        </p>
      );
    }

    if (type === MessageType.Optimistic) {
      return (
        <p
          className={
            isAMessageContinuation
              ? 'text-md text-white/30 whitespace-pre-line break-words'
              : 'pl-52 text-md text-white/30 whitespace-pre-line break-words'
          }
          style={{ wordBreak: 'break-word' }}
        >
          {renderContent(content, roomMembers, tribeRooms, tribeID)}
        </p>
      );
    }

    return (
      <p
        className={
          isAMessageContinuation
            ? 'text-md text-white group whitespace-pre-line break-words'
            : 'pl-52 text-md text-white whitespace-pre-line break-words'
        }
        style={{ wordBreak: 'break-word' }}
      >
        <span className="text-[10px] hidden group-hover:block absolute left-6 text-gray-400 top-2">
          {isAMessageContinuation
            ? ''
            : new Date(createdAt).toLocaleString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
        </span>{' '}
        <Linkify
          tagName="p"
          options={{
            attributes: {
              onClick: (event) => {
                const url = isSameOriginURL(event.target.href);
                if (url) {
                  event.preventDefault();
                  event.stopPropagation();

                  push(url.pathname);
                }
              },
            },
            className: { url: 'underline text-blue-500' },
            target: (url) => {
              if (isSameOriginURL(url)) return '_parent';

              return '_target';
            },
          }}
        >
          {renderContent(
            content,
            mentions.length === 0 ? roomMembers : mentions,
            tribeRooms,
            tribeID
          )}
        </Linkify>
      </p>
    );
  };

  return (
    <>
      <Transition
        show
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as="li"
        data-testid="room-message"
        className={getMessageClassName()}
      >
        <div className="flex space-x-3" ref={messageRef}>
          {isAMessageContinuation && (
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
                  {username[0].toUpperCase()}
                </div>
              )}
            </>
          )}
          <div className="flex-1 space-y-1">
            {isAMessageContinuation && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold flex gap-2 items-center">
                    {username}{' '}
                    {badges.length > 0 && (
                      <img
                        src={badges[0].avatar}
                        alt="badge"
                        style={{ borderColor: badges[0].color }}
                        className="h-5 w-5 object-cover rounded-full border-2 hover:cursor-pointer"
                      />
                    )}
                  </h3>
                  <time
                    data-testid="message-timestamp"
                    className="text-xs text-white"
                  >
                    {formatDateRelative(createdAt)}
                  </time>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1 items-start">
              {renderBody()}
              <div className={isAMessageContinuation ? '' : 'ml-[50px]'}>
                {reactions?.map(({ count, emoji, me }) => (
                  <span
                    key={emoji.name}
                    className={`${
                      me
                        ? 'border border-sapien-60/50 bg-sapien-80/20'
                        : 'border border-gray-700 bg-gray-900'
                    } rounded-md py-0.5 px-1 cursor-pointer text-xs`}
                  >
                    {emoji.name} {count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Menus */}
        {/* <Popover
          className={`${
            isPickerOpen ? 'visible' : 'hidden group-hover:block'
          } absolute leading-[0] right-0 w-8 h-8 mr-8 top-0`}
          as="div"
        >
          {({ open }) => {
            setIsPickerOpen(open);

            return (
              <>
                <Popover.Button className="h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:text-yellow-400 focus:text-yellow-500">
                  <EmojiHappyIcon className="w-5" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 right-0 w-56 -top-1 origin-top-right bg-black divide-y divide-gray-800 rounded-md shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none">
                    <Picker
                      onSelect={(event) => {
                        // reactToMessage(roomID, message.id, event.id)
                        setMessageFocused(false);
                      }}
                      perLine={6}
                      style={{
                        width: '430px',
                        position: 'absolute',
                        marginLeft: -240,
                      }}
                      theme="dark"
                      disableAutoFocus={true}
                      groupNames={{ smileys_people: 'PEOPLE' }}
                      native
                      showPreview={false}
                      title=""
                    />
                  </Popover.Panel>
                </Transition>
              </>
            );
          }}
        </Popover> */}

        {type === MessageType.OptimisticWithError && (
          <div className="flex gap-2">
            <button onClick={handleRetryFailedMessage}>
              <RefreshIcon className="w-5 text-white" />
            </button>
            <button onClick={handleRemoveFailedMessage}>
              <TrashIcon className="w-5 text-white" />
            </button>
          </div>
        )}

        {messageOwnerID === me.id && type !== MessageType.OptimisticWithError && (
          <MessageOwnerMenu
            isFocused={messageFocused}
            setIsFocused={setMessageFocused}
            onMenuItemClick={(type) => {
              if (type === 'delete') {
                setDialog(Dialog.DeleteMessage);
              }
            }}
          />
        )}
      </Transition>
      {/* Modals */}
      {dialog === Dialog.DeleteMessage && (
        <DeleteMessageDialog
          onClose={() => {
            setDialog(null);
          }}
          onDelete={() => {
            setDialog(null);

            setTimeout(() => {
              handleRemoveMessage();
            }, 500);
          }}
          message={message}
        />
      )}
    </>
  );
};

export default Message;
