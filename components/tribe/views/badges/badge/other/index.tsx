import { useState } from 'react';

// components
import { Query } from 'components/common';
import { MembersView, PermissionsView, SettingsView } from './views';

interface Props {
  badgeID: string;
}

enum View {
  Settings,
  Members,
  Permissions,
}

const ManageBadgeView = ({ badgeID }: Props) => {
  const [view, setView] = useState(View.Settings);

  const renderForm = () => {
    switch (view) {
      case View.Members:
        return <MembersView badgeID={badgeID} />;
      case View.Permissions:
        return <PermissionsView badgeID={badgeID} />;
      case View.Settings:
        return <SettingsView badgeID={badgeID} />;
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

const ManageBadgeViewProxy = ({ badgeID }: { badgeID: string }) => {
  return (
    <Query api={`/core-api/badge/${badgeID}`}>
      {() => <ManageBadgeView badgeID={badgeID} />}
    </Query>
  );
};

export default ManageBadgeViewProxy;
