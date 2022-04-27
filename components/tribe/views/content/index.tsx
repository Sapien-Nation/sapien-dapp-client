import { useRouter } from 'next/router';

// components
import { NotFound, Query } from 'components/common';
import { ContentDetail } from 'components/content';

// hooks
import { useTribe, useWelcomeMessage } from 'hooks/tribe';

// types
import type { Content } from 'tools/types/content';

interface Props {
  contentID: string;
}

const ContentView = ({ contentID }: Props) => {
  return (
    <Query api={`/core-api/post/${contentID}`} loader={null}>
      {(content: Content) => (
        <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5">
          <ContentDetail content={content} />
        </div>
      )}
    </Query>
  );
};

const SapienWelcomeMessage = () => {
  const { query } = useRouter();
  const { tribeID } = query;

  const tribe = useTribe(tribeID as string);
  const welcomeMessage = useWelcomeMessage(tribe);

  return (
    <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5">
      <ContentDetail content={welcomeMessage} />
    </div>
  );
};

const ContentViewProxy = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id) {
    return <NotFound message="We could't find any content for this search" />;
  }

  if (id === 'sapien_welcome_message') {
    return <SapienWelcomeMessage />;
  }

  return <ContentView contentID={id as string} />;
};

export default ContentViewProxy;
