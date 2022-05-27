// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
}

const ReadonlyBadgeView = ({ badge }: Props) => {
  return (
    <>
      <h1 className="flex text-lg flex-1 text-sapien-neutral-100">
        OWNER Badge
      </h1>
      <div className="flex flex-col gap-3 mt-5">
        <div className="border border-gray-800 rounded-md">
          <h1>READONLY BADGE {badge.name}</h1>
        </div>
      </div>
    </>
  );
};

export default ReadonlyBadgeView;
