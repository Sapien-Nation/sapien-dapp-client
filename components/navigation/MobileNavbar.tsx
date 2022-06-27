import { BellIcon, CreditCardIcon, MenuIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import { LogoutIcon, CogIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// context
import { useAuth } from 'context/user';

// components
import { Query, RedDot, UserAvatar } from 'components/common';
// @ts-ignore
const Wallet = dynamic(() => import('wallet/Wallet'));
const Notifications = dynamic(() => import('components/notifications'));

// hooks
import { usePassport } from 'hooks/passport';

interface Props {
  setMobileMenuOpen: (isOpen: boolean) => void;
  setShowProfileOverlay: () => void;
}

const MobileNavbar = ({ setMobileMenuOpen, setShowProfileOverlay }: Props) => {
  const { me } = useAuth();
  const passport = usePassport();

  return (
    <>
      <div className="bg-gray-900 px-4 flex items-center justify-between sm:px-6 lg:px-8 w-full">
        <button
          type="button"
          className="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-gray-900 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        {/* Wallet dropdown */}
        <div className="flex relative gap-2">
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
                      } group px-5 py-3 w-full flex flex-col justify-center h-full text-sm text-left font-medium focus:outline-none hover:bg-gray-800`}
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
          <Menu as="div">
            {({ open }) => (
              <>
                <div>
                  <Menu.Items className="block absolute overflow-y-auto right-0 h-auto w-auto max-h-80 top-full z-10 origin-top-right border border-gray-800 bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
          <Menu as="div" className="relative inline-block text-left">
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
                <Menu.Items className="absolute right-0 w-56 mt-14 z-10 origin-top-right bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 p-4 ring-black ring-opacity-5 focus:outline-none">
                  <div className="h-full">
                    <div className="flex items-center">
                      <div className="px-3 py-3">
                        <UserAvatar user={me} passport={passport} />
                      </div>
                      <div className="flex flex-col flex-wrap break-words">
                        <span className="text-xs truncate w-30">
                          @{me.username}
                        </span>
                      </div>
                    </div>
                    {passport?.tokenId ? (
                      <button
                        onClick={setShowProfileOverlay}
                        className="font-medium text-sm text-white mt-4"
                      >
                        View Passport
                      </button>
                    ) : null}
                    <div className="mt-4 text-left">
                      <Link href="/logout">
                        <a className="mt-2 font-medium text-sm text-purple-600 hover:text-purple-500 flex">
                          <LogoutIcon
                            className="mr-3 h-5 w-5"
                            aria-hidden="true"
                          />
                          Logout
                        </a>
                      </Link>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
              <Menu.Button
                className="group w-full flex text-sm text-left font-medium  focus:outline-none"
                aria-label="Open Profile Menu"
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
          <Menu as="div">
            {({ open }) => (
              <>
                <div>
                  <Menu.Items className="absolute right-0 w-56 mt-14 z-10 origin-top-right bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 p-4 ring-black ring-opacity-5 focus:outline-none">
                    <div className="h-full">
                      <div className="flex flex-col text-left gap-1 mt-2">
                        <a
                          href="https://common.sapien.network/terms.html"
                          className="font-medium text-sm text-white"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Terms of Service
                        </a>
                        <a
                          href="https://common.sapien.network/privacy.html"
                          className="font-medium text-sm text-white mt-2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Privacy Policy
                        </a>
                        <a
                          href="https://common.sapien.network/static/pdf/Sapien_Content_Policy.pdf"
                          className="font-medium text-sm text-white mt-2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Content Policy
                        </a>
                        <a
                          href="https://common.sapien.network/dmca.html"
                          className="font-medium text-sm text-white mt-2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          DMCA
                        </a>
                      </div>
                    </div>
                  </Menu.Items>
                </div>

                <Menu.Button
                  type="button"
                  className={`${
                    open ? 'bg-gray-800' : ''
                  } group px-5 py-3 w-full flex flex-col justify-center h-full text-sm text-left font-medium focus:outline-none hover:bg-gray-800`}
                >
                  <>
                    <span className="sr-only">View Policies</span>
                    <CogIcon className="h-6 w-6" aria-hidden="true" />
                  </>
                </Menu.Button>
              </>
            )}
          </Menu>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
