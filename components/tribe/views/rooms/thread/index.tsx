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
import ThreadFeed from '../feed/ThreadFeed';
import { JoinRoom, Skeleton } from '../views';
import { Query } from 'components/common';

// hooks
import { useTribeRoom } from 'hooks/tribe';

interface RoomProps {
  apiKey: string;
  threadID: string;
}

const Room = ({ apiKey, threadID }: RoomProps) => {
  const [isLoading, setLoading] = useState(false);

  const { query } = useRouter();

  const { tribeID, viewID } = query;

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
    <ThreadFeed
      apiKey={mutateFetchAPI}
      threadID={threadID}
      roomID={viewID as string}
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

interface RoomProxyProps {
  isMember: boolean;
  name: string;
  threadID: string;
  isPrivate: boolean;
}

const ThreadRoomProxy = ({
  isMember,
  name,
  threadID,
  isPrivate,
}: RoomProxyProps) => {
  if (isMember === false) {
    if (isPrivate) {
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

  const apiKey = `/core-api/room/${threadID}/messages`;

  return (
    <>
      <h1 className="sr-only">Thread Room View for {name}</h1>
      <Query api={apiKey} loader={<Skeleton />}>
        {() => {
          return <Room threadID={threadID} apiKey={apiKey} />;
        }}
      </Query>
    </>
  );
};

export default ThreadRoomProxy;
