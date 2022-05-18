// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
}

const BadgeView = ({ badge }: Props) => {
  return <h1>TODO badge tabs and forms here {badge.name}</h1>;
};

export default BadgeView;
