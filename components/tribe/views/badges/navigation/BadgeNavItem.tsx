// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
}

const BadgeNavItem = ({ badge }: Props) => {
  return <span>{badge.name}</span>;
};

export default BadgeNavItem;
