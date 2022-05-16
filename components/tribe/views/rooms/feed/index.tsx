import { DotsHorizontalIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import _isEmpty from 'lodash/isEmpty';
import _groupBy from 'lodash/groupBy';
import _sortyBy from 'lodash/sortBy';
import { nanoid } from 'nanoid';
import { useSWRConfig } from 'swr';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

// api
import { sendMessage, readRoom } from 'api/room';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// constants
import { MessageType, WSEvents } from 'tools/constants/rooms';

// components
import { RoomEditor } from 'slatejs';
import Details from './Details';
import Message from './Message';
import JoinARoomMessage from './JoinARoomMessage';

// helpers
import { formatDate } from 'utils/date';

// hooks
import useOnScreen from 'hooks/useOnScreen';
import { useTribeRooms } from 'hooks/tribe';
import { useSocketEvent } from 'hooks/socket';
import { useRoomMembers } from 'hooks/room';

// types
import type {
  RoomDeleteMessage,
  RoomMessage,
  RoomNewMessage,
} from 'tools/types/room';
import type { ProfileTribe } from 'tools/types/tribe';
import { getMentionsArrayFromCacheForOptimistic } from 'slatejs/utils';

interface Props {
  apiKey: string;
  data: Array<RoomMessage>;
  onScrollTop: () => void;
  roomID: string;
  tribeID: string;
  hasMoreData: boolean;
}

enum Dialog {
  DeleteMessage,
}

const Feed = ({
  apiKey,
  data,
  roomID,
  tribeID,
  onScrollTop,
  hasMoreData,
}: Props) => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const toast = useToast();
  const { me } = useAuth();
  const { mutate } = useSWRConfig();
  const scrollToBottom = useRef(null);

  const room = useTribeRooms(tribeID).find(({ id }) => id === roomID);
  const roomMembers = useRoomMembers(roomID);

  const reachBottom = useOnScreen(scrollToBottom);

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    // This is safe to do ,since this view is wrapped on a <Query /> and deduplication avoid making extra queries
    // @see https://swr.vercel.app/docs/advanced/performance#deduplication
    handleScrollToBottom();

    handleReadMessagesUnblock();
    handleUnreadReadMessagesOnTribeNavigation(room.id, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room.id]);

  useEffect(() => {
    if (reachBottom === true) {
      handleUnreadReadMessagesOnTribeNavigation(room.id, false);

      if (unreadMessages > 0) {
        setUnreadMessages(0);
        handleReadMessagesUnblock();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reachBottom]);
  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Websockets events
  useSocketEvent(
    [WSEvents.NewMessage, WSEvents.DeleteMessage],
    async (type: WSEvents, data: RoomNewMessage | RoomDeleteMessage) => {
      if (data.extra.roomId === roomID) {
        try {
          switch (type) {
            case WSEvents.NewMessage:
              await handleAddMessageMutation({
                content: (data as RoomNewMessage).payload,
                createdAt: (data as RoomNewMessage).createdAt,
                id: (data as RoomNewMessage).extra.messageId,
                sender: {
                  avatar: (data as RoomNewMessage).by.avatar,
                  id: (data as RoomNewMessage).by.id,
                  username: (data as RoomNewMessage).by.username,
                },
                type: MessageType.Text,
                mentions: getMentionsArrayFromCacheForOptimistic(
                  roomMembers,
                  (data as RoomNewMessage).payload
                ),
              });

              if (
                window.pageYOffset + window.innerHeight >=
                scrollToBottom.current.offsetTop
              ) {
                handleScrollToBottom();
              } else {
                setUnreadMessages(
                  (currentUnreadMessages) => currentUnreadMessages + 1
                );
              }

              break;
            case WSEvents.DeleteMessage:
              await handleRemoveMessageMutation(
                (data as RoomDeleteMessage).extra.messageId
              );
              break;
            default:
              console.info(`No handler for eventType: ${type}`);
              Sentry.captureMessage(`No handler for eventType: ${type}`);
              break;
          }
        } catch (err) {
          Sentry.captureMessage(err);
        }
      } else {
        switch (type) {
          case WSEvents.NewMessage:
            handleUnreadReadMessagesOnTribeNavigation(
              data.extra.roomId,
              true,
              data.extra.messageId
            );
            break;
          default:
            console.info(`No handler for eventType: ${type}`);
            Sentry.captureMessage(`No handler for eventType: ${type}`);
            break;
        }
      }
    }
  );

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  // Mutations

  // This function is to set read/unread value on the passed RoomID
  // to update the TribeNavigation read status
  const handleUnreadReadMessagesOnTribeNavigation = (
    roomID,
    shouldIncrement = false,
    lastMessageId = ''
  ) => {
    mutate(
      '/core-api/profile/tribes',
      (tribes: Array<ProfileTribe>) =>
        tribes.map((tribe) =>
          tribe.id === tribeID
            ? {
                ...tribe,
                rooms: tribe.rooms.map((tribeRoom) => {
                  if (tribeRoom.id === roomID) {
                    return {
                      ...tribeRoom,
                      unreads: shouldIncrement ? tribeRoom.unreads + 1 : 0,
                      lastMessageId: lastMessageId,
                    };
                  }

                  return tribeRoom;
                }),
              }
            : tribe
        ),
      false
    );
  };

  const handleAddMessageMutation = async (message: RoomMessage) => {
    await mutate(
      apiKey,
      ({ data, nextCursor }) => {
        return {
          data: [...data, message],
          nextCursor: nextCursor,
        };
      },
      false
    );
  };

  const handleRemoveMessageMutation = async (messageID: string) => {
    await mutate(
      apiKey,
      ({ data, nextCursor }) => {
        return {
          data: data.filter(({ id }) => id !== messageID),
          nextCursor: nextCursor,
        };
      },
      false
    );
  };

  const handleUpdateMesssageMutation = async (
    newMessage: RoomMessage,
    optimisticMessageId: string
  ) => {
    await mutate(
      apiKey,
      ({ data, nextCursor }) => {
        return {
          data: data.map((message) => {
            if (message.id === optimisticMessageId) {
              return newMessage;
            }
            return message;
          }),
          nextCursor: nextCursor,
        };
      },
      false
    );
  };

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Handlers
  const handleReadMessagesUnblock = async () => {
    try {
      if (room.unreads > 0) {
        await readRoom(roomID);
      }
    } catch (err) {
      Sentry.captureMessage(err);
    }
  };

  const handleScrollToBottom = (behavior: 'auto' | 'smooth' = 'auto') => {
    if (scrollToBottom?.current) {
      scrollToBottom.current.scrollIntoView({
        block: 'nearest',
        inline: 'start',
        behavior,
      });
    }

    handleReadMessagesUnblock();
    setUnreadMessages(0);
    handleUnreadReadMessagesOnTribeNavigation(room.id, false);
  };

  const handleMessageSubmit = async (content: string) => {
    try {
      const optimisticMessage = {
        content,
        createdAt: new Date().toISOString(),
        id: nanoid(),
        sender: {
          avatar: me.avatar,
          id: me.id,
          username: me.username,
        },
        type: MessageType.Optimistic,
        status: 'A',
        mentions: getMentionsArrayFromCacheForOptimistic(roomMembers, content),
      };
      await handleAddMessageMutation(optimisticMessage);

      handleScrollToBottom();
      const newMessage = await sendMessage(roomID, { content });

      await handleUpdateMesssageMutation(
        {
          ...optimisticMessage,
          ...newMessage,
        },
        optimisticMessage.id
      );
    } catch (err) {
      toast({ message: err });
    }
  };

  const hanleMobileSidebar = useCallback(() => {
    setShowMobileDetails(false);
  }, []);

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Derivated State
  const messagesData = _groupBy(
    _sortyBy(data, (message) => new Date(message.createdAt)),
    ({ createdAt }) => formatDate(createdAt)
  );

  const isAMessageContinuation = (
    lastMessage: RoomMessage | null,
    messageOwner: string
  ) => {
    if (lastMessage) {
      if (lastMessage.sender.id === messageOwner) {
        if (lastMessage.type === MessageType.Join) return true;
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="bg-sapien-neutral-800 h-full flex flex-row p-0 lg:rounded-t-3xl">
      <>
        <div className="flex flex-col h-full flex-1 overflow-hidden relative">
          {unreadMessages > 0 && (
            <button
              onClick={() => handleScrollToBottom('smooth')}
              className="absolute z-50 w-full h-6 bg-sapien-80 flex justify-between px-8 text-xs top-0 rounded-b-lg items-center"
            >
              You have {unreadMessages} new messages
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();

                  handleReadMessagesUnblock();
                  setUnreadMessages(0);
                  handleUnreadReadMessagesOnTribeNavigation(room.id, false);
                }}
                className="font-semibold"
              >
                Mark as Read
              </button>
            </button>
          )}

          <div className="text-gray-200 lg:hidden flex h-10 px-5 border-b border-gray-700 relative text-sm justify-end items-center">
            <button
              aria-label="Toggle Details"
              className="flex"
              onClick={() => setShowMobileDetails(!showMobileDetails)}
            >
              <DotsHorizontalIcon className="w-5 ml-2" />
            </button>
          </div>
          <div
            className="relative flex-1 overflow-auto"
            style={{ overflowAnchor: 'none' }}
          >
            <InfiniteScroll
              pageStart={0}
              loadMore={onScrollTop}
              hasMore={hasMoreData}
              loader={null}
              useWindow={false}
              isReverse
              initialLoad={false}
              threshold={450}
            >
              <ul role="list" className="p-5 flex flex-col mb-2">
                <>
                  {Object.keys(messagesData).map((timestamp) => {
                    const timestampMessages = messagesData[timestamp];
                    return (
                      <>
                        <li key={timestamp}>
                          <time
                            className="block text-xs overflow-hidden text-gray-500 text-center w-full relative before:w-48 before:absolute before:top-2 before:h-px before:block before:bg-gray-800 before:-left-8 after:w-48 after:absolute after:top-2 after:h-px after:block after:bg-gray-800 after:-right-8"
                            dateTime={timestamp}
                            data-testid="timestamp-divider"
                          >
                            {timestamp}
                          </time>
                        </li>
                        {timestampMessages.map((message, index) => {
                          if (message.type === MessageType.Join) {
                            return (
                              <JoinARoomMessage
                                createdAt={message.createdAt}
                                username={message.sender.username}
                                key={message.id}
                              />
                            );
                          }

                          return (
                            <Message
                              removeMessageFromFeed={
                                handleRemoveMessageMutation
                              }
                              key={message.id}
                              message={message}
                              isAMessageContinuation={isAMessageContinuation(
                                timestampMessages[index - 1] || null,
                                message.sender.id
                              )}
                            />
                          );
                        })}
                      </>
                    );
                  })}
                </>
              </ul>
            </InfiniteScroll>
            <div ref={scrollToBottom} className="block" />
          </div>
          <div className="px-0 sm:px-5">
            {/* @ts-ignore */}
            <RoomEditor onSubmit={handleMessageSubmit} name={room.name} />
          </div>
        </div>

        {/* Room Details */}
        <div
          className={`bg-sapien-neutral-800 lg:static fixed lg:right-0 transition-all duration-300 h-full bottom-0 lg:rounded-t-3xl ${
            showMobileDetails ? 'right-0' : '-right-full'
          }`}
        >
          <Details handleSidebar={hanleMobileSidebar} />
        </div>
      </>
    </div>
  );
};

export default Feed;
