import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState, useCallback, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';

// components
import { SEO, Redirect, Overlay } from 'components/common';
import {
  Navbar,
  MobileNavbar,
  DiscoveryNavigation,
  TribeBar,
  TribeNavigation,
  ProfileNavigation,
} from 'components/navigation';
import ProfileOverlay from './profile';

// context
import { useAuth } from 'context/user';

// constants
import { WSEvents } from 'tools/constants/rooms';

// hooks
import { useSocket } from 'context/socket';
import { useSound } from 'hooks/useSound';

// providers
const Web3Provider = dynamic(() =>
  import('wallet/providers').then((mod) => mod.Web3Provider)
);

// types
import type { RoomNewMessage } from 'tools/types/room';
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  children: React.ReactElement;
}

const Page = ({ children }: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileOverlay, setShowProfileOverlay] = useState(false);

  const { me } = useAuth();
  const { play } = useSound();
  const { mutate } = useSWRConfig();
  const { pathname, query } = useRouter();
  const { socketMessages, handleReadMessage } = useSocket();

  const handleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

  const { data: tribes, error: tribesError } = useSWR('/core-api/user/tribes');
  const { data: passport, error: passportError } = useSWR(
    '/core-api/me/passport'
  );

  const isHomePage = pathname === '/';
  const isLoadingTribes = !tribes && !tribesError;
  const isLoadingPassport = passport === undefined && !passportError;

  const isLoadingData =
    isLoadingTribes === true || isLoadingPassport === true || me === undefined;
  const tribeID = query.tribeID as string;

  const renderNavigation = () => {
    let children = null;

    if (isLoadingData) {
      return (
        <div className="block flex-shrink-0 bg-sapien-neutral-600">
          <div className="h-full px-2 py-6 relative flex flex-col w-64 overflow-y-auto overflow-x-hidden"></div>
        </div>
      );
    }

    if (pathname.includes('/discovery')) children = <DiscoveryNavigation />;
    else if (pathname.includes('/profile')) children = <ProfileNavigation />;
    else children = <TribeNavigation handleMobileMenu={handleMobileMenu} />;

    return (
      <div className="block flex-shrink-0 bg-sapien-neutral-600">
        <div className="h-full px-2 py-6 relative flex flex-col w-64 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    );
  };

  useEffect(() => {
    let playSound = false;
    socketMessages
      .filter(({ type }) => type === WSEvents.NewMessage)
      .forEach(({ data, id: messageID }) => {
        if (data.extra.tribe.id !== tribeID) {
          if ((data as RoomNewMessage).extra?.mentions?.includes(me.id)) {
            playSound = true;

            mutate(
              '/core-api/user/tribes',
              (tribes: Array<ProfileTribe>) =>
                tribes.map((tribe) =>
                  tribe.id === data.extra.tribe.id
                    ? {
                        ...tribe,
                        rooms: tribe.rooms.map((tribeRoom) => {
                          if (tribeRoom.id === data.extra.tribe.id) {
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

            handleReadMessage(messageID);
          }
        }
      });
    if (playSound) {
      play();
    }
  }, [tribeID, socketMessages, me?.id, mutate, handleReadMessage, play]);

  return (
    <>
      {isLoadingData && (
        <Transition
          appear
          show={isLoadingData}
          className="h-full w-full flex justify-center items-center"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <div className="flex flex-col justify-center items-center">
                <img
                  className="pr-1 w-16 animate-bounce"
                  src="/images/logooutlined.svg"
                  alt="sapien"
                />
                <span className="text-white text-sm text-center">
                  Did you know that on October 18, 2021, our giant bronze statue
                  of Harambe stared down the Bull of Wall Street?{' '}
                </span>
              </div>
            </div>
          </div>
        </Transition>
      )}

      <Transition
        appear
        show={isLoadingData === false}
        className="relative h-full bg-sapien-neutral-600"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <main className="h-full flex">
          <>
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
                  } absolute top-0 bg-sapien-red-700 lg:hidden`}
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
                  tribes={isLoadingData ? [] : tribes}
                  mobileMenuOpen={mobileMenuOpen}
                  handleMobileMenu={handleMobileMenu}
                />
                {isHomePage === false && <>{renderNavigation()}</>}
              </div>
            </nav>
            <div className="flex-1 min-w-0 flex flex-col">
              <Web3Provider>
                <div className="lg:hidden">
                  <MobileNavbar
                    setMobileMenuOpen={setMobileMenuOpen}
                    setShowProfileOverlay={() => setShowProfileOverlay(true)}
                  />
                </div>
                <div className="hidden lg:block">
                  <Navbar
                    setShowProfileOverlay={() => setShowProfileOverlay(true)}
                  />
                </div>
              </Web3Provider>
              <div className="flex-1 flex overflow-hidden">
                <section
                  aria-labelledby="primary-heading"
                  className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last relative bg-sapien-neutral-800 lg:rounded-tl-3xl"
                >
                  {children}
                </section>
              </div>
            </div>
          </>
        </main>
      </Transition>

      <Overlay
        blur
        isOpen={showProfileOverlay}
        onClose={() => setShowProfileOverlay(false)}
      >
        <>
          <button
            type="button"
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none absolute right-5 top-5"
            onClick={() => setShowProfileOverlay(false)}
          >
            <span className="sr-only">Close Profile Passport</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <ProfileOverlay setShowProfileOverlay={setShowProfileOverlay} />
        </>
      </Overlay>
    </>
  );
};

const AppLayout = ({ children }: Props) => {
  const { me } = useAuth();
  const { pathname } = useRouter();

  const noLayoutPages = [
    // Auth pages
    '/login',
    '/register',
    '/logout',
    '/forgot',
    '/change-password',

    // misc
    '/passport',
    '/mint',
    '/logout',
    '/join',
  ];

  if (noLayoutPages.some((page) => pathname.startsWith(page))) {
    return children;
  }

  if (me === null) {
    return (
      <>
        <SEO title="" />
        <Redirect path="/login" />
      </>
    );
  }

  return <Page>{children}</Page>;
};

export default AppLayout;
