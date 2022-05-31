import { useState } from 'react';
import { useRouter } from 'next/router';

// components
import { TextInputLabel } from 'components/common';

// hooks
import { useTribe } from 'hooks/tribe';
import { useTribeBadges } from 'hooks/tribe/badge';

enum View {
  Settings,
  Members,
  Permissions,
}

const BadgeView = () => {
  const [view, setView] = useState(View.Settings);

  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const tribeBadges = useTribeBadges(tribeID);
  const { avatar, name } = useTribe(tribeID);

  const badge = tribeBadges.find((tribeBadge) => tribeBadge.name === 'Owner');
  const renderForm = () => {
    switch (view) {
      case View.Members:
        return (
          <div className="flex flex-col p-8">
            <h1>Coming Soon!</h1>
          </div>
        );
      case View.Permissions:
        return (
          <div className="flex flex-col p-8">
            <h1>Coming Soon!</h1>
          </div>
        );
      case View.Settings:
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
                  {name[0].toUpperCase()}
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
            <TextInputLabel
              label="Badge Description"
              name="description"
              error=""
            />
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
    }
  };

  return (
    <div>
      <h1 className="flex text-lg flex-1 text-sapien-neutral-100">
        Owner Badge
      </h1>
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex justify-around border border-gray-800 rounded-md p-3">
          <button
            className={`border-b-2 ${
              view === View.Settings ? 'border-sapien' : 'border-transparent'
            } px-3`}
            onClick={() => setView(View.Settings)}
            type="button"
          >
            Settings
          </button>
          <button
            className={`border-b-2 ${
              view === View.Members ? 'border-sapien' : 'border-transparent'
            } px-3`}
            onClick={() => setView(View.Members)}
            type="button"
          >
            Members
          </button>
          <button
            className={`border-b-2 ${
              view === View.Permissions ? 'border-sapien' : 'border-transparent'
            } px-3`}
            onClick={() => setView(View.Permissions)}
            type="button"
          >
            Permissions
          </button>
        </div>
        <div className="border border-gray-800 rounded-md">{renderForm()}</div>
      </div>
    </div>
  );
};

export default BadgeView;
