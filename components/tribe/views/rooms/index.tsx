import { DotsHorizontalIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import _isEmpty from 'lodash/isEmpty';
import _groupBy from 'lodash/groupBy';
import _sortyBy from 'lodash/sortBy';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { KeyedMutator, useSWRConfig } from 'swr';
import { useEffect, useRef, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

// api
import axios from 'api';
import { deleteMessage, sendMessage } from 'api/room';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// constants
import { MessageType, WSEvents } from 'tools/constants/rooms';

// components
import { Query, SEO } from 'components/common';
import { RoomEditor } from 'slatejs';
import Details from './Details';
import Message from './Message';
import NotAMemberView from './NotAMemberView';
import LoadingMessagesSkeleton from './LoadingMessagesPlaceholder';
import JoinARoomMessage from './JoinARoomMessage';
import DeleteMessageDialog from './dialogs/DeleteMessageDialog';

// helpers
import { formatDate, formatDateRelative } from 'utils/date';

// hooks
import { useTribeRooms } from 'hooks/tribe';
import { useSocketEvent } from 'hooks/socket';
import { useRoomDetails } from 'hooks/room';
import useGetInfinitePages from 'hooks/useGetInfinitePages';

// types
import type { RoomMessage, RoomNewMessage } from 'tools/types/room';

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
  const [dialog, setDialog] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState<RoomMessage | null>(
    null
  );
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const toast = useToast();
  const { me } = useAuth();
  const { mutate } = useSWRConfig();
  const scrollToBottom = useRef(null);

  const room = useTribeRooms(tribeID).find(({ id }) => id === roomID);
  const { createdAt } = useRoomDetails(roomID);

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    // This is safe to do ,since this view is wrapped on a <Query /> and deduplication avoid making extra queries
    // @see https://swr.vercel.app/docs/advanced/performance#deduplication
    handleScrollToBottom();
  }, []);

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Websockets events
  useSocketEvent(WSEvents.NewMessage, async (message: RoomNewMessage) => {
    console.log(`you are on roomID `, { roomID });
    console.log(`New Message arrive`, { message });
    if (message.extra.roomId === roomID) {
      try {
        await handleAddMessageMutation({
          content: message.payload,
          createdAt: message.createdAt,
          id: message.extra.messageId,
          sender: {
            avatar: message.by.avatar,
            id: message.by.id,
            username: message.by.username,
          },
          type: MessageType.Text,
        });
      } catch (err) {
        Sentry.captureMessage(err);
      }
    }
  });

  useSocketEvent(
    WSEvents.DeleteMessage,
    async (message: { extra: { roomId: string; messageId: string } }) => {
      if (message.extra.roomId === roomID) {
        try {
          await handleRemoveMessageMutation(message.extra.messageId);
        } catch (err) {
          Sentry.captureMessage(err);
        }
      }
    }
  );

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  // Mutations
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
  const handleScrollToBottom = () => {
    if (scrollToBottom?.current) {
      scrollToBottom.current.scrollIntoView({
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  const handleRemoveMessage = async (messageID) => {
    try {
      await handleRemoveMessageMutation(messageID);

      await deleteMessage(roomID, messageID);
    } catch (err) {
      toast({ message: err });
    }
  };

  const handleMessageSubmit = async (content: string) => {
    if (content === '') return;

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
    <div className="bg-sapien-neutral-800 h-full flex flex-row p-0">
      <>
        <SEO title={room.name} />
        <div className="flex flex-col h-full flex-1 overflow-hidden">
          <div className="text-gray-200 lg:hidden flex h-10 px-5 border-b border-gray-700 relative text-sm justify-end items-center">
            <button
              aria-label="Toggle Details"
              className="flex"
              onClick={() => setShowMobileDetails(!showMobileDetails)}
            >
              <DotsHorizontalIcon className="w-5 ml-2" />
            </button>
          </div>
          <div className="relative flex-1 overflow-auto">
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
              <>
                <h1 className="sr-only">Room View for {room.name}</h1>
                <ul role="list" className="p-5 flex flex-col mb-2">
                  <li>
                    <time
                      className="block text-xs overflow-hidden text-gray-500 text-center w-full relative before:w-48 before:absolute before:top-2 before:h-px before:block before:bg-gray-800 before:-left-8 after:w-48 after:absolute after:top-2 after:h-px after:block after:bg-gray-800 after:-right-8"
                      dateTime={createdAt}
                      data-testid="timestamp-divider-harambe"
                    >
                      {formatDate(createdAt)}
                    </time>
                    <div
                      className={`py-2 hover:bg-gray-800 rounded-md px-6 flex justify-between items-start group`}
                    >
                      <div className="flex space-x-3">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/b851e8f8-a660-4d6a-be68-6177a5d40956-110x110.png"
                          alt=""
                          data-testid="message-avatar"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-extrabold">
                              Harambe at Sapien
                            </h3>
                            <time
                              data-testid="message-timestamp"
                              className="text-xs text-white"
                            >
                              {formatDateRelative(createdAt)}
                            </time>
                          </div>
                          <p className="text-sm text-white/80 group">
                            {`This is the beginning of the conversation on the room: ${room.name}, say Hi! or Hola!`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
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
                                key={message.id}
                                message={message}
                                isAMessageContinuation={isAMessageContinuation(
                                  timestampMessages[index - 1] || null,
                                  message.sender.id
                                )}
                                onMenuItemClick={(type) => {
                                  setSelectedMessage(message);

                                  if (type === 'delete') {
                                    setDialog(Dialog.DeleteMessage);
                                  }
                                }}
                              />
                            );
                          })}
                        </>
                      );
                    })}
                  </>
                </ul>
              </>
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
          className={`bg-sapien-neutral-800 lg:static fixed lg:right-0 transition-all duration-300 h-full bottom-0 ${
            showMobileDetails ? 'right-0' : '-right-full'
          }`}
        >
          <Details handleSidebar={hanleMobileSidebar} />
        </div>
        {/* Modals */}
        <DeleteMessageDialog
          onClose={() => {
            setDialog(null);
          }}
          onDelete={() => {
            setDialog(null);

            setTimeout(() => {
              handleRemoveMessage(selectedMessage.id);
            }, 500);
          }}
          open={dialog === Dialog.DeleteMessage}
          message={selectedMessage}
        />
      </>
    </div>
  );
};

interface RoomProps {
  apiKey: string;
  roomID: string;
}

const Room = ({ apiKey, roomID }: RoomProps) => {
  const { query } = useRouter();
  const [isLoading, setLoading] = useState(false);

  const { tribeID } = query;

  const { mutate } = useSWRConfig();

  const { data: swrData } = useGetInfinitePages<{
    data: Array<RoomMessage>;
    nextCursor: string | null;
  }>(apiKey);

  let mutateFetchAPI = apiKey;
  const handleFetchMore = async (cursor: string) => {
    try {
      setLoading(true);
      mutateFetchAPI = `${apiKey}?nextCursor=${cursor}&limit=25`;
      const response = await axios(mutateFetchAPI);
      mutate(
        apiKey,
        ({ data }) => {
          return {
            data: [...data, ...response?.data?.data],
            nextCursor: response?.data?.nextCursor,
          };
        },
        false
      );
      setLoading(false);
    } catch (err) {
      Sentry.captureMessage(err);
      setLoading(false);
    }
  };

  return (
    <Feed
      apiKey={mutateFetchAPI}
      roomID={roomID}
      tribeID={tribeID as string}
      data={swrData?.data ?? []}
      onScrollTop={() => {
        if (swrData?.nextCursor !== null && !isLoading) {
          handleFetchMore(swrData?.nextCursor);
        }
      }}
      hasMoreData={swrData?.nextCursor !== null}
    />
  );
};

const RoomProxy = () => {
  const { query } = useRouter();

  if (_isEmpty(query)) return null;

  const roomID = query.viewID as string;
  const apiKey = `/core-api/room/${roomID}/messages`;

  return (
    <Query api={`/core-api/room/${roomID}`} ignoreError loader={null}>
      {(data) => {
        if (data?.message === 'User is not a memeber of the room')
          return <NotAMemberView />;
        return (
          <Query api={apiKey} loader={<LoadingMessagesSkeleton />}>
            {() => <Room roomID={roomID} apiKey={apiKey} />}
          </Query>
        );
      }}
    </Query>
  );
};

export default RoomProxy;
