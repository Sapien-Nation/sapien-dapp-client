import { useState, Fragment } from 'react';
import { MenuIcon, SelectorIcon } from '@heroicons/react/outline';
import { tw } from 'twind';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';

// components
import { Head, Redirect, Query } from 'components/common';
import {
  DiscoveryNavigation,
  TribeBar,
  TribeNavigation,
} from 'components/navigation';
import { Subscriber } from 'components/notifications';

// context
import { useAuth } from 'context/user';

// types
import type { ProfileTribe } from 'tools/types/tribe';
import { user } from 'utils/testUtils';
import Wallet from './wallet';

interface Props {
  children: React.ReactElement;
}

const AppLayout = ({ children }: Props) => {
  const { me } = useAuth();
  const { pathname } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth Pages
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/logout') ||
    pathname.startsWith('/forgot') ||
    pathname.startsWith('/change-password')
  ) {
    return children;
  }

  if (me === null) {
    return (
      <>
        <Head title="" />
        <Redirect path="/login" />
      </>
    );
  }

  if (me) {
    const isHomePage = pathname === '/';
    const isDiscoveryPage = pathname === '/discovery';

    return (
      <div className={tw`relative h-full`}>
        <Query api="/api/v3/profile/tribes" loader={null}>
          {(tribes: Array<ProfileTribe>) => (
            <>
              <Subscriber />
              <main className={tw`h-full flex`}>
                <div className={tw`flex flex-col`}>
                  <div
                    className={tw`flex-1 flex min-h-0 border-r border-gray-200`}
                  >
                    <TribeBar
                      tribes={tribes}
                      mobileMenuOpen={mobileMenuOpen}
                      setMobileMenuOpen={setMobileMenuOpen}
                    />
                    {isHomePage === false && (
                      <div className={tw`hidden lg:block lg:flex-shrink-0`}>
                        <div
                          className={tw`h-full p-2 relative flex flex-col w-64 bg-white overflow-y-auto`}
                        >
                          {isDiscoveryPage === true && <DiscoveryNavigation />}
                          {isDiscoveryPage === false && <TribeNavigation />}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={tw`flex-shrink-0 flex border-r border-gray-200`}
                  >
                    <Menu
                      as="div"
                      className={tw`w-full inline-block text-left`}
                    >
                      <div>
                        <Transition
                          as={Fragment}
                          enter={tw`transition ease-out duration-100`}
                          enterFrom={tw`transform opacity-0 scale-95`}
                          enterTo={tw`transform opacity-100 scale-100`}
                          leave={tw`transition ease-in duration-75`}
                          leaveFrom={tw`"transform opacity-100 scale-100`}
                          leaveTo={tw`"transform opacity-0 scale-95`}
                        >
                          <Menu.Items
                            className={tw`z-100 w-96 mx-3 origin-top absolute bottom-16 right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none`}
                          >
                            <div className={tw`h-full`}>
                              <Wallet />
                            </div>
                            <div className={tw`py-1`}>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href={`/logout`}>
                                    <a
                                      href="#"
                                      className={tw`${
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700'
                                      }
                          block px-4 py-2 text-sm`}
                                    >
                                      Logout
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                        <Menu.Button
                          className={tw`group w-full flex text-sm text-left font-medium text-gray-700 hover:bg-indigo-50 focus:outline-none`}
                        >
                          <span
                            className={tw`flex w-full justify-between items-center`}
                          >
                            <span
                              className={tw`flex min-w-0 items-center w-full justify-between`}
                            >
                              <div className={tw`bg-gray-900 px-5 py-3 `}>
                                <img
                                  className={tw`w-10 h-10 bg-gray-300 rounded-full flex-shrink-0`}
                                  src={
                                    me.avatar ||
                                    'https://dutuyaq1w3dqh.cloudfront.net/thumbnails/tribes/avatar/sapien_logo-40x40.png'
                                  }
                                  alt="this is your avatar picture on the bottom of the tribe bar navigation"
                                  onError={(event) => {
                                    (event.target as HTMLImageElement).src =
                                      'https://dutuyaq1w3dqh.cloudfront.net/thumbnails/tribes/avatar/sapien_logo-40x40.png';
                                  }}
                                />
                              </div>
                              <div
                                className={tw`flex items-center justify-center w-64`}
                              >
                                <span className={tw`pl-2 flex flex-col`}>
                                  <span className={tw`text-xs truncate w-32`}>
                                    @{me.username}
                                  </span>
                                  <span
                                    className={tw`text(xs gray-400) truncate w-32`}
                                  >
                                    {me.displayName}
                                  </span>
                                </span>
                                <span
                                  className={tw`flex-1 flex flex-col min-w-0 px-2`}
                                >
                                  <span
                                    className={tw`text-indigo-600 bg-indigo-50 py-2 px-4 rounded-full text-sm truncate flex items-center`}
                                  >
                                    <svg
                                      fill="none"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      width="18"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9 18C13.9705 18 18 13.9705 18 9C18 4.02943 13.9705 0 9 0C4.02943 0 0 4.02943 0 9C0 13.9705 4.02943 18 9 18Z"
                                        fill="#6200EA"
                                      ></path>
                                      <path
                                        d="M9 18C13.9705 18 18 13.9705 18 9C18 4.02943 13.9705 0 9 0C4.02943 0 0 4.02943 0 9C0 13.9705 4.02943 18 9 18Z"
                                        fill="url(#paint0_linear)"
                                        fillOpacity="0.5"
                                      ></path>
                                      <path
                                        d="M8.94111 2.93555C6.79826 2.97077 5.08984 4.47959 5.08984 6.45806C5.08984 8.77116 6.85109 9.6166 8.65932 10.233C8.95285 10.327 9.19941 10.415 9.41082 10.5031C9.36897 10.2032 9.23091 9.92513 9.01743 9.71047C8.38338 8.92968 7.73172 8.09015 7.64366 7.40326C7.60072 7.18045 7.60306 6.95127 7.65055 6.7294C7.69804 6.50751 7.78971 6.29745 7.92009 6.11174C8.05047 5.92603 8.2169 5.76846 8.40946 5.64842C8.60202 5.52839 8.81677 5.44834 9.04092 5.41305C9.70431 5.41305 10.4675 5.74181 11.4656 6.54024L13.0448 4.47959C11.9107 3.48222 10.4514 2.93318 8.94111 2.93555Z"
                                        fill="white"
                                        opacity="0.6"
                                      ></path>
                                      <path
                                        d="M9.66936 7.63211C9.29361 7.48534 8.98835 7.36206 8.74765 7.23877C8.77194 7.36238 8.80529 7.48405 8.84746 7.60277C8.88855 7.70257 8.93552 7.80237 8.98249 7.90218C9.13512 8.21333 9.33474 8.48926 9.47568 8.75345C9.92181 9.49319 10.6498 10.2153 10.5911 11.3895C10.5427 11.7423 10.3587 12.0624 10.078 12.2817C9.79734 12.5009 9.4422 12.6021 9.08814 12.5636C8.55515 12.5276 8.03491 12.3843 7.55871 12.1422C7.08252 11.9001 6.66019 11.5642 6.31713 11.1546L4.69678 13.1683C5.25801 13.7595 5.93226 14.232 6.67955 14.5578C7.42683 14.8836 8.23192 15.0559 9.0471 15.0646C10.9433 15.0646 13.3504 14.049 13.3504 11.2779C13.3269 8.9648 11.7418 8.41881 9.66936 7.63211Z"
                                        fill="white"
                                        opacity="0.6"
                                      ></path>
                                      <defs>
                                        <linearGradient
                                          gradientUnits="userSpaceOnUse"
                                          id="paint0_linear"
                                          x1="3.44707"
                                          x2="15.5971"
                                          y1="16.2"
                                          y2="2.7"
                                        >
                                          <stop stopColor="white"></stop>
                                          <stop
                                            offset="1"
                                            stopColor="white"
                                            stopOpacity="0"
                                          ></stop>
                                        </linearGradient>
                                      </defs>
                                    </svg>
                                    <span className={tw`ml-2`}>0</span>
                                  </span>
                                </span>
                                <SelectorIcon
                                  className="flex-shrink-0 h-5 w-5 text-gray-500 mr-4 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              </div>
                            </span>
                          </span>
                        </Menu.Button>
                      </div>
                    </Menu>
                  </div>
                </div>
                <div
                  className={tw`flex-1 min-w-0 flex flex-col overflow-hidden`}
                >
                  {/* Mobile top navigation */}
                  <div className={tw`lg:hidden`}>
                    <div
                      className={tw`bg-gray-900 py-2 px-4 flex items-center justify-between sm:px-6 lg:px-8`}
                    >
                      <div>
                        <button
                          type="button"
                          className={tw`-mr-3 h-12 w-12 inline-flex items-center justify-center bg-gray-900 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
                          onClick={() => setMobileMenuOpen(true)}
                        >
                          <span className={tw`sr-only`}>Open sidebar</span>
                          <MenuIcon
                            className={tw`h-6 w-6`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={tw`flex-1 flex overflow-hidden`}>
                    {/* Primary column */}
                    <section
                      aria-labelledby="primary-heading"
                      className={tw`min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last`}
                    >
                      <h1 id="primary-heading" className={tw`sr-only`}>
                        Sapien View Section
                      </h1>
                      {children}
                    </section>
                  </div>
                </div>
              </main>
            </>
          )}
        </Query>
      </div>
    );
  }

  return <></>;
};

export default AppLayout;
