import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

// api
import { deleteRoom } from 'api/room';

// components
import { Dialog } from 'components/common';

// context
import { useToast } from 'context/toast';

// hooks
import { useTribeRoom } from 'hooks/tribe';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  onClose: () => void;
  roomID: string;
}

const DeleteRoomDialog = ({ onClose, roomID }: Props) => {
  const toast = useToast();
  const { query } = useRouter();
  const { mutate } = useSWRConfig();

  const tribeID = query.tribeID as string;
  const room = useTribeRoom(tribeID, roomID);

  const handleDeleteRoom = async () => {
    try {
      mutate(
        '/core-api/profile/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.map((cacheTribe) =>
            cacheTribe.id === tribeID
              ? {
                  ...cacheTribe,
                  rooms: cacheTribe.rooms.filter(({ id }) => id !== roomID),
                }
              : cacheTribe
          ),
        false
      );

      // TODO wait for backend to complete this API
      // await deleteRoom(roomID);
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
      title="Delete Room!"
      onConfirm={handleDeleteRoom}
      confirmLabel="Yes, Delete"
    >
      <div className="grid gap-4">
        <p className="text-base text-center mt-6 text-gray-400">
          Are you sure you want to delete #{room.name}?
        </p>
      </div>
    </Dialog>
  );
};

export default DeleteRoomDialog;
