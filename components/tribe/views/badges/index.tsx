import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

// constants
import { Role } from 'tools/constants/tribe';

// components
import BadgeView from './badge';
import Sidebar from './navigation';
import { Overlay, Query } from 'components/common';

// hooks
import { useTribe } from 'hooks/tribe';

// types
import type { TribeBadge } from 'tools/types/tribe';

enum View {
  Badge,
  Home,
  Search,
}

const BadgesView = () => {
  const [view, setView] = useState(View.Home);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState<TribeBadge | null>(null);

  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const { back } = useRouter();

  const renderView = () => {
    switch (view) {
      case View.Home: {
        return (
          <div>
            Tribe Badges Home View nice to have an explanation and a welcome
            screen
          </div>
        );
      }
      case View.Badge:
        return (
          <BadgeView
            badge={selectedBadge}
            onCancel={() => setView(View.Home)}
          />
        );
      case View.Search:
        return (
          <div>
            <h1>TODO Search View</h1>
          </div>
        );
    }
  };

  return (
    <Overlay onClose={back} isOpen={isOpen}>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <Sidebar
          setSelectedBadge={(badge) => {
            console.log(badge);
            setSelectedBadge(badge);
            setView(View.Badge);
          }}
          showSearch={() => setView(View.Search)}
        />
      </div>
      <div className="md:pl-64 flex flex-col flex-1 text-black">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => null}
          >
            <span className="sr-only">Close Badges Managment</span>X
          </button>
        </div>
        <div className="flex-1">
          <div className="py-6">
            <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close pannel</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{renderView()}</div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

const BadgesViewProxy = () => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const { role, isUpgraded } = useTribe(tribeID);
  const isTribeOwnerOrTribeAdmin = role === Role.Owner || role === Role.Admin;

  if (false) {
    return (
      <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
            alt="People working on laptops"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
        </div>
        <div className="px-4 py-4 flex flex-col gap-4 absolute justify-center items-center w-full text-center h-full">
          {isTribeOwnerOrTribeAdmin === true ? (
            <>
              <p>You need to Upgrade this tribe in order to Manage Badges</p>
              <div className="flex justify-between gap-4">
                <Link passHref href={`/tribes/${tribeID}/upgrade`}>
                  <a className="flex justify-center h-12 items-center py-2 px-4 border-2 rounded-md shadow-sm text-md font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                    Upgrade Tribe
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <p>You don&apos;t have access to see this view </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Query api={`/core-api/tribe/${tribeID}/badges`} loader={null}>
      {() => <BadgesView />}
    </Query>
  );
};
export default BadgesViewProxy;
