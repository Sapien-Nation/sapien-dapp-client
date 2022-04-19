import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

// components
import { SEO, Query } from 'components/common';
import { ContentItemMainChannel } from 'components/content';
import { ProfileDialog } from 'components/profile';
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

enum Dialog {
  Profile,
}

const MainChannel = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const { asPath, push, query } = useRouter();
  const { tribeID } = query;

  const tribe = useTribe(tribeID as string);
  const endDivRef = useRef(null);
  const belowEditorRef = useRef(null);

  const shouldFetchMoreItems = useOnScreen(endDivRef);
  const { hasRachEnd, data, fetchMore, isLoadingInitialData, isFetchingMore } =
    useGetInfinitePages<{
      data: Array<ContentType>;
      nextCursor: string | null;
    }>(`/api/v3/tribe/${tribeID}/feed`);

  const checkIfCommingFromMintedPage = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.location.hash === '#minted';
  };

  useEffect(() => {
    if (belowEditorRef.current) {
      belowEditorRef.current.scrollIntoView();
    }

    if (checkIfCommingFromMintedPage()) {
      setDialog(Dialog.Profile);
    }
  }, []);

  useEffect(() => {
    if (
      shouldFetchMoreItems &&
      hasRachEnd === false &&
      isLoadingInitialData === false
    ) {
      fetchMore();
    }
  }, [fetchMore, hasRachEnd, isLoadingInitialData, shouldFetchMoreItems]);

  return (
    <>
      <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5">
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

      {/* Dialogs */}
      {dialog === Dialog.Profile && (
        <ProfileDialog
          onClose={() => {
            setDialog(null);

            if (checkIfCommingFromMintedPage()) {
              push(asPath.replace('#minted', ''));
            }
          }}
        />
      )}
    </>
  );
};

export default MainChannel;
