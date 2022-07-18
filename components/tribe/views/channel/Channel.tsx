import { ArrowNarrowLeftIcon, RefreshIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

// api
import { createContent } from 'api/content';

// components
import { ContentItemChannel } from 'components/content';
import { Query } from 'components/common';
import ChannelEditor from 'tinymc';
import ChannelHeader from './ChannelHeader';
import ChannelHeaderPlaceholder from './ChannelHeaderPlaceholder';

// context
import { useToast } from 'context/toast';

// hooks
import { useTribeChannels } from 'hooks/tribe';

// types
import type { Content } from 'tools/types/content';
import type {
  Channel as ChannelType,
  ChannelContributor,
} from 'tools/types/channel';

const Channel = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [showMembers, setShowMembers] = useState(true);
  const [isPublishing, setPublishing] = useState(false);

  const { push, query } = useRouter();

  const tribeID = query.tribeID as string;
  const channelID = query.viewID as string;

  const endDivRef = useRef(null);
  const editorRef = useRef(null);
  const belowEditorRef = useRef(null);

  const channel = useTribeChannels().find(({ id }) => id === channelID);

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
        message: error,
      });
    }
  };

  return (
    <>
      <div className="h-full flex flex-row bg-sapien-neutral-800">
        <div className="flex-1 lg:rounded-3xl p-5">
          <h1 className="sr-only">{channel.name}</h1>
          <Query
            api={`/core-api/channel/${channelID}`}
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
              <ul>
                {[].map((content) => (
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
        <div className="flex flex-col h-full w-72 bg-sapien-neutral-600 text-white p-5 overflow-y-auto -right-full">
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
