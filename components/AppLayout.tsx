import { useState } from 'react';
import { MenuIcon } from '@heroicons/react/outline';
import { tw } from 'twind';
import { useRouter } from 'next/router';

// components
import { Head, Redirect, Query } from 'components/common';
import {
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
      <div className={tw`relative h-full`}>
        <Query api="/api/v3/profile/tribes">
          {(tribes: Array<ProfileTribe>) => (
            <main className={tw`h-full flex`}>
              <TribeBar
                tribes={tribes}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
              />
              <div className={tw`flex-1 min-w-0 flex flex-col overflow-hidden`}>
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
                        <MenuIcon className={tw`h-6 w-6`} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                <main className={tw`flex-1 flex overflow-hidden`}>
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

                  {isHomePage === false && (
                    <aside
                      className={tw`hidden lg:block lg:flex-shrink-0 lg:order-first`}
                    >
                      <div
                        className={tw`h-full p-2 relative flex flex-col w-64 border-r border-gray-200 bg-white overflow-y-auto`}
                      >
                        {isDiscoveryPage === true && <DiscoveryNavigation />}
                        {isDiscoveryPage === false && <TribeNavigation />}
                      </div>
                    </aside>
                  )}
                </main>
              </div>
            </main>
          )}
        </Query>
      </div>
    );
  }

  return <></>;
};

export default AppLayout;
