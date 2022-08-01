import { partition } from 'lodash';
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
    <div className="flex flex-col h-full w-72 bg-transparent text-white overflow-hidden -right-full border-l border-gray-700">
      <Query api={`/core-api/channel/${channelID}/members`}>
        {(members: Array<ChannelContributor>) => {
          const [contributors, participants] = partition(
            members,
            ({ isContributor }) => isContributor
          );

          const member = {
            id: null,
            avatar: null,
            displayName: null,
            username: null,
            badges: [],
          };

          const membersList = [
            {
              ...member,
              isContributor: true,
            },
            ...contributors,
            {
              ...member,
              isContributor: false,
            },
            ...participants,
          ];

          return (
            <>
              <div className="border-b border-gray-700 h-10 w-full flex items-center px-5">
                <h3 className="text-md text-gray-300 font-bold ">
                  Members ({members.length})
                </h3>
              </div>
              <ul className="overflow-auto flex-1 px-5">
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      className="List"
                      height={height}
                      itemCount={membersList.length}
                      itemSize={55}
                      width={width}
                    >
                      {({ index, style }) => {
                        const {
                          id,
                          avatar,
                          displayName,
                          username,
                          badges,
                          isContributor,
                        } = membersList[index];

                        return (
                          <li
                            data-testid="room-detail-member"
                            key={id}
                            className="flex gap-2 items-center mb-4 cursor-pointer truncate"
                            style={style}
                          >
                            {id === null ? (
                              <h3 className="text-sm text-gray-300">
                                {isContributor
                                  ? 'CONTRIBUTORS'
                                  : 'PARTICIPANTS'}
                              </h3>
                            ) : (
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
                            )}
                          </li>
                        );
                      }}
                    </List>
                  )}
                </AutoSizer>
              </ul>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default ChannelLeftBar;
