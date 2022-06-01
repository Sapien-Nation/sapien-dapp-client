import { useState } from 'react';

// components
import { Members, Settings } from './views';

// types
import type { DraftBadge } from '../../types';

interface Props {
  badge: DraftBadge;
}

enum View {
  Settings,
  Members,
  Permissions,
}

const ManageBadgeView = ({ badge }: Props) => {
  const [view, setView] = useState(View.Settings);

  const renderForm = () => {
    switch (view) {
      case View.Members:
        return <Members />;
      case View.Permissions:
        return (
          <div className="flex flex-col p-8">
            <h1>Coming Soon!</h1>
          </div>
        );
      case View.Settings:
        return <Settings badge={badge} />;
    }
  };

  return (
    <>
      <h1 className="flex text-lg flex-1 text-sapien-neutral-100">
        Manage Badge
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
    </>
  );
};

export default ManageBadgeView;
