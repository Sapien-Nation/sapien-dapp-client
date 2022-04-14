import _isEmpty from 'lodash/isEmpty';
import _groupBy from 'lodash/groupBy';
import { useRouter } from 'next/router';

// components
import { Query, SEO } from 'components/common';
import { RoomEditor } from 'slatejs';
import Details from './Details';
import Message from './Message';

// helpers
import { formatDate } from 'utils/date';

// hooks
import { useTribeRooms } from 'hooks/tribe';
import { useEffect, useRef } from 'react';

const Room = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;
  const room = useTribeRooms(tribeID as string).find(({ id }) => id === viewID);

  const bottomFeedRef = useRef(null);
  const messages = {};
  // const feedMessages = _groupBy(messages, ({ createdAt }) =>
  //   formatDate(createdAt)
  // );

  useEffect(() => {
    // Start chat at the bottom
    if (bottomFeedRef.current) {
      bottomFeedRef.current.scrollIntoView({
        block: 'nearest',
        inline: 'start',
      });
    }
  }, []);

  const handleMessageSubmit = () => {};

  return (
    <div className="bg-sapien-neutral-800 h-full flex flex-row p-0">
      <>
        <SEO title={room.name} />
        <div className="flex flex-col h-full flex-1 overflow-hidden">
          <div className="relative flex-1 overflow-auto p-5 mb-2">
            <h1 className="sr-only">Room View for {room.name}</h1>
            <ul
              role="list"
              className="absolute bottom-0 w-full flex flex-col mb-5"
            >
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
                    authorID: '9999_9999',
                    id: '999_0000',
                    avatarUrl:
                      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/b851e8f8-a660-4d6a-be68-6177a5d40956-110x110.png',
                    createdAt: new Date().toISOString(),
                    displayName: 'Sapien BOT',
                    message: `This is the beggining of the conversation on the room: ${room.name}, say Hi! or Hola!`,
                  }}
                />
              </li>
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
                            timestampMessages[index - 1]?.authorID !==
                            message.authorID
                          }
                        />
                      );
                    })}
                  </li>
                );
              })}
              <li ref={bottomFeedRef} />
            </ul>
          </div>
          <div className="px-5">
            {/* @ts-ignore */}
            <RoomEditor onSubmit={handleMessageSubmit} name={room.name} />
          </div>
        </div>

        {/* Room Details */}
        <Details />
      </>
    </div>
  );
};

const RoomProxy = () => {
  const { query } = useRouter();

  if (_isEmpty(query)) return null;

  const apiKey = `/api/v3/room/${query.viewID}/messages`;

  return (
    <Query api={apiKey}>
      {() => {
        console.log(apiKey);
        return <Room />;
      }}
    </Query>
  );
};

export default RoomProxy;
