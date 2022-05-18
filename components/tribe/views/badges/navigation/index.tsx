import { useState } from 'react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

// components
import BadgeNavItem from './BadgeNavItem';

// hooks
import { useTribeBadges } from 'hooks/tribe/badge';

// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  setSelectedBadge: (badge: TribeBadge) => void;
}

const Sidebar = ({ setSelectedBadge }: Props) => {
  const [draftBadges, setDraftBadges] = useState<Array<TribeBadge>>([]);

  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const tribeBadges = useTribeBadges(tribeID);

  //---------------------------------------------------------------------
  const handleAddLocalTribe = () => {
    const badgeID = nanoid();

    const badge = {
      id: badgeID,
      description: '',
      name: badgeID,
      image: '',
    };

    setDraftBadges((currentDraftBadges) => [...currentDraftBadges, badge]);

    return badge;
  };

  return (
    <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white text-black overflow-y-auto">
      <div className="mt-5 flex-grow flex flex-col">
        <nav className="flex-1 px-2 bg-white space-y-1" aria-label="Sidebar">
          {tribeBadges.map((badge) => {
            return (
              <div key={badge.id}>
                <BadgeNavItem badge={badge} />
              </div>
            );
          })}
          {draftBadges.map((badge) => {
            return (
              <div key={badge.id}>
                <BadgeNavItem badge={badge} />
              </div>
            );
          })}
          <div>
            <button
              onClick={() => {
                const newBadge = handleAddLocalTribe();
                setSelectedBadge(newBadge);
              }}
              type="button"
              className="group p-3 mb-16 cursor-pointer rounded-lg flex items-center text-base font-medium text-gray-50 bg-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Add Badge
              <span className="sr-only">
                Click here to add a new local badge
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
