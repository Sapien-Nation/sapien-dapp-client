import { LockClosedIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

// hooks
import { useTribeBadge } from 'hooks/tribe/badge';

interface Props {
  badgeID: string;
}

const Permissions = ({ badgeID }: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const { tribes } = useTribeBadge(badgeID);
  const { rooms } = tribes.find((tribe) => tribe.id === tribeID);

  if (rooms.length === 0) {
    return <h1>This badge has no rooms associated yet</h1>;
  }

  return (
    <div className="w-full">
      <ul>
        {rooms.map((room) => {
          const roomIcon = (
            <span className="flex items-center w-3">
              {room.private ? <LockClosedIcon className="w-[10px]" /> : '#'}
            </span>
          );
          return (
            <li className="text-md p-2 rounded-md bg-gray-400" key={room.id}>
              <div className="flex px-2 py-1 items-center">
                <span className="w-full flex gap-1">
                  {roomIcon} {room.name}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Permissions;
