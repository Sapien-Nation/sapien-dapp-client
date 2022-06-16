import { Transition } from '@headlessui/react';
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/outline';

// hooks
import { useUserBadge, useUserBadges } from 'hooks/user';

interface Props {
  badgeID: string;
  onBack: () => void;
}

const Badge = ({ badgeID, onBack }: Props) => {
  const badge = useUserBadges().find(({ id }) => id === badgeID);

  return (
    <Transition
      show
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="flex flex-col gap-2 mt-2">
        <ul className="flex mt-2 items-center justify-between text-xs text-left">
          <li>
            <button onClick={onBack}>
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
          </li>
          <li>
            <span className="block font-bold text-gray-400 mb-1">Number</span>
            <span className="text-gray-300 font-semibold">{badge.id} of 9</span>
          </li>
          <li>
            <span className="block font-bold text-gray-400 mb-1">
              Issue Date
            </span>
            <span className="text-gray-300 font-semibold">
              {/* {selectedBadge.issueDate} */}
            </span>
          </li>
          <li>
            <span className="block font-bold text-gray-400 mb-1">
              Issuing Authority
            </span>
            <span className="text-gray-300 font-semibold">Sapien Nation</span>
          </li>
          {/* <li>
            <img
              alt=""
              className="h-10 w-10 rounded-full object-cover border-2"
              src={selectedBadge.image}
              style={{ borderColor: selectedBadge.color }}
            />
          </li> */}
        </ul>
        <div className="flex justify-between gap-5">
          <div className="flex flex-col block w-full">
            <span className="block font-bold text-gray-400 mb-1 text-xs">
              Username
            </span>
            {/* <TextInput
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
            /> */}
          </div>
          <div className="flex flex-col block w-full">
            <span className="block font-bold text-gray-400 mb-1 text-xs">
              Badge Name
            </span>
            {/* <TextInput
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
            /> */}
          </div>
        </div>
        <div className="flex flex-col block w-full">
          <span className="block font-bold text-gray-400 mb-1 text-xs">
            Description
          </span>
          {/* <TextareaInput
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
          /> */}
        </div>
        <span className="text-sm">
          {/* Badge Access ({selectedBadge.tribes.length} Tribes) */}
        </span>
        {/* TODO: Remove mock data once we can integrate API */}
        {/* TODO: Fix tribe prop */}
        {/* <div className="flex flex-col border rounded-md border-sapien-80 bg-purple-100 h-48 overflow-y-auto">
          {selectedBadge.tribes.map((tribe) => (
            <Disclosure key={tribe.id}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between items-center bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
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
                              onClick={() => setShowProfileOverlay(false)}
                            >
                              <div className="flex gap-1"># {room.name}</div>
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
        </div> */}
      </div>
    </Transition>
  );
};

export default Badge;
