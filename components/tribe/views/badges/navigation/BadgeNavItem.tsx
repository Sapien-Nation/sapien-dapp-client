// constants
import { BadgeTypes } from 'tools/constants/tribe';

// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
  onSelect: () => void;
}

const BadgeNavItem = ({ badge, onSelect }: Props) => {
  return (
    <button
      onClick={() => onSelect()}
      aria-label="Select tribe"
      className="bg-white border-2 border-black p-3 text-black rounded-lg"
    >
      {badge.name} {badge.type === BadgeTypes.Draft ? 'DRAFT' : ''}
    </button>
  );
};

export default BadgeNavItem;
