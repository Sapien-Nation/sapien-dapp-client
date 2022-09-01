import _groupBy from 'lodash/groupBy';
import AutoSizer from 'react-virtualized-auto-sizer';
import Link from 'next/link';
import { ChevronUpIcon, XIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import { FixedSizeList as List } from 'react-window';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

// constats
import { RoomMemberType } from 'tools/constants/rooms';

// hooks
import { useRoomMembers } from 'hooks/room';
import { Query } from 'components/common';

const groupLabel = {
  [RoomMemberType.Admin]: 'ADMIN',
  [RoomMemberType.Participant]: 'PARTICIPANTS',
};

const Details = ({ handleSidebar }) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;
  const roomID = query.viewID as string;
  const threadID = query.thread as string;
  const members = useRoomMembers(threadID ?? roomID);

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
    <aside className="w-72 h-full flex flex-col border-l border-gray-700 overflow-y-auto">
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
      <Query api={`/core-api/room/${roomID}/threads`}>
        {(threads) => {
          if (threads.length === 0) return null;

          return (
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between border-b border-gray-700 h-10 px-5 w-full">
                    <span className="text-md text-gray-300 font-bold">
                      Threads
                    </span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="py-3 border-b border-gray-700 border overflow-auto max-h-[50%]">
                    <ul className="">
                      {threads.map((thread) => (
                        <li
                          className="w-full hover:bg-gray-800 mb-1 px-5"
                          key={thread.id}
                        >
                          <Link
                            href={`/tribes/${tribeID}/${thread.parentId}?thread=${thread.id}`}
                          >
                            <a>
                              <span className="font-semibold block truncate">
                                {thread.name}
                              </span>
                              <span className="font-medium text-gray-400 truncate">
                                {thread.messages[0]?.content}
                              </span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          );
        }}
      </Query>
      <div className="border-b border-gray-700 h-10 px-5 w-full flex items-center">
        <h3 className="text-md text-gray-300 font-bold">
          Members ({members.length})
        </h3>
      </div>
      <ul className="overflow-auto flex-1">
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
                  userType,
                  // @ts-ignore
                  badges,
                } = membersList[index];
                return (
                  <li
                    data-testid="room-detail-member"
                    key={id}
                    className="flex gap-2 items-center mb-4 cursor-pointer truncate px-5"
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
                    )}
                  </li>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </ul>
    </aside>
  );
};

export default Details;
