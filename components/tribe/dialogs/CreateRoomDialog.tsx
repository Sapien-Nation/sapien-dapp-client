import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { useSWRConfig } from 'swr';

// api
import { createRoom } from 'api/room';

// constants
import { ToastType } from 'constants/toast';

// components
import { Dialog, TextInput, TextInputLabel } from 'components/common';

// hooks
import { useToast } from 'context/toast';
import { ProfileTribe } from 'tools/types/tribe';

interface Props {
  aboutObject: string;
  aboutObjectId: string;
  onClose: () => void;
}
interface FormValues {
  name: string;
}

const form = 'create-room-form';
const CreateRoomDialog = ({ aboutObject, aboutObjectId, onClose }: Props) => {
  const toast = useToast();
  const {
    query: { tribeID },
  } = useRouter();
  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
  });

  const { push } = useRouter();
  const { mutate } = useSWRConfig();

  const {
    formState: { errors },
    handleSubmit,
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

      toast({
        message: 'Room created successfully',
        type: ToastType.Success,
      });

      onClose();
      push(`/tribes/${tribeID}/${response.id}`);
    } catch (error) {
      toast({
        message: error || 'Service unavailable',
      });
    }
  };

  return (
    <Dialog
      show
      isFetching={false}
      onClose={onClose}
      title="Create a Room"
      form={form}
      confirmLabel="Create"
    >
      <div className="mt-5 md:mt-0 md:col-span-2">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} id={form}>
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
          </form>
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default CreateRoomDialog;
