import { useForm, FormProvider } from 'react-hook-form';
import { CameraIcon } from '@heroicons/react/outline';

// components
import { Dialog, TextareaInput, TextInput } from 'components/common';

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

  const renderView = () => {
    if (me.passport) {
      return (
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
                <div></div>
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
      );
    }

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} id={form}>
          <div className="flex gap-5 flex-wrap sm:flex-nowrap">
            <div className="text-center">
              <div className="bg-sapien-60 block h-28 w-32 hexagon rotate-90 p-[1px]">
                <div className="bg-gray-700 h-full w-full hexagon flex items-center justify-center">
                  <CameraIcon className="w-5 -rotate-90" />
                </div>
              </div>
              <span className="hexagon-2 bg-sapien-60 p-[1px] text-sm block mt-5">
                <span className="hexagon-2 bg-gray-700 block text-gray-400">
                  {me.displayName}
                </span>
              </span>
            </div>
            <div className="w-full">
              <ul className="flex justify-between text-xs text-center">
                <li>
                  <span className="block text-gray-400 mb-1">Passport #</span>
                  <span className="text-gray-300 font-semibold">BD0000</span>
                </li>
                <li>
                  <span className="block text-gray-400 mb-1">Issue Date</span>
                  <span className="text-gray-300 font-semibold">
                    17/04/2022
                  </span>
                </li>
                <li>
                  <span className="block text-gray-400 mb-1">
                    Issuing Authority
                  </span>
                  <span className="text-gray-300 font-semibold">
                    Sapien Network
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex justify-between gap-5">
                <div
                  style={{
                    clipPath:
                      'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                  }}
                  className="mt-3 flex-1 relative before:absolute before:pointer-events-none before:h-[35px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[35px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
                >
                  <TextInput
                    aria-label="name"
                    autoComplete="name"
                    className="!bg-transparent appearance-none min-h-[64px] border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    name="name"
                    placeholder="Name"
                    rules={{
                      validate: {
                        required: (value) => value.length > 0 || 'is required',
                      },
                    }}
                  />
                </div>
                <div
                  style={{
                    clipPath:
                      'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                  }}
                  className="mt-3 flex-1 relative before:absolute before:pointer-events-none before:h-[35px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[35px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
                >
                  <TextInput
                    aria-label="username"
                    autoComplete="username"
                    className="!bg-transparent appearance-none min-h-[64px] border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    name="username"
                    placeholder="Username"
                    rules={{
                      validate: {
                        required: (value) => value.length > 0 || 'is required',
                      },
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  clipPath:
                    'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                }}
                className="mt-3 relative before:absolute before:pointer-events-none before:h-[35px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[35px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
              >
                <TextInput
                  aria-label="title"
                  autoComplete="title"
                  className="!bg-transparent appearance-none min-h-[64px] border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  name="title"
                  placeholder="Title"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              clipPath:
                'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
            }}
            className="mt-3 relative before:absolute before:pointer-events-none before:h-[35px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[35px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
          >
            <TextareaInput
              name="bio"
              maxLength={1000}
              placeholder="Bio"
              className="!border-[1px] border-sapien-80 !bg-transparent"
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
          </div>
        </form>
      </FormProvider>
    );
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
      {renderView()}
    </Dialog>
  );
};

export default ProfileDialog;
