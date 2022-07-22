import * as Sentry from '@sentry/nextjs';
import { PlusIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  LockClosedIcon,
  CogIcon,
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import Lottie from 'react-lottie-player';

// api
import { leaveTribe, readAllTribeNotifications } from 'api/tribe';

// constants
import { Role } from 'tools/constants/tribe';
import { AboutObject } from 'tools/constants/rooms';

// components
import {
  CreateChannelDialog,
  CreateRoomDialog,
  ManageRoomDialog,
} from 'components/tribe/dialogs';
import { MenuLink, Query, RedDot, Tooltip } from 'components/common';
import { EditTribeDialog } from 'components/tribe/dialogs';

// hooks
import {
  useMainTribe,
  useTribe,
  useTribeChannels,
  useTribePermission,
  useTribeRooms,
} from 'hooks/tribe';

// assets
import starJSONLottie from 'components/navigation/lottie/star.json';
import { ManageIcon } from 'assets';

// types
import type { MainFeedTribe, ProfileTribe } from 'tools/types/tribe';

interface Props {
  handleMobileMenu: () => void;
}

enum Dialog {
  CreateChannel,
  CreateRoom,
  EditTribe,
  ManageRooms,
}

const mockRoomThread = ({
  id,
  title,
  ...rest
}: {
  id: number;
  title: string;
}) => {
  return {
    id,
    title,
    ...rest,
  };
};

const RoomThread = ({ thread }: { thread: any }) => {
  const ref = useRef(null);

  return (
    <>
      <li
        className="text-gray-300 text-sm hover:bg-sapien-neutral-800 px-2 py-1 rounded-md ml-5"
        ref={ref.current?.setTriggerRef}
      >
        <div className="truncate">{thread.title}</div>
      </li>
      <Tooltip ref={ref} text={thread.title} />
    </>
  );
};

const TribeNavigation = ({ handleMobileMenu }: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const { mutate } = useSWRConfig();
  const { asPath, query } = useRouter();

  const tribeID = query.tribeID as string;
  const viewID = query.viewID as string;

  const tribe = useTribe(tribeID);
  const rooms = useTribeRooms();
  const channels = useTribeChannels();
  const [canCreateRoom, canEditTribe, canLeaveTribe, canCreateChannel] =
    useTribePermission(tribeID, [
      'canCreateRoom',
      'canEditTribe',
      'canLeaveTribe',
      'canCreateChannel',
    ]);
  const { redirectToMainTribeChannel } = useMainTribe();

  const { name, role } = tribe;

  const hasRoomsNotifications = rooms.some(({ hasUnread }) => hasUnread);
  const isTribeOwnerOrTribeAdmin = role === Role.Owner || role === Role.Admin;

  const handleReadAll = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    setIsFetching(true);
    try {
      await readAllTribeNotifications(tribeID as string);

      mutate(
        '/core-api/user/tribes',
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
    setIsFetching(false);
  };

  const handleLeaveTribe = async () => {
    try {
      redirectToMainTribeChannel();

      await leaveTribe(tribeID as string);

      mutate(
        '/core-api/user/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.filter((tribeCache) => tribeCache.id !== tribe.id),
        false
      );
    } catch (err) {
      Sentry.captureMessage(err);
    }
  };

  const getRoomListItemClassName = ({
    id,
    unreadMentions,
    hasUnread,
  }: {
    id: string;
    unreadMentions: number;
    hasUnread: boolean;
  }) => {
    const isOnChannelView = id === viewID;

    if (isOnChannelView) {
      if (unreadMentions > 0)
        return 'text-sm bg-sapien-white font-bold rounded-md hover:bg-sapien-neutral-800';
      return 'text-sm bg-sapien-neutral-800 rounded-md';
    }

    if (unreadMentions > 0 || hasUnread === true)
      return 'text-sm bg-sapien-white font-bold rounded-md hover:bg-sapien-neutral-800';

    return 'text-gray-300 text-sm hover:bg-sapien-neutral-800 rounded-md';
  };

  return (
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
                  <Menu.Items className="absolute z-10 right-0 mt-2 w-60 origin-top-right divide-y divide-gray-700 rounded-md bg-sapien-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {isTribeOwnerOrTribeAdmin && (
                      <div className="px-1 py-1">
                        {tribe.isUpgraded === true && (
                          <Menu.Item>
                            <div className="flex w-full items-center rounded-sm px-1 py-2 text-sm text-primary-200">
                              <Lottie
                                animationData={starJSONLottie}
                                play
                                className="w-6 h-6 mr-1"
                              />
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
                                } group flex w-full items-center rounded-sm px-1 py-2 text-sm text-primary-200`}
                                href={`/tribes/${tribeID}/upgrade`}
                                passHref
                              >
                                <Lottie
                                  animationData={starJSONLottie}
                                  play
                                  className="w-6 h-6 mr-1"
                                />
                                Upgrade Tribe
                              </MenuLink>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                    )}

                    <div className="px-1 py-1">
                      {canEditTribe && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                setDialog(Dialog.EditTribe);
                              }}
                              className={`${
                                active ? 'bg-gray-800' : ''
                              } group flex w-full items-center rounded-sm px-2 py-2 text-sm text-white`}
                            >
                              Edit Tribe
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            disabled={!hasRoomsNotifications || isFetching}
                            onClick={handleReadAll}
                            className={`${
                              active ? 'bg-gray-800' : ''
                            } group flex w-full items-center rounded-sm px-2 py-2 text-sm text-white ${
                              hasRoomsNotifications
                                ? 'cursor-pointer'
                                : 'cursor-not-allowed'
                            }`}
                          >
                            Mark all as read
                          </button>
                        )}
                      </Menu.Item>
                    </div>

                    {canLeaveTribe && (
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

          {isTribeOwnerOrTribeAdmin && tribe.isUpgraded === true && (
            <Link aria-label="Tribe Badges" href={`/tribes/${tribeID}/badges`}>
              <a
                className={
                  asPath === `/tribes/${tribeID}/badges`
                    ? 'px-4 gap-2 py-2 mt-4 text-sm w-full flex items-center text-gray-300 cursor-pointer'
                    : 'px-4 gap-2 py-2 mt-4 text-sm w-full flex items-center text-gray-300 cursor-pointer'
                }
              >
                <ManageIcon className="w-4" fillColor="fill-white" />
                Manage Badges
              </a>
            </Link>
          )}
          <button
            aria-label="Create Channel"
            className="px-4 py-2 mt-4 text-xs w-full flex justify-between items-center text-sapien-neutral-200 font-bold"
            onClick={() => {
              if (canCreateChannel) {
                setDialog(Dialog.CreateChannel);
                handleMobileMenu();
              }
            }}
          >
            Channels{' '}
            {canCreateChannel && (
              <PlusIcon className="text-sapien-neutral-200 w-5" />
            )}
          </button>
          <ul
            className="px-2 py-2 cursor-pointer overflow-auto"
            style={{ maxHeight: 500 }}
          >
            {channels
              .filter(({ name }) => name !== 'Home Feed')
              .map(({ avatar, id, membersCount, name }) => {
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
                            onError={(event) => {
                              (event as any).target.onError = null;
                              event.currentTarget.src =
                                '/images/harambe_sapien.png';
                            }}
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
          </ul>
        </nav>
      </div>

      <div>
        <nav>
          <button
            aria-label="Create Room"
            className="pl-4 pr-2.5 py-2 mt-4 text-xs w-full flex justify-between items-center text-sapien-neutral-200 font-bold"
            onClick={() => {
              if (canCreateRoom) {
                setDialog(Dialog.CreateRoom);
                handleMobileMenu();
              }
            }}
          >
            ROOMS{' '}
            {canCreateRoom && (
              <PlusIcon className="text-sapien-neutral-200 w-4" />
            )}
          </button>
          <ul className="px-2 py-2 cursor-pointer w-full">
            {rooms.map((room) => {
              const roomIcon = (
                <span className="flex items-center w-3">
                  {room.private ? <LockClosedIcon className="w-[10px]" /> : '#'}
                </span>
              );

              return (
                <>
                  <li
                    className={getRoomListItemClassName({
                      id: room.id,
                      unreadMentions: room.unreadMentions,
                      hasUnread: room.hasUnread,
                    })}
                    key={room.id}
                  >
                    <div className="flex my-1 group px-2">
                      <Link href={`/tribes/${tribeID}/${room.id}`} passHref>
                        <a
                          className="flex py-1 items-center gap-2 flex-1"
                          onClick={handleMobileMenu}
                        >
                          <div className="flex gap-2">
                            {roomIcon} {room.name}{' '}
                            <RedDot count={room.unreadMentions} />
                          </div>
                        </a>
                      </Link>
                      <button
                        className="hidden group-hover:block"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoom(room.id);
                          setDialog(Dialog.ManageRooms);
                        }}
                      >
                        <CogIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </li>
                  <ul className="room-thread -mt-1">
                    {[].map((thread) => (
                      <RoomThread key={thread.id} thread={thread} />
                    ))}
                  </ul>
                </>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Dialogs */}
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

      {dialog === Dialog.ManageRooms && (
        <ManageRoomDialog
          roomID={selectedRoom}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
};

export default TribeNavigation;
