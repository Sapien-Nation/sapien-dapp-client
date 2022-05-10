import { BellIcon, UserGroupIcon, PlusIcon } from '@heroicons/react/outline';
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
import { useTribeNotifications } from 'hooks/notifications';
import { useTribe, useTribeChannels, useTribeRooms } from 'hooks/tribe';

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
  const channels = useTribeChannels(tribeID as string);
  const { unreadNotificationsCount } = useTribeNotifications();

  if (!tribe || !rooms) {
    return;
  }

  const { name } = tribe;

  const getChannelListItemClassName = (id) => {
    const isOnChannelView = id === viewID;
    const haveUnreadNotifications = false; // TODO we need to filter unreadNotifications to see if there is unread notifications

    if (isOnChannelView) {
      if (haveUnreadNotifications)
        return 'text-sm bg-sapien-white font-extrabold rounded-md hover:bg-sapien-neutral-800';
      return 'text-sm bg-sapien-neutral-800 rounded-md';
    }

    if (haveUnreadNotifications)
      return 'text-sm bg-sapien-white font-extrabold rounded-md hover:bg-sapien-neutral-800';

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
                    ? 'font-extrabold relative w-full cursor-pointer tracking-wide items-center uppercase font-medium text-xs flex rounded-lg focus:outline-none px-4 py-2 bg-primary-200'
                    : 'relative w-full cursor-pointer tracking-wide items-center uppercase font-medium text-xs flex rounded-lg focus:outline-none px-4 py-2 '
                }
                onClick={handleMobileMenu}
              >
                <UserGroupIcon className="h-5 w-5 mr-4" />
                {name}
              </a>
            </Link>
            <Link href={`/tribes/${tribeID}/notifications`} passHref>
              <a
                className={
                  asPath === `/tribes/${tribeID}/notifications`
                    ? 'mt-4 font-extrabold relative w-full cursor-pointer tracking-wide items-center uppercase font-medium text-xs flex rounded-lg focus:outline-none px-4 py-2 bg-primary-200'
                    : 'mt-4 relative w-full cursor-pointer tracking-wide items-center uppercase font-medium text-xs flex rounded-lg focus:outline-none px-4 py-2'
                }
                onClick={handleMobileMenu}
              >
                <BellIcon className="h-5 w-5 mr-4" />
                Notifications
                {unreadNotificationsCount > 0 && (
                  <span className="flex h-5 w-5 relative ml-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 items-center justify-center text-10px font-bold">
                      {unreadNotificationsCount >= 100
                        ? '99+'
                        : unreadNotificationsCount}
                    </span>
                  </span>
                )}
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
            <ul className="px-2 py-2 cursor-pointer">
              {rooms.map(({ id, name }) => {
                return (
                  <li className={getChannelListItemClassName(id)} key={id}>
                    <Link href={`/tribes/${tribeID}/${id}`} passHref>
                      <a
                        className="block px-2 py-1 my-1"
                        onClick={handleMobileMenu}
                      >
                        # {name}
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
