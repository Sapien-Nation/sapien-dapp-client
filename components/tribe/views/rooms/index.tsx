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
import { MessageType } from 'tools/constants/rooms';

// components
import { Query, SEO } from 'components/common';
import { RoomEditor } from 'slatejs';
import Details from './Details';
import Message from './Message';
import NotAMemberView from './NotAMemberView';
import LoadingMessagesSkeleton from './LoadingMessagesPlaceholder';

// helpers
import { formatDate } from 'utils/date';

// hooks
import useOnScreen from 'hooks/useOnScreen';
import { useTribeRooms } from 'hooks/tribe';
import { useRoomDetails } from 'hooks/room';
import { useSocketEvent } from 'hooks/socket';
import useGetInfinitePages, { getKeyFunction } from 'hooks/useGetInfinitePages';

// types
import type { RoomMessage } from 'tools/types/room';

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
  const roomDetails = useRoomDetails(roomID);
  const shouldFetchMoreItems = useOnScreen(topOfRoomRef);

  useSocketEvent('message', (message) => {
    handleAddMessage(message);
  });

  const apiKey = `/api/v3/room/${roomID}/messages`;
  const { data, fetchMore, isLoadingInitialData, isFetchingMore } =
    useGetInfinitePages<{
      data: Array<RoomMessage>;
      nextCursor: string | null;
    }>(apiKey);

  const messages = useMemo(() => {
    return _groupBy(data.reverse(), ({ createdAt }) => formatDate(createdAt));
  }, [data]);

  useEffect(() => {
    // Start chat at the bottom
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({
        block: 'nearest',
        inline: 'start',
      });
    }
  }, []);

  useEffect(() => {
    if (shouldFetchMoreItems && isFetchingMore === false) {
      fetchMore();
    }
  }, [fetchMore, isFetchingMore, shouldFetchMoreItems]);

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
        createdAt: new Date().toISOString(),
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
            <ul
              role="list"
              className="absolute bottom-0 left-0 right-0 px-5 mb-4 flex flex-col"
            >
              {isLoadingInitialData === true && <LoadingMessagesSkeleton />}
              {isLoadingInitialData === false && data.length > 0 && (
                <li ref={topOfRoomRef} />
              )}
              {isLoadingInitialData === false && (
                <li>
                  <time
                    className="block text-xs overflow-hidden text-gray-500 text-center w-full relative before:w-[48%] before:absolute before:top-2 before:h-px before:block before:bg-gray-800 before:-left-8 after:w-[48%] after:absolute after:top-2 after:h-px after:block after:bg-gray-800 after:-right-8"
                    dateTime={new Date().toISOString()}
                  >
                    {formatDate(new Date().toISOString())}
                  </time>
                  <Message
                    isAContinuosMessage
                    message={{
                      sender: {
                        id: '9999_9999',
                        avatar:
                          'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/b851e8f8-a660-4d6a-be68-6177a5d40956-110x110.png',
                        displayName: 'Harambe at Sapien',
                        username: 'Harambe at Sapien',
                      },
                      id: '999_0000',
                      type: 'message',
                      createdAt: roomDetails.createdAt,
                      content: `This is the beggining of the conversation on the room: ${room.name}, say Hi! or Hola!`,
                    }}
                  />
                </li>
              )}
              {Object.keys(messages).map((timestamp) => {
                const timestampMessages = messages[timestamp];
                return (
                  <li key={timestamp}>
                    <time
                      className="block text-xs overflow-hidden text-gray-500 text-center w-full relative before:w-[48%] before:absolute before:top-2 before:h-px before:block before:bg-gray-800 before:-left-8 after:w-[48%] after:absolute after:top-2 after:h-px after:block after:bg-gray-800 after:-right-8"
                      dateTime={timestamp}
                    >
                      {timestamp}
                    </time>
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
                  </li>
                );
              })}
              <li ref={scrollToRef} />
            </ul>
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
