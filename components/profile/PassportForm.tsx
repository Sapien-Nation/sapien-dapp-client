import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// context
import { useAuth } from 'context/user';

// components
import { Query } from 'components/common';
import { BadgeView, PassportView } from './views';

// hooks
import { usePassport } from 'hooks/passport';

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
        return (
          <Query api={`/core-api/badge/${selectedBadge}`}>
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
  const passport = usePassport();

  const methods = useForm({
    defaultValues: {
      displayName: passport.username,
      username: passport.username,
      bio: 'Bio',
      title: 'Founding Member of the Sapien Nation',
    },
  });

  return (
    <Query api={`/core-api/user/${me.id}/badges`}>
      {() => (
        <FormProvider {...methods}>
          <form onSubmit={() => {}} id="update-profile-form">
            <div className="flex flex-col w-[580px]">
              <PassportForm />
            </div>
          </form>
        </FormProvider>
      )}
    </Query>
  );
};

export default PassportFormProxy;
