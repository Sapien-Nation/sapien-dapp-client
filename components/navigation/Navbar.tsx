import { Fragment, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import * as Sentry from '@sentry/nextjs';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSWRConfig } from 'swr';

// context
import { useAuth } from 'context/user';
import { usePassport } from 'hooks/passport';

// constants
import { NotificationsType as WSEvents } from 'tools/constants/notifications';
import { WSEvents as RoomWSEvents } from 'tools/constants/rooms';

// context
import { useSocket } from 'context/socket';

// components
import { UserAvatar, Query, RedDot } from 'components/common';
const Notifications = dynamic(() => import('components/notifications'));
// @ts-ignore
const Wallet = dynamic(() => import('wallet/Wallet'));

// icons
import { DropDownArrowIcon, NotificationsIcon } from 'assets';
import { ChevronDownIcon, CreditCardIcon } from '@heroicons/react/outline';

// type
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  setShowProfileOverlay: () => void;
}

const Navbar = ({ setShowProfileOverlay }: Props) => {
  const { me } = useAuth();
  const { mutate } = useSWRConfig();
  const passport = usePassport();
  const { socketMessages, handleReadMessage } = useSocket();

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Websockets events

  useEffect(() => {
    socketMessages
      .filter(({ type }) =>
        [
          WSEvents.BadgeGrandProposeReady,
          WSEvents.BadgeGrant,
          WSEvents.BadgeGrantOwner,
          WSEvents.BadgeGrantPropose,
          WSEvents.RoomNewMessage,
          RoomWSEvents.RoomMention,
        ].includes(type)
      )
      .forEach(({ data: newNotification, id: messageID, type }) => {
        mutate(
          '/core-api/notification',
          (data) => ({
            ...data,
            notifications: [
              ...data.notifications,
              {
                ...newNotification,
                type,
              },
            ],
            unread: data.unread + 1,
            count: data.count + 1,
          }),
          false
        );

        if (type === RoomWSEvents.RoomMention) {
          mutate(
            '/core-api/user/tribes',
            (tribes: Array<ProfileTribe>) =>
              tribes.map((tribe) =>
                tribe.id === newNotification.extra.tribe.id
                  ? {
                      ...tribe,
                      rooms: tribe.rooms.map((tribeRoom) => {
                        if (tribeRoom.id === newNotification.extra.roomId) {
                          return {
                            ...tribeRoom,
                            unreadMentions: tribeRoom.unreadMentions + 1,
                            hasUnread: true,
                          };
                        }

                        return tribeRoom;
                      }),
                    }
                  : tribe
              ),
            false
          );
        }

        if (type === WSEvents.RoomNewMessage) {
          mutate(
            '/core-api/user/tribes',
            (tribes: Array<ProfileTribe>) =>
              tribes.map((tribe) =>
                tribe.id === newNotification.extra.tribe.id
                  ? {
                      ...tribe,
                      rooms: tribe.rooms.map((tribeRoom) => {
                        if (tribeRoom.id === newNotification.extra.roomId) {
                          return {
                            ...tribeRoom,
                            hasUnread: true,
                          };
                        }

                        return tribeRoom;
                      }),
                    }
                  : tribe
              ),
            false
          );
        }
        handleReadMessage(messageID);
      });
  }, [socketMessages, me.id, mutate, handleReadMessage]);

  return (
    <div className="shadow">
      <div className="flex-1 flex items-center justify-center lg:justify-end h-16 px-2 sm:px-4 lg:px-8">
        <div className="flex-shrink-0 hidden lg:flex relative gap-7">
          {/* Wallet */}
          <Menu as="div">
            {({ open }) => (
              <>
                <Menu.Items className="block absolute overflow-y-auto right-36 h-auto w-auto max-h-96 top-full z-10 origin-top-right border border-gray-800 bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mt-1">
                  <Wallet />
                </Menu.Items>
                <Menu.Button
                  type="button"
                  className={`${
                    open ? 'bg-sapien-neutral-900' : ''
                  } h-10 w-10 flex items-center justify-center rounded-full focus:outline-none bg-sapien-neutral-200/25 hover:bg-sapien-neutral-900`}
                >
                  <>
                    <span className="sr-only">View wallet</span>
                    <CreditCardIcon className="h-6 w-6" aria-hidden="true" />
                  </>
                </Menu.Button>
              </>
            )}
          </Menu>
          {/* Notifications */}
          <Menu as="div">
            {({ open }) => (
              <Query api="/core-api/notification">
                {({ unread }: { unread: number }) => (
                  <>
                    <Menu.Items className="block w-full absolute overflow-y-auto right-20 h-auto max-h-96 top-full z-10 origin-top-right border border-gray-800 bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mt-1">
                      <Notifications />
                    </Menu.Items>
                    <Menu.Button
                      type="button"
                      className={`${
                        open ? 'bg-sapien-neutral-900' : ''
                      } h-10 w-10 flex items-center justify-center rounded-full focus:outline-none bg-sapien-neutral-200/25 hover:bg-sapien-neutral-900 relative`}
                    >
                      <span className="sr-only">View notifications</span>
                      <NotificationsIcon />
                      <div className="absolute top-0 left-10">
                        <RedDot count={unread} />
                      </div>
                    </Menu.Button>
                  </>
                )}
              </Query>
            )}
          </Menu>
          {/* Profile */}
          <Menu as="div">
            <div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 top-full z-10 origin-top-right bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 p-4 ring-black ring-opacity-5 focus:outline-none mt-1">
                  <div className="h-full flex flex-col items-start">
                    <div className="w-full flex items-center truncate">
                      <div className="px-3 py-3">
                        <UserAvatar user={me} passport={passport} />
                      </div>
                      <div className="flex flex-col flex-wrap break-words">
                        <span className="font-semibold">{me.displayName}</span>
                        <span className="text-xs truncate w-30 pb-[0.375rem]">
                          @{me.username}
                        </span>
                      </div>
                    </div>
                    {passport?.tokenId ? (
                      <button
                        className="font-medium text-sm text-white mt-2"
                        onClick={setShowProfileOverlay}
                      >
                        View Passport
                      </button>
                    ) : null}
                    {/* Compliance */}
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between items-center py-2 text-left text-sm focus:outline-none">
                            Privacy & Safety
                            <ChevronDownIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="text-gray-500 w-full">
                            <div className="h-full w-full">
                              <div className="flex flex-col text-left gap-1">
                                <a
                                  href="https://common.sapien.network/terms.html"
                                  className="font-medium text-sm text-white py-1"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Terms of Service
                                </a>
                                <a
                                  href="https://common.sapien.network/privacy.html"
                                  className="font-medium text-sm text-white py-1"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Privacy Policy
                                </a>
                                <a
                                  href="https://common.sapien.network/static/pdf/Sapien_Content_Policy.pdf"
                                  className="font-medium text-sm text-white py-1"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Content Policy
                                </a>
                                <a
                                  href="https://common.sapien.network/dmca.html"
                                  className="font-medium text-sm text-white py-1"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  DMCA
                                </a>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    {/* Logout */}
                    <div className="mt-4 text-left">
                      <Link href="/logout">
                        <a className="font-medium text-sm text-purple-600 hover:text-purple-500 flex">
                          Logout
                        </a>
                      </Link>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
              <Menu.Button
                className="group w-full flex text-sm text-left font-medium  focus:outline-none"
                aria-label="Open Desktop Profile Menu"
              >
                <span className="flex w-full items-center">
                  <span className="flex min-w-0 items-center w-full justify-between">
                    <div className="pr-3">
                      <UserAvatar user={me} passport={passport} />
                    </div>
                    <DropDownArrowIcon />
                  </span>
                </span>
              </Menu.Button>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
