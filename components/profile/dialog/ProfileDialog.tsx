import { useForm, FormProvider } from 'react-hook-form';

// components
import { Dialog, TextareaInput } from 'components/common';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

interface FormValues {
  bio: string;
}

interface Props {
  onClose: () => void;
}

const form = 'updat-profile-form';
const ProfileDialog = ({ onClose }: Props) => {
  const toast = useToast();
  const { me } = useAuth();

  const methods = useForm<FormValues>({
    defaultValues: {
      bio: me.bio,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: FormValues) => {
    try {
      // TODO API Call
      console.log(values);
    } catch (err) {
      toast({ message: err });
    }
  };

  return (
    <Dialog
      form={form}
      show
      isFetching={isSubmitting}
      onClose={onClose}
      confirmLabel="Update"
      cancelLabel="Close"
    >
      <div className="rounded-xl mb-4 bg-gray-900">
        <div className="bg-gradient-to-r bg-sapien-neutral-200 h-28 shadow-md rounded-lg relative flex justify-center items-center py-4" />
        <div className="flex flex-col md:flex-row py-4">
          <div className="relative ml-4 flex flex-col items-center">
            <div className="w-20 h-20 -mt-16 rounded-full flex-shrink-0 bg-sapien-neutral-200 shadow shadow-sapien-neutral-600 flex items-center justify-center font-extrabold text-xl">
              user
            </div>
            <h1 className="text-md mt-2">{me.displayName}</h1>
          </div>
        </div>
        <h2 className="text-sm mb-2">User info</h2>
        <div className="border-t border-gray-800 pt-4">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} id={form}>
              <TextareaInput
                name="bio"
                maxLength={1000}
                placeholder="Bio"
                rules={{
                  validate: {
                    maxLength: (value) => {
                      if (value?.length > 0) {
                        return (
                          value?.length <= 1001 ||
                          'Must be only 1000 characters long'
                        );
                      }
                    },
                  },
                }}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfileDialog;
