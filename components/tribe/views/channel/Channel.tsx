import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

// api
import { createContent } from 'api/content';

// components
import { ContentItemChannel } from 'components/content';
import { SEO, Query } from 'components/common';
import ChannelEditor from 'tinymc';
import EmptyFeed from './EmptyFeed';
import ChannelHeader from './ChannelHeader';
import ChannelHeaderPlaceholder from './ChannelHeaderPlaceholder';

// context
import { useToast } from 'context/toast';

// hooks
import { useTribeChannels } from 'hooks/tribe';
import useGetInfinitePages from 'hooks/useGetInfinitePages';
import useOnScreen from 'hooks/useOnScreen';

// types
import type { Content } from 'tools/types/content';
import type { Channel as ChannelType } from 'tools/types/channel';

const Channel = () => {
  const { push, query } = useRouter();
  const { tribeID, viewID } = query;

  const endDivRef = useRef(null);
  const belowEditorRef = useRef(null);

  const channel = useTribeChannels(tribeID as string).find(
    ({ id }) => id === viewID
  );
  const shouldFetchMoreItems = useOnScreen(endDivRef);
  const { data, fetchMore, isLoadingInitialData } = useGetInfinitePages<{
    data: Array<Content>;
    nextCursor: string | null;
  }>(`/api/v3/channel/${channel.id}/feed`);

  const toast = useToast();

  useEffect(() => {
    // Start chat at the bottom
    if (belowEditorRef.current) {
      belowEditorRef.current.scrollIntoView({
        block: 'nearest',
        inline: 'start',
      });
    }
  }, []);

  useEffect(() => {
    if (shouldFetchMoreItems) {
      fetchMore();
    }
  }, [fetchMore, shouldFetchMoreItems]);

  const handleSubmit = async (text) => {
    try {
      const body = {
        data: text,
        groupId: channel.id,
      };

      const response: Content = await createContent(body);

      push(`/tribes/${tribeID}/content?id=${response.id}`);
    } catch (error) {
      toast({
        message: error || 'Error while creating the content, please try again',
      });
    }
  };

  return (
    <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5">
      <SEO title={channel.name} />
      <h1 className="sr-only">{channel.name}</h1>
      <Query
        api={`/api/v3/channel/${viewID}`}
        loader={<ChannelHeaderPlaceholder />}
      >
        {(channel: ChannelType) => <ChannelHeader channel={channel} />}
      </Query>
      <div>
        <ChannelEditor onSubmit={handleSubmit} name={channel.name} />
      </div>
      <div ref={belowEditorRef} />

      <div className="mt-4">
        {isLoadingInitialData === false && data.length === 0 ? (
          <EmptyFeed />
        ) : null}

        <ul>
          {data.map((content) => (
            <li key={content.id}>
              <ContentItemChannel
                content={content}
                tribeID={tribeID as string}
              />
            </li>
          ))}
          <div ref={endDivRef} />
        </ul>
      </div>
    </div>
  );
};

export default Channel;
