/* eslint-disable @next/next/no-img-element */
import { GlobeAltIcon, PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useRef, useState } from 'react';

// components
import TribeBarItem from './TribeBarItem';
import { Tooltip } from 'components/common';
import { CreateTribeDialog } from 'components/tribe/dialogs';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  tribes: Array<ProfileTribe>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

enum Dialog {
  CreateTribe,
}

const TribeBar = ({ tribes, mobileMenuOpen, setMobileMenuOpen }: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const { pathname, query } = useRouter();
  const { tribeID } = query;

  const tooltipRef = useRef(null);
  const createTribeRef = useRef(null);

  const handleTribeLeftClick = (tribe: ProfileTribe) => {
    console.log('clicked tribe', { tribe });
  };

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="flex flex-shrink-0">
        <div className="flex flex-col w-20">
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-sapien-neutral-800">
            <div className="flex-1">
              <nav
                aria-label="Sidebar"
                className="py-6 flex flex-col items-center space-y-3"
              >
                {tribes.map((tribe: ProfileTribe) => (
                  <TribeBarItem
                    handleClick={handleTribeLeftClick}
                    key={tribe.id}
                    tribe={tribe}
                  />
                ))}
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
