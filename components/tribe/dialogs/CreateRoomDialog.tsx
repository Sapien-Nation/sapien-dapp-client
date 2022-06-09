import { Switch } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { useState } from 'react';

// api
import { createRoom } from 'api/room';

// components
import { Dialog, Query, TextInput, TextInputLabel } from 'components/common';

// hooks
import { useToast } from 'context/toast';
import { useTribeBadges } from 'hooks/tribe/badge';

// types
import type { ProfileTribe, TribeBadge } from 'tools/types/tribe';

interface Props {
  aboutObject: string;
  aboutObjectId: string;
  onClose: () => void;
}
interface FormValues {
  badges: Array<String>;
  name: string;
}

enum View {
  Badges,
  Home,
}

const form = 'create-room-form';
const CreateRoomDialog = ({ aboutObject, aboutObjectId, onClose }: Props) => {
  const [view, setView] = useState(View.Home);
  const [isPrivate, setIsPrivate] = useState(false);

  const toast = useToast();
  const { query } = useRouter();
  const tribeID = query.tribeID as string;

  const methods = useForm<FormValues>({
    defaultValues: {
      badges: [],
      name: '',
    },
  });

  const { push } = useRouter();
  const { mutate } = useSWRConfig();
  const tribeBadges = useTribeBadges(tribeID);

  const {
    formState: { errors },
    handleSubmit,
    watch,
  } = methods;

  const onSubmit = async ({ name }: FormValues) => {
    try {
      const response = await createRoom({
        aboutObject,
        aboutObjectId,
        name,
        tribeId: tribeID as string,
      });

      mutate(
        '/core-api/profile/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.map((tribe) => {
            if (tribe.id === tribeID) {
              return {
                ...tribe,
                rooms: [...tribe.rooms, { id: response.id, name }],
              };
            }

            return tribe;
          }),
        false
      );

      onClose();
      push(`/tribes/${tribeID}/${response.id}`);
    } catch (error) {
      toast({
        message: error || 'Service unavailable',
      });
    }
  };

  const [badges] = watch(['badges']);
  const renderView = () => {
    switch (view) {
      case View.Badges:
        return (
          <div>
            <ul>
              {tribeBadges.map((badge) => {
                // TODO investigate if https://react-hook-form.com/api/usefieldarray/ is a good fit to hold badges
                return (
                  <li
                    onClick={() => {
                      console.log('TODO add badge to badges calling setValue');
                    }}
                    key={badge.id}
                  >
                    {badge.name}
                    {badges.includes(badge.id) && (
                      <button
                        onClick={() => {
                          console.log(
                            'TODO remove badge from badges calling setValue'
                          );
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      case View.Home:
        return (
          <>
            <div className="flex-1">
              <TextInputLabel
                label="Name"
                name="name"
                error={errors.name?.message}
              />
              <TextInput
                name="name"
                aria-label="name"
                placeholder="The Sapien Tribe"
                maxLength={50}
                pattern={/^[a-zA-Z\s]$/}
                rules={{
                  validate: {
                    required: (value) => value.length > 0 || 'is required',
                    minLength: (value) =>
                      value?.length > 2 ||
                      'Must be Between 2 and 50 characters long',
                    maxLength: (value) =>
                      value?.length <= 51 ||
                      'Must be Between 2 and 50 characters long',
                  },
                }}
              />
            </div>
            {tribeBadges.length > 0 && (
              <div>
                <Switch.Group
                  as="div"
                  className="flex items-center justify-between"
                >
                  <span className="flex-grow flex flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Private Room
                    </Switch.Label>
                    <Switch.Description
                      as="span"
                      className="text-sm text-gray-500"
                    >
                      This Room will be only accessible by members with the
                      appropiate badge
                    </Switch.Description>
                  </span>
                  <Switch
                    checked={isPrivate}
                    onChange={setIsPrivate}
                    className={
                      isPrivate
                        ? 'bg-indigo-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        : 'relative bg-gray-200 inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={
                        isPrivate
                          ? 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-5'
                          : 'translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                      }
                    />
                  </Switch>
                </Switch.Group>
              </div>
            )}
          </>
        );
    }
  };

  const getDialogProps = () => {
    switch (view) {
      case View.Home:
        return {
          confirmLabel: isPrivate ? 'Next' : 'Confirm',
          onConfirm: isPrivate ? () => setView(View.Badges) : undefined,
        };
      case View.Badges:
        return {
          onCancel: () => setView(View.Home),
          cancelLabel: 'Back',
          confirmLabel: 'Create',
        };
    }
  };

  return (
    <Dialog
      show
      isFetching={false}
      onClose={onClose}
      title="Create a Room"
      {...getDialogProps()}
      form={isPrivate ? null : form}
    >
      <div className="mt-5 md:mt-0 md:col-span-2">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} id={form}>
            {renderView()}
          </form>
        </FormProvider>
      </div>
    </Dialog>
  );
};

const CreateRoomDialogProxy = (props: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <Query api={`/core-api/tribe/${tribeID}/badges`}>
      {() => <CreateRoomDialog {...props} />}
    </Query>
  );
};
export default CreateRoomDialogProxy;
