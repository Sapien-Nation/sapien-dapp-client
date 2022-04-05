import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

// components
import { SEO, InfiniteScroll, Query } from 'components/common';
import { ContentItemMainChannel } from 'components/content';
import MainChannelHeader from './MainChannelHeader';
import ChannelHeaderPlaceholder from './ChannelHeaderPlaceholder';
import EmptyMainFeed from './EmptyMainFeed';

// hooks
import { useTribe } from 'hooks/tribe';

// types
import type { Content as ContentType } from 'tools/types/content';
import type { MainFeedTribe } from 'tools/types/tribe';

const MainChannel = () => {
  const { query } = useRouter();
  const { tribeID } = query;

  const tribe = useTribe(tribeID as string);
  const belowEditorRef = useRef(null);

  useEffect(() => {
    // Start chat at the bottom
    if (belowEditorRef.current) {
      belowEditorRef.current.scrollIntoView();
    }
  }, []);

  return (
    <>
      <SEO title={tribe.name} />
      <h1 className="sr-only">Main Channel for Tribe {tribe.name}</h1>
      <Query
        api={`/api/v3/tribe/${tribeID}`}
        loader={<ChannelHeaderPlaceholder />}
      >
        {(tribe: MainFeedTribe) => <MainChannelHeader tribe={tribe} />}
      </Query>
      <div className="min-h-[400px]">
        <InfiniteScroll
          apiUrl={`/api/v3/tribe/${tribeID}/feed`}
          emptyComponent={<EmptyMainFeed />}
        >
          {(contentList: Array<ContentType>) => {
            if (contentList.length === 0) return <EmptyMainFeed />;
            return (
              <>
                {contentList.map((content) => (
                  <ContentItemMainChannel
                    key={content.id}
                    content={content}
                    tribeID={tribeID as string}
                  />
                ))}
              </>
            );
          }}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default MainChannel;
