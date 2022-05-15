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
import { Query, SEO } from 'components/common';
import Feed from './feed';
import { JoinRoom, Skeleton } from './views';

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
}

const RoomProxy = ({ isMember, name }: RoomProxyProps) => {
  const { query } = useRouter();

  if (isMember === false) {
    return <JoinRoom />;
  }

  if (_isEmpty(query)) return null;

  const roomID = query.viewID as string;
  const apiKey = `/core-api/room/${roomID}/messages`;

  return (
    <>
      <SEO title={name} />
      <h1 className="sr-only">Room View for {name}</h1>

      <Query api={apiKey} loader={<Skeleton />}>
        {() => (
          <Query api={`/core-api/room/${roomID}/members`}>
            {() => <Room roomID={roomID} apiKey={apiKey} />}
          </Query>
        )}
      </Query>
    </>
  );
};

export default RoomProxy;
