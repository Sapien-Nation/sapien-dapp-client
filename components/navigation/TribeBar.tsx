/* eslint-disable @next/next/no-img-element */
import {
  GlobeAltIcon,
  CreditCardIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';

// components
import TribeBarItem from './TribeBarItem';
import { Tooltip } from 'components/common';
import { CreateTribeDialog } from 'components/tribe/dialogs';

// types
import type { ProfileTribe } from 'tools/types/tribe';

// ui
// @ts-ignore
const Wallet = dynamic(() => import('wallet/Wallet'));

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
      <div
        aria-label="Sidebar"
        className="py-6 flex flex-col items-center space-y-3 bg-sapien-neutral-800 w-20"
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
            <Tooltip ref={profileRef} text="Profile" />
          </>
        )}

        <div className="overflow-auto space-y-3">
          {tribes.map((tribe: ProfileTribe) => (
            <TribeBarItem
              key={tribe.id}
              tribe={tribe}
              onRightClick={setRightClickedTribe}
              isContextMenuOpen={rightClickedTribe}
            />
          ))}
        </div>

        <div className="border-t-[1px] border-gray-800 block w-full" />

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
          <span className="sr-only">Click here to create a new Tribe</span>
        </button>
        <Tooltip ref={createTribeRef} text="Create a new Tribe" />

        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Items
                static
                className={`${
                  open ? 'block' : 'hidden'
                } absolute left-16 top-0 w-96 z-10 origin-top-right bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <Wallet />
              </Menu.Items>
              <Menu.Button
                type="button"
                className="group w-full h-full flex text-sm text-left rounded-xl  focus:outline-none font-medium text-gray-50 bg-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                <div className="p-3">
                  <span className="sr-only">View wallet</span>
                  <CreditCardIcon className="h-6 w-6" aria-hidden="true" />
                </div>
              </Menu.Button>
            </>
          )}
        </Menu>
      </div>

      {/* Modals */}
      {dialog === Dialog.CreateTribe && (
        <CreateTribeDialog onClose={() => setDialog(null)} />
      )}
    </>
  );
};

export default TribeBar;
