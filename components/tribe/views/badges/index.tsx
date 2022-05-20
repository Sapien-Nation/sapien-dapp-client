import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { XIcon } from '@heroicons/react/outline';

// constants
import { BadgeTypes, Role } from 'tools/constants/tribe';

// components
import { Overlay, Query } from 'components/common';
import { BadgeCreationView, BadgeManageView } from './badge';
import Sidebar from './navigation';
import SearchView from './search';

// hooks
import { useTribe } from 'hooks/tribe';

// types
import type { TribeBadge } from 'tools/types/tribe';

// mocks
import { mockTribeBadge } from 'tools/mocks/tribe';

enum View {
  BadgeManage,
  BadgeCreation,
  Home,
  Search,
}

interface Props {
  tribeBadges: Array<TribeBadge>;
}

const BadgesView = ({ tribeBadges }: Props) => {
  const [view, setView] = useState(View.Home);
  const [isOpen, setIsOpen] = useState(true);
  const [draftBadges, setDraftBadges] = useState<Array<TribeBadge>>([]);
  const [selectedBadge, setSelectedBadge] = useState<TribeBadge | null>(null);

  const { back } = useRouter();

  const handleAddDraftBadge = () => {
    const badgeID = nanoid();

    const badge = {
      id: badgeID,
      description: 'This is a draft badge, please edit this description.',
      name: '[draft] badge',
      color: '#6200EA',
      type: BadgeTypes.Draft,
    };

    setDraftBadges((currentDraftBadges) => [...currentDraftBadges, badge]);
    setSelectedBadge(badge);
  };

  const renderView = () => {
    switch (view) {
      case View.Home: {
        return (
          <div>
            <div className="bg-gradient-to-r to-[#6200ea] from-black px-4 py-8 font-semibold text-lg lg:text-2xl mt-3 rounded-md">
              <h1>Unlock your power with Badges!</h1>
            </div>
            <div className="whitespace-pre-line text-gray-300 space-y-2 pt-5 text-justify">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum! Provident similique accusantium nemo autem.
                Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto voluptate aliquam nihil, eveniet aliquid culpa
                officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
              </p>
              <p>
                quia. Quo neque error repudiandae fuga? Ipsa laudantium
                molestias eos sapiente officiis modi at sunt excepturi expedita
                sint?Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Maxime mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum! Provident similique accusantium nemo autem.
                Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto voluptate aliquam nihil, eveniet aliquid culpa
                officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia.
                Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                sapiente officiis modi at sunt excepturi expedita sint?
              </p>
            </div>
          </div>
        );
      }
      case View.BadgeManage:
        return (
          <BadgeManageView
            badge={selectedBadge!}
            onCancel={() => setView(View.Home)}
          />
        );
      case View.BadgeCreation:
        return (
          <BadgeCreationView
            badge={selectedBadge}
            onCancel={() => setView(View.Home)}
          />
        );
      case View.Search:
        return (
          <SearchView
            onSelect={(badge) => {
              setDraftBadges((currentDraftBadges) => [
                ...currentDraftBadges,
                badge,
              ]);
              setSelectedBadge(badge);

              setView(View.BadgeCreation);
            }}
          />
        );
    }
  };

  return (
    <Overlay onClose={back} isOpen={isOpen}>
      <div className="flex h-full">
        <div className="hidden md:flex md:w-64 md:flex-col md:inset-y-0">
          <Sidebar
            handleAddDraftBadge={handleAddDraftBadge}
            draftBadges={draftBadges}
            setSelectedBadge={(badge) => {
              setSelectedBadge(badge);

              switch (badge.type) {
                case BadgeTypes.Draft:
                  setView(View.BadgeCreation);
                  break;
                case BadgeTypes.Normal:
                case BadgeTypes.Owner:
                  setView(View.BadgeManage);
                  break;
              }
            }}
            showSearch={() => setView(View.Search)}
            tribeBadges={tribeBadges}
          />
        </div>
        <div className="flex-1 overflow-auto">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 relative">
            <button
              type="button"
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none absolute right-0 top-5"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close Badges Managment</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="py-8">{renderView()}</div>
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
    <Query
      api={`/core-api/tribe/${tribeID}/badges`}
      loader={null}
      options={{
        fetcher: () => [
          mockTribeBadge({
            name: 'Owner 1',
            color: '#sapien',
            description: 'this is the owner badge',
            type: BadgeTypes.Owner,
          }),
          mockTribeBadge({
            name: 'Normal 1',
            color: '#sapien',
            description: 'this is the owner badge',
            type: BadgeTypes.Normal,
          }),
          mockTribeBadge({
            name: 'Normal 2',
            color: '#sapien',
            description: 'this is the owner badge',
            type: BadgeTypes.Normal,
          }),
        ],
      }}
    >
      {(tribeBadges) => <BadgesView tribeBadges={tribeBadges} />}
    </Query>
  );
};
export default BadgesViewProxy;
