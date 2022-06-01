// components
import { TextInputLabel } from 'components/common';
import { useFormContext } from 'react-hook-form';

// types
import type { DraftBadge } from '../../../types';

interface Props {
  badge: DraftBadge;
}

const SettingsForm = ({ badge }: Props) => {
  return (
    <div className="flex flex-col p-3">
      <TextInputLabel label="Badge Icon" name="icon" error="" />
      <div className="relative">
        {badge.avatar ? (
          <img
            src={badge.avatar}
            alt="Tribe Avatar"
            className={`border-2 w-8 h-8 object-cover rounded-full cursor-pointer`}
            style={{ borderColor: badge.color }}
          />
        ) : (
          <div
            className="w-8 h-8 rounded-full bg-gray-700 border-2 font-bold text-black group-hover:text-gray-500 flex items-center justify-center"
            style={{ borderColor: badge.color }}
          >
            {badge.name[0].toUpperCase()}
          </div>
        )}
      </div>
      <TextInputLabel label="Badge Name" name="name" error="" />
      <input
        className="appearance-none block w-full cursor-not-allowed px-3 py-2 border bg-gray-800 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        name="name"
        aria-label="name"
        readOnly
        disabled
        value={badge.name}
      />
      <TextInputLabel label="Badge Description" name="description" error="" />
      <input
        className="appearance-none block w-full cursor-not-allowed px-3 py-2 border bg-gray-800 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        readOnly
        value={badge.description}
        disabled
        name="description"
        aria-label="description"
        maxLength={4000}
      />
    </div>
  );
};

export default SettingsForm;
