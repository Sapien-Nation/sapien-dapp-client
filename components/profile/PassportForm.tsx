import { useState } from 'react';

// context
import { useAuth } from 'context/user';

// components
import { Query } from 'components/common';
import { BadgeView, PassportView } from './views';

enum View {
  Passport,
  Badge,
}

const PassportForm = () => {
  const { me } = useAuth();
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
        return (
          <Query
            api={`/core-api/user/${me.id}/badges`}
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
  const { me } = useAuth();

  return (
    <Query api={`/core-api/user/${me.id}/badges`}>
      {() => <PassportForm />}
    </Query>
  );
};

export default PassportFormProxy;
