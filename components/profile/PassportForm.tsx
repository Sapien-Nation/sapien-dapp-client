import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
import type { ISOString } from 'tools/types/common';
import { Description } from '@headlessui/react/dist/components/description/description';

//TODO: move this to the right spot
export interface PassportBadge {
  id: string;
  name: string;
  color: string;
  username: string;
  image: string;
  tribes: PassportBadgeTribe[];
  description: string;
  issueDate: ISOString;
  numberIssued: number;
  issuingAuthority: string;
}

interface RoomDetail {
  id: string;
  url?: string;
  name: string;
  members: number;
}

interface App {
  name: string;
  image: string;
}

export interface PassportBadgeTribe {
  id: string;
  name: string;
  apps?: App[];
  rooms: RoomDetail[];
  avatar?: string;
}

export const mockPassportBadge = ({
  id = '1000',
  ...rest
}: Partial<PassportBadge> = {}): PassportBadge => ({
  id,
  color: '#6200EA',
  name: `Badge ${id}`,
  username: 'TribalRage',
  image: '',
  tribes: [],
  description: '',
  issueDate: '4/20/2022',
  numberIssued: 100,
  issuingAuthority: 'Sapien Nation',
  ...rest,
});

const mockRoom = ({
  id = '1000',
  ...rest
}: Partial<RoomDetail> = {}): RoomDetail => ({
  id,
  url: '',
  name: '',
  members: 132,
  ...rest,
});

const mockBadges = [
  mockPassportBadge({
    id: '1',
    name: 'Founding Member of the Sapien Nation',
  }),
  mockPassportBadge({
    id: '2',
    name: 'JournoDAO Press Badge',
    image:
      'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/421b0f1c-362e-490e-af87-f2f1bd8cf338-110x110.jpg',
    description: 'This badge is issued by JournoDAO to qualified journalists',
    issuingAuthority: 'Journo DAO',
    tribes: [
      {
        id: '1',
        name: 'Sapien Nation',
        avatar:
          'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/909556d6-d8b3-4344-9379-d5e07e46bcb2-110x110.webp',
        rooms: [
          {
            id: '1',
            url: '/tribes/69f9e695-90f3-4e30-95f1-d5dafef8a190/16e6b70a-98ca-4cb2-9b4e-9c365131cee0',
            name: 'press room',
            members: 55,
          },
        ],
      },
      {
        id: '2',
        name: 'Journo DAO',
        avatar:
          'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/421b0f1c-362e-490e-af87-f2f1bd8cf338-110x110.jpg',
        rooms: [
          {
            id: '1',
            url: '/tribes/c10276b1-3417-47dd-974b-59922e0707e8/3881a7c1-e7f5-4479-86ba-5602f2b72059',
            name: 'general',
            members: 130,
          },
          {
            id: '2',
            url: '/tribes/c10276b1-3417-47dd-974b-59922e0707e8/110679c5-74ac-4594-8ad9-f9dcef2fd32f',
            name: 'introductions',
            members: 130,
          },
          {
            id: '3',
            url: '/tribes/c10276b1-3417-47dd-974b-59922e0707e8/a3f364e8-1e37-4acc-83cd-412512fb42bb',
            name: 'drafts',
            members: 130,
          },
          {
            id: '4',
            url: '/tribes/c10276b1-3417-47dd-974b-59922e0707e8/43d4f8f3-fffc-4009-b04f-659201ab6827',
            name: 'news',
            members: 130,
          },
          {
            id: '5',
            url: '/tribes/c10276b1-3417-47dd-974b-59922e0707e8/d339fb3a-8295-433a-ac90-c8492226e28a',
            name: 'writers room',
            members: 130,
          },
          {
            id: '6',
            url: '/tribes/c10276b1-3417-47dd-974b-59922e0707e8/a7ac37ec-da9a-40d8-83d9-efca5abf822f',
            name: 'community',
            members: 130,
          },
        ],
      },
      {
        id: '3',
        name: 'PubDAO',
        avatar:
          'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/fff84272-ab01-4f65-9d1c-605edc6d285e-110x110.png',
        apps: [
          {
            name: 'Google Drive',
            image:
              'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google_Drive.max-1100x1100.png',
          },
        ],
        rooms: [
          {
            id: '1',
            url: '/tribes/3f563794-11f7-4a3a-b4f1-f769c54891e7/1fcaab13-1abb-4bcb-9fbf-bb66bc7fe89b',
            name: 'JournoDAO collab',
            members: 55,
          },
        ],
      },
    ],
  }),
];

let mockBadgesById = {};

const initBadges = () => {
  for (let i = 0; i < mockBadges.length; i++) {
    let badge = mockBadges[i];
    mockBadgesById[badge.id] = badge;
  }
};

enum View {
  Passport,
  Badges,
}

interface Props {
  setShowProfileOverlay?: (showProfileOverlay: boolean) => void;
}

const PassportForm = ({ setShowProfileOverlay }: Props) => {
  const [view, setView] = useState<View | null>(View.Passport);
  const [selectedBadge, setSelectedBadge] = useState<PassportBadge | null>(
    null
  );

  const passport = usePassport();
  const { query } = useRouter();

  const methods = useForm({
    defaultValues: {
      displayName: passport.username, // TODO remove displayName
      username: passport.username,
      bio: 'Bio',
      title: 'Founding Member of the Sapien Nation',
    },
  });

  initBadges();

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
              <div className="flex mt-4 gap-5 flex-wrap sm:flex-nowrap">
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
                  <ul className="flex mr-4 justify-between text-xs text-left">
                    <li>
                      <span className="block font-bold text-gray-400 mb-1">
                        Passport Number
                      </span>
                      <span className="text-gray-300 font-semibold">
                        {formatTokenID(Number(passport.tokenId))}
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
                  <div className="mt-1 justify-between gap-5">
                    <span className="block font-bold text-gray-400 mb-2 text-xs">
                      Username
                    </span>
                    <div
                      style={{
                        clipPath:
                          'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                      }}
                      className="mt-1 mr-4 flex-1 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
                    >
                      <TextInput
                        aria-label="username"
                        autoComplete="username"
                        className="appearance-none min-h-64px border-sapien-80 block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-lg sm:text-lg"
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
                  <div className="mt-2">
                    <span className="block font-bold text-gray-400 mb-2 text-xs">
                      Badges
                    </span>
                    <div
                      style={{
                        clipPath:
                          'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                      }}
                      className="mt-1 mr-4 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
                    >
                      <select
                        className="appearance-none px-4 min-h-64px bg-transparent border-sapien-80 w-full focus:outline-none  focus:border-purple-500"
                        defaultValue={''}
                        name="type"
                        onChange={(e) => {
                          e.preventDefault();
                          setSelectedBadge(mockBadgesById[e.target.value]);
                          setView(null);
                        }}
                      >
                        {mockBadges.map((val) => {
                          return (
                            <option
                              className="bg-gray-800"
                              key={val.id}
                              value={val.id}
                            >
                              {val.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  clipPath:
                    'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                }}
                className="mt-3 mr-4 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
              >
                <TextareaInput
                  name="bio"
                  maxLength={1000}
                  placeholder="Bio"
                  className="!border-[1px] !border-sapien-80 text-lg sm:text-lg pl-4 pt-4 text-gray-300"
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
            {selectedBadge && (
              <>
                <div className="flex flex-col gap-2 mt-2">
                  <ul className="flex mt-2 items-center justify-between text-xs text-left">
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
                        {selectedBadge.id} of {selectedBadge.numberIssued}
                      </span>
                    </li>
                    <li>
                      <span className="block font-bold text-gray-400 mb-1">
                        Issue Date
                      </span>
                      <span className="text-gray-300 font-semibold">
                        {selectedBadge.issueDate}
                      </span>
                    </li>
                    <li>
                      <span className="block font-bold text-gray-400 mb-1">
                        Issuing Authority
                      </span>
                      <span className="text-gray-300 font-semibold">
                        {selectedBadge.issuingAuthority}
                      </span>
                    </li>
                    <li>
                      <img
                        alt=""
                        className="h-10 w-10 rounded-full object-cover border-2"
                        src={selectedBadge.image}
                        style={{ borderColor: selectedBadge.color }}
                      />
                    </li>
                  </ul>
                  <div className="flex justify-between gap-5">
                    <div className="flex flex-col block w-full">
                      <span className="block font-bold text-gray-400 mb-1 text-xs">
                        Username
                      </span>
                      <TextInput
                        aria-label="user"
                        autoComplete="user"
                        className="appearance-none  border-sapien-80 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        name="userName"
                        disabled
                        placeholder="Username"
                        style={{
                          background: 'transparent',
                        }}
                        value={selectedBadge.username}
                      />
                    </div>
                    <div className="flex flex-col block w-full">
                      <span className="block font-bold text-gray-400 mb-1 text-xs">
                        Badge Name
                      </span>
                      <TextInput
                        aria-label="badge-name"
                        autoComplete="badge-name"
                        className="appearance-none  border-sapien-80 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        name="badgeName"
                        disabled
                        placeholder="Badge Name"
                        style={{
                          background: 'transparent',
                        }}
                        value={selectedBadge.name}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col block w-full">
                    <span className="block font-bold text-gray-400 mb-1 text-xs">
                      Description
                    </span>
                    <TextareaInput
                      maxLength={1000}
                      aria-label="description"
                      autoComplete="description"
                      className="border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="description"
                      disabled
                      placeholder="Description"
                      rows={2}
                      style={{
                        background: 'transparent',
                      }}
                      value={selectedBadge.description}
                    />
                  </div>
                  <span className="text-sm">
                    Badge Access ({selectedBadge.tribes.length} Tribes)
                  </span>
                  {/* TODO: Remove mock data once we can integrate API */}
                  {/* TODO: Fix tribe prop */}
                  <div className="flex flex-col border rounded-md border-sapien-80 bg-purple-100 h-48 overflow-y-auto">
                    {selectedBadge.tribes.map((tribe) => (
                      <Disclosure key={tribe.id}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between items-center bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                              <TribeNotificationHeader
                                roomCount={tribe.rooms.length}
                                tribe={
                                  {
                                    id: '69f9e695-90f3-4e30-95f1-d5dafef8a190',
                                    avatar: tribe.avatar,
                                    name: tribe.name,
                                  } as ProfileTribe
                                }
                              />
                              <ChevronDownIcon
                                className={`${
                                  open ? 'rotate-180 transform' : ''
                                } h-5 w-5 text-purple-500`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-1 pb-2 text-sm text-gray-500">
                              <ul>
                                {tribe.apps &&
                                  tribe.apps.map((app) => (
                                    <li
                                      className="flex text-md p-2 hover:bg-purple-200 rounded-md items-center"
                                      key={app.name}
                                    >
                                      <img
                                        className="w-8 h-8 mr-2 rounded-lg text-gray-400 bg-white group-hover:text-gray-500"
                                        alt={''}
                                        src={app.image}
                                      />
                                      <span>{app.name}</span>
                                    </li>
                                  ))}
                                {tribe.rooms.map((room) => (
                                  <li
                                    className="text-md p-2 hover:bg-purple-200 rounded-md"
                                    key={room.id}
                                  >
                                    <Link href={room.url} passHref>
                                      <a
                                        className="flex px-2 py-1 items-center gap-2 flex-1"
                                        onClick={() =>
                                          setShowProfileOverlay(false)
                                        }
                                      >
                                        <div className="flex gap-1">
                                          # {room.name}
                                        </div>
                                      </a>
                                    </Link>
                                  </li>
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
            )}
          </Transition>
        </div>
      </form>
    </FormProvider>
  );
};

export default PassportForm;
