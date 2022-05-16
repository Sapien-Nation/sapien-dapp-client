import { RefreshIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

// api
import { joinRoom } from 'api/room';

// hooks
import { useToast } from 'context/toast';

// components
import { SEO } from 'components/common';

// helpers
import { formatDate, formatDateRelative } from 'utils/date';

const JoinRoom = () => {
  const [isFetching, setIsFetching] = useState(false);

  const toast = useToast();
  const { query } = useRouter();
  const { mutate } = useSWRConfig();

  const roomID = query.viewID as string;
  const handleJoinRoom = async () => {
    setIsFetching(true);
    try {
      await joinRoom(roomID);

      mutate(`/core-api/room/${roomID}`);
    } catch (err) {
      toast({ message: err });
    }
    setIsFetching(false);
  };

  const date = new Date().toISOString();
  return (
    <div className="bg-sapien-neutral-800 h-full flex flex-row p-0 lg:rounded-3xl">
      <>
        <SEO title="Join the Room" />
        <div className="flex flex-col h-full flex-1 overflow-hidden">
          <div className="relative flex-1 overflow-auto">
            <h1 className="sr-only">You cant see this room</h1>
            <ul role="list" className="p-5 w-full flex flex-col mb-5">
              <li>
                <time
                  className="block text-xs overflow-hidden text-gray-500 text-center w-full relative before:w-[48%] before:absolute before:top-2 before:h-px before:block before:bg-gray-800 before:-left-8 after:w-[48%] after:absolute after:top-2 after:h-px after:block after:bg-gray-800 after:-right-8"
                  dateTime={date}
                  data-testid="join-room-time-header"
                >
                  {formatDate(date)}
                </time>
                <div className="py-2 hover:bg-gray-800 rounded-md px-6 flex justify-between items-start group">
                  <div className="flex space-x-3 w-full">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/b851e8f8-a660-4d6a-be68-6177a5d40956-110x110.png"
                      alt="monkey with glasses"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium">
                          Harambe at Sapien
                        </h3>
                        <time
                          dateTime={date}
                          className="text-xs text-gray-500"
                          data-testid="join-room-harambe-message-timestamp"
                        >
                          {formatDateRelative(date)}
                        </time>
                      </div>
                      <p className="text-sm text-gray-500 flex gap-4 items-center">
                        Hey, seems like you are not a member of this channel
                        <button
                          type="button"
                          onClick={handleJoinRoom}
                          className={
                            isFetching
                              ? 'cursor-not-allowed flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                              : 'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                          }
                          disabled={isFetching}
                        >
                          {isFetching && (
                            <RefreshIcon className="animate-spin h-5 w-5 mr-3" />
                          )}
                          Join
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    </div>
  );
};

export default JoinRoom;
