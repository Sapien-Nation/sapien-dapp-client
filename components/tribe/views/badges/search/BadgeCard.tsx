// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
  onClick: () => void;
}

const BadgeCard = ({ badge, onClick }: Props) => {
  return (
    <div className="border-4 w-20 h-56">
      <h1>{badge.name}</h1>
      <button onClick={onClick}>Select</button>
    </div>
  );
};

export default BadgeCard;
