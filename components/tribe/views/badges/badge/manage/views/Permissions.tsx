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
      <div className="flex flex-col items-center relative">
        <div className="shadow z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
          <div className="flex flex-col w-full">
            {rooms.map((room) => {
              const roomIcon = (
                <span className="flex items-center w-3">
                  {room.private ? <LockClosedIcon className="w-[10px]" /> : '#'}
                </span>
              );
              return (
                <div
                  key={room.id}
                  className="py-2 px-3 cursor-pointer bg-gray-900  border-transparent border-l-2 border-sapien"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {roomIcon}

                      {room.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
