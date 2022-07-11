import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

// api
import { updateProfile } from 'api/profile';

// constants
import { ToastType } from 'constants/toast';

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

interface Props {
  closeOverlay: () => void;
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
}

const PassportForm = ({ closeOverlay, isEditing, setIsEditing }: Props) => {
  const [view, setView] = useState<View | null>(View.Passport);
  // TODO: Default to 'user flair badge id' once API is ready
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const { me } = useAuth();

  const renderView = () => {
    switch (view) {
      case View.Passport:
        return (
          <PassportView
            badgeID={selectedBadge}
            viewBadgeDetails={(badgeID) => {
              setSelectedBadge(badgeID);
              setView(View.Badge);
            }}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
          />
        );
      case View.Badge:
        return (
          <Query api={`/core-api/user/${me.id}/badge/${selectedBadge}`}>
            {() => (
              <BadgeView
                badgeID={selectedBadge}
                closeOverlay={closeOverlay}
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

const PassportFormProxy = ({ closeOverlay }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const { me } = useAuth();
  const toast = useToast();
  const passport = usePassport();
  const { mutate } = useSWRConfig();

  const methods = useForm<FormValues>({
    defaultValues: {
      displayName: passport.username,
      username: passport.username,
      bio: passport.bio,
      title: 'Founding Member of the Sapien Nation',
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = async (values: FormValues) => {
    try {
      mutate(
        '/core-api/me/passport',
        (passport: UserPassport) => ({
          ...passport,
          bio: values.bio,
        }),
        false
      );
      await updateProfile({ bio: values.bio });

      toast({ message: 'Bio updated successfully', type: ToastType.Success });
    } catch (err) {
      toast({ message: err });
    }
    setIsEditing(false);
  };

  return (
    <Query api={`/core-api/user/${me.id}/badges`}>
      {() => (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} id="update-profile-form">
            <div className="flex flex-col w-[580px]">
              <PassportForm
                closeOverlay={closeOverlay}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </div>
          </form>
        </FormProvider>
      )}
    </Query>
  );
};

export default PassportFormProxy;
