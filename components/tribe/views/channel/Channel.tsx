import {
  EmojiHappyIcon,
  ExternalLinkIcon,
  PaperAirplaneIcon,
  PencilAltIcon,
  PhotographIcon,
} from '@heroicons/react/solid';
import {
  ArrowNarrowLeftIcon,
  ArrowsExpandIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import useSWR, { useSWRConfig } from 'swr';
import Link from 'next/link';

// api
import axios from 'axios';
import { createContent } from 'api/content';

// components
import { ContentItemChannel } from 'components/content';
import { Query, UserAvatar } from 'components/common';
import { InlineEditor, ExpandedEditor } from 'tinymc';
import ChannelHeader from './ChannelHeader';
import ChannelLeftBar from './ChannelLeftBar';
import ChannelHeaderPlaceholder from './ChannelHeaderPlaceholder';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// constants
import { ContentType } from 'tools/constants/content';

// hooks
import { useChannel, useChannelPermissions } from 'hooks/channel';
import { usePassport } from 'hooks/passport';

// types
import type { Content } from 'tools/types/content';

interface Props {
  apiKey: string;
}

const Channel = ({ apiKey }: Props) => {
  const [postType, setPostType] = useState<ContentType>(ContentType.POST);
  const [hasContent, setHasContent] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [isPublishing, setPublishing] = useState(false);
  const [initialEditorValue, setInitialEditorValue] = useState('');
  const isPublishDisabled = isPublishing || !hasContent;

  const { me } = useAuth();
  const toast = useToast();
  const channel = useChannel();
  const passport = usePassport();
  const { mutate } = useSWRConfig();
  const { push, query } = useRouter();
  const { data: swrData } = useSWR(apiKey);

  const tribeID = query.tribeID as string;
  const channelID = query.viewID as string;

  const [canPost] = useChannelPermissions(channelID, ['canPost']);

  const editorRef = useRef(null);

  useEffect(() => {
    setShowEditor(false);
  }, [channelID]);

  const handleSubmit = async (event) => {
    event.preventDefault();
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

        mutate(apiKey);
      }
    } catch (error) {
      setPublishing(false);
      toast({
        message: error,
      });
    }
  };

  const handleOnContentChange = (rawContent: string) => {
    const textOnlyContent = editorRef.current.getContent({
      format: 'text',
    });

    const isImgTag = /\<img\s+src=.*\">/.test(rawContent);

    setHasContent(Boolean(textOnlyContent.trim().length) || isImgTag);
  };

  let mutateFetchAPI = apiKey;
  return (
    <>
      <h1 className="sr-only">{channel.name}</h1>
      <div className="h-full flex flex-row bg-sapien-neutral-800 lg:rounded-tl-3xl">
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="grid gap-4">
            <ChannelHeader
              channel={channel}
              showMembers={() => setShowMembers(!showMembers)}
            />
            {canPost === true && (
              <div className="bg-sapien-neutral-600 p-3 rounded-xl mb-4 overflow-y-auto">
                <div className="flex justify-end">
                  <button
                    className="grid-cols-1 flex justify-end"
                    type="button"
                    onClick={() => {
                      setInitialEditorValue(editorRef.current?.getContent());
                      setShowEditor(true);

                      queueMicrotask(() => {
                        setTimeout(() => {
                          editorRef.current?.execCommand('SelectAll', false);
                        }, 500);
                      });
                    }}
                  >
                    <ArrowsExpandIcon className={'w-4 h-4'} />
                  </button>
                </div>
                <div className="flex gap-2 lg:rounded-3xl p-5">
                  <UserAvatar user={me} passport={passport} />

                  {showEditor === false && (
                    <form
                      id="editor-form"
                      className="flex-col flex-1"
                      onSubmit={handleSubmit}
                    >
                      <div className="h-auto min-h-[100px] max-h-48 overflow-auto rounded-md outline-0 border-none ring-0 p-4 bg-sapien-neutral-800">
                        <InlineEditor
                          editorRef={editorRef}
                          onChange={handleOnContentChange}
                          initialValue={initialEditorValue}
                        />
                        <div className="flex gap-24 mt-7 justify-between">
                          <div className="flex gap-3 justify-center flex-1">
                            <button
                              className="flex gap-3 items-center"
                              type="button"
                              onClick={() =>
                                editorRef.current.execCommand('mceEmoticons')
                              }
                            >
                              <EmojiHappyIcon className="w-5 h-5 text-orange-400" />
                              Emotion
                            </button>
                            <button
                              className="flex gap-3 items-center"
                              type="button"
                              onClick={() =>
                                editorRef.current.execCommand('mceImage')
                              }
                            >
                              <PhotographIcon className="w-5 h-5 text-green-400" />
                              Photo/Video/Audio
                            </button>
                            <button
                              className="flex gap-3 items-center"
                              type="button"
                              onClick={() =>
                                editorRef.current.execCommand('mceMedia')
                              }
                            >
                              <PhotographIcon className="w-5 h-5 text-blue-400" />
                              Embed
                            </button>
                            <button
                              className="flex gap-3 items-center"
                              type="button"
                              onClick={() =>
                                editorRef.current.execCommand('mceLink')
                              }
                            >
                              <ExternalLinkIcon className="w-5 h-5 text-purple-400" />
                              Link
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end w-full mt-2">
                        <button
                          type="submit"
                          form="editor-form"
                          className={`flex items-center gap-2 rounded-full border border-transparent shadow-sm px-2 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:text-sm
                                            ${
                                              isPublishDisabled
                                                ? 'cursor-not-allowed bg-primary/50'
                                                : 'cursor-pointer bg-primary hover:bg-sapien-80'
                                            }`}
                          onClick={handleSubmit}
                          disabled={isPublishDisabled}
                        >
                          {isPublishing ? (
                            <RefreshIcon className="w-5 animate-spin" />
                          ) : (
                            <PaperAirplaneIcon className="w-5 rotate-90" />
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
            <InfiniteScroll
              className="scroll-auto mt-4"
              pageStart={0}
              loadMore={async (cursor: string) => {
                try {
                  mutateFetchAPI = `${apiKey}?nextCursor=${cursor}&limit=25`;
                  const response = await axios(mutateFetchAPI);
                  mutate(
                    apiKey,
                    ({ data }) => {
                      return {
                        data: [...data, ...response?.data?.data],
                        nextCursor: response?.data?.nextCursor,
                      };
                    },
                    false
                  );
                } catch (err) {
                  // err
                }
              }}
              hasMore={swrData?.nextCursor !== null}
              loader={null}
              useWindow={false}
              initialLoad={false}
              threshold={450}
            >
              <ul>
                {swrData?.data.map((content) => (
                  <li className="mb-8 last:mb-0" key={content.id}>
                    <Link
                      href={`/tribes/${tribeID}/content?id=${content.id}`}
                      passHref
                    >
                      <a>
                        <ContentItemChannel
                          content={content}
                          tribeID={tribeID as string}
                        />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          </div>
        </div>
        <div
          className={`bg-sapien-neutral-800 h-full fixed bottom-0 lg:static lg:right-0 transition-all duration-300 ${
            showMembers ? 'right-0 lg:hidden' : '-right-full'
          }`}
        >
          <ChannelLeftBar />
        </div>
      </div>

      {/* Editor */}
      {showEditor && (
        <>
          <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center bg-sapien-neutral-800">
            <div>
              <ExpandedEditor
                editorRef={editorRef}
                initialValue={initialEditorValue}
                onChange={handleOnContentChange}
              />
            </div>
          </div>
          <button
            className="absolute top-2 left-5 flex items-center gap-2 border border-transparent px-6 py-2 text-base font-medium text-white focus:outline-none sm:text-sm"
            onClick={() => {
              setInitialEditorValue(editorRef.current?.getContent());
              setShowEditor(false);

              queueMicrotask(() => {
                setTimeout(() => {
                  editorRef.current?.execCommand('SelectAll', false);
                }, 500);
              });
            }}
          >
            <ArrowNarrowLeftIcon className="text-white w-5" /> Back
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className={`flex items-center gap-2 bottom-10 absolute right-10 rounded-full border border-transparent shadow-sm px-2 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:text-sm
            ${
              isPublishDisabled
                ? 'cursor-not-allowed bg-primary/50'
                : 'cursor-pointer bg-primary hover:bg-sapien-80'
            }`}
            disabled={isPublishDisabled}
          >
            {isPublishing ? (
              <RefreshIcon className="w-5 animate-spin" />
            ) : (
              <PaperAirplaneIcon className="w-5 rotate-90" />
            )}
          </button>
        </>
      )}
    </>
  );
};

const ChannelProxy = () => {
  const { query } = useRouter();

  const channelID = query.viewID as string;

  const [canView] = useChannelPermissions(channelID, ['canView']);

  if (canView === false) {
    return (
      <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
            alt="People working on laptops"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
        </div>
        <div className="px-4 py-4 flex flex-col gap-4 absolute justify-center items-center w-full text-center h-full">
          <p>You don&apos;t have access to see this view </p>
        </div>
      </div>
    );
  }
  const apiKey = `/core-api/channel/${channelID}/feed`;

  return (
    <>
      <h1 className="sr-only">Channel View</h1>
      <Query api={apiKey} loader={<ChannelHeaderPlaceholder />}>
        {() => <Channel apiKey={apiKey} />}
      </Query>
    </>
  );
};

export default ChannelProxy;
