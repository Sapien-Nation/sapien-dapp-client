import { LockClosedIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

// components
import { Query } from 'components/common';

// hooks
import { useTribeBadge } from 'hooks/tribe/badge';

// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  avatar: string;
  color: string;
  badgeID: string;
  tribeName: string;
}

const ManageBadgeView = ({ badgeID, tribeName, avatar, color }: Props) => {
  const { query } = useRouter();
  const badge = useTribeBadge(badgeID);

  const tribeID = query.tribeID as string;
  const { rooms } = badge.tribes.find((tribe) => tribe.id === tribeID);

  return (
    <div className="grid gap-4 border border-gray-800 rounded-md flex-col px-3 py-4">
      <div className="flex gap-4 items-center">
        {avatar ? (
          <img
            src={avatar}
            alt="Tribe Avatar"
            className={`border-2 w-8 h-8 object-cover rounded-full cursor-pointer`}
            style={{ borderColor: color }}
          />
        ) : (
          <div
            className="w-8 h-8 rounded-full bg-gray-700 border-2 font-bold text-black group-hover:text-gray-500 flex items-center justify-center"
            style={{ borderColor: color }}
          >
            {badge.name[0].toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="flex text-lg flex-1 text-sapien-neutral-100 gap-3">
            {badge.name} - {tribeName}
          </h1>
          <span className="text-sapien-neutral-200 truncate">
            {badge.description}
          </span>
        </div>
      </div>
      <div className="grid gap-5">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {badge.tribes.map((tribe) => (
            <li key={tribe.id} className="relative">
              <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                {tribe.avatar ? (
                  <img
                    src={tribe.avatar}
                    alt=""
                    className="object-cover pointer-events-none group-hover:opacity-75"
                  />
                ) : (
                  <div className="h-28 w-28 bg-gray-700 border-2 font-bold text-black group-hover:text-gray-500 flex items-center justify-center">
                    {tribe.name[0].toUpperCase()}
                  </div>
                )}
              </div>
              <p className="mt-2 block text-sm font-medium text-white truncate pointer-events-none">
                {tribe.name}
              </p>
              <p className="block text-sm font-medium text-white pointer-events-none">
                {tribe.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {rooms.length > 0 && (
        <div className="grid gap-5">
          <h2 className="text-xl text-gray-300 underline">Badge Rooms</h2>
          <ul role="list">
            {rooms.map((room) => {
              const roomIcon = (
                <span className="flex items-center w-3">
                  {room.private ? <LockClosedIcon className="w-[10px]" /> : '#'}
                </span>
              );
              return (
                <li
                  key={room.id}
                  className="text-md p-2 hover:bg-purple-600 rounded-md"
                >
                  <div className="flex py-1 items-center">
                    <span className="w-full">
                      <div className="flex gap-1">
                        {roomIcon} {room.name}
                      </div>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const ManageBadgeViewProxy = ({ badge }: { badge: TribeBadge }) => {
  return (
    <Query api={`/core-api/badge/${badge.id}`}>
      {() => (
        <ManageBadgeView
          badgeID={badge.id}
          tribeName={badge.tribeName}
          avatar={badge.avatar}
          color={badge.color}
        />
      )}
    </Query>
  );
};

export default ManageBadgeViewProxy;
