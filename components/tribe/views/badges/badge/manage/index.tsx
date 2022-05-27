import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// components
import { Query } from 'components/common';
import { Members, Permissions, Settings } from '../forms';

// context
import { useToast } from 'context/toast';

// types
import type { TribeBadge } from 'tools/types/tribe';
import type { BadgeFormValues } from '../types';
import { options } from 'preact';

interface Props {
  badge: TribeBadge;
  onCancel: () => void;
}

enum View {
  Settings,
  Members,
  Permissions,
}

const ManageBadgeView = ({ badge, onCancel }: Props) => {
  const [view, setView] = useState(View.Settings);

  console.log(badge);
  const toast = useToast();
  const methods = useForm<BadgeFormValues>({
    defaultValues: {
      color: badge.color,
      description: badge.description,
      name: badge.name,
      owners: [],
      permissions: [],
    },
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = methods;

  const onSubmit = async () => {
    try {
      // TODO api call to update badge
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

  const [badgeName, badgeColor, badgeDescription] = watch([
    'name',
    'color',
    'description',
  ]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="flex text-lg flex-1 text-sapien-neutral-100">
          Edit Badge
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
          <div className="flex justify-end border border-gray-800 p-3 rounded-md">
            <button
              className="mx-1 p-2 text-sapien-red-700"
              onClick={onCancel}
              type="button"
              disabled={isSubmitting}
            >
              Reset
            </button>
            <button
              className="mx-1 p-2 rounded-md bg-primary hover:bg-sapien-80 hover:cursor-pointer"
              disabled={
                badgeName === '' ||
                badgeColor === '' ||
                badgeDescription === '' ||
                isSubmitting
              }
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageBadgeView;
