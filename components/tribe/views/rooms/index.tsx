import * as Sentry from '@sentry/nextjs';
import _isEmpty from 'lodash/isEmpty';
import _groupBy from 'lodash/groupBy';
import _sortyBy from 'lodash/sortBy';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { useState } from 'react';

// api
import axios from 'api';

// components
import { Query } from 'components/common';
import Feed from './feed';
import { JoinRoom, Skeleton } from './views';

// hooks
import { useTribeRoom } from 'hooks/tribe';

// mocks
import { mockFeed } from 'tools/mocks/feed';

interface RoomProps {
  apiKey: string;
  roomID: string;
}

const Room = ({ apiKey, roomID }: RoomProps) => {
  const [isLoading, setLoading] = useState(false);

  const { query } = useRouter();

  const { tribeID } = query;

  const { mutate } = useSWRConfig();

  const { data: swrData } = useSWR(apiKey);

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
      data={[...swrData?.data, ...mockFeed().data] ?? []}
      onScrollTop={() => {
        if (swrData?.nextCursor !== null && !isLoading) {
          handleFetchMore(swrData?.nextCursor);
        }
      }}
      hasMoreData={swrData?.nextCursor !== null}
    />
  );
};

interface RoomProxyProps {
  isMember: boolean;
  name: string;
  roomID: string;
  tribeID: string;
}

const RoomProxy = ({ isMember, name, roomID, tribeID }: RoomProxyProps) => {
  const room = useTribeRoom(tribeID, roomID);

  if (isMember === false) {
    if (room.private) {
      return (
        <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
              alt="People working on laptops"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
          </div>
          <div className="px-4 py-4 flex flex-col gap-4 absolute justify-center items-center w-full text-center h-full">
            <p>You don&apos;t have access to see this view </p>
          </div>
        </div>
      );
    }
    return <JoinRoom />;
  }

  const apiKey = `/core-api/room/${roomID}/messages`;

  return (
    <Query api={apiKey} loader={<Skeleton />}>
      {() => (
        <Query api={`/core-api/room/${roomID}/members`}>
          {() => (
            <>
              <h1 className="sr-only">Room View for {name}</h1>

              <Room roomID={roomID} apiKey={apiKey} />
            </>
          )}
        </Query>
      )}
    </Query>
  );
};

export default RoomProxy;
