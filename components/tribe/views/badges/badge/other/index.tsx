import { useState } from 'react';

// components
import { Query } from 'components/common';
import { SettingsView } from './views';

// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badgeName: string;
  badgeID: string;
  tribeName: string;
}

enum View {
  Settings,
  Members,
  Permissions,
}

const ManageBadgeView = ({ badgeName, badgeID, tribeName }: Props) => {
  const [view, setView] = useState(View.Settings);

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
        return <SettingsView badgeID={badgeID} />;
    }
  };

  return (
    <>
      <h1 className="flex text-lg flex-1 text-sapien-neutral-100">
        Manage Badge ({badgeName} - {tribeName})
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
        {view === View.Members ? (
          <>{renderForm()}</>
        ) : (
          <div className="border border-gray-800 rounded-md">
            {renderForm()}
          </div>
        )}
      </div>
    </>
  );
};

const ManageBadgeViewProxy = ({ badge }: { badge: TribeBadge }) => {
  return (
    <Query api={`/core-api/badge/${badge.id}`}>
      {() => (
        <ManageBadgeView
          badgeID={badge.id}
          tribeName={badge.tribeName}
          badgeName={badge.name}
        />
      )}
    </Query>
  );
};

export default ManageBadgeViewProxy;
