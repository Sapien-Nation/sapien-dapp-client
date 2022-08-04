import { Disclosure, Menu } from '@headlessui/react';
import { CreditCardIcon, BellIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSWRConfig } from 'swr';
import { useEffect } from 'react';

// context
import { useAuth } from 'context/user';
import { usePassport } from 'hooks/passport';

// constants
import { NotificationsType as WSEvents } from 'tools/constants/notifications';

// context
import { useSocket } from 'context/socket';

// components
import { UserAvatar, Query, RedDot } from 'components/common';
const Notifications = dynamic(() => import('components/notifications'));
// @ts-ignore
const Wallet = dynamic(() => import('wallet/Wallet'));

// icons
import { ChevronDownIcon } from '@heroicons/react/outline';

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

        handleReadMessage(messageID);
      });
  }, [socketMessages, me.id, mutate, handleReadMessage]);

  return (
    <div className="shadow">
      <div className="flex-1 flex items-center justify-center lg:justify-end h-16 px-2 sm:px-4 lg:px-8">
        <div className="flex-shrink-0 hidden lg:flex relative">
          {/* Wallet dropdown */}
          <Menu as="div">
            {({ open }) => (
              <Query api="/core-api/notification">
                {({ unread }: { unread: number }) => (
                  <>
                    <div>
                      <Menu.Items className="block w-full absolute overflow-y-auto right-0 h-auto max-h-96 top-full z-10 origin-top-right border border-gray-800 bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Notifications />
                      </Menu.Items>
                    </div>

                    <Menu.Button
                      type="button"
                      className={`${
                        open ? 'bg-gray-800' : ''
                      } group px-5 py-3 w-full flex flex-col justify-center items-center h-full text-sm text-left font-medium focus:outline-none hover:bg-gray-800`}
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                      <div className="absolute top-3 left-10">
                        <RedDot count={unread} />
                      </div>
                    </Menu.Button>
                  </>
                )}
              </Query>
            )}
          </Menu>
          {/* Wallet dropdown */}
          <Menu as="div">
            {({ open }) => (
              <>
                <div>
                  <Menu.Items className="block absolute overflow-y-auto right-0 h-auto w-auto max-h-96 top-full z-10 origin-top-right border border-gray-800 bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Wallet />
                  </Menu.Items>
                </div>

                <Menu.Button
                  type="button"
                  className={`${
                    open ? 'bg-gray-800' : ''
                  } group px-5 py-3 w-full flex flex-col justify-center h-full text-sm text-left font-medium focus:outline-none hover:bg-gray-800`}
                >
                  <>
                    <span className="sr-only">View wallet</span>
                    <CreditCardIcon className="h-6 w-6" aria-hidden="true" />
                  </>
                </Menu.Button>
              </>
            )}
          </Menu>
          {/* Profile dropdown */}
          <Menu as="div">
            <div>
              <Menu.Items className="absolute right-0 w-56 mt-14 z-10 origin-top-right bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 p-4 ring-black ring-opacity-5 focus:outline-none">
                <div className="h-full flex flex-col items-start">
                  <div className="flex items-center">
                    <div className="px-3 py-3">
                      <UserAvatar user={me} passport={passport} />
                    </div>
                    <div className="flex flex-col flex-wrap break-words">
                      <span className="font-semibold">{me.displayName}</span>
                      <span className="text-xs truncate w-30">
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
                                className="font-medium text-sm text-white py-1 hover:underline hover:decoration-purple-400"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Terms of Service
                              </a>
                              <a
                                href="https://common.sapien.network/privacy.html"
                                className="font-medium text-sm text-white py-1 hover:underline hover:decoration-purple-400"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Privacy Policy
                              </a>
                              <a
                                href="https://common.sapien.network/static/pdf/Sapien_Content_Policy.pdf"
                                className="font-medium text-sm text-white py-1 hover:underline hover:decoration-purple-400"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Content Policy
                              </a>
                              <a
                                href="https://common.sapien.network/dmca.html"
                                className="font-medium text-sm text-white py-1 hover:underline hover:decoration-purple-400"
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
              <Menu.Button
                className="group w-full flex text-sm text-left font-medium  focus:outline-none"
                aria-label="Open Desktop Profile Menu"
              >
                <span className="flex w-full items-center">
                  <span className="flex min-w-0 items-center w-full justify-between">
                    <div className=" px-5 py-3 ">
                      <UserAvatar user={me} passport={passport} />
                    </div>
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
