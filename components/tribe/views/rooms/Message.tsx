import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Linkify from 'linkify-react';

// context
import { useAuth } from 'context/user';

// constants
import { MessageType } from 'tools/constants/rooms';
import MessageOwnerMenu from './MessageOwnerMenu';

// helpers
import { formatDateRelative } from 'utils/date';

// types
import type { RoomMessage } from 'tools/types/room';
import { Transition } from '@headlessui/react';
import { getUserIDFromNode, isNodeMention } from 'slatejs/utils';

interface Props {
  isAMessageContinuation: boolean;
  message: RoomMessage;
  onMenuItemClick: (type: 'delete' | 'edit') => void;
}

const isSameOriginURL = (url): URL | null => {
  if (typeof window === 'undefined') return null;

  const linkURL = new URL(url);

  if (window.location.origin === linkURL.origin) return linkURL;

  return null;
};

const Message = ({
  isAMessageContinuation,
  message: {
    sender: { id: messageOwnerID, avatar, username },
    createdAt,
    content,
    type,
    mentions,
  },
  onMenuItemClick,
}: Props) => {
  const [messageFocused, setMessageFocused] = useState(false);

  const { me } = useAuth();
  const { push } = useRouter();
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

  const renderContent = () => {
    return content.split(' ').map((node) => {
      if (isNodeMention(node)) {
        const userID = getUserIDFromNode(node);
        const user = mentions?.find(({ id }) => id === userID);
        if (user) {
          return (
            <>
              {' '}
              <span className="p-1 mx-1 align-baseline inline-block rounded bg-gray-700 text-gray-300 text-xs">
                @{user.username}
              </span>{' '}
            </>
          );
        }
        return ` ${node} `;
      }
      return ` ${node} `;
    });
  };

  const renderBody = () => {
    if (type === MessageType.OptimisticWithAttachment)
      return <span>TODO handle UI for Optimistic Attachments</span>;

    if (type === MessageType.Optimistic) {
      return (
        <p
          className={
            isAMessageContinuation
              ? 'text-sm text-white/30 whitespace-pre-line'
              : 'pl-52 text-sm text-white/30 whitespace-pre-line'
          }
        >
          {renderContent()}
        </p>
      );
    }

    return (
      <p
        className={
          isAMessageContinuation
            ? 'text-sm text-white/80 group whitespace-pre-line break-all'
            : 'pl-52 text-sm text-white/80 whitespace-pre-line break-all'
        }
      >
        <span className="text-[10px] hidden group-hover:block absolute left-12 text-gray-400">
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
          {renderContent()}
        </Linkify>
      </p>
    );
  };
  return (
    <Transition
      show
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      as="li"
      data-testid="room-message"
      className={
        messageFocused
          ? 'py-2 bg-gray-800 hover:bg-gray-800 rounded-md px-6 flex justify-between items-start group'
          : 'py-2 hover:bg-gray-800 rounded-md px-6 flex justify-between items-start group'
      }
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
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold">{username}</h3>
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

      {/* Menus */}
      {messageOwnerID === me.id && (
        <MessageOwnerMenu
          isFocused={messageFocused}
          setIsFocused={setMessageFocused}
          onMenuItemClick={onMenuItemClick}
        />
      )}
    </Transition>
  );
};

export default Message;
