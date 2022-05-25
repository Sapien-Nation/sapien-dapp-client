// types
import type { ProfileTribe } from 'tools/types/tribe';

// components
import TribeAvatar from 'components/navigation/TribeAvatar';

interface Props {
  tribe: ProfileTribe;
}

function TribeHeader({ tribe }: Props) {
  return (
    <div className="flex flex-row w-full">
      <TribeAvatar tribe={tribe} />
      <div className="flex flex-col justify-start sm:ml-2">
        <h1 className="text-m text-left sm:text-left font-semibold">
          {tribe.name}
        </h1>
        <h2 className="text-xs text-gray-500 mb-4 sm:mb-0">123 members</h2>
      </div>
    </div>
  );
}

export default TribeHeader;
