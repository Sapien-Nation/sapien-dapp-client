import { UserGroupIcon, PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

// components
import { CreateRoomDialog } from 'components/tribe/dialogs';

// hooks
import { useTribe, useTribeRooms } from 'hooks/tribe';

// utils
import { mergeClassNames } from 'utils/styles';

enum Dialog {
  CreateRoom,
}

const TribeNavigation = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const { asPath, query } = useRouter();
  const { tribeID } = query;

  const { name } = useTribe(tribeID as string);
  const rooms = useTribeRooms(tribeID as string);

  return (
    <>
      <div className="w-full">
        <div>
          <nav>
            <button
              className={mergeClassNames(
                asPath === `/tribes/${tribeID}/home` ? 'font-extrabold' : '',
                'relative w-full cursor-pointer tracking-wide items-center uppercase font-medium text-xs flex rounded-lg focus:outline-none px-4 py-2 bg-primary-200'
              )}
            >
              <UserGroupIcon className="h-5 w-5 mr-4" />
              {name}
            </button>
            <button
              className="px-4 py-2 mt-4 text-xs w-full flex justify-between items-center text-sapien-neutral-200 font-bold"
              onClick={() => setDialog(Dialog.CreateRoom)}
            >
              ROOMS <PlusIcon className="text-sapien-neutral-200 w-5" />
            </button>
            <ul className="px-4 py-2 cursor-pointer">
              {rooms.map(({ id, name }) => {
                return (
                  <Link href={`/tribes/${tribeID}/${id}`} passHref key={id}>
                    <a>
                      <li className="text-sm">{name}</li>
                    </a>
                  </Link>
                );
              })}
            </ul>
          </nav>
        </div>
        {/* Modals */}
        {dialog === Dialog.CreateRoom && (
          <CreateRoomDialog onClose={() => setDialog(null)} />
        )}
      </div>
    </>
  );
};

export default TribeNavigation;
