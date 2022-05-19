// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
}

const BadgeNavItem = ({ badge }: Props) => {
  return (
    <span className="bg-white border-2 border-black p-3 text-black rounded-lg">
      {badge.name}
    </span>
  );
};

export default BadgeNavItem;
