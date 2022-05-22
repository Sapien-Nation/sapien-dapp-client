// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
  onClick: () => void;
}

const BadgeCard = ({ badge, onClick }: Props) => {
  return (
    <div className="rounded-md bg-sapien-neutral-600 flex p-5 gap-3">
      <img
        src={badge.image}
        alt={badge.name}
        style={{ borderColor: badge.color }}
        className="w-12 h-12 object-cover rounded-full border-2"
      />
      <div className="flex flex-1 text-sm gap-2 py-1">
        <div className="flex-1">
          <h3 className="font-semibold">{badge.name}</h3>
          <p className="text-sapien-neutral-200">{badge.description}</p>
        </div>
        <div>
          <button
            className="bg-gray-800 px-5 py-2 rounded-md"
            onClick={onClick}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;
