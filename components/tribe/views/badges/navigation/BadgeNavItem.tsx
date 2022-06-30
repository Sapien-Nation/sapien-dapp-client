// types
import type { TribeBadge } from 'tools/types/tribe';
import type { DraftBadge } from '../types';

interface Props {
  badge: TribeBadge | DraftBadge;
  onSelect: () => void;
  isSelected: boolean;
}

const BadgeNavItem = ({ badge, isSelected, onSelect }: Props) => {
  return (
    <button
      onClick={onSelect}
      aria-label="Select tribe"
      className={
        isSelected
          ? 'border border-sapien-neutral-200 py-2 px-3 rounded-lg flex items-center gap-2 text-gray-300 bg-gray-800 font-semibold'
          : 'border border-sapien-neutral-200 py-2 px-3 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-gray-800'
      }
    >
      {badge.avatar ? (
        <img
          src={badge.avatar}
          alt={badge.name}
          style={{ borderColor: badge.color }}
          className="w-8 h-8 object-cover rounded-full border-2"
        />
      ) : (
        <div
          className="w-8 h-8 rounded-full bg-gray-700 border-2 font-bold text-black group-hover:text-gray-500 flex items-center justify-center"
          style={{ borderColor: badge.color }}
        >
          D
        </div>
      )}
      <span className="text-ellipsis truncate flex-1 text-left">
        {badge.name || '[DRAFT]'}
      </span>
      <span className="text-gray-500 text-xs">
        {badge.name === 'Owner' ? '(Default)' : ''}
      </span>
    </button>
  );
};

export default BadgeNavItem;
