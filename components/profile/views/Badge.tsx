import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  LockClosedIcon,
} from '@heroicons/react/outline';

// components
import { TextareaInput, TextInput } from 'components/common';

// hooks
import { useUserBadge } from 'hooks/user';
import { usePassport } from 'hooks/passport';

interface Props {
  badgeID: string;
  closeOverlay: () => void;
  onBack: () => void;
}

const Badge = ({ badgeID, closeOverlay, onBack }: Props) => {
  const badge = useUserBadge(badgeID);
  const passport = usePassport();

  return (
    <div className="flex flex-col gap-2 mt-2">
      <ul className="flex mt-2 items-center justify-between text-xs text-left">
        <li>
          <button onClick={onBack}>
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        </li>
        <li>
          <span className="block font-bold text-gray-400 mb-1">Number</span>
          <span className="text-gray-300 font-semibold">
            {badge.id.slice(0, 8) + '...'}
          </span>
        </li>
        <li>
          <span className="block font-bold text-gray-400 mb-1">Issue Date</span>
          <span className="text-gray-300 font-semibold">--/--/----</span>
        </li>
        <li>
          <span className="block font-bold text-gray-400 mb-1">
            Issuing Authority
          </span>
          <span className="text-gray-300 font-semibold">Sapien Nation</span>
        </li>
        <li>
          <img
            alt=""
            className="h-10 w-10 rounded-full object-cover border-2"
            src={badge.avatar}
            style={{ borderColor: badge.color }}
          />
        </li>
      </ul>
      <div className="flex justify-between gap-5">
        <div className="flex flex-col w-full">
          <span className="block font-bold text-gray-400 mb-1 text-xs">
            Username
          </span>
          <TextInput
            aria-label="user"
            autoComplete="user"
            className="appearance-none border-sapien-80 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            name="userName"
            disabled
            placeholder="Username"
            style={{
              background: 'transparent',
            }}
            value={passport.username}
          />
        </div>
        <div className="flex flex-col w-full">
          <span className="block font-bold text-gray-400 mb-1 text-xs">
            Badge Name
          </span>
          <TextInput
            aria-label="badge-name"
            autoComplete="badge-name"
            className="appearance-none border-sapien-80 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            name="badgeName"
            disabled
            placeholder="Badge Name"
            style={{
              background: 'transparent',
            }}
            value={badge.name}
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
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
          value={badge.description}
        />
      </div>
      <span className="text-sm block mt-2 text-gray-300 font-semibold">
        Badge Access ({badge.tribes.length || 0} Tribes)
      </span>
      <div className="flex flex-col border rounded-md border-sapien-80 bg-purple-100 h-48 overflow-y-auto">
        {badge.tribes.map((tribe) => (
          <Disclosure key={tribe.id}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <div className="flex justify-center items-center gap-2">
                    {tribe.avatar ? (
                      <img
                        className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                        src={tribe.avatar}
                        alt=""
                      />
                    ) : (
                      <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
                        {tribe.name[0].toUpperCase()}
                      </div>
                    )}
                    <span>{tribe.name}</span>
                  </div>
                  <ChevronDownIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-1 pb-2 text-sm text-gray-500">
                  <ul>
                    {tribe.rooms.map((room) => {
                      const roomIcon = (
                        <span className="flex items-center w-3">
                          {room.private ? (
                            <LockClosedIcon className="w-[10px]" />
                          ) : (
                            '#'
                          )}
                        </span>
                      );
                      return (
                        <li
                          className="text-md p-2 hover:bg-purple-200 rounded-md"
                          key={room.id}
                        >
                          <div className="flex px-2 py-1 items-center">
                            <Link href={`/tribes/${tribe.id}/${room.id}`}>
                              <a
                                className="w-full"
                                onClick={() => closeOverlay()}
                              >
                                <div className="flex gap-1">
                                  {roomIcon} {room.name}
                                </div>
                              </a>
                            </Link>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default Badge;
