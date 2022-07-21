import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { useRouter } from 'next/router';

// components
import { Query } from 'components/common';

// types
import type { ChannelContributor } from 'tools/types/channel';

interface Props {
  channelID?: string;
}

const ChannelLeftBar = ({ channelID: channelIDProps }: Props) => {
  const { query } = useRouter();

  const channelID = channelIDProps ?? (query.viewID as string);

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

  return (
    <div className="flex flex-col h-full w-72 bg-sapien-neutral-600 text-white p-5 overflow-hidden -right-full">
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
                            {username && renderMemberAvatar(avatar, username)}
                            <div className="truncate leading-none">
                              <span className="truncate flex gap-1 items-center">
                                {displayName === ' ' ? '[hidden]' : displayName}{' '}
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
  );
};

export default ChannelLeftBar;
