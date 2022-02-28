import { useState } from 'react';
import { parse } from 'node-html-parser';
import { tw } from 'twind';

// api
import { createContent } from 'api/content';

// components
import {
  DefaultCover,
  InfiniteScroll,
  Head,
  Header,
  Page,
} from 'components/common';
import { Content, PlaceholderContent } from 'components/content';

// components
import Editor from 'components/slate';

// context
import { useToast } from 'context/toast';

// utils
import { serialize } from 'components/slate/utils';

// types
import type { Channel } from 'tools/types/channel';
import type { Content as ContentType } from 'tools/types/content';
import type { CustomElement } from 'components/slate/types';

interface Props {
  channel: Channel;
  channelID: string;
}

enum State {
  Idle,
  Submitting,
  Success,
}

const ChannelView = ({ channelID, channel }: Props) => {
  const [state, setState] = useState<State>(State.Idle);

  const toast = useToast();
  const handleSubmit = async (values) => {
    setState(State.Submitting);
    try {
      const body = {
        data: values.map((node: CustomElement) => JSON.stringify(node)),
        groupId: channelID,
      };

      const rawHTML = parse(
        values.map((node: CustomElement) => JSON.stringify(node))
      );
      const preview =
        rawHTML.querySelector('img')?.rawAttributes?.['data-fileKey'];

      if (preview) {
        (body as any).preview = preview;
      }

      await createContent(body);
      setState(State.Success);
    } catch (error) {
      toast({
        message: error || 'Error while creating the content, please try again',
      });
    }
    setState(State.Idle);
  };

  return (
    <>
      <Head title={channel.name} />
      <Page
        header={
          channel.cover ? (
            <Header alt={channel.name} src={channel.cover} />
          ) : (
            <DefaultCover name={channel.name} />
          )
        }
      >
        <div
          className={tw`max-w-2xl w-full mx-4 md:mx-auto md:max-w-2xl rounded-xl border-1 my-6`}
        >
          <Editor
            onSubmit={handleSubmit}
            isFetching={state === State.Submitting}
          />
        </div>

        <InfiniteScroll
          apiUrl={`/api/v3/channel/${channelID}/feed`}
          hardReload={state === State.Success}
        >
          {(contentList: Array<ContentType>) => (
            <>
              {contentList.map((content) => (
                <Content key={content.id} content={content} />
              ))}
            </>
          )}
        </InfiniteScroll>
      </Page>
    </>
  );
};

export default ChannelView;
