import { useState } from 'react';
import { useRouter } from 'next/router';

// api
import { createContent } from 'api/content';

// components
import { ContentItemChannel } from 'components/content';
import { Head, InfiniteScroll } from 'components/common';
import { ChannelEditor } from 'slatejs';

// context
import { useToast } from 'context/toast';

// hooks
import { useTribeChannels } from 'hooks/tribe';

// types
import type { Content as ContentType } from 'tools/types/content';

enum Transition {
  Idle,
  Submitting,
  Success,
}

const Channel = () => {
  const [transition, setTransition] = useState<Transition>(Transition.Idle);

  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const channel = useTribeChannels(tribeID as string).find(
    ({ id }) => id === viewID
  );

  const toast = useToast();

  const handleSubmit = async () => {
    setTransition(Transition.Submitting);
    try {
      const body = {
        data: 'Content',
        groupId: channel.id,
      };

      await createContent(body);
      setTransition(Transition.Success);
    } catch (error) {
      toast({
        message: error || 'Error while creating the content, please try again',
      });
    }
    setTransition(Transition.Idle);
  };

  return (
    <>
      <Head title={channel.name} />
      <h1 className="sr-only">{channel.name}</h1>
      <div>
        <ChannelEditor onSubmit={handleSubmit} name={channel.name} />
      </div>
      <InfiniteScroll
        apiUrl={`/api/v3/channel/${channel.id}/feed`}
        hardReload={transition === Transition.Success}
      >
        {(contentList: Array<ContentType>) => (
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
        )}
      </InfiniteScroll>
    </>
  );
};

export default Channel;
