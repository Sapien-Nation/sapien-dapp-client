import { Transition } from '@headlessui/react';
import { RefreshIcon, TrashIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Linkify from 'linkify-react';

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

  const messageRef = useRef(null);

  const toast = useToast();
  const { me } = useAuth();
  const { push, query } = useRouter();

  const roomID = query.viewID as string;
  const tribeID = query.tribeID as string;
  const tribeRooms = useTribeRooms(tribeID);
  const roomMembers = useRoomMembers(roomID);
  const {
    sender: { id: messageOwnerID, avatar, username, badges },
    createdAt,
    content,
    type,
    mentions,
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

    return 'py-2 hover:bg-gray-800 px-10 -mx-5 flex justify-between items-start group relative';
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
      return <span>TODO handle UI for Optimistic Attachments</span>;

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
            {renderBody()}
          </div>
        </div>

        {/* Menus */}
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
