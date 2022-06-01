import Link from 'next/link';
import { useRouter } from 'next/router';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  tribe: ProfileTribe;
  roomCount?: number;
}

function TribeNotificationHeader({ tribe, roomCount }: Props) {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <div className="flex flex-row w-full">
      <Link href={`/tribes/${tribe.id}/home`} key={tribe.id}>
        <a
          className={`h-12 w-12 group p-1 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-600 hover:text-gray-900 ${
            tribeID === tribe.id && 'border-white hover:border-white'
          }`}
        >
          {tribe.avatar ? (
            <img
              className="w-full h-full rounded-lg text-gray-400 bg-gray-900 group-hover:text-gray-500"
              alt={''}
              src={tribe.avatar}
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-gray-700 font-bold text-black group-hover:text-gray-500 flex items-center justify-center">
              {tribe.name[0].toUpperCase()}
            </div>
          )}
          <span className="sr-only">Go to {tribe.name}</span>
        </a>
      </Link>
      <div className="flex flex-col justify-start sm:ml-2">
        <h1 className="text-m text-left sm:text-left font-semibold">
          {tribe.name}
        </h1>
        <h2 className="text-xs text-gray-500 mb-4 sm:mb-0">
          {roomCount ? `${roomCount} rooms` : '123 members'}
        </h2>
      </div>
    </div>
  );
}

export default TribeNotificationHeader;
