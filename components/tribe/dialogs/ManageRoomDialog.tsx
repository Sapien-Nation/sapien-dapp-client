import { CheckIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { ClipboardIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { useCopyToClipboard } from 'react-use';

// api
import { deleteRoom } from 'api/room';

// components
import { Dialog, Query, TextInput } from 'components/common';

// context
import { useToast } from 'context/toast';

// hooks
import { useTribeRoom } from 'hooks/tribe';
import { useRoomPermissions } from 'hooks/room';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  onClose: () => void;
  roomID: string;
}

const ManageRoomDialog = ({ onClose, roomID }: Props) => {
  const toast = useToast();
  const { mutate } = useSWRConfig();
  const { push, query } = useRouter();
  const [state, copyToClipboard] = useCopyToClipboard();
  const [showSuccessCopy, setShowSuccessCopy] = useState(false);

  const tribeID = query.tribeID as string;
  const viewID = query.viewID as string;
  const room = useTribeRoom(tribeID, roomID);
  const [canDeleteRoom] = useRoomPermissions(roomID, ['canDeleteRoom']);

  const methods = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  const onSubmit = async () => {
    try {
      await deleteRoom(roomID);

      mutate(
        '/core-api/user/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.map((tribe) => {
            if (tribe.id === tribeID) {
              return {
                ...tribe,
                rooms: tribe.rooms.filter((room) => room.id !== roomID),
              };
            }

            return tribe;
          }),
        false
      );

      if (viewID === roomID) {
        push(`/tribes/${tribeID}/home`);
      }

      onClose();
    } catch (error) {
      toast({
        message: error || 'Service unavailable',
      });
    }
  };

  const handleUpdateRoom = async () => {
    try {
      onClose();
    } catch (err) {
      toast({
        message: err,
      });
    }
  };

  return (
    <Dialog
      show
      isFetching={false}
      onClose={onClose}
      title={`Manage Room ${room.name}`}
      onConfirm={handleUpdateRoom}
      confirmLabel="Confirm"
      showCancel={false}
      showConfirm={false}
    >
      <div className="grid gap-5">
        <div className="flex flex-col">
          <h1 className="font-bold text-white tracking-widest">General</h1>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Share room with friends, invite them to join the tribe and start a
              conversation
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    sapien.network/
                  </span>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={`tribes/.../${roomID}`}
                  style={{ paddingLeft: 107 }}
                  className="appearance-none block w-full px-3 py-2 border bg-gray-800 border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  copyToClipboard(
                    `${window.location.host}/tribes/${tribeID}/${roomID}`
                  );

                  setShowSuccessCopy(true);
                  setTimeout(() => {
                    setShowSuccessCopy(false);
                  }, 1000);
                }}
                className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-600 text-sm font-medium rounded-r-md text-white bg-black hover:bg-white hover:text-black focus:outline-none focus:ring-1 "
              >
                {copyToClipboard ? (
                  <CheckIcon
                    className="h-5 w-5 text-green-600"
                    aria-hidden="true"
                  />
                ) : (
                  <ClipboardIcon className="h-5 w-5 " aria-hidden="true" />
                )}
                <span>
                  {showSuccessCopy
                    ? 'Copied to clipboard'
                    : 'Copy to clipboard'}
                </span>
              </button>
            </div>
          </div>
        </div>
        {canDeleteRoom && room.name.toLocaleLowerCase() !== 'general' ? (
          <div className="flex flex-col">
            <h1 className="font-bold text-red-500 tracking-widest">
              DANGER ZONE
            </h1>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} id="confirm-delete">
                <div className="flex-1 py-4">
                  <TextInput
                    name="name"
                    aria-label="name"
                    placeholder={room.name}
                    required
                    pattern={/^[a-zA-Z0-9-_\s]$/}
                    rules={{
                      validate: {
                        required: (value) =>
                          value === room.name || 'is required',
                      },
                    }}
                  />
                  {errors?.name ? (
                    <p className="text-red-400 tracking-normal text-sm">
                      Room Name should be equal
                    </p>
                  ) : (
                    <p className="text-gray-500 tracking-normal text-sm">
                      Enter room name to confirm the deletion of this room.
                    </p>
                  )}
                </div>
                <div className="flex flex-row-reverse">
                  <button
                    type="submit"
                    className={
                      isSubmitting
                        ? 'cursor-not-allowed disabled:opacity-75 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm'
                        : 'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm'
                    }
                    disabled={isSubmitting}
                  >
                    Delete
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        ) : null}
      </div>
    </Dialog>
  );
};

const ManageRoomDialogProxy = ({ roomID, onClose }: Props) => {
  return (
    <Query api={`/core-api/room/${roomID}/permissions`}>
      {() => <ManageRoomDialog roomID={roomID} onClose={onClose} />}
    </Query>
  );
};

export default ManageRoomDialogProxy;
