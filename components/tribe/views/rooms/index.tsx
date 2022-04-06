import _isEmpty from 'lodash/isEmpty';
import _groupBy from 'lodash/groupBy';
import { useRouter } from 'next/router';
import { DotsHorizontalIcon } from '@heroicons/react/outline';

// components
import { SEO } from 'components/common';
import { RoomEditor } from 'slatejs';
import Details from './Details';
import EmptyRoom from './EmptyRoom';
import Message from './Message';

// helpers
import { formatDate } from 'utils/date';

// hooks
import { useTribeRooms } from 'hooks/tribe';
import { useEffect, useRef, useState } from 'react';

// mocks
import messages from './mocks';

const Room = () => {
  const [showDetails, setShowDetails] = useState(false);

  const { query } = useRouter();
  const { tribeID, viewID } = query;
  const room = useTribeRooms(tribeID as string).find(({ id }) => id === viewID);

  const bottomFeedRef = useRef(null);
  const feedMessages = _groupBy(messages, ({ createdAt }) =>
    formatDate(createdAt)
  );

  useEffect(() => {
    // Start chat at the bottom
    if (bottomFeedRef.current) {
      bottomFeedRef.current.scrollIntoView();
    }
  }, []);

  const handleMessageSubmit = () => {};

  return (
    <div className="bg-sapien-neutral-800 h-full flex flex-row p-0 lg:rounded-t-none">
      <>
        <SEO title={room.name} />
        <div className="flex flex-col h-full flex-1 overflow-hidden">
          <div className="text-gray-200 h-10 px-5 border-b-[1px] border-gray-700 relative text-sm z-50 flex justify-end items-center">
            <button
              aria-label="Toggle Details"
              className="flex"
              onClick={() => setShowDetails(!showDetails)}
            >
              <DotsHorizontalIcon className="w-5 ml-2" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-5 mb-2">
            <h1 className="sr-only">Room View for {room.name}</h1>
            {_isEmpty(feedMessages) ? (
              <EmptyRoom />
            ) : (
              <ul role="list" className="h-full w-full flex flex-col">
                {Object.keys(feedMessages).map((timestamp) => {
                  const timestampMessages = feedMessages[timestamp];
                  return (
                    <li key={timestamp}>
                      <time
                        className="block text-xs overflow-hidden text-gray-500 text-center w-full relative before:w-[48%] before:absolute before:top-2 before:h-[1px] before:block before:bg-gray-800 before:-left-8 after:w-[48%] after:absolute after:top-2 after:h-[1px] after:block after:bg-gray-800 after:-right-8"
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
            )}
          </div>
          <div className="px-5">
            {/* @ts-ignore */}
            <RoomEditor onSubmit={handleMessageSubmit} name={room.name} />
          </div>
        </div>

        {/* Room Details */}
        {showDetails && <Details messages={feedMessages} />}
      </>
    </div>
  );
};

export default Room;
