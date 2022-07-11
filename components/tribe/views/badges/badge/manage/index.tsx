import { useState } from 'react';

// components
import { Members, Permission, Settings } from './views';
import { Query } from 'components/common';

// types
import type { TribeBadge } from 'tools/types/tribe';

enum View {
  Settings,
  Members,
  Permissions,
}

const ManageBadgeView = ({ badge }: { badge: TribeBadge }) => {
  const [view, setView] = useState(View.Settings);

  const renderForm = () => {
    switch (view) {
      case View.Members:
        return <Members badgeID={badge.id} />;
      case View.Permissions:
        return <Permission badgeID={badge.id} />;
      case View.Settings:
        return <Settings badgeID={badge.id} />;
    }
  };

  return (
    <>
      <h1 className="flex text-lg flex-1 text-sapien-neutral-100">
        Manage &quot;{badge.name}&quot; Badge
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

const ManageBadgeViewProxy = ({ badgeID }: { badgeID: string }) => {
  return (
    <Query api={`/core-api/badge/${badgeID}`}>
      {(badge) => <ManageBadgeView badge={badge} />}
    </Query>
  );
};

export default ManageBadgeViewProxy;
