import { useState } from 'react';
import { matchSorter } from 'match-sorter';

// components
import BadgeCard from './BadgeCard';

// hooks
import { useMainTribe, useTribe } from 'hooks/tribe';

// json
import DefaultBadgesJSON from './DefaultBadges.json';

// types
import type { TribeDiscoveryBadge } from 'tools/types/tribe';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  onSelect: (badge: TribeDiscoveryBadge) => void;
}

const Search = ({ onSelect }: Props) => {
  const [badgeSearchTerm] = useState('');

  const { tribeID: sapienTribeID } = useMainTribe();
  const sapienTribe = useTribe(sapienTribeID);

  const defaultBadges: Array<TribeDiscoveryBadge> =
    DefaultBadgesJSON.badges.map((badge) => ({
      ...badge,
      avatar: sapienTribe.avatar,
      tribeName: sapienTribe.name,
    }));

  return (
    <div>
      <section>
        <h2 className="text-lg text-sapien-neutral-200">Badges</h2>
        <div className="space-y-3 mt-3">
          {matchSorter(defaultBadges, badgeSearchTerm, {
            keys: ['name'],
          }).map((badge) => (
            <BadgeCard
              badge={badge}
              onClick={() => onSelect(badge)}
              key={badge.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Search;
