import * as Sentry from '@sentry/nextjs';
import { SparklesIcon, PlusIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useSWRConfig } from 'swr';

// api
import { leaveTribe, readAllTribeNotifications } from 'api/tribe';

// constants
import { Role } from 'tools/constants/tribe';
import { AboutObject } from 'tools/constants/rooms';

// components
import {
  CreateChannelDialog,
  CreateRoomDialog,
} from 'components/tribe/dialogs';
import { MenuLink, Query, RedDot } from 'components/common';
import { EditTribeDialog } from 'components/tribe/dialogs';

// hooks
import {
  useMainTribe,
  useTribe,
  useTribePermission,
  useTribeRooms,
} from 'hooks/tribe';

// assets
import VaultIcon from './assets/Vault';

// types
import type { MainFeedTribe, ProfileTribe } from 'tools/types/tribe';

interface Props {
  handleMobileMenu: () => void;
}

enum Dialog {
  CreateChannel,
  CreateRoom,
  EditTribe,
}

const TribeNavigation = ({ handleMobileMenu }: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const { mutate } = useSWRConfig();
  const { asPath, query } = useRouter();

  const { tribeID, viewID } = query;

  const tribe = useTribe(tribeID as string);
  const rooms = useTribeRooms(tribeID as string);
  const [canAddRoom, canLeave, canEdit] = useTribePermission(
    tribeID as string,
    ['canAddRoom', 'canLeave', 'canEdit']
  );
  const { redirectToMainTribeChannel } = useMainTribe();

  if (!tribe || !rooms) {
    return;
  }

  const { name, role } = tribe;

  const hasRoomsNotifications = rooms.some(({ unreads }) => Boolean(unreads));
  const isTribeOwnerOrTribeAdmin = role === Role.Owner || role === Role.Admin;

  const handleReadAllRooms = async () => {
    try {
      await readAllTribeNotifications(tribeID as string);

      mutate(
        '/core-api/profile/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.map((cacheTribe) =>
            cacheTribe.id === tribeID
              ? {
                  ...cacheTribe,
                  rooms: cacheTribe.rooms.map((cacheRoom) => ({
                    ...cacheRoom,
                    unreads: 0,
                    lastMessageId: '',
                  })),
                }
              : cacheTribe
          ),
        false
      );
    } catch (err) {
      Sentry.captureMessage(err);
    }
  };

  const handleLeaveTribe = async () => {
    try {
      redirectToMainTribeChannel();

      await leaveTribe(tribeID as string);

      mutate(
        '/core-api/profile/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.filter((tribeCache) => tribeCache.id !== tribe.id),
        false
      );
    } catch (err) {
      Sentry.captureMessage(err);
    }
  };

  const getRoomListItemClassName = (id: string, hasUnreadMessages: boolean) => {
    const isOnChannelView = id === viewID;

    if (isOnChannelView) {
      if (hasUnreadMessages)
        return 'text-sm bg-sapien-white font-bold rounded-l-md hover:bg-sapien-neutral-800';
      return 'text-sm bg-sapien-neutral-800 rounded-l-md';
    }

    if (hasUnreadMessages)
      return 'text-sm bg-sapien-white font-bold rounded-l-md hover:bg-sapien-neutral-800';

    return 'text-gray-300 text-sm hover:bg-sapien-neutral-800 rounded-l-md';
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
                    ? 'gap-1 h-10 font-bold relative w-full cursor-pointer tracking-wide items-center uppercase text-sm flex rounded-lg focus:outline-none px-2 py-2 bg-sapien-neutral-800'
                    : 'gap-1 h-10 font-bold relative w-full cursor-pointer tracking-wide items-center uppercase text-sm flex rounded-lg focus:outline-none px-2 py-2 hover:bg-sapien-neutral-800'
                }
                onClick={handleMobileMenu}
              >
                <img
                  src="/images/sapien_nation.png"
                  alt="Sapien Nation"
                  className="w-6 pt-0.5"
                />
                <span className="flex-1 truncate">{name}</span>
                <Menu as="div" className="relative text-left -right-2">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-50 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-60 origin-top-right divide-y divide-gray-700 rounded-md bg-sapien-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {false && (
                        <div className="px-1 py-1">
                          {tribe.isUpgraded === true && (
                            <Menu.Item>
                              <div>
                                <SparklesIcon className="w-5 mr-1" />
                                Tribe Upgraded
                              </div>
                            </Menu.Item>
                          )}

                          {tribe.isUpgraded === false && (
                            <Menu.Item>
                              {({ active }) => (
                                <MenuLink
                                  className={`${
                                    active ? 'bg-gray-800' : ''
                                  } group flex w-full items-center rounded-sm px-2 py-2 text-sm text-primary-100`}
                                  href={`/tribes/${tribeID}/upgrade`}
                                  passHref
                                >
                                  <SparklesIcon className="w-5 mr-1" />
                                  Upgrade Tribe
                                </MenuLink>
                              )}
                            </Menu.Item>
                          )}
                        </div>
                      )}

                      <div className="px-1 py-1">
                        {canEdit === true && (
                          <Menu.Item>
                            {({ active }) => (
                              <>
                                <div
                                  onClick={() => {
                                    setDialog(Dialog.EditTribe);
                                  }}
                                  className="text-sm cursor-pointer hover:bg-sapien-neutral-600 text-white p-2 rounded flex justify-between normal-case"
                                >
                                  Edit Tribe
                                </div>
                              </>
                            )}
                          </Menu.Item>
                        )}

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              disabled={!hasRoomsNotifications}
                              onClick={handleReadAllRooms}
                              className={`${
                                active ? 'bg-gray-800' : ''
                              } group flex w-full items-center rounded-sm px-2 py-2 text-sm text-white ${
                                hasRoomsNotifications
                                  ? 'cursor-pointer'
                                  : 'cursor-not-allowed'
                              }`}
                            >
                              Read all
                            </button>
                          )}
                        </Menu.Item>
                      </div>

                      {canLeave && (
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLeaveTribe}
                                className={`${
                                  active ? 'bg-gray-800' : ''
                                } group flex w-full items-center rounded-sm px-2 py-2 text-sm text-white`}
                              >
                                Leave Tribe
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </a>
            </Link>

            {/* TODO Manage Badges */}
            {false && (
              <Link aria-label="Tribe Vault" href={`/tribes/${tribeID}/vault`}>
                <a
                  className={
                    asPath === `/tribes/${tribeID}/vault`
                      ? 'px-4 gap-2 py-2 mt-4 text-sm w-full flex items-center text-gray-300 cursor-pointer'
                      : 'px-4 gap-2 py-2 mt-4 text-sm w-full flex items-center text-gray-300 cursor-pointer'
                  }
                >
                  <VaultIcon />
                  Manage Badges
                </a>
              </Link>
            )}
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
                className="pl-4 pr-2.5 py-2 mt-4 text-xs w-full flex justify-between items-center text-sapien-neutral-200 font-bold"
                onClick={() => {
                  setDialog(Dialog.CreateRoom);
                  handleMobileMenu();
                }}
              >
                ROOMS <PlusIcon className="text-sapien-neutral-200 w-4" />
              </button>
            )}
            <ul className="pl-1 py-2 cursor-pointer -mr-2">
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
        {dialog === Dialog.EditTribe && (
          <Query api={`/core-api/tribe/${tribe.id}`} loader={null}>
            {(tribeInfo: MainFeedTribe) => (
              <EditTribeDialog
                tribe={tribeInfo}
                onClose={() => setDialog(null)}
              />
            )}
          </Query>
        )}
      </div>
    </>
  );
};

export default TribeNavigation;
