// constants
import { BadgeTypes } from 'tools/constants/tribe';

// types
import type { TribeBadge } from 'tools/types/tribe';

// assets
import { ContributorBadge } from 'assets';

interface Props {
  image?: string;
  badge: TribeBadge;
  onSelect: () => void;
  isSelected: boolean;
}

const BadgeNavItem = ({ image, badge, isSelected, onSelect }: Props) => {
  const getBadgeLabel = (type: BadgeTypes) => {
    if (type === BadgeTypes.Draft) {
      return '(DRAFT)';
    } else if (type === BadgeTypes.Normal) {
      return '';
    } else {
      return '(Default)';
    }
  };

  return (
    <button
      onClick={() => onSelect()}
      aria-label="Select tribe"
      className={
        isSelected
          ? 'border border-sapien-neutral-200 py-2 px-3 rounded-lg flex items-center gap-1.5 text-gray-300 bg-gray-800 font-semibold'
          : 'border border-sapien-neutral-200 py-2 px-3 rounded-lg flex items-center gap-1.5 text-gray-300 hover:bg-gray-800'
      }
    >
      {image ? (
        <img
          src={image}
          alt={badge.name}
          style={{ borderColor: badge.color }}
          className="w-8 h-8 object-cover rounded-full border-2"
        />
      ) : (
        <ContributorBadge className="w-8 h-8" />
      )}
      <span className="text-ellipsis truncate flex-1 text-left">
        {badge.name}
      </span>
      <span className="text-gray-500 text-xs">{getBadgeLabel(badge.type)}</span>
    </button>
  );
};

export default BadgeNavItem;
