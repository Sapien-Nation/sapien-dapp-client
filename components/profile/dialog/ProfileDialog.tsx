import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect } from 'react';

// components
import {
  Dialog,
  DialogPassport,
  TextareaInput,
  TextInput,
} from 'components/common';
import { LottiePlayer } from 'lottie';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

interface FormValues {
  bio: string;
}

interface Props {
  onClose: () => void;
}

const defaultAvatar =
  'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=80';
const form = 'updat-profile-form';

const ProfileDialog = ({ onClose }: Props) => {
  const { me } = useAuth();

  const [showAnimation, setShowAnimation] = useState(
    me.passport ? true : false
  );
  const [showDialog, setShowDialog] = useState(me.passport ? false : true);

  useEffect(() => {
    if (showAnimation) {
      setTimeout(() => {
        //setShowAnimation(false);
        setShowDialog(true);
      }, 7000);
    }
  }, [showAnimation]);

  const toast = useToast();
  const avatarUrl = me.avatar || defaultAvatar;

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
    console.log(`RENDERING: ${me.passport}`);
    if (me.passport === null) {
      return (
        <Dialog
          form={form}
          show
          isFetching={isSubmitting}
          onClose={onClose}
          confirmLabel="Update"
          cancelLabel="Close"
        >
          <div className="rounded-xl mb-4 bg-transparent">
            <div className="bg-gradient-to-r bg-transparent h-28 shadow-md rounded-lg relative flex justify-center items-center py-4" />
            <div className="flex flex-col md:flex-row py-4 bg-transparent rounded-b-xl mb-4">
              <div className="relative ml-4 flex flex-col items-center">
                <div className="border border-sapien-40 w-20 h-20 -mt-16 rounded-full flex-shrink-0 bg-transparent flex items-center justify-center font-extrabold text-xl">
                  user
                </div>
                <h1 className="text-md mt-2">{me.displayName}</h1>
              </div>
            </div>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} id={form}>
                <div></div>
                <TextareaInput
                  className="bg-transparent border border-sapien-40"
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
        </Dialog>
      );
    }

    return (
      <DialogPassport
        form={form}
        show
        isFetching={isSubmitting}
        onClose={onClose}
        confirmLabel="Update"
        cancelLabel="Close"
        showCancel={false}
        showConfirm={false}
      >
        <div className="px-8">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} id={form}>
              <div className="flex gap-5 flex-wrap sm:flex-nowrap">
                <div className="text-center pt-4 flex flex-col justify-between">
                  <div className="bg-sapien-60 block h-32 w-36 hexagon rotate-90 p-[1px]">
                    <div className="bg-gray-700 h-full w-full hexagon flex items-center justify-center">
                      <img
                        src={avatarUrl}
                        className="-rotate-90 h-full"
                        alt="Passport Figure generated with Machine Learning"
                      />
                    </div>
                  </div>
                  <span className="hexagon-2 bg-sapien-60 p-[1px] text-sm block mt-5">
                    <span className="hexagon-2 bg-gray-700 block text-gray-400 p-1">
                      {me.displayName.replace(' ', '').length
                        ? me.displayName
                        : 'Name'}
                    </span>
                  </span>
                </div>
                <div className="w-full">
                  <ul className="flex justify-between text-xs text-center">
                    <li>
                      <span className="block text-gray-400 mb-1">
                        Passport #
                      </span>
                      <span className="text-gray-300 font-semibold">
                        {me.passport?.passportId ?? '-'}
                      </span>
                    </li>
                    <li>
                      <span className="block text-gray-400 mb-1">
                        Issue Date
                      </span>
                      <span className="text-gray-300 font-semibold">
                        {me.passport?.issueDate ?? '-'}
                      </span>
                    </li>
                    <li>
                      <span className="block text-gray-400 mb-1">
                        Issuing Authority
                      </span>
                      <span className="text-gray-300 font-semibold">
                        {me.passport?.issuingAuthority ?? '-'}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-5 flex justify-between gap-5">
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
                        readOnly
                        rules={{
                          validate: {
                            required: (value) =>
                              value.length > 0 || 'is required',
                          },
                        }}
                        value={me.firstName}
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
                        readOnly
                        rules={{
                          validate: {
                            required: (value) =>
                              value.length > 0 || 'is required',
                          },
                        }}
                        value={me.username}
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
                      readOnly
                      value={me.title}
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
                  readOnly
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
                  value={me.bio}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </DialogPassport>
    );
  };

  return (
    <>
      {showAnimation && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 transition-opacity">
          <div className="bg-opacity-75 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <LottiePlayer />
          </div>
        </div>
      )}
      {showDialog && renderView()}
    </>
  );
};

export default ProfileDialog;
