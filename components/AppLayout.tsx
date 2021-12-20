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
                  <div className={tw`flex-1 flex min-h-0`}>
                    <TribeBar
                      tribes={tribes}
                      mobileMenuOpen={mobileMenuOpen}
                      setMobileMenuOpen={setMobileMenuOpen}
                    />
                    {isHomePage === false && (
                      <div className={tw`hidden lg:block lg:flex-shrink-0`}>
                        <div
                          className={tw`h-full p-2 relative flex flex-col w-64 border-r border-gray-200 bg-white overflow-y-auto`}
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
                        <Menu.Button
                          className={tw`group w-full flex text-sm text-left font-medium text-gray-700 hover:bg-indigo-50 focus:outline-none`}
                        >
                          <span
                            className={tw`flex w-full justify-between items-center`}
                          >
                            <span
                              className={tw`flex min-w-0 items-center w-full justify-between`}
                            >
                              <div className={tw`bg-gray-700 px-5 py-3 `}>
                                <img
                                  className={tw`w-10 h-10 bg-gray-300 rounded-full flex-shrink-0`}
                                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                                  alt=""
                                />
                              </div>
                              <span
                                className={tw`flex-1 flex flex-col min-w-0 px-4`}
                              >
                                <span
                                  className={tw`text-indigo-600 bg-indigo-50 py-2 px-4 rounded-full text-sm truncate`}
                                >
                                  0
                                </span>
                              </span>
                              <SelectorIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400 mr-4 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                            </span>
                          </span>
                        </Menu.Button>
                      </div>
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
                          className={tw`z-100 w-96 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none`}
                        >
                          <div
                            className={tw`py-1 h-96 flex justify-center items-center`}
                          >
                            Wallet component
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
