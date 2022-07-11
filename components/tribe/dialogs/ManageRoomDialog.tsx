import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { useSWRConfig } from 'swr';

// api
import { deleteRoom } from 'api/room';

// components
import { Dialog, Query, TextInput } from 'components/common';

// context
import { useToast } from 'context/toast';

// hooks
import { useTribeRoom, useTribePermission } from 'hooks/tribe';

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

  const tribeID = query.tribeID as string;
  const viewID = query.viewID as string;
  const room = useTribeRoom(tribeID, roomID);
  const [canDeleteRoom] = useTribePermission(tribeID, ['canDeleteRoom']);

  const methods = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
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

  const [name] = watch(['name']);
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
      {canDeleteRoom && (
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
                      required: (value) => value === room.name || 'is required',
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
      )}
    </Dialog>
  );
};

const ManageRoomDialogProxy = ({ roomID, onClose }: Props) => {
  return (
    <Query api={`/core-api/room/${roomID}/badges`}>
      {() => <ManageRoomDialog roomID={roomID} onClose={onClose} />}
    </Query>
  );
};

export default ManageRoomDialog;
