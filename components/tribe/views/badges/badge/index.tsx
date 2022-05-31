import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// context
import { useToast } from 'context/toast';

// components
import { Query } from 'components/common';
import { Members, Permissions, Settings } from './views';

// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
  onCancel: () => void;
}

interface BadgeFormValues {
  color: string;
  description: string;
  name: string;
  owners: Array<string>;
  permissions: Array<string>;
}

enum View {
  Settings,
  Members,
  Permissions,
}

const BadgeView = ({ badge, onCancel }: Props) => {
  const [view, setView] = useState(View.Settings);

  const toast = useToast();
  const { query } = useRouter();
  const methods = useForm<BadgeFormValues>({
    defaultValues: {
      color: badge.color,
      description: badge.description,
      name: badge.name,
      owners: badge.owners,
      permissions: [],
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = methods;

  //-----------------------------------------------------------------
  const tribeID = query.tribeID as string;
  const isOwnerBadge = badge.name === 'Owner';
  //-----------------------------------------------------------------
  const onSubmit = async () => {
    try {
      // TODO api call to generate badge
    } catch (error) {
      toast({
        message: error,
      });
    }
  };

  const [badgeName, badgeColor, badgeDescription] = watch([
    'name',
    'color',
    'description',
  ]);

  const renderForm = () => {
    switch (view) {
      case View.Members:
        return (
          <Query api={`/core-api/tribe/${tribeID}/members`} loader={null}>
            {() => <Members isOwner={isOwnerBadge} />}
          </Query>
        );
      case View.Permissions:
        return <Permissions isOwner={isOwnerBadge} />;
      case View.Settings:
        return <Settings isOwner={isOwnerBadge} />;
    }
  };

  const renderActions = () => {
    if (isOwnerBadge) return null;

    const disableConfirm = (() => {
      if (isSubmitting === true) return true;

      return badgeName === '' || badgeColor === '' || badgeDescription === '';
    })();

    return (
      <div className="flex justify-end border border-gray-800 p-3 rounded-md">
        <button
          className="mx-1 p-2 text-sapien-red-700"
          onClick={onCancel}
          type="button"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          className="mx-1 p-2 rounded-md bg-primary hover:bg-sapien-80 hover:cursor-pointer"
          disabled={disableConfirm}
          type="submit"
        >
          Confirm
        </button>
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="flex text-lg flex-1 text-sapien-neutral-100">
          {isOwnerBadge ? 'Owner Badge' : 'Edit Badge'}
        </h1>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex justify-around border border-gray-800 rounded-md p-3">
            <button
              className={`border-b-2 ${
                view === View.Settings ? 'border-sapien' : 'border-transparent'
              } px-3`}
              onClick={() => setView(View.Settings)}
              type="button"
              disabled={isSubmitting}
            >
              Settings
            </button>
            <button
              className={`border-b-2 ${
                view === View.Members ? 'border-sapien' : 'border-transparent'
              } px-3`}
              onClick={() => setView(View.Members)}
              type="button"
              disabled={isSubmitting}
            >
              Members
            </button>
            <button
              className={`border-b-2 ${
                view === View.Permissions
                  ? 'border-sapien'
                  : 'border-transparent'
              } px-3`}
              onClick={() => setView(View.Permissions)}
              type="button"
              disabled={isSubmitting}
            >
              Permissions
            </button>
          </div>
          <div className="border border-gray-800 rounded-md">
            {renderForm()}
          </div>
          {renderActions()}
        </div>
      </form>
    </FormProvider>
  );
};

export default BadgeView;
