import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

// components
import { SEO, Query } from 'components/common';
import { ContentItemMainChannel } from 'components/content';
import MainChannelHeader from './MainChannelHeader';
import ChannelHeaderPlaceholder from './ChannelHeaderPlaceholder';
import EmptyMainFeed from './EmptyMainFeed';

// hooks
import { useTribe } from 'hooks/tribe';
import useGetInfinitePages from 'hooks/useGetInfinitePages';
import useOnScreen from 'hooks/useOnScreen';

// types
import type { Content as ContentType } from 'tools/types/content';
import type { MainFeedTribe } from 'tools/types/tribe';

const MainChannel = () => {
  const { query } = useRouter();
  const { tribeID } = query;

  const tribe = useTribe(tribeID as string);
  const endDivRef = useRef(null);
  const belowEditorRef = useRef(null);

  const shouldFetchMoreItems = useOnScreen(endDivRef);
  const { data, fetchMore, isLoadingInitialData } = useGetInfinitePages<{
    data: Array<ContentType>;
    nextCursor: string | null;
  }>(`/api/v3/tribe/${tribeID}/feed`);

  useEffect(() => {
    // Start chat at the bottom
    if (belowEditorRef.current) {
      belowEditorRef.current.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    if (shouldFetchMoreItems) {
      fetchMore();
    }
  }, [fetchMore, shouldFetchMoreItems]);

  return (
    <div className="bg-sapien-neutral-800 lg:rounded-t-3xl p-5">
      <SEO title={tribe.name} />
      <h1 className="sr-only">Main Channel for Tribe {tribe.name}</h1>
      <Query
        api={`/api/v3/tribe/${tribeID}`}
        loader={<ChannelHeaderPlaceholder />}
      >
        {(tribe: MainFeedTribe) => <MainChannelHeader tribe={tribe} />}
      </Query>
      <div className="mt-4 min-h-400">
        {isLoadingInitialData === false && data.length === 0 ? (
          <EmptyMainFeed />
        ) : null}

        <ul>
          {data.map((content) => (
            <li key={content.id}>
              <ContentItemMainChannel
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

export default MainChannel;
