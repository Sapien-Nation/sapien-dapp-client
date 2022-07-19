import {
  ArrowNarrowLeftIcon,
  ArrowsExpandIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteScroll from 'react-infinite-scroller';
import useSWR, { useSWRConfig } from 'swr';

// api
import axios from 'axios';
import { createContent } from 'api/content';

// components
import { ContentItemChannel } from 'components/content';
import { Query, UserAvatar } from 'components/common';
import { InlineEditor, ExpandedEditor } from 'tinymc';
import ChannelHeader from './ChannelHeader';
import ChannelHeaderPlaceholder from './ChannelHeaderPlaceholder';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// hooks
import { usePassport } from 'hooks/passport';
import { useTribeChannels } from 'hooks/tribe';

// types
import type { Content } from 'tools/types/content';
import type {
  Channel as ChannelType,
  ChannelContributor,
} from 'tools/types/channel';

interface Props {
  apiKey: string;
}

const Channel = ({ apiKey }: Props) => {
  const [showEditor, setShowEditor] = useState(false);
  const [isPublishing, setPublishing] = useState(false);

  const { me } = useAuth();
  const toast = useToast();
  const passport = usePassport();
  const { mutate } = useSWRConfig();
  const { push, query } = useRouter();
  const { data: swrData } = useSWR(apiKey);

  const tribeID = query.tribeID as string;
  const channelID = query.viewID as string;

  const editorRef = useRef(null);

  const channel = useTribeChannels().find(({ id }) => id === channelID);

  useEffect(() => {
    setShowEditor(false);
  }, [channelID]);

  const renderMemberAvatar = (avatar: string, username: string) => {
    if (avatar) {
      return (
        <img
          className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
          src={avatar}
          alt=""
        />
      );
    }

    if (username) {
      return (
        <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
          {username[0].toUpperCase()}
        </div>
      );
    }

    return (
      <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
        S
      </div>
    );
  };

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
      }
    } catch (error) {
      setPublishing(false);
      toast({
        message: error,
      });
    }
  };

  let mutateFetchAPI = apiKey;
  return (
    <>
      <h1 className="sr-only">{channel.name}</h1>
      <div className="h-full flex flex-row bg-sapien-neutral-800">
        <div className="flex-1 lg:rounded-3xl p-5 overflow-y-auto">
          <div className="grid gap-4">
            <Query
              api={`/core-api/channel/${channelID}`}
              loader={<ChannelHeaderPlaceholder />}
            >
              {(channel: ChannelType) => <ChannelHeader channel={channel} />}
            </Query>
            <div className="bg-sapien-neutral-600 p-3 rounded-xl mb-4">
              <div className="flex gap-2 lg:rounded-3xl p-5">
                <UserAvatar user={me} passport={passport} />

                {showEditor === false && (
                  <form
                    id="editor-form"
                    className="col-span-10 bg-sapien-neutral-200  min-h-10 h-auto max-h-48 overflow-auto rounded-md flex-1 p-2 outline-0 border-none ring-0"
                    onSubmit={handleSubmit}
                  >
                    <InlineEditor
                      editorRef={editorRef}
                      initialValue={editorRef.current?.getContent()}
                    />
                  </form>
                )}
                {showEditor === false && (
                  <button type="button" onClick={() => setShowEditor(true)}>
                    <ArrowsExpandIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <button
                  type="submit"
                  form="editor-form"
                  className={
                    isPublishing
                      ? 'cursor-not-allowed  flex items-center gap-2 bottom-10 right-10 rounded-full border border-transparent shadow-sm px-6 py-2 text-base font-medium text-white bg-primary hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:text-sm'
                      : 'cursor-pointer  flex items-center gap-2 bottom-10 right-10 rounded-full border border-transparent shadow-sm px-6 py-2 text-base font-medium text-white bg-primary hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:text-sm'
                  }
                  onClick={handleSubmit}
                  disabled={isPublishing}
                >
                  {isPublishing && <RefreshIcon className="w-5 animate-spin" />}{' '}
                  Publish
                </button>
              </div>
            </div>
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
                  <li key={content.id}>
                    <ContentItemChannel
                      content={content}
                      tribeID={tribeID as string}
                    />
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          </div>
        </div>
        <div className="flex flex-col h-full w-72 bg-sapien-neutral-600 text-white p-5  overflow-hidden -right-full  rounded-tl-md">
          <Query api={`/core-api/channel/${channelID}/contributors`}>
            {(contributors: Array<ChannelContributor>) => (
              <>
                <h3 className="text-md  text-gray-300 font-bold">
                  Contributors ({contributors.length})
                </h3>
                <ul className="overflow-auto flex-1">
                  <AutoSizer>
                    {({ height, width }) => (
                      <List
                        className="List"
                        height={height}
                        itemCount={contributors.length}
                        itemSize={55}
                        width={width}
                      >
                        {({ index, style }) => {
                          const { id, avatar, displayName, username, badges } =
                            contributors[index];
                          return (
                            <li
                              data-testid="room-detail-member"
                              key={id}
                              className="flex gap-2 items-center mb-4 cursor-pointer truncate"
                              style={style}
                            >
                              <>
                                {username &&
                                  renderMemberAvatar(avatar, username)}
                                <div className="truncate leading-none">
                                  <span className="truncate flex gap-1 items-center">
                                    {displayName === ' '
                                      ? '[hidden]'
                                      : displayName}{' '}
                                    {badges.length > 0 && (
                                      <img
                                        src={badges[0].avatar}
                                        alt="badge"
                                        style={{ borderColor: badges[0].color }}
                                        className="h-5 w-5 object-cover rounded-full border-2 hover:cursor-pointer"
                                      />
                                    )}
                                  </span>
                                  <span className="truncate text-xs text-gray-400">
                                    @{username}{' '}
                                  </span>
                                </div>
                              </>
                            </li>
                          );
                        }}
                      </List>
                    )}
                  </AutoSizer>
                </ul>
              </>
            )}
          </Query>
        </div>
      </div>

      {/* Editor */}
      {showEditor && (
        <>
          <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center bg-white">
            <div>
              <ExpandedEditor
                editorRef={editorRef}
                initialValue={editorRef.current.getContent()}
              />
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

const ChannelProxy = () => {
  const { query } = useRouter();

  const channelID = query.viewID as string;
  const apiKey = `/core-api/channel/${channelID}/feed`;

  return (
    <>
      <h1 className="sr-only">Channel View</h1>;
      <Query api={apiKey}>{() => <Channel apiKey={apiKey} />}</Query>
    </>
  );
};

export default ChannelProxy;
