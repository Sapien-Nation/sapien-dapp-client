import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/outline';

// components
import { Disclosure, Transition } from '@headlessui/react';
import { TextareaInput, TextInput } from 'components/common';
import TribeNotificationHeader from 'components/notifications/items/TribeNotificationHeader';

// hooks
import { usePassport } from 'hooks/passport';

// utils
import { formatDate } from 'utils/date';
import { formatAvatarName, formatTokenID } from 'utils/passport';

// assets
import { PolygonFilter } from 'assets';

// types
import type { ProfileTribe } from 'tools/types/tribe';

enum View {
  Passport,
  Badges,
}

const PassportForm = () => {
  const [view, setView] = useState<View | null>(View.Passport);

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

  // TODO: We can move Passport and Badges into separate files (views)
  return (
    <FormProvider {...methods}>
      <form onSubmit={() => {}} id={'update-profile-form'}>
        <PolygonFilter />
        <div className="flex flex-col w-[580px]">
          <Transition
            show={view === View.Passport}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            afterLeave={() => setView(View.Badges)}
          >
            <>
              <div className="flex gap-5 flex-wrap sm:flex-nowrap">
                <div className="text-center pt-4 flex flex-col justify-between">
                  <div className="block h-36 w-40 rotate-90 p-1px hexagon-container">
                    <div className="bg-black h-full w-full hexagon flex items-center justify-center">
                      <img
                        src={passport.image}
                        className="-rotate-90 h-full object-cover"
                        alt="Passport Figure generated with Machine Learning"
                      />
                    </div>
                  </div>
                  <span className="hexagon-2 bg-sapien-60 p-1px text-sm block mt-5 truncate">
                    <span className="hexagon-2 bg-sapien-dark-purple block text-gray-300 p-1">
                      {formatAvatarName(passport.title) || 'Avatar Name'}
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
                    <select
                      disabled
                      className="appearance-none min-h-64px bg-transparent border-sapien-80 w-full focus:outline-none  focus:border-purple-500"
                      defaultValue={''}
                      name="type"
                      onChange={(e) => {
                        e.preventDefault();
                        setView(null);
                      }}
                    >
                      {['', 'Badge 1', 'Badge 2', 'Badge 3'].map((val) => {
                        return (
                          <option className="bg-gray-800" key={val} value={val}>
                            {val}
                          </option>
                        );
                      })}
                    </select>
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
          </Transition>
          <Transition
            show={view === View.Badges}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            afterLeave={() => setView(View.Passport)}
          >
            <>
              <div className="flex flex-col gap-3">
                <ul className="flex items-center justify-between text-xs text-left">
                  <li>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setView(null);
                      }}
                    >
                      <ArrowLeftIcon className="h-5 w-5" />
                    </button>
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
                  <li>
                    <img
                      alt=""
                      className="h-10 w-10 rounded-full"
                      src="https://ui-avatars.com/api/?name=A"
                    />
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
                <TextareaInput
                  maxLength={1000}
                  aria-label="description"
                  autoComplete="description"
                  className="border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  name="description"
                  placeholder="Description"
                  rows={3}
                  style={{
                    background: 'transparent',
                  }}
                  value="This badge is issued by JournoDAO to qualified journalists"
                />
                <span className="text-sm">Badge Access (20 Tribes)</span>
                {/* TODO: Remove mock data once we can integrate API */}
                {/* TODO: Fix tribe prop */}
                <div className="flex flex-col border rounded-md border-sapien-80 bg-purple-100 h-52 overflow-y-auto">
                  {Array(10)
                    .fill('Tribe')
                    .map((tribe, index) => (
                      <Disclosure key={`${tribe}-${index}`}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between items-center bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                              <TribeNotificationHeader
                                tribe={
                                  {
                                    id: '69f9e695-90f3-4e30-95f1-d5dafef8a190',
                                    avatar: '',
                                    name: `${tribe} ${index}`,
                                  } as ProfileTribe
                                }
                              />
                              <ChevronDownIcon
                                className={`${
                                  open ? 'rotate-180 transform' : ''
                                } h-5 w-5 text-purple-500`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              <ul>
                                {Array(10)
                                  .fill('Room')
                                  .map((room, index) => (
                                    <li
                                      className="text-md p-2 hover:bg-purple-200 rounded-md"
                                      key={`${room}-${index}`}
                                    >{`${room} ${index}`}</li>
                                  ))}
                              </ul>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                </div>
              </div>
            </>
          </Transition>
        </div>
      </form>
    </FormProvider>
  );
};

export default PassportForm;
