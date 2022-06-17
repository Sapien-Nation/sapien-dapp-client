import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

// api
import { createRoom } from 'api/room';

// constants
import { AboutObject, RoomType } from 'tools/constants/rooms';
import { Dialog, TextInput, TextInputLabel } from 'components/common';
import { ProfileTribe } from 'tools/types/tribe';

// context
import { useToast } from 'context/toast';
import { useState } from 'react';

interface FormValues {
  name: string;
}

interface Props {
  onClose: () => void;
}

const form = 'create-private-room';
const CreatePrivateRoomDialog = ({ onClose }: Props) => {
  const toast = useToast();
  const { query } = useRouter();
  const { mutate } = useSWRConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tribeID = query.tribeID as string;

  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
  });

  const {
    formState: { errors },
    handleSubmit,
  } = methods;

  const onSubmit = async ({ name }: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await createRoom({
        aboutObject: AboutObject.Party,
        aboutObjectId: tribeID,
        name,
        tribeId: tribeID,
        type: RoomType.Private,
        badges: [],
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
                  { id: response.id, name, private: true },
                ],
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
    setIsSubmitting(false);
  };

  return (
    <Dialog
      show
      isFetching={isSubmitting}
      onClose={onClose}
      title="Create Private Room"
      form={form}
      confirmLabel="Create"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} id={form}>
          <div className="flex flex-col gap-3">
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
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default CreatePrivateRoomDialog;
