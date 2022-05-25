import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { ArrowLeftIcon } from '@heroicons/react/outline';

// components
import { TextareaInput, TextInput, TextInputLabel } from 'components/common';

// hooks
import { usePassport } from 'hooks/passport';

// utils
import { formatDate } from 'utils/date';
import { formatAvatarName, formatTokenID } from 'utils/passport';

enum View {
  Passport,
  Badges,
}

interface Props {
  setShowPassport: (showPassport: boolean) => void;
}

const PassportForm = ({ setShowPassport }: Props) => {
  const [view, setView] = useState(View.Passport);

  const passport = usePassport();
  const { query } = useRouter();

  const methods = useForm({
    defaultValues: {
      displayName: passport.username, // TODO remove displayName
      username: passport.username,
      bio: 'Coming soon!',
      title: 'Founding Member of the Sapien Nation',
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={() => setShowPassport(false)} id={'updat-profile-form'}>
        <div className="flex flex-col min-w-[540px] min-h-[350px]">
          {view === View.Passport && (
            <>
              <div className="flex gap-5 flex-wrap sm:flex-nowrap">
                <div className="text-center pt-4 flex flex-col justify-between">
                  <div className="bg-sapien-60 block h-32 w-36 hexagon rotate-90 p-1px">
                    <div className="bg-black h-full w-full hexagon flex items-center justify-center">
                      <img
                        src={passport.image}
                        className="-rotate-90 h-full object-cover"
                        alt="Passport Figure generated with Machine Learning"
                      />
                    </div>
                  </div>
                  <span className="hexagon-2 bg-sapien-60 p-1px text-sm block mt-5">
                    <span className="hexagon-2 bg-sapien-dark-purple block text-gray-300 p-1">
                      {formatAvatarName(passport.title)}
                    </span>
                  </span>
                </div>
                <div className="w-full">
                  <ul className="flex justify-between text-xs text-left">
                    <li>
                      <span className="block font-bold text-gray-400 mb-1">
                        Passport Number
                      </span>
                      <span className="text-gray-300 font-semibold">
                        {formatTokenID(Number(query.tokenID))}
                      </span>
                    </li>
                    <li>
                      <span className="block font-bold text-gray-400 mb-1">
                        Issue Date
                      </span>
                      <span className="text-gray-300 font-semibold">
                        {formatDate(passport.issueDate, 'LLLL d y')}
                      </span>
                    </li>
                    <li>
                      <span className="block font-bold text-gray-400 mb-1">
                        Issuing Authority
                      </span>
                      <span className="text-gray-300 font-semibold">
                        {passport.issuingAuthority}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-1 flex justify-between gap-5">
                    <div
                      style={{
                        clipPath:
                          'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                      }}
                      className="mt-3 flex-1 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
                    >
                      <TextInput
                        aria-label="name"
                        autoComplete="name"
                        className="appearance-none min-h-64px border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        name="displayName"
                        placeholder="Name"
                        readOnly
                        rules={{
                          validate: {
                            required: (value) =>
                              value.length > 0 || 'is required',
                          },
                        }}
                        style={{
                          background: 'transparent',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        clipPath:
                          'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                      }}
                      className="mt-3 flex-1 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
                    >
                      <TextInput
                        aria-label="username"
                        autoComplete="username"
                        className="appearance-none min-h-64px border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        name="username"
                        placeholder="Username"
                        readOnly
                        rules={{
                          validate: {
                            required: (value) =>
                              value.length > 0 || 'is required',
                          },
                        }}
                        style={{
                          background: 'transparent',
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      clipPath:
                        'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                    }}
                    className="mt-3 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
                  >
                    <TextInput
                      aria-label="title"
                      autoComplete="title"
                      className="appearance-none min-h-64px border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="title"
                      placeholder="Title"
                      readOnly
                      style={{
                        background: 'transparent',
                      }}
                      // onClick={() => setView(View.Badges)} // Remove comment when back-end is ready
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  clipPath:
                    'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                }}
                className="mt-3 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
              >
                <TextareaInput
                  name="bio"
                  maxLength={1000}
                  placeholder="Bio"
                  className="!border-[1px] !border-sapien-80"
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
                  value={passport.bio}
                  style={{
                    background: 'transparent',
                  }}
                />
              </div>
            </>
          )}
          {view === View.Badges && (
            <>
              <div className="flex flex-col gap-3">
                <div className="absolute top-12 flex justify-start">
                  <button onClick={() => setView(View.Passport)}>
                    <ArrowLeftIcon className="h-5 w-5" />
                  </button>
                </div>
                <ul className="flex items-center justify-between text-xs text-left">
                  <li>
                    <img
                      alt=""
                      className="h-10 w-10 rounded-full"
                      src="https://ui-avatars.com/api/?name=A"
                    />
                  </li>
                  <li>
                    <span className="block font-bold text-gray-400 mb-1">
                      Number
                    </span>
                    <span className="text-gray-300 font-semibold">
                      1 of 350
                    </span>
                  </li>
                  <li>
                    <span className="block font-bold text-gray-400 mb-1">
                      Issue Date
                    </span>
                    <span className="text-gray-300 font-semibold">
                      4/20/2022
                    </span>
                  </li>
                  <li>
                    <span className="block font-bold text-gray-400 mb-1">
                      Issuing Authority
                    </span>
                    <span className="text-gray-300 font-semibold">
                      Sapien Nation
                    </span>
                  </li>
                </ul>
                <div className="flex justify-between gap-5">
                  <TextInput
                    aria-label="user"
                    autoComplete="user"
                    className="appearance-none  border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    name="userName"
                    placeholder="Username"
                    style={{
                      background: 'transparent',
                    }}
                    value="TribalRage"
                  />
                  <TextInput
                    aria-label="badge-name"
                    autoComplete="badge-name"
                    className="appearance-none  border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    name="badgeName"
                    placeholder="Badge Name"
                    style={{
                      background: 'transparent',
                    }}
                    value="JournoDAO Press Badge"
                  />
                </div>
                <TextInput
                  aria-label="description"
                  autoComplete="description"
                  className="appearance-none  border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  name="description"
                  placeholder="Description"
                  style={{
                    background: 'transparent',
                  }}
                  value="This badge is issued by JournoDAO to qualified journalists"
                />
                <span className="text-sm">Badge Access (20 Tribes)</span>
                <div className="border rounded-md border-sapien-80 h-40 overflow-y-auto">
                  <div className="border rounded-md border-gray-500 p-1 m-3">
                    Sapien Nation 10 rooms
                  </div>
                  <div className="border rounded-md border-gray-500 p-1 m-3">
                    Jurno DAO
                  </div>
                  <div className="border rounded-md border-gray-500 p-1 m-3">
                    Jurno DAO
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default PassportForm;
