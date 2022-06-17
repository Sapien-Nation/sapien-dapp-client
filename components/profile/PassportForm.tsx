import { Transition } from '@headlessui/react';
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
        <Transition
          show
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <FormProvider {...methods}>
            <form onSubmit={() => {}} id="update-profile-form">
              <div className="flex flex-col w-[580px]">
                <PassportForm />
              </div>
            </form>
          </FormProvider>
        </Transition>
      )}
    </Query>
  );
};

export default PassportFormProxy;
