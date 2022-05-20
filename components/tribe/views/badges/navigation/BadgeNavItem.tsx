// constants
import { BadgeTypes } from 'tools/constants/tribe';

// types
import type { TribeBadge } from 'tools/types/tribe';

// assets
import { ContributorBadge } from 'assets';

interface Props {
  logo?: string;
  badge: TribeBadge;
  onSelect: () => void;
}

const BadgeNavItem = ({ logo, badge, onSelect }: Props) => {
  console.log(badge);
  return (
    <button
      onClick={() => onSelect()}
      aria-label="Select tribe"
      className="border border-sapien-neutral-200 py-2 px-3 rounded-lg flex items-center gap-1.5 text-gray-300"
    >
      {logo ? (
        <img
          src={logo}
          alt={badge.name}
          className="w-8 h-8 object-cover rounded-full border-2 border-sapien"
        />
      ) : (
        <ContributorBadge className="w-8 h-8" />
      )}
      <span className="text-ellipsis truncate flex-1">{badge.name}</span>
      <span className="text-gray-500 text-xs">
        ({badge.type === BadgeTypes.Draft ? 'DRAFT' : ''})
      </span>
    </button>
  );
};

export default BadgeNavItem;
