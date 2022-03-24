import Link from 'next/link';
import { MenuIcon, SelectorIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

// components
import { Head, Redirect, Query, Search } from 'components/common';
import {
  Navbar,
  DiscoveryNavigation,
  TribeBar,
  TribeNavigation,
} from 'components/navigation';

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
      <div className="relative h-full">
        <Query api="/api/v3/profile/tribes" loader={null}>
          {(tribes: Array<ProfileTribe>) => (
            <>
              <main className="h-full flex">
                <div className="flex flex-col border-r-1">
                  <div className="flex-1 flex min-h-0">
                    <TribeBar
                      tribes={tribes}
                      mobileMenuOpen={mobileMenuOpen}
                      setMobileMenuOpen={setMobileMenuOpen}
                    />
                    {isHomePage === false && (
                      <div className="hidden lg:block lg:flex-shrink-0 border-r">
                        <div className="h-full p-2 relative flex flex-col w-64 overflow-y-auto">
                          {isDiscoveryPage === true && <DiscoveryNavigation />}
                          {isDiscoveryPage === false && <TribeNavigation />}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 hidden lg:flex">
                    <Menu as="div" className="w-full inline-block text-left">
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
                          <Menu.Items className="z-100 w-64 p-4 mx-3 origin-top absolute bottom-16 right-0 left-16 mt-1 rounded-xl shadow-2xl divide-y divide-gray-200 focus:outline-none">
                            <div className="h-full">
                              <Link href="/logout">
                                <a className="mt-8 text-center font-medium text-sm text-purple-600 hover:text-purple-500">
                                  Logout
                                </a>
                              </Link>
                            </div>
                          </Menu.Items>
                        </Transition>
                        <Menu.Button className="group w-full flex text-sm text-left font-mediumπsea hover:bg-indigo-50 focus:outline-none">
                          <span className="flex w-full items-center">
                            <span className="flex min-w-0 items-center w-full justify-between">
                              <div className="bg-gray-900 px-5 py-3 ">
                                <img
                                  className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
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
                              <div className="flex items-center justify-between w-64">
                                <span className="pl-2 flex flex-col">
                                  <span className="text-xs truncate w-32">
                                    @{me.username}
                                  </span>
                                  <span className="truncate w-32">
                                    {me.displayName}
                                  </span>
                                </span>
                                <SelectorIcon className="flex-shrink-0 h-5 w-5 text-gray-500 mr-4" />
                              </div>
                            </span>
                          </span>
                        </Menu.Button>
                      </div>
                    </Menu>
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
                  {/* Mobile top navigation */}
                  <div className="lg:hidden">
                    <div className="bg-gray-900 py-2 px-4 flex items-center justify-between sm:px-6 lg:px-8">
                      <button
                        type="button"
                        className="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-gray-900 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setMobileMenuOpen(true)}
                      >
                        <span className="sr-only">Open sidebar</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <Search />
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <Navbar />
                  </div>
                  <div className="flex-1 flex overflow-hidden">
                    <section
                      aria-labelledby="primary-heading"
                      className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last"
                    >
                      <h1 id="primary-heading" className="sr-only">
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
