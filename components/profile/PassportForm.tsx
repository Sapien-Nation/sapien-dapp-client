import { useState } from 'react';

// components
import { Query } from 'components/common';
import { BadgeView, PassportView } from './views';

enum View {
  Passport,
  Badge,
}

const PassportForm = () => {
  const [view, setView] = useState<View | null>(View.Passport);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const renderView = () => {
    switch (view) {
      case View.Passport:
        return (
          <PassportView
            selectBadge={(badgeID) => {
              setSelectedBadge(badgeID);
              setView(View.Badge);
            }}
          />
        );
      case View.Badge:
        // TODO backend need to do this API
        return (
          <Query
            api={`/core-api/user/badges/${selectedBadge}`}
            options={{
              fetcher: () => ({
                id: selectedBadge,
              }),
            }}
          >
            {() => (
              <BadgeView
                badgeID={selectedBadge}
                onBack={() => {
                  setView(View.Passport);
                  setSelectedBadge(null);
                }}
              />
            )}
          </Query>
        );
    }
  };

  return <div>{renderView()}</div>;
};

const PassportFormProxy = () => {
  return <Query api="/core-api/user/badges">{() => <PassportForm />}</Query>;
};

export default PassportFormProxy;
