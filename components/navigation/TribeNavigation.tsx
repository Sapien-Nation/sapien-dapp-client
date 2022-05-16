import { UserGroupIcon, PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

// constants
import { AboutObject } from 'tools/constants/rooms';

// components
import {
  CreateChannelDialog,
  CreateRoomDialog,
} from 'components/tribe/dialogs';

// hooks
import {
  useTribe,
  // useTribeChannels,
  useTribePermission,
  useTribeRooms,
} from 'hooks/tribe';
import { RedDot } from 'components/common';

// types

interface Props {
  handleMobileMenu: () => void;
}

enum Dialog {
  CreateChannel,
  CreateRoom,
}

const TribeNavigation = ({ handleMobileMenu }: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const { asPath, query } = useRouter();
  const { tribeID, viewID } = query;

  const tribe = useTribe(tribeID as string);
  const rooms = useTribeRooms(tribeID as string);
  // const channels = useTribeChannels(tribeID as string);
  const [canAddRoom] = useTribePermission(tribeID as string, ['canAddRoom']);
  if (!tribe || !rooms) {
    return;
  }

  const { name } = tribe;

  const getRoomListItemClassName = (id: string, hasUnreadMessages: boolean) => {
    const isOnChannelView = id === viewID;

    if (isOnChannelView) {
      if (hasUnreadMessages)
        return 'text-sm bg-sapien-white font-bold rounded-md hover:bg-sapien-neutral-800';
      return 'text-sm bg-sapien-neutral-800 rounded-md';
    }

    if (hasUnreadMessages)
      return 'text-sm bg-sapien-white font-bold rounded-md hover:bg-sapien-neutral-800';

    return 'text-gray-300 text-sm hover:bg-sapien-neutral-800 rounded-md';
  };

  return (
    <>
      <div className="w-full">
        <div>
          <nav>
            <Link href={`/tribes/${tribeID}/home`} passHref>
              <a
                className={
                  asPath === `/tribes/${tribeID}/home`
                    ? 'gap-1 font-bold relative w-full cursor-pointer tracking-wide items-center uppercase font-medium text-base flex rounded-lg focus:outline-none px-4 py-2 bg-primary-200 hover:bg-sapien-neutral-800'
                    : 'gap-1 relative w-full cursor-pointer tracking-wide items-center uppercase font-medium text-base flex rounded-lg focus:outline-none px-4 py-2 hover:bg-sapien-neutral-800'
                }
                onClick={handleMobileMenu}
              >
                <img
                  src="/images/sapien_nation.png"
                  alt="Sapien Nation"
                  className="w-6"
                />
                {name}
              </a>
            </Link>
            {/* <button
              aria-label="Create Channel"
              className="px-4 py-2 mt-4 text-xs w-full flex justify-between items-center text-sapien-neutral-200 font-bold"
              onClick={() => {
                setDialog(Dialog.CreateChannel);
                handleMobileMenu();
              }}
            >
              Channels <PlusIcon className="text-sapien-neutral-200 w-5" />
            </button>
            <ul className="px-2 py-2 cursor-pointer">
              {channels.map(({ avatar, id, membersCount, name }) => {
                return (
                  <li
                    className={`${
                      id === viewID
                        ? 'text-sm bg-primary-200 rounded-md'
                        : 'text-gray-300 text-sm hover:bg-sapien-neutral-800 rounded-md'
                    }`}
                    key={id}
                  >
                    <Link href={`/tribes/${tribeID}/${id}`} passHref>
                      <a
                        className="flex items-center p-2 my-1"
                        onClick={handleMobileMenu}
                      >
                        {avatar ? (
                          <img
                            alt="channel-image"
                            className="object-cover h-10 w-10 rounded-md"
                            src={avatar}
                          />
                        ) : (
                          <div className="bg-sapien-neutral-200 h-10 w-10 rounded-md flex items-center justify-center">
                            {name[0].toUpperCase()}
                          </div>
                        )}
                        <div className="ml-2">
                          <p className="block">{name}</p>
                          <p
                            className={`${
                              id === viewID ? '' : 'text-sapien-neutral-200'
                            } font-extralight text-xs`}
                          >
                            {membersCount} members
                          </p>
                        </div>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul> */}
          </nav>
        </div>

        <div>
          <nav>
            {canAddRoom === true && (
              <button
                aria-label="Create Room"
                className="px-4 py-2 mt-4 text-xs w-full flex justify-between items-center text-sapien-neutral-200 font-bold"
                onClick={() => {
                  setDialog(Dialog.CreateRoom);
                  handleMobileMenu();
                }}
              >
                ROOMS <PlusIcon className="text-sapien-neutral-200 w-5" />
              </button>
            )}
            <ul className="px-2 py-2 cursor-pointer">
              {rooms.map(({ id, name, unreads }) => {
                return (
                  <li
                    className={getRoomListItemClassName(id, unreads > 0)}
                    key={id}
                  >
                    <Link href={`/tribes/${tribeID}/${id}`} passHref>
                      <a
                        className="flex px-2 py-1 my-1 items-center gap-2"
                        onClick={handleMobileMenu}
                      >
                        <div className="flex">
                          # {name} <RedDot count={unreads} />
                        </div>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Modals */}
        {dialog === Dialog.CreateRoom && (
          <CreateRoomDialog
            aboutObject={AboutObject.Party}
            aboutObjectId={tribeID as string}
            onClose={() => setDialog(null)}
          />
        )}
        {dialog === Dialog.CreateChannel && (
          <CreateChannelDialog onClose={() => setDialog(null)} />
        )}
      </div>
    </>
  );
};

export default TribeNavigation;
