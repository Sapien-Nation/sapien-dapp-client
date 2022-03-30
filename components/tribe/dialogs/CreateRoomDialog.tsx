import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { useSWRConfig } from 'swr';

// api
import { createRoom } from 'api/room';

// components
import { Dialog, TextInput, TextInputLabel } from 'components/common';

//hooks
import { useToast } from 'context/toast';
import { ProfileTribe } from 'tools/types/tribe';

interface Props {
  onClose: () => void;
  tribeID: string;
}

interface FormValues {
  name: string;
}

const form = 'create-room-form';
const CreateRoomDialog = ({ onClose, tribeID }: Props) => {
  const toast = useToast();
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
      const response = await createRoom({ name, tribeId: tribeID });

      mutate(
        '/api/v3/profile/tribes',
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
        message: 'Tribe created successfully',
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
                className="block w-full bg-gray-800 pr-10 pl-3 pt-3 pb-3 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
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
