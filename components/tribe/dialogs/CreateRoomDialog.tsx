import { Switch } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { useState } from 'react';
import { MinusIcon } from '@heroicons/react/outline';

// api
import { createRoom } from 'api/room';

// constants
import { RoomType } from 'tools/constants/rooms';

// context
import { useAuth } from 'context/user';

// components
import { Dialog, Query, TextInput, TextInputLabel } from 'components/common';

// hooks
import { useToast } from 'context/toast';
import { useTribeUserBadges } from 'hooks/tribe/badge';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  aboutObject: string;
  aboutObjectId: string;
  onClose: () => void;
}
interface FormValues {
  badges: Array<string>;
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
  const tribeBadges = useTribeUserBadges();

  const {
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    watch,
  } = methods;
  const [badges, name] = watch(['badges', 'name']);

  const onSubmit = async ({ badges, name }: FormValues) => {
    try {
      const response = await createRoom({
        aboutObject,
        aboutObjectId,
        name,
        tribeId: tribeID as string,
        type: isPrivate ? RoomType.Private : RoomType.Public,
        badges,
      });

      mutate(
        '/core-api/profile/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.map((tribe) => {
            if (tribe.id === tribeID) {
              return {
                ...tribe,
                rooms: [
                  ...tribe.rooms,
                  {
                    id: response.id,
                    name,
                    type: isPrivate ? RoomType.Private : RoomType.Public,
                  },
                ],
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

  const renderView = () => {
    switch (view) {
      case View.Badges:
        return (
          <div>
            <div className="flex justify-between items-center p-3 my-3">
              <span>Who can access this room?</span>
              <span className="text-sm font-medium text-gray-500">
                {badges.length === 0 ? (
                  'Please select at least 1 badge'
                ) : (
                  <>
                    ({badges.length} {badges.length === 1 ? 'badge' : 'badges'}{' '}
                    selected)
                  </>
                )}
              </span>
            </div>

            <ul>
              {tribeBadges.map((badge) => {
                const isBadgeSelected = badges.includes(badge.parentId);
                return (
                  <li
                    className={`border ${
                      isBadgeSelected ? 'border-sapien-80' : 'border-gray-800'
                    }
                    ${
                      isBadgeSelected
                        ? 'hover:border-sapien-80'
                        : 'hover:border-gray-700'
                    }
                    w-full flex justify-between items-center rounded-md p-3 mb-3 hover:cursor-pointer`}
                    onClick={() => {
                      if (isBadgeSelected) {
                        setValue(
                          'badges',
                          badges.filter((b) => b !== badge.parentId)
                        );
                      } else {
                        setValue('badges', [...badges, badge.parentId]);
                      }
                    }}
                    key={badge.parentId}
                  >
                    {badge.avatar ? (
                      <img
                        src={badge.avatar}
                        alt={badge.name}
                        style={{ borderColor: badge.color }}
                        className="w-8 h-8 object-cover rounded-full border-2"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full bg-gray-700 border-2 font-bold text-black group-hover:text-gray-500 flex items-center justify-center"
                        style={{ borderColor: badge.color }}
                      />
                    )}
                    {badge.name}
                    <button
                      type="button"
                      className={`${
                        isBadgeSelected ? 'visible' : 'invisible'
                      } rounded-md text-gray-400 hover:text-gray-500 focus:outline-none`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue(
                          'badges',
                          badges.filter((b) => b !== badge.parentId)
                        );
                      }}
                    >
                      <span className="sr-only">Remove</span>
                      <MinusIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
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
                  className="flex items-center justify-between mt-1"
                >
                  <span className="flex-grow flex flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-500"
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
          onConfirm: isPrivate
            ? () => {
                if (name === '') {
                  setError('name', {
                    message: 'is required',
                  });
                  return;
                }
                setView(View.Badges);
              }
            : undefined,
        };
      case View.Badges:
        return {
          onCancel: () => setView(View.Home),
          onConfirm: () => {
            if (badges?.length === 0) {
              return;
            }
            onSubmit({ badges, name });
          },
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
  const { me } = useAuth();
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <Query api={`/core-api/user/${me.id}/badges?tribeId=${tribeID}`}>
      {() => <CreateRoomDialog {...props} />}
    </Query>
  );
};
export default CreateRoomDialogProxy;
