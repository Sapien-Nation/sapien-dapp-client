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
    <div className="flex-1 flex flex-col min-h-0 bg-sapien-neutral-600">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1>Badges</h1>
        </div>
        <div className="flex items-center flex-shrink-0 px-4">
          <h1>{tribe.name}</h1>
        </div>

        <nav className="mt-5 flex-1 px-2 space-y-1">
          <button
            onClick={() => {
              const newBadge = handleAddLocalTribe();
              setSelectedBadge(newBadge);
            }}
            type="button"
            className="w-full group p-3 mb-5 cursor-pointer rounded-lg flex items-center justify-between text-base font-medium text-gray-50 bg-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            Create a badge <PlusIcon className="h-5 w-5" />
            <span className="sr-only">Click here to add a new local badge</span>
          </button>
          {tribeBadges.map((badge) => {
            return (
              <div key={badge.id} className="flex flex-col gap-2">
                <BadgeNavItem
                  badge={badge}
                  onSelect={() => setSelectedBadge(badge)}
                />
              </div>
            );
          })}
          {draftBadges.map((badge) => {
            return (
              <div key={badge.id} className="flex flex-col gap-2">
                <BadgeNavItem
                  badge={badge}
                  onSelect={() => setSelectedBadge(badge)}
                />
              </div>
            );
          })}

          <button
            onClick={showSearch}
            type="button"
            className="w-full group p-3 mb-5 cursor-pointer rounded-lg flex items-center justify-between text-base font-medium text-gray-50 bg-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            Search Badges <SearchIcon className="h-5 w-5" />
            <span className="sr-only">Browse Existing Badges</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
