import _groupBy from 'lodash/groupBy';
import { useCallback, useMemo } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// constats
import { RoomMemberType } from 'tools/constants/rooms';

// hooks
import { useRoomMembers } from 'hooks/room';

const groupLabel = {
  [RoomMemberType.Admin]: 'ADMIN',
  [RoomMemberType.Participant]: 'PARTICIPANTS',
};

const Details = ({ handleSidebar }) => {
  const { query } = useRouter();
  const members = useRoomMembers(query.viewID as string);

  const renderMemberAvatar = (avatar: string, username: string) => {
    if (avatar) {
      return (
        <img
          className="w-10 h-10 rounded-full flex-shrink-0"
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

  const membersList = useMemo(() => {
    const groups = _groupBy(members, (member) => member.userType);

    return Object.entries(groups)
      .map(([key, value]) => {
        return [
          {
            id: null,
            avatar: null,
            displayName: null,
            username: null,
            userType: key,
          },
          ...value,
        ];
      })
      .reduce((prev, acc) => [...prev, ...acc], []);
  }, [members]);

  return (
    <aside className="w-72 h-full flex flex-col border-l border-gray-700">
      <div className="absolute -left-10 top-0 bg-sapien-red-700 lg:hidden">
        <button
          type="button"
          className="flex items-center justify-center h-10 w-10 focus:outline-none"
          onClick={handleSidebar}
        >
          <span className="sr-only">Close sidebar</span>
          <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
        </button>
      </div>
      <>
        <div className="border-b border-gray-700 h-10 px-5 mb-5 w-full flex items-center">
          <h3 className="text-md  text-sapien-neutral-400 font-bold ">
            Members ({members.length})
          </h3>
        </div>
        <ul className="px-5 overflow-auto flex-1">
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
                  const { id, avatar, displayName, username, userType } =
                    membersList[index];
                  return (
                    <li
                      data-testid="room-detail-member"
                      key={id}
                      className="flex gap-2 items-center mb-4 cursor-pointer truncate"
                      style={style}
                    >
                      {id === null ? (
                        <h3 className="text-sm text-gray-300">
                          {groupLabel[userType] ?? '-'}
                        </h3>
                      ) : (
                        <>
                          {username && renderMemberAvatar(avatar, username)}
                          <div className="truncate leading-none">
                            <span className="block truncate">
                              {displayName}
                            </span>
                            <span className="truncate text-xs text-gray-400">
                              @{username}
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
    </aside>
  );
};

export default Details;
