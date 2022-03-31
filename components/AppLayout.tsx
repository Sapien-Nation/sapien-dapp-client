import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { XIcon } from '@heroicons/react/outline';

// components
import { Head, Redirect, Query } from 'components/common';
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

// types
import type { ProfileTribe } from 'tools/types/tribe';

// utils
import { mergeClassNames } from 'utils/styles';

interface Props {
  children: React.ReactElement;
}

const AppLayout = ({ children }: Props) => {
  const { me } = useAuth();
  const { theme } = useTheme();
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

  if (me === undefined) {
    return (
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-full">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex justify-center items-center">
              <img
                className="pr-1 w-16 animate-bounce"
                src="/images/logooutlined.svg"
                alt="sapien"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isHomePage = pathname === '/';

  const renderNavigation = () => {
    let children = null;

    if (pathname.includes('/discovery')) children = null;
    else if (pathname.includes('/profile')) children = <ProfileNavigation />;
    else children = <TribeNavigation />;

    if (children === null) return <div className="ml-4"></div>;

    return (
      <div className="block flex-shrink-0 bg-sapien-neutral-600">
        <div className="h-full px-2 py-6 relative flex flex-col w-64 overflow-y-auto">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div
      className={mergeClassNames(
        theme && theme === 'dark' ? 'bg-sapien-neutral-600' : '',
        'relative h-full'
      )}
    >
      <Query api="/api/v3/profile/tribes" loader={null}>
        {(tribes: Array<ProfileTribe>) => (
          <>
            <main className="h-full flex">
              <div
                className={mergeClassNames(
                  mobileMenuOpen ? 'left-0' : '-left-full',
                  'flex-col transition-all duration-300 fixed lg:static h-full z-10 lg:flex'
                )}
              >
                <div className="flex-1 flex min-h-0 lg:h-auto h-full">
                  <div className="absolute top-0 -right-10 bg-sapien-red-700/50 lg:hidden">
                    <button
                      type="button"
                      className="flex items-center justify-center h-10 w-10 focus:outline-none"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <TribeBar tribes={tribes} mobileMenuOpen={mobileMenuOpen} />
                  {isHomePage === false && <>{renderNavigation()}</>}
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
                <div className="lg:hidden">
                  <MobileNavbar setMobileMenuOpen={setMobileMenuOpen} />
                </div>
                <div className="hidden lg:block">
                  <Navbar />
                </div>
                <div className="flex-1 flex overflow-hidden bg-sapien-neutral-800 lg:rounded-t-3xl p-8">
                  <section
                    aria-labelledby="primary-heading"
                    className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last"
                  >
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
};

export default AppLayout;
