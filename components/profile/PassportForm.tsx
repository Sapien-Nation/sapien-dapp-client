import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

// api
import { updateProfile } from 'api/profile';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// components
import { Query } from 'components/common';
import { BadgeView, PassportView } from './views';

// hooks
import { usePassport } from 'hooks/passport';

// types
import type { UserPassport } from 'tools/types/user';

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

interface FormValues {
  displayName: string;
  username: string;
  bio: string;
  title: string;
}

const PassportFormProxy = () => {
  const { me } = useAuth();
  const passport = usePassport();

  const toast = useToast();
  const { mutate } = useSWRConfig();
  const methods = useForm<FormValues>({
    defaultValues: {
      displayName: passport.username,
      username: passport.username,
      bio: 'Bio',
      title: 'Founding Member of the Sapien Nation',
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = async (values: FormValues) => {
    try {
      await updateProfile({ bio: values.bio });

      mutate(
        '/core-api/me/passport',
        (passport: UserPassport) => ({
          ...passport,
          bio: values.bio,
        }),
        false
      );
      // TODO close dialog
    } catch (err) {
      toast({ message: err });
    }
  };

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
            <form onSubmit={handleSubmit(onSubmit)} id="update-profile-form">
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
