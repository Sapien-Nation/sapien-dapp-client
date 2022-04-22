import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { XIcon } from '@heroicons/react/outline';

// components
import { SEO, Redirect, Query } from 'components/common';
import {
  Navbar,
  MobileNavbar,
  DiscoveryNavigation,
  TribeBar,
  TribeNavigation,
  ProfileNavigation,
} from 'components/navigation';
// context
import { useAuth } from 'context/user';

// providers
import { Web3Provider } from 'wallet/providers';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  children: React.ReactElement;
}

const AppLayout = ({ children }: Props) => {
  const { me } = useAuth();
  const { pathname } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

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

  // Passport View
  if (pathname.startsWith('/passport')) return children;

  // Mint View
  if (pathname.startsWith('/mint')) return children;

  // Logout View
  if (pathname.startsWith('/logout')) return children;

  // Invite View
  if (pathname.startsWith('/join')) return children;

  if (me === undefined)
    return (
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-full">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex flex-col justify-center items-center"></div>
          </div>
        </div>
      </div>
    );

  if (me === null) {
    return (
      <>
        <SEO title="" />
        <Redirect path="/login" />
      </>
    );
  }

  const isHomePage = pathname === '/';

  const renderNavigation = () => {
    let children = null;

    if (pathname.includes('/discovery')) children = <DiscoveryNavigation />;
    else if (pathname.includes('/profile')) children = <ProfileNavigation />;
    else children = <TribeNavigation handleMobileMenu={handleMobileMenu} />;

    return (
      <div className="block flex-shrink-0 bg-sapien-neutral-600">
        <div className="h-full px-2 py-6 relative flex flex-col w-64 overflow-y-auto">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-full bg-sapien-neutral-600">
      <Query
        api="/api/v3/profile/tribes"
        loader={
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-full">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="pr-1 w-16 animate-bounce"
                    src="/images/logooutlined.svg"
                    alt="sapien"
                  />
                  <span className="text-white text-sm text-center">
                    Do you know that there was a time where a huge gorila look
                    into the eyes to the Wall street bull?{' '}
                  </span>
                </div>
              </div>
            </div>
          </div>
        }
      >
        {(tribes: Array<ProfileTribe>) => (
          <main className="h-full flex">
            <nav
              className={
                mobileMenuOpen
                  ? 'left-0 flex-col transition-all duration-300 fixed lg:static h-full z-10 lg:flex'
                  : '-left-full flex-col transition-all duration-300 fixed lg:static h-full z-10 lg:flex'
              }
            >
              <div className="flex-1 flex min-h-0 lg:h-auto h-full">
                <div
                  className={`${
                    mobileMenuOpen ? '-right-10' : 'right-0'
                  } absolute top-0 bg-sapien-red-700/50 lg:hidden`}
                >
                  <button
                    type="button"
                    className="flex items-center justify-center h-10 w-10 focus:outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
                <TribeBar
                  tribes={tribes}
                  mobileMenuOpen={mobileMenuOpen}
                  handleMobileMenu={handleMobileMenu}
                />
                {isHomePage === false && <>{renderNavigation()}</>}
              </div>
            </nav>
            <Query api="/api/v3/me/passport" allowNullable>
              {() => (
                <div className="flex-1 min-w-0 flex flex-col">
                  <Web3Provider>
                    <div className="lg:hidden">
                      <MobileNavbar setMobileMenuOpen={setMobileMenuOpen} />
                    </div>
                    <div className="hidden lg:block">
                      <Navbar />
                    </div>
                  </Web3Provider>
                  <div className="flex-1 flex overflow-hidden">
                    <section
                      aria-labelledby="primary-heading"
                      className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last relative"
                    >
                      {children}
                    </section>
                  </div>
                </div>
              )}
            </Query>
          </main>
        )}
      </Query>
    </div>
  );
};

export default AppLayout;
