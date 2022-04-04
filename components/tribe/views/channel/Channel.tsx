import { useRouter } from 'next/router';

// api
import { createContent } from 'api/content';

// components
import { ContentItemChannel } from 'components/content';
import { Head, InfiniteScroll, Query } from 'components/common';
import { ChannelEditor } from 'slatejs';
import EmptyFeed from './EmptyFeed';
import ChannelHeader from './ChannelHeader';

// context
import { useToast } from 'context/toast';

// hooks
import { useTribeChannels } from 'hooks/tribe';

// types
import type { Content } from 'tools/types/content';
import type { Channel as ChannelType } from 'tools/types/channel';

const Channel = () => {
  const { push, query } = useRouter();
  const { tribeID, viewID } = query;

  const channel = useTribeChannels(tribeID as string).find(
    ({ id }) => id === viewID
  );

  const toast = useToast();

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
    <>
      <Head title={channel.name} />
      <h1 className="sr-only">{channel.name}</h1>
      <Query api={`/api/v3/channel/${viewID}`}>
        {(channel: ChannelType) => <ChannelHeader channel={channel} />}
      </Query>
      <div>
        <ChannelEditor onSubmit={handleSubmit} name={channel.name} />
      </div>
      <InfiniteScroll apiUrl={`/api/v3/channel/${channel.id}/feed`}>
        {(contentList: Array<Content>) => {
          if (contentList.length === 0) return <EmptyFeed />;
          return (
            <ul className="py-4">
              {contentList.map((content) => (
                <li
                  key={content.id}
                  className="my-2 border-[1px] border-gray-800 rounded-md"
                >
                  <ContentItemChannel
                    content={content}
                    tribeID={tribeID as string}
                  />
                </li>
              ))}
            </ul>
          );
        }}
      </InfiniteScroll>
    </>
  );
};

export default Channel;
