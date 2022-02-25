import Link from 'next/link';
import { useState, useEffect, Fragment } from 'react';
import { MenuIcon, SelectorIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { tw } from 'twind';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { useLocalStorage } from 'react-use';

// components
import { Head, Redirect, Query, Search } from 'components/common';
import {
  Navbar,
  DiscoveryNavigation,
  TribeBar,
  TribeNavigation,
} from 'components/navigation';
import { Subscriber } from 'components/notifications';

// api
import { connectWallet } from 'api/spn-wallet';
import { refresh } from 'api/authentication';

// context
import { useAuth } from 'context/user';
import { useWallet } from 'context/wallet';

// types
import type { ProfileTribe } from 'tools/types/tribe';
import { user } from 'utils/testUtils';
interface Props {
  children: React.ReactElement;
}

const AppLayout = ({ children }: Props) => {
  const { newUser, setNewUser, me } = useAuth();
  const { pathname, query } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [tokens] = useLocalStorage<{
    token: string;
    torus: string;
    refresh: string;
  }>('tokens');
  const { wallet, setWallet } = useWallet();
  useEffect(() => {
    const walletWeb3 = async () => {
      if (tokens && Boolean(me) && Boolean(!wallet))
        try {
          const walletConnected = await connectWallet(
            tokens.torus,
            me.id,
            newUser
          );
          setWallet(walletConnected);
          setNewUser(false);
        } catch (error) {
          try {
            const { token } = await refresh(tokens.refresh, 'torus');
            const walletConnected = await connectWallet(token, me.id, newUser);
            setWallet(walletConnected);
            setNewUser(false);
          } catch (err) {
            // TODO add Sentry ERROR
          }
        }
    };
    walletWeb3();
  }, [me, newUser, query, setNewUser, setWallet, tokens, wallet]);

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
                <div className={tw`flex flex-col border-r-1`}>
                  <div className={tw`flex-1 flex min-h-0`}>
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
                  <div className={tw`flex-shrink-0 hidden lg:flex`}>
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
                            className={tw`z-100 w-64 p-4 mx-3 origin-top absolute bottom-16 right-0 left-16 mt-1 rounded-xl shadow-2xl bg-white divide-y divide-gray-200 focus:outline-none`}
                          >
                            <div className={tw`h-full`}>
                              <Link href="/logout">
                                <a
                                  className={tw`mt-8 text-center font-medium text-sm text-purple-600 hover:text-purple-500`}
                                >
                                  Logout
                                </a>
                              </Link>
                            </div>
                          </Menu.Items>
                        </Transition>
                        <Menu.Button
                          className={tw`group w-full flex text-sm text-left font-medium text-gray-700 hover:bg-indigo-50 focus:outline-none`}
                        >
                          <span className={tw`flex w-full items-center`}>
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
                                className={tw`flex items-center justify-between w-64`}
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
                                <SelectorIcon
                                  className={tw`flex-shrink-0 h-5 w-5 text-gray-500 mr-4 group-hover:text-gray-500`}
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
                      <button
                        type="button"
                        className={tw`-mr-3 h-12 w-12 inline-flex items-center justify-center bg-gray-900 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
                        onClick={() => setMobileMenuOpen(true)}
                      >
                        <span className={tw`sr-only`}>Open sidebar</span>
                        <MenuIcon className={tw`h-6 w-6`} aria-hidden="true" />
                      </button>
                      <Search />
                    </div>
                  </div>
                  <div className={tw`hidden lg:block`}>
                    <Navbar />
                  </div>
                  <div className={tw`flex-1 flex overflow-hidden`}>
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
