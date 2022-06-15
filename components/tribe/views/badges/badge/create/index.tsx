import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

// api
import { createTribeBadge } from 'api/tribe';

// context
import { useToast } from 'context/toast';

// constants
import { ToastType } from 'constants/toast';

// components
import { Members, Permissions, Settings } from './views';

// types
import type { DraftBadge } from '../../types';
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: DraftBadge;
  onCancel: () => void;
  onCreate: () => void;
}

interface BadgeFormValues {
  color: string;
  description: string;
  name: string;
  rooms: Array<{ roomID: string; data: { read: boolean; write: boolean } }>;
  members: Array<{ id: string; walletAddress: string }>;
}

enum View {
  Settings,
  Members,
  Permissions,
}

const BadgeView = ({ badge, onCancel, onCreate }: Props) => {
  const [view, setView] = useState(View.Settings);

  const toast = useToast();
  const { query } = useRouter();
  const methods = useForm<BadgeFormValues>({
    defaultValues: {
      color: badge.color,
      description: badge.description,
      name: badge.name,
      members: badge.members,
      rooms: [],
    },
  });
  const { mutate } = useSWRConfig();
  const {
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = methods;

  const tribeID = query.tribeID as string;

  const onSubmit = async (values: BadgeFormValues) => {
    try {
      const newBadge = {
        tribeId: tribeID,
        ...values,
        rooms: values.rooms.map(({ roomID, data }) => ({
          roomID,
          data,
        })),
      };

      await createTribeBadge(newBadge);

      mutate(
        `/core-api/tribe/${tribeID}/badges`,
        (badges: Array<TribeBadge>) => [...badges, newBadge],
        false
      );

      onCreate();
      toast({
        message: 'Badge Created Succefully',
        type: ToastType.Success,
      });
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
        return <Members />;
      case View.Permissions:
        return <Permissions />;
      case View.Settings:
        return <Settings badge={badge} />;
    }
  };

  const renderActions = () => {
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
          className={
            isSubmitting
              ? 'mx-1 p-2 rounded-md bg-primary hover:bg-sapien-80 cursor-not-allowed disabled:opacity-75'
              : 'mx-1 p-2 rounded-md bg-primary hover:bg-sapien-80 hover:cursor-pointer'
          }
          disabled={disableConfirm}
          type="submit"
        >
          {isSubmitting ? 'Creating...' : 'Confirm'}
        </button>
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="flex text-lg flex-1 text-sapien-neutral-100">
          Create Badge
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
