import { UsersIcon } from '@heroicons/react/outline';
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
import { useSocket } from 'context/socket';

// constants
import { MessageType, WSEvents } from 'tools/constants/rooms';

// components
import { RoomEditor } from 'slatejs';
import Details from './Details';
import Message from './Message';
import JoinARoomMessage from './JoinARoomMessage';
import WelcomeMessage from './WelcomeMessage';

// helpers
import { formatDate } from 'utils/date';

// hooks
import useOnScreen from 'hooks/useOnScreen';
import { useSound } from 'hooks/useSound';
import { useTribeRooms } from 'hooks/tribe';
import { useRoomMembers } from 'hooks/room';
import { usePassport } from 'hooks/passport';

// slate
import { getMentionsArrayFromCacheForOptimistic } from 'slatejs/utils';

// types
import type {
  RoomDeleteMessage,
  RoomMessage,
  RoomNewMessage,
} from 'tools/types/room';
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  apiKey: string;
  data: Array<RoomMessage>;
  onScrollTop: () => void;
  roomID: string;
  tribeID: string;
  hasMoreData: boolean;
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
  const [showDetails, setshowDetails] = useState(false);

  const toast = useToast();
  const { me } = useAuth();
  const { play } = useSound();
  const passport = usePassport();
  const { mutate } = useSWRConfig();
  const scrollToBottom = useRef(null);

  const room = useTribeRooms(tribeID).find(({ id }) => id === roomID);
  const roomMembers = useRoomMembers(roomID);
  const { socketMessages, handleReadMessage } = useSocket();
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

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  // Mutations

  // This function is to set read/unread value on the passed RoomID
  // to update the TribeNavigation read status
  const handleUnreadReadMessagesOnTribeNavigation = useCallback(
    (roomID, shouldIncrement = false, hasUnread = false) => {
      mutate(
        '/core-api/user/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.map((tribe) =>
            tribe.id === tribeID
              ? {
                  ...tribe,
                  rooms: tribe.rooms.map((tribeRoom) => {
                    if (tribeRoom.id === roomID) {
                      return {
                        ...tribeRoom,
                        unreadMentions: shouldIncrement
                          ? tribeRoom.unreadMentions + 1
                          : 0,
                        hasUnread,
                      };
                    }

                    return tribeRoom;
                  }),
                }
              : tribe
          ),
        false
      );
    },
    [mutate, tribeID]
  );

  const handleAddMessageMutation = useCallback(
    async (message: RoomMessage) => {
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
    },
    [apiKey, mutate]
  );

  const handleRemoveMessageMutation = useCallback(
    async (messageID: string) => {
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
    },
    [apiKey, mutate]
  );

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
  const handleReadMessagesUnblock = useCallback(async () => {
    try {
      if (room.unreadMentions > 0) {
        await readRoom(roomID);
      }
    } catch (err) {
      Sentry.captureMessage(err);
    }
  }, [room.unreadMentions, roomID]);

  const handleScrollToBottom = useCallback(
    (behavior: 'auto' | 'smooth' = 'auto') => {
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
    },
    [
      handleReadMessagesUnblock,
      handleUnreadReadMessagesOnTribeNavigation,
      room.id,
    ]
  );

  const handleMessageSubmit = async (content: string) => {
    try {
      const optimisticMessage = {
        content,
        createdAt: new Date().toISOString(),
        id: nanoid(),
        sender: {
          avatar: me.avatar || passport?.image,
          id: me.id,
          username: me.username,
          badges:
            me.flairBadges.length > 0
              ? [
                  {
                    id: me.flairBadges[0].badgeid,
                    avatar: me.flairBadges[0].avatar,
                    color: me.flairBadges[0].color,
                    name: me.flairBadges[0].name,
                  },
                ]
              : [],
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
      toast({ message: err.message || err });
    }
  };

  const hanleSidebar = useCallback(() => {
    setshowDetails(false);
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
  useEffect(() => {
    socketMessages
      .filter(
        ({ type }) =>
          type === WSEvents.NewMessage ||
          WSEvents.DeleteMessage ||
          WSEvents.RoomMention
      )
      .forEach(({ data, id: messageID, type }) => {
        if (data.extra?.tribe?.id === tribeID) {
          console.log({ data });
          if (data.extra.roomId === roomID) {
            try {
              switch (type) {
                case WSEvents.RoomMention:
                  mutate(
                    '/core-api/user/tribes',
                    (tribes: Array<ProfileTribe>) =>
                      tribes.map((tribe) =>
                        tribe.id === data.extra.tribe.id
                          ? {
                              ...tribe,
                              rooms: tribe.rooms.map((tribeRoom) => {
                                if (tribeRoom.id === data.extra.roomId) {
                                  return {
                                    ...tribeRoom,
                                    unreadMentions:
                                      tribeRoom.unreadMentions + 1,
                                    hasUnread: true,
                                  };
                                }

                                return tribeRoom;
                              }),
                            }
                          : tribe
                      ),
                    false
                  );
                  play();
                  break;
                case WSEvents.NewMessage:
                  handleAddMessageMutation({
                    content: (data as RoomNewMessage).payload,
                    createdAt: (data as RoomNewMessage).createdAt,
                    id: (data as RoomNewMessage).extra.messageId,
                    sender: {
                      avatar: (data as RoomNewMessage).by.avatar,
                      id: (data as RoomNewMessage).by.id,
                      username: (data as RoomNewMessage).by.username,
                      badges: [],
                    },
                    type: MessageType.Text,
                    mentions: getMentionsArrayFromCacheForOptimistic(
                      roomMembers,
                      (data as RoomNewMessage).payload
                    ),
                  }).then(() => {
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
                  });

                  break;
                case WSEvents.DeleteMessage:
                  handleRemoveMessageMutation(
                    (data as RoomDeleteMessage).extra.messageId
                  );
                  break;
                default:
                  console.info(`No handler for eventType: ${type}`);
                  break;
              }
            } catch (err) {
              Sentry.captureMessage(err);
            }
          } else {
            switch (type) {
              case WSEvents.RoomMention:
                mutate(
                  '/core-api/user/tribes',
                  (tribes: Array<ProfileTribe>) =>
                    tribes.map((tribe) =>
                      tribe.id === data.extra.tribe.id
                        ? {
                            ...tribe,
                            rooms: tribe.rooms.map((tribeRoom) => {
                              if (tribeRoom.id === data.extra.roomId) {
                                return {
                                  ...tribeRoom,
                                  unreadMentions: tribeRoom.unreadMentions + 1,
                                  hasUnread: true,
                                };
                              }

                              return tribeRoom;
                            }),
                          }
                        : tribe
                    ),
                  false
                );
                play();
                break;

              default:
                console.info(`No handler for eventType: ${type}`);
                Sentry.captureMessage(`No handler for eventType: ${type}`);
                break;
            }
          }
          handleReadMessage(messageID);
        }
      });
  }, [
    tribeID,
    socketMessages,
    me.id,
    mutate,
    handleReadMessage,
    roomID,
    handleAddMessageMutation,
    roomMembers,
    handleRemoveMessageMutation,
    handleScrollToBottom,
    handleUnreadReadMessagesOnTribeNavigation,
    play,
  ]);
  return (
    <div className="bg-sapien-neutral-800 h-full flex flex-1 flex-row p-0 lg:rounded-tl-3xl overflow-x-hidden">
      <>
        <div className="flex flex-col h-full flex-1 overflow-hidden relative">
          {unreadMessages > 0 && (
            <button
              onClick={() => handleScrollToBottom('smooth')}
              className="absolute z-50 w-full h-6 bg-sapien-80 flex justify-between px-8 text-xs top-0 items-center"
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

          <div className="text-gray-200 flex h-10 px-5 border-b border-gray-700 relative text-sm justify-end items-center gap-2">
            <button
              aria-label="Toggle Details"
              className="flex px-1 h-full items-center"
              onClick={() => setshowDetails(!showDetails)}
            >
              <UsersIcon className="w-5" />
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
                  <WelcomeMessage />
                  {Object.keys(messagesData).map((timestamp) => {
                    const timestampMessages = messagesData[timestamp];
                    return (
                      <>
                        <li key={timestamp}>
                          <time
                            className="block text-xs overflow-hidden text-gray-500 text-center w-full relative before:w-48 before:absolute before:top-2 before:h-px before:block before:bg-gray-800 before:-left-8 after:w-48 after:absolute after:top-2 after:h-px after:block after:bg-gray-800 after:-right-8"
                            dateTime={timestamp}
                            data-showDetailstestid="timestamp-divider"
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
            showDetails ? 'right-0 lg:hidden' : '-right-full'
          }`}
        >
          <Details handleSidebar={hanleSidebar} />
        </div>
      </>
    </div>
  );
};

export default Feed;
