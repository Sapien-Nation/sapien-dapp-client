import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

// api
import { createRoom } from 'api/room';

// constants
import { AboutObject, RoomType } from 'tools/constants/rooms';
import { ProfileTribe } from 'tools/types/tribe';

// context
import { useToast } from 'context/toast';

interface FormValues {
  badges: Array<string>;
  name: string;
}

interface Props {
  badgeID: string;
  onClose: () => void;
}

const CreatePrivateRoomDialog = ({ badgeID, onClose }: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const toast = useToast();
  const { mutate } = useSWRConfig();
  const methods = useForm<FormValues>({
    defaultValues: {
      badges: [badgeID],
      name: '',
    },
  });
  const onSubmit = async ({ badges, name }: FormValues) => {
    try {
      const response = await createRoom({
        aboutObject: AboutObject.Party,
        aboutObjectId: tribeID,
        name,
        tribeId: tribeID,
        type: RoomType.Private,
        badges,
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

      mutate(
        `/core-api/tribe/${tribeID}/rooms?type=PRIVATE`,
        (privateRooms) => [...privateRooms, response],
        false
      );

      queueMicrotask(() => {
        onClose();
      });
    } catch (error) {
      toast({
        message: error || 'Service unavailable',
      });
    }
  };

  return null;
};

export default CreatePrivateRoomDialog;
