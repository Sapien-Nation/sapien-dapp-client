/* eslint-disable @next/next/no-img-element */
import {
  GlobeAltIcon,
  PlusIcon,
  AnnotationIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

// components
import TribeBarItem from './TribeBarItem';
import { Tooltip } from 'components/common';
import { CreateTribeDialog, FeedbackDialog } from 'components/tribe/dialogs';

// context
import { useAuth } from 'context/user';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  tribes: Array<ProfileTribe>;
  mobileMenuOpen: boolean;
  handleMobileMenu: () => void;
}

enum Dialog {
  CreateTribe,
  Feedback,
}

const TribeBar = ({ tribes, handleMobileMenu }: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const [rightClickedTribe, setRightClickedTribe] =
    useState<ProfileTribe | null>(null);

  const { me } = useAuth();
  const { pathname } = useRouter();

  const tooltipRef = useRef(null);
  const profileRef = useRef(null);
  const createTribeRef = useRef(null);
  const feedbackRef = useRef(null);

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
        className="py-3 flex flex-col items-center space-y-3 bg-sapien-neutral-800 w-20"
      >
        {isOnProfilePage && (
          <>
            <Link href="/profile">
              <a
                className="group h-12 w-12 group p-1 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-600 border-2 border-white/10 hover:border-gray-400 hover:text-gray-900"
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
                  className="w-full h-full rounded-xl text-gray-400 bg-gray-900 group-hover:text-gray-500"
                  alt={''}
                  src={me.avatar}
                />
                <span className="sr-only">Go to profile page</span>
              </a>
            </Link>
            <Tooltip ref={profileRef} text="Profile" />
          </>
        )}
        <div className="h-12 w-12">
          <Link href={'/home'}>
            <a>
              <img src="/images/sapien_nation.png" alt="Sapien Nation" />
            </a>
          </Link>
        </div>
        <div className="no-scrollbar overflow-auto space-y-3 pt-2 px-2">
          {tribes.map((tribe: ProfileTribe) => (
            <TribeBarItem
              key={tribe.id}
              tribe={tribe}
              onRightClick={setRightClickedTribe}
              isContextMenuOpen={rightClickedTribe}
              handleMobileMenu={handleMobileMenu}
            />
          ))}
        </div>

        <div className="border-t-[1px] border-gray-800 block w-full justify-between" />

        <Link href="/discovery">
          <a
            className={`group p-3 cursor-pointer rounded-lg flex items-center text-base font-medium w-10 h-10 ${
              pathname === '/discovery'
                ? 'text-gray-900 bg-gray-50'
                : 'text-gray-50 bg-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
            ref={tooltipRef.current?.setTriggerRef}
            onClick={handleMobileMenu}
          >
            <GlobeAltIcon className="h-6 w-6" />
            <span className="sr-only">Go to Explore</span>
          </a>
        </Link>
        <Tooltip ref={tooltipRef} text="Discover new Sapien Tribes" />
        <div>
          <button
            onClick={() => {
              setDialog(Dialog.CreateTribe);
              handleMobileMenu();
            }}
            type="button"
            className="group w-10 h-10 p-3 mb-16 cursor-pointer rounded-lg flex items-center text-base font-medium text-gray-50 bg-gray-700 hover:bg-gray-50 hover:text-gray-900"
            ref={createTribeRef.current?.setTriggerRef}
          >
            <PlusIcon className="h-6 w-6" />
            <span className="sr-only">Click here to create a new Tribe</span>
          </button>
          <Tooltip ref={createTribeRef} text="Create a new Tribe" />
        </div>

        <button
          onClick={() => {
            setDialog(Dialog.Feedback);
            handleMobileMenu();
          }}
          type="button"
          className="group w-10 h-10 absolute bottom-5 p-3 cursor-pointer rounded-lg flex items-center text-base font-medium text-gray-50 bg-gray-700 hover:bg-gray-50 hover:text-gray-900"
          ref={feedbackRef.current?.setTriggerRef}
        >
          <AnnotationIcon className="h-6 w-6" />
          <span className="sr-only">Share your feedback</span>
        </button>
        <Tooltip ref={feedbackRef} text="Share your feedback" />
      </div>

      {/* Modals */}
      {dialog === Dialog.CreateTribe && (
        <CreateTribeDialog onClose={() => setDialog(null)} />
      )}
      {dialog === Dialog.Feedback && (
        <FeedbackDialog onClose={() => setDialog(null)} />
      )}
    </>
  );
};

export default TribeBar;
