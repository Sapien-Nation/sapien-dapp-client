/* eslint-disable @next/next/no-img-element */
import { GlobeAltIcon, PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

// components
import TribeBarItem from './TribeBarItem';
import { Tooltip } from 'components/common';
import { CreateTribeDialog } from 'components/tribe/dialogs';


// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  tribes: Array<ProfileTribe>;
  mobileMenuOpen: boolean;
}

enum Dialog {
  CreateTribe,
}

const TribeBar = ({ tribes }: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const [rightClickedTribe, setRightClickedTribe] =
    useState<ProfileTribe | null>(null);

  const { pathname } = useRouter();

  const tooltipRef = useRef(null);
  const profileRef = useRef(null);
  const createTribeRef = useRef(null);


  const isOnProfilePage = pathname.includes('/profile');

  useEffect(() => {
    document.body.addEventListener('click', () => setRightClickedTribe(null));

    return () => {
      document.body.removeEventListener('click', () =>
        setRightClickedTribe(null)
      );
    };
  }, []);

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="flex flex-shrink-0">
        <div className="flex flex-col w-20">
          <div className="flex-1 flex flex-col min-h-0 bg-sapien-neutral-800">
            <div className="flex-1">
              <nav
                aria-label="Sidebar"
                className="py-6 flex flex-col items-center space-y-3"
              >
                {isOnProfilePage && (
                  <>
                    <Link href="/profile">
                      <a
                        className="group p-0.5 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 bg-gray-50"
                        onClick={(event) => {
                          if (event.type === 'contextmenu') {
                            event.preventDefault();
                          }
                        }}
                        onContextMenu={(event) => {
                          if (event.type === 'contextmenu') {
                            event.preventDefault();
                          }
                        }}
                        ref={profileRef.current?.setTriggerRef}
                      >
                        <img
                          className="h-12 w-12 p-1 rounded-xl text-gray-400 bg-gray-900 group-hover:text-gray-500"
                          alt={''}
                          src="https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240"
                        />
                        <span className="sr-only">Go to profile page</span>
                      </a>
                    </Link>
                    <Tooltip ref={createTribeRef} text="Profile" />
                  </>
                )}
                {tribes.map((tribe: ProfileTribe) => (
                  <TribeBarItem
                    key={tribe.id}
                    tribe={tribe}
                    onRightClick={setRightClickedTribe}
                    isContextMenuOpen={rightClickedTribe}
                  />
                ))}

                {/* TODO make this follow a ref to be next to the clicked tribe */}
                {/*rightClickedTribe && (
                  <div className="absolute h-20 w-auto bottom-1 z-10 top-8 left-14 bg-black rounded-md shadow-lg py-2 px-6 ring-black ring-opacity-5 focus:outline-none text-gray-400">
                    <div className="h-full w-full relative justify-around flex flex-col">
                      <div
                        onClick={handleCopyToClipboard}
                        className="text-sm cursor-pointer hover:text-white text-purple-200"
                      >
                        Invite People
                      </div>
                    </div>
                  </div>
                )*/}
                <Link href="/discovery">
                  <a
                    className={`group p-3 cursor-pointer rounded-xl flex items-center text-base font-medium ${
                      pathname === '/discovery'
                        ? 'text-gray-900 bg-gray-50 hover:bg-gray-700 hover:text-gray-50'
                        : 'text-gray-50 bg-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    ref={tooltipRef.current?.setTriggerRef}
                  >
                    <GlobeAltIcon className="h-6 w-6" />
                    <span className="sr-only">Go to Explore</span>
                  </a>
                </Link>
                <Tooltip ref={tooltipRef} text="Discover New Sapien Tribes" />
                <button
                  onClick={() => setDialog(Dialog.CreateTribe)}
                  type="button"
                  className="group p-3 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-50 bg-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  ref={createTribeRef.current?.setTriggerRef}
                >
                  <PlusIcon className="h-6 w-6" />
                  <span className="sr-only">
                    Click here to create a new Tribe
                  </span>
                </button>
                <Tooltip ref={createTribeRef} text="Create a new Tribe" />
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {dialog === Dialog.CreateTribe && (
        <CreateTribeDialog onClose={() => setDialog(null)} />
      )}
    </>
  );
};

export default TribeBar;
