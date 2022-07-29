import { useRouter } from 'next/router';

// components
import { ChannelLeftBar } from 'components/tribe';
import { ContentItemChannel } from '.';

// types
import type { Content as ContentType } from 'tools/types/content';

interface Props {
  content: ContentType;
}

const ContentItem = ({ content }: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <div className="h-full flex flex-row bg-sapien-neutral-800 lg:rounded-3xl">
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="grid gap-4">
          <ContentItemChannel content={content} tribeID={tribeID} />
        </div>
      </div>
      <div className="hidden lg:flex">
        <ChannelLeftBar channelID={content.group.id} />
      </div>
    </div>
  );
};

export default ContentItem;
