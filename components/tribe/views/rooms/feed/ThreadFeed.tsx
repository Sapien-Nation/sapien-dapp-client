import { UsersIcon, XIcon } from '@heroicons/react/outline';
import { LockClosedIcon } from '@heroicons/react/solid';
import * as Sentry from '@sentry/nextjs';
import _isEmpty from 'lodash/isEmpty';
import _groupBy from 'lodash/groupBy';
import _sortyBy from 'lodash/sortBy';
import { nanoid } from 'nanoid';
import { useSWRConfig } from 'swr';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { isAndroid } from 'react-device-detect';

// api
import { sendMessage, readRoom } from 'api/room';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';
import { useSocket } from 'context/socket';

// constants
import { MessageType, RoomMemberType, WSEvents } from 'tools/constants/rooms';

// components
import { AndroidRoomEditor, RoomEditor } from 'slatejs';
import Details from './Details';
import Message from './Message';
import JoinARoomMessage from './JoinARoomMessage';
import { Query } from 'components/common';

// helpers
import { formatDate } from 'utils/date';

// hooks
import { useSound } from 'hooks/useSound';
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
  threadID: string;
}

const ThreadFeed = ({
  apiKey,
  data,
  roomID,
  tribeID,
  onScrollTop,
  hasMoreData,
  threadID,
}: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  const { me } = useAuth();
  const { play } = useSound();
  const passport = usePassport();
  const { mutate, cache } = useSWRConfig();
  const scrollToBottom = useRef(null);

  const thread = cache.get(`/core-api/room/${threadID}`);
  const threadMembers = useMemo(() => [], []);
  const { socketMessages, handleReadMessage } = useSocket();

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    // This is safe to do ,since this view is wrapped on a <Query /> and deduplication avoid making extra queries
    // @see https://swr.vercel.app/docs/advanced/performance#deduplication
    handleScrollToBottom();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  // Mutations

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

  const handleScrollToBottom = useCallback(
    (behavior: 'auto' | 'smooth' = 'auto') => {
      if (scrollToBottom?.current) {
        scrollToBottom.current.scrollIntoView(true, {
          block: 'nearest',
          inline: 'start',
          behavior,
        });
      }
    },
    []
  );

  const handleMessageSubmit = async (
    content: string,
    attachments: Array<File>
  ) => {
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
      attachments: attachments.map((file, index) => ({
        url: '',
        mimeType: file.type,
        fileName: file.name,
        id: String(index),
      })),
      type:
        attachments.length === 0
          ? MessageType.Optimistic
          : MessageType.OptimisticWithAttachment,
      status: 'A',
      mentions: getMentionsArrayFromCacheForOptimistic(threadMembers, content),
    };
    try {
      await handleAddMessageMutation(optimisticMessage);

      handleScrollToBottom();

      let newMessage;
      if (attachments.length === 0) {
        newMessage = await sendMessage(threadID, { content });
      } else {
        const formData = new FormData();
        formData.append('content', content);
        attachments.forEach((attachment, index) => {
          formData.append(`attachments${[index]}`, attachment);
        });
        newMessage = await sendMessage(threadID, formData);
      }

      await handleUpdateMesssageMutation(
        {
          ...optimisticMessage,
          ...newMessage,
        },
        optimisticMessage.id
      );
    } catch (err) {
      await handleUpdateMesssageMutation(
        {
          ...optimisticMessage,
          type: MessageType.OptimisticWithError,
        },
        optimisticMessage.id
      );
    }
  };

  const handleSidebar = useCallback(() => {
    setShowDetails(false);
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
          WSEvents.RoomMention ||
          WSEvents.RoomNewMemberJoin
      )
      .forEach(({ data, id: messageID, type }) => {
        if (data.extra?.tribe?.id === tribeID) {
          if (data.extra.roomId === roomID) {
            try {
              switch (type) {
                case WSEvents.RoomNewMemberJoin:
                  mutate(
                    `/core-api/room/${roomID}/members`,
                    (members) => [
                      ...members,
                      {
                        id: data.by.id,
                        avatar: data.by.avatar,
                        displayName: data.by.username, // TODO we need displayName
                        userType: RoomMemberType.Participant,
                        username: data.by.username,
                      },
                    ],
                    false
                  );
                  return;
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

                  handleAddMessageMutation({
                    attachments: [],
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
                      threadMembers,
                      (data as RoomNewMessage).payload
                    ),
                  });
                  play();
                  break;
                case WSEvents.NewMessage:
                  const isJoin = (data as RoomNewMessage).payload.includes(
                    'joined the room'
                  );
                  if (isJoin) {
                    mutate(
                      `/core-api/room/${roomID}/members`,
                      (members) => [
                        ...members,
                        {
                          id: data.by.id,
                          avatar: data.by.avatar,
                          displayName: data.by.username, // TODO we need displayName
                          userType: RoomMemberType.Participant,
                          username: data.by.username,
                          badges: [],
                        },
                      ],
                      true
                    );
                  }
                  handleAddMessageMutation({
                    attachments: (data as any).extra.attachments,
                    content: (data as RoomNewMessage).payload,
                    createdAt: (data as RoomNewMessage).createdAt,
                    id: (data as RoomNewMessage).extra.messageId,
                    sender: {
                      avatar: (data as RoomNewMessage).by.avatar,
                      id: (data as RoomNewMessage).by.id,
                      username: (data as RoomNewMessage).by.username,
                      badges: [],
                    },
                    type: isJoin ? MessageType.Join : MessageType.Text,
                    mentions: getMentionsArrayFromCacheForOptimistic(
                      threadMembers,
                      (data as RoomNewMessage).payload
                    ),
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
    handleRemoveMessageMutation,
    handleScrollToBottom,
    play,
    threadMembers,
  ]);

  return (
    <div className="bg-sapien-neutral-800 h-full flex flex-1 flex-row p-0 lg:rounded-tl-3xl overflow-x-hidden">
      <>
        <div className="flex flex-col h-full flex-1 overflow-hidden relative">
          <div className="text-gray-200 flex h-10 px-5 border-b border-gray-700 relative text-sm justify-between items-center">
            <div className="text-base font-semibold flex items-center">
              <span className="w-5 flex justify-center text-gray-400">
                {thread.private ? <LockClosedIcon className="w-4" /> : '#'}
              </span>
              {thread.name}
            </div>
            <button
              aria-label="Toggle Details"
              className="flex px-1 h-full items-center"
              onClick={() => setShowDetails(!showDetails)}
            >
              <UsersIcon className="w-5" />
            </button>
          </div>
          <div
            className="relative flex-1 overflow-auto"
            style={{ overflowAnchor: 'none' }}
          >
            <InfiniteScroll
              className="scroll-auto"
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
                              addMessageManually={handleMessageSubmit}
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
            {isAndroid ? (
              <AndroidRoomEditor
                onSubmit={handleMessageSubmit}
                name={thread.name}
              />
            ) : (
              <RoomEditor onSubmit={handleMessageSubmit} name={thread.name} />
            )}
          </div>
        </div>

        {/* Room Details */}
        <div
          className={`bg-sapien-neutral-800 lg:static fixed lg:right-0 transition-all duration-300 h-full bottom-0 lg:rounded-t-3xl ${
            showDetails ? 'right-0 lg:hidden' : '-right-full'
          }`}
        >
          <Query
            api={`/core-api/room/${threadID}/members`}
            loader={
              <aside className="w-72 h-full flex flex-col border-l border-gray-700">
                <div className="absolute -left-10 top-0 bg-sapien-red-700 lg:hidden">
                  <button
                    type="button"
                    className="flex items-center justify-center h-10 w-10 focus:outline-none"
                    onClick={handleSidebar}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
                <>
                  <div className="border-b border-gray-700 h-10 px-5 mb-5 w-full flex items-center">
                    <h3 className="text-md  text-gray-300 font-bold ">
                      Loading Members...
                    </h3>
                  </div>
                  <ul className="overflow-auto flex-1">
                    <div className="List">
                      <li className="flex gap-2 items-center mb-4 cursor-pointer truncate px-5">
                        <h3 className="text-sm text-gray-300">Participants</h3>
                      </li>
                      <li className="flex gap-2 items-center mb-4 cursor-pointer truncate px-5">
                        <>
                          <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
                            S
                          </div>
                          <div className="truncate leading-none">
                            <span className="truncate flex gap-1 items-center bg-gray-700 "></span>
                            <span className="truncate text-xs text-gray-400">
                              @...
                            </span>
                          </div>
                        </>
                      </li>
                      <li className="flex gap-2 items-center mb-4 cursor-pointer truncate px-5">
                        <>
                          <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
                            S
                          </div>
                          <div className="truncate leading-none">
                            <span className="truncate flex gap-1 items-center bg-gray-700 "></span>
                            <span className="truncate text-xs text-gray-400">
                              @...
                            </span>
                          </div>
                        </>
                      </li>
                      <li className="flex gap-2 items-center mb-4 cursor-pointer truncate px-5">
                        <>
                          <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
                            S
                          </div>
                          <div className="truncate leading-none">
                            <span className="truncate flex gap-1 items-center bg-gray-700 "></span>
                            <span className="truncate text-xs text-gray-400">
                              @...
                            </span>
                          </div>
                        </>
                      </li>
                    </div>
                  </ul>
                </>
              </aside>
            }
          >
            {() => <Details handleSidebar={handleSidebar} />}
          </Query>
        </div>
      </>
    </div>
  );
};

export default ThreadFeed;
