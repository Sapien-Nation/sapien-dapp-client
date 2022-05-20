import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// context
import { useToast } from 'context/toast';

// components
import { Query } from 'components/common';
import { Members, Permissions, Settings } from './forms';

// types
import type { TribeBadge } from 'tools/types/tribe';

interface BadgeFormValues {
  color: string;
  description: string;
  name: string;
}
interface Props {
  badge: TribeBadge;
  onCancel: () => void;
}

enum View {
  Settings,
  Members,
  Permissions,
}

const BadgeView = ({ badge, onCancel }: Props) => {
  const [view, setView] = useState(View.Settings);

  const toast = useToast();
  const methods = useForm<BadgeFormValues>({
    defaultValues: {
      color: badge.color,
      description: badge.description,
      name: badge.name,
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = methods;

  const onSubmit = async () => {
    try {
      // TODO api call to generate badge
    } catch (error) {
      toast({
        message: error,
      });
    }
  };

  const renderForm = () => {
    switch (view) {
      case View.Members:
        return <Members />;
      case View.Permissions:
        return <Permissions />;
      case View.Settings:
        return <Settings />;
    }
  };

  const [badgeName, badgeColor] = watch(['name', 'color']);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create Badge</h1>
        <button onClick={onCancel} type="button" disabled={isSubmitting}>
          Cancel
        </button>
        <button
          disabled={badgeName === '' || badgeColor === '' || isSubmitting}
          type="submit"
        >
          Confirm
        </button>
        <button
          onClick={() => setView(View.Settings)}
          type="button"
          disabled={isSubmitting}
        >
          Settings
        </button>
        <button
          onClick={() => setView(View.Members)}
          type="button"
          disabled={isSubmitting}
        >
          Members
        </button>
        <button
          onClick={() => setView(View.Permissions)}
          type="button"
          disabled={isSubmitting}
        >
          Permissions
        </button>

        {renderForm()}
      </form>
    </FormProvider>
  );
};

const BadgeViewProxy = ({ badge, onCancel }: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <Query api={`/core-api/tribe/${tribeID}/members`}>
      {() => <BadgeView badge={badge} onCancel={onCancel} />}
    </Query>
  );
};

export default BadgeViewProxy;
