import { DotsHorizontalIcon } from '@heroicons/react/outline';
import _isEmpty from 'lodash/isEmpty';
import _groupBy from 'lodash/groupBy';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// api
import { sendMessage } from 'api/room';

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

// helpers
import { formatDate, formatDateRelative } from 'utils/date';

// hooks
import useOnScreen from 'hooks/useOnScreen';
import { useTribeRooms } from 'hooks/tribe';
import { useSocketEvent } from 'hooks/socket';
import useGetInfinitePages, { getKeyFunction } from 'hooks/useGetInfinitePages';

// types
import type { RoomMessage } from 'tools/types/room';

interface Props {
  messages: Array<RoomMessage>;
  onRender: () => void;
}

const MessagesFeed = ({ onRender, messages }: Props) => {
  const messagesData = useMemo(() => {
    return _groupBy(messages.reverse(), ({ createdAt }) =>
      formatDate(createdAt)
    );
  }, [messages]);

  useEffect(() => {
    onRender();
  }, [onRender]);

  return (
    <>
      {Object.keys(messagesData).map((timestamp) => {
        const timestampMessages = messagesData[timestamp];
        return (
          <>
            <li key={timestamp}>
              <time
                className="block text-xs overflow-hidden text-gray-500 text-center w-full relative before:w-[48%] before:absolute before:top-2 before:h-px before:block before:bg-gray-800 before:-left-8 after:w-[48%] after:absolute after:top-2 after:h-px after:block after:bg-gray-800 after:-right-8"
                dateTime={timestamp}
                data-testid="timestamp-divider"
              >
                {timestamp}
              </time>
            </li>
            {timestampMessages.map((message, index) => {
              return (
                <Message
                  key={message.id}
                  message={message}
                  isAContinuosMessage={
                    timestampMessages[index - 1]?.sender.id !==
                    message.sender.id
                  }
                />
              );
            })}
          </>
        );
      })}
    </>
  );
};

const Room = () => {
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const toast = useToast();
  const { me } = useAuth();
  const { query } = useRouter();
  const scrollToRef = useRef(null);
  const topOfRoomRef = useRef(null);

  const { tribeID } = query;
  const roomID = query.viewID as string;

  const room = useTribeRooms(tribeID as string).find(({ id }) => id === roomID);
  const { mutate } = useSWRConfig();
  const shouldFetchMoreItems = useOnScreen(topOfRoomRef);

  useSocketEvent(WSEvents.NewMessage, (message) => {
    handleAddMessage(message);
  });

  const apiKey = `/api/v3/room/${roomID}/messages`;
  const { data, fetchMore, isLoadingInitialData, isFetchingMore } =
    useGetInfinitePages<{
      data: Array<RoomMessage>;
      nextCursor: string | null;
    }>(apiKey);

  useEffect(() => {
    if (
      shouldFetchMoreItems &&
      isFetchingMore === false &&
      isLoadingInitialData === false
    ) {
      fetchMore();
    }
  }, [fetchMore, isFetchingMore, shouldFetchMoreItems, isLoadingInitialData]);

  const handleScrollToBottom = () => {
    scrollToRef.current.scrollIntoView({
      block: 'nearest',
      inline: 'start',
    });
  };

  const handleAddMessage = async (message: RoomMessage) => {
    await mutate(
      unstable_serialize(getKeyFunction({ current: false }, 'data', apiKey)),
      (cachedData) => {
        return cachedData.map(({ data, nextCursor }, index) => {
          if (index === cachedData.length - 1) {
            return {
              data: [message, ...data],
              nextCursor,
            };
          }

          return { data, nextCursor };
        });
      },
      false
    );
  };

  const handleMessageSubmit = async (content) => {
    if (content === '') return;

    try {
      handleAddMessage({
        content,
        createdAt: date,
        id: nanoid(),
        sender: {
          avatar: me.avatar,
          displayName: me.displayName,
          id: me.id,
          username: me.username,
        },
        type: MessageType.Optimistic,
        status: 'A',
      });

      handleScrollToBottom();
      await sendMessage(roomID, { content });

      await mutate(
        unstable_serialize(getKeyFunction({ current: false }, 'data', apiKey))
      );
    } catch (err) {
      toast({ message: err });
    }
  };

  const hanleMobileSidebar = useCallback(() => {
    setShowMobileDetails(false);
  }, []);

  const date = new Date().toISOString();
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
            <h1 className="sr-only">Room View for {room.name}</h1>
            <ul role="list" className="p-5 flex flex-col">
              {isLoadingInitialData === true && <LoadingMessagesSkeleton />}
              {isLoadingInitialData === false && data.length > 0 && (
                <li ref={topOfRoomRef} id="top_target" />
              )}
              {isLoadingInitialData === false && (
                <li>
                  <time
                    className="block text-xs overflow-hidden text-gray-500 text-center w-full relative before:w-[48%] before:absolute before:top-2 before:h-px before:block before:bg-gray-800 before:-left-8 after:w-[48%] after:absolute after:top-2 after:h-px after:block after:bg-gray-800 after:-right-8"
                    dateTime={date}
                    data-testid="timestamp-divider-harambe"
                  >
                    {formatDate(date)}
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
                            {formatDateRelative(new Date().toISOString())}
                          </time>
                        </div>
                        <p className="text-sm text-white/80 group">
                          <span className="text-[10px] hidden group-hover:block absolute left-12 text-gray-400">
                            {new Date().toLocaleString('en-US', {
                              hour: 'numeric',
                              hour12: true,
                            })}
                          </span>{' '}
                          {`This is the beggining of the conversation on the room: ${room.name}, say Hi! or Hola!`}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              )}
              {isLoadingInitialData === false && (
                <MessagesFeed
                  messages={data}
                  onRender={() => handleScrollToBottom()}
                />
              )}
            </ul>
            <div ref={scrollToRef} />
          </div>
          <div className="px-5">
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
      </>
    </div>
  );
};

const RoomProxy = () => {
  const { query } = useRouter();

  if (_isEmpty(query)) return null;

  return (
    <Query api={`/api/v3/room/${query.viewID}`} ignoreError loader={null}>
      {(data) => {
        if (data?.message === 'User is not a memeber of the room')
          return <NotAMemberView />;
        return <Room />;
      }}
    </Query>
  );
};

export default RoomProxy;
