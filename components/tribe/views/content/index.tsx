import { useRouter } from 'next/router';

// components
import { NotFound, Query } from 'components/common';
import { ContentDetail } from 'components/content';

// types
import type { Content } from 'tools/types/content';

const ContentView = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id) {
    return <NotFound message="We could't find any content for this search" />;
  }

  return (
    <Query api={`/api/v3/post/${id}`} loader={null}>
      {(content: Content) => (
        <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5">
          <ContentDetail content={content} />
        </div>
      )}
    </Query>
  );
};

export default ContentView;
