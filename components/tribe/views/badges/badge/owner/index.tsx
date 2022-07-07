import { useState } from 'react';

// components
import { Settings, Members, Permissions } from './views';

// hooks
import { useTribeBadges } from 'hooks/tribe/badge';

enum View {
  Settings,
  Members,
  Permissions,
}

const BadgeView = () => {
  const [view, setView] = useState(View.Settings);

  const { myBadges, otherBadges } = useTribeBadges();

  const badge = [...myBadges, ...otherBadges].find(
    (tribeBadge) => tribeBadge.name === 'Owner'
  );
  const renderForm = () => {
    switch (view) {
      case View.Members:
        return <Members badge={badge} />;
      case View.Permissions:
        return <Permissions />;
      case View.Settings:
        return <Settings badge={badge} />;
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
