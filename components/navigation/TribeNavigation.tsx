import { UserGroupIcon, PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

// components
import {
  CreateChannelDialog,
  CreateRoomDialog,
} from 'components/tribe/dialogs';
import { ErrorView } from 'components/common';

// hooks
import { useTribe, useTribeChannels, useTribeRooms } from 'hooks/tribe';

// utils
import { mergeClassNames } from 'utils/styles';

enum Dialog {
  CreateChannel,
  CreateRoom,
}

const TribeNavigation = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const { asPath, query } = useRouter();
  const { tribeID, viewID } = query;

  const tribe = useTribe(tribeID as string);
  const rooms = useTribeRooms(tribeID as string);
  const channels = useTribeChannels(tribeID as string);

  if (!tribe || !rooms) {
    return <ErrorView message="There was a problem loading room list!" />;
  }

  const { name } = tribe;

  return (
    <>
      <div className="w-full">
        <div>
          <nav>
            <Link href={`/tribes/${tribeID}/home`} passHref>
              <a
                className={mergeClassNames(
                  asPath === `/tribes/${tribeID}/home` ? 'font-extrabold' : '',
                  'relative w-full cursor-pointer tracking-wide items-center uppercase font-medium text-xs flex rounded-lg focus:outline-none px-4 py-2 bg-primary-200'
                )}
              >
                <UserGroupIcon className="h-5 w-5 mr-4" />
                {name}
              </a>
            </Link>
            <button
              aria-label="Create Channel"
              className="px-4 py-2 mt-4 text-xs w-full flex justify-between items-center text-sapien-neutral-200 font-bold"
              onClick={() => setDialog(Dialog.CreateChannel)}
            >
              Channels <PlusIcon className="text-sapien-neutral-200 w-5" />
            </button>
            <ul className="px-2 py-2 cursor-pointer">
              {channels.map(({ id, name }) => {
                return (
                  <li
                    className={`${mergeClassNames(
                      id === viewID ? 'font-semibold' : 'text-gray-300',
                      'text-sm hover:bg-sapien-neutral-800 rounded-md hover:font-semibold'
                    )}`}
                    key={id}
                  >
                    <Link href={`/tribes/${tribeID}/${id}`} passHref>
                      <a className="block px-2 py-2">{name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div>
          <nav>
            <button
              aria-label="Create Room"
              className="px-4 py-2 mt-4 text-xs w-full flex justify-between items-center text-sapien-neutral-200 font-bold"
              onClick={() => setDialog(Dialog.CreateRoom)}
            >
              ROOMS <PlusIcon className="text-sapien-neutral-200 w-5" />
            </button>
            <ul className="px-2 py-2 cursor-pointer">
              {rooms.map(({ id, name }) => {
                return (
                  <li
                    className={`${mergeClassNames(
                      id === viewID ? 'font-semibold' : 'text-gray-300',
                      'text-sm hover:bg-sapien-neutral-800 rounded-md hover:font-semibold'
                    )}`}
                    key={id}
                  >
                    <Link href={`/tribes/${tribeID}/${id}`} passHref>
                      <a className="block px-2 py-2"># {name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Modals */}
        <CreateRoomDialog
          onClose={() => setDialog(null)}
          tribeID={tribeID as string}
          show={dialog === Dialog.CreateRoom}
        />
        <CreateChannelDialog
          onClose={() => setDialog(null)}
          show={dialog === Dialog.CreateChannel}
        />
      </div>
    </>
  );
};

export default TribeNavigation;
