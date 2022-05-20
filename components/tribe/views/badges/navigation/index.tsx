import { useState } from 'react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { PlusIcon, SearchIcon } from '@heroicons/react/outline';

// constants
import { BadgeTypes } from 'tools/constants/tribe';

// components
import BadgeNavItem from './BadgeNavItem';

// hooks
import { useTribe } from 'hooks/tribe';
import { useTribeBadges } from 'hooks/tribe/badge';

// types
import type { TribeBadge } from 'tools/types/tribe';

// assets
import { ContributorBadge } from 'assets';

interface Props {
  showSearch: () => void;
  setSelectedBadge: (badge: TribeBadge) => void;
}

const Sidebar = ({ showSearch, setSelectedBadge }: Props) => {
  const [draftBadges, setDraftBadges] = useState<Array<TribeBadge>>([]);

  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const tribe = useTribe(tribeID);
  const tribeBadges = useTribeBadges(tribeID);

  //---------------------------------------------------------------------
  const handleAddLocalTribe = () => {
    const badgeID = nanoid();

    const badge = {
      id: badgeID,
      description: '',
      name: badgeID,
      color: '',
      type: BadgeTypes.Draft,
    };

    setDraftBadges((currentDraftBadges) => [...currentDraftBadges, badge]);

    return badge;
  };

  return (
    <nav className="flex-1 flex flex-col min-h-0 bg-sapien-neutral-600">
      <div className="flex-1 flex flex-col pt-5 pb-4 px-4">
        <div>
          <h1 className="font-semibold">BADGES</h1>
          <h2 className="gap-1 mt-3 font-bold relative w-full tracking-wide items-center uppercase text-sm flex rounded-lg focus:outline-none px-2 py-2 bg-sapien-neutral-800">
            <img
              src="/images/sapien_nation.png"
              alt="Sapien Nation"
              className="w-6 pt-0.5"
            />
            {tribe.name}
          </h2>
        </div>
        <div className="mt-5 flex-1">
          <button
            onClick={() => {
              const newBadge = handleAddLocalTribe();
              setSelectedBadge(newBadge);
            }}
            type="button"
            className="py-2 text-xs w-full flex justify-between items-center text-sapien-neutral-200 font-bold"
          >
            CREATE A BADGE <PlusIcon className="text-sapien-neutral-200 w-4" />
            <span className="sr-only">Click here to add a new local badge</span>
          </button>
          <ul className="space-y-1.5 mt-2">
            {tribeBadges.map((badge) => {
              return (
                <li key={badge.id} className="flex flex-col gap-2">
                  <BadgeNavItem
                    badge={badge}
                    logo={tribe.avatar}
                    onSelect={() => setSelectedBadge(badge)}
                  />
                </li>
              );
            })}
            {draftBadges.map((badge) => {
              return (
                <li key={badge.id} className="flex flex-col gap-2">
                  <BadgeNavItem
                    badge={badge}
                    logo={tribe.avatar}
                    onSelect={() => setSelectedBadge(badge)}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <button
          onClick={showSearch}
          type="button"
          className="w-full text-gray-300 group px-3 py-2 mb-5 cursor-pointer rounded-lg flex items-center justify-between text-base font-medium bg-gray-700 hover:bg-gray-50 hover:text-gray-900"
        >
          Explore Badges <ContributorBadge className="w-8 h-8" />
          <span className="sr-only">Browse Existing Badges</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
