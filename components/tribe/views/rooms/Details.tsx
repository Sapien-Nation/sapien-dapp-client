import { XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// constats
import { RoomMemberType } from 'tools/constants/rooms';

// components
import { Query } from 'components/common';

// types
import type { RoomDetailMember } from 'tools/types/room';

const Details = ({ handleSidebar }) => {
  const { query } = useRouter();

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
      <Query api={`/core-api/room/${query.viewID}/members`}>
        {(members: Array<RoomDetailMember>) => (
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
                    itemCount={members.length}
                    itemSize={55}
                    width={width}
                  >
                    {({ index, style }) => {
                      const { id, avatar, username, userType } = members[index];
                      return (
                        <li
                          data-testid="room-detail-member"
                          key={id}
                          className="flex gap-2 items-center mb-4 cursor-pointer"
                          style={style}
                        >
                          {renderMemberAvatar(avatar, username)}
                          <span className="truncate">{username}</span>
                          {userType === RoomMemberType.Admin ? (
                            <span className="text-xs"> (Admin) </span>
                          ) : (
                            ''
                          )}
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
    </aside>
  );
};

export default Details;
