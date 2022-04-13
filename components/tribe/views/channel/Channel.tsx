import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { ArrowNarrowLeftIcon, RefreshIcon } from '@heroicons/react/outline';

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
  const [showEditor, setShowEditor] = useState(false);
  const [isPublishing, setPublishing] = useState(false);

  const { push, query } = useRouter();
  const { tribeID, viewID } = query;

  const endDivRef = useRef(null);
  const editorRef = useRef(null);
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

    return () => {
      setShowEditor(false);
    };
  }, [fetchMore, shouldFetchMoreItems]);

  const handleSubmit = async () => {
    try {
      setPublishing(true);
      if (editorRef.current) {
        const content = editorRef.current.getContent();
        editorRef.current.setDirty(false);

        const body = {
          mimeType: 'text/html',
          data: content,
          groupId: channel.id,
        };

        const response: Content = await createContent(body);

        setPublishing(false);
        push(`/tribes/${tribeID}/content?id=${response.id}`);
      }
    } catch (error) {
      setPublishing(false);
      toast({
        message:
          error.message || 'Error while creating the content, please try again',
      });
    }
  };

  return (
    <>
      <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5">
        <SEO title={channel.name} />
        <h1 className="sr-only">{channel.name}</h1>
        <Query
          api={`/api/v3/channel/${viewID}`}
          loader={<ChannelHeaderPlaceholder />}
        >
          {(channel: ChannelType) => (
            <ChannelHeader
              channel={channel}
              handleWriteAnArticle={() => setShowEditor(true)}
            />
          )}
        </Query>
        <div ref={belowEditorRef} />
        {!showEditor && (
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
        )}
      </div>
      {/* Editor */}
      {showEditor && (
        <>
          <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center bg-white">
            <div>
              <ChannelEditor editorRef={editorRef} />
            </div>
          </div>
          <button
            className="absolute top-2 left-5 flex items-center gap-2 border border-transparent px-6 py-2 text-base font-medium text-gray-700 focus:outline-none sm:text-sm"
            onClick={() => setShowEditor(false)}
          >
            <ArrowNarrowLeftIcon className="text-gray-700 w-5" /> Back
          </button>
          <button
            className={`${
              isPublishing ? 'cursor-not-allowed' : 'cursor-pointer'
            } absolute flex items-center gap-2 bottom-10 right-10 rounded-full border border-transparent shadow-sm px-6 py-2 text-base font-medium text-white bg-primary hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:text-sm`}
            onClick={handleSubmit}
            disabled={isPublishing}
          >
            {isPublishing && <RefreshIcon className="w-5 animate-spin" />}{' '}
            Publish
          </button>
        </>
      )}
    </>
  );
};

export default Channel;
