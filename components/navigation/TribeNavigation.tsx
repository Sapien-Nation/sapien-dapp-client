import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, PlusIcon, PlusSmIcon } from '@heroicons/react/solid';
import { UserGroupIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { tw } from 'twind';

// constants
import { View } from 'constants/tribe';

// hooks
import { useTribe } from 'hooks/tribe';

// utils
import { getFormattedDate } from 'utils/date';

// types
import type {
  ProfileTribe,
  ProfileTribeSquare,
  ProfileTribeChannel,
} from 'tools/types/tribe';

const TribeNavigation = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const tribe = useTribe(tribeID as string);
  const { name, channels, squares, mainSquareId, permissions } = tribe;

  console.log(viewID);
  const handleViewLeftClick = (
    view: ProfileTribeChannel | ProfileTribeSquare | ProfileTribe,
    type: View
  ) => {
    console.log('clicked view', { view });
    console.log('clicked view type', type);
  };

  return (
    <div className={tw`w-full`}>
      <nav className={tw`py-4`}>
        <ul className={tw`flex flex-col`}>
          <div
            className={tw`w-full flex cursor-pointer tracking-wide items-center uppercase font-medium text(sm gray-500) px-4 py-2 flex bg-gray-100 rounded-lg focus:outline-none`}
          >
            <UserGroupIcon className={tw`h-5 w-5 mr-4`} />
            {name}
          </div>
          <li></li>
        </ul>
      </nav>
      <div className={tw`w-full max-w-md p-2 mx-auto bg-white rounded-2xl`}>
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={tw`flex justify-between tracking-wide items-center w-full px-1 py-2 text-sm uppercase font-medium text-left text-gray-500 focus:outline-none`}
              >
                <div className={tw`flex items-center`}>
                  Squares
                  {permissions.canAddSquare ? (
                    <button className={tw`bg-gray-100 p-0.5 ml-2 rounded-full`}>
                      <PlusSmIcon className={tw`w-5 h-5`} />
                    </button>
                  ) : null}
                </div>
                <ChevronUpIcon
                  className={tw`${open ? '' : 'transform rotate-180'} w-5 h-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className={tw`text-sm text-gray-500`}>
                <nav aria-label="Sidebar" className={tw`flex flex-col py-2`}>
                  <ul className={tw`flex flex-col gap-3 text-md text-black`}>
                    {[
                      {
                        id: mainSquareId,
                        name: 'Main',
                      },
                      ...squares,
                    ].map((square: ProfileTribeSquare) => (
                      <Link
                        href={`/tribes/${tribeID}/${square.id}`}
                        key={square.id}
                      >
                        <a
                          onClick={(event) => {
                            if (event.type === 'contextmenu') {
                              event.preventDefault();
                              handleViewLeftClick(square, View.Square);
                            }
                          }}
                          onContextMenu={(event) => {
                            if (event.type === 'contextmenu') {
                              event.preventDefault();
                              handleViewLeftClick(square, View.Square);
                            }
                          }}
                        >
                          <li
                            className={tw`flex justify-between py-1 px-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                              square.id === viewID
                                ? 'font-extrabold bg-gray-100'
                                : ''
                            }`}
                          >
                            <span>#{square.name}</span>
                            {/* <span className={tw`text-gray-500`}>TODO</span> */}
                          </li>
                        </a>
                      </Link>
                    ))}
                  </ul>
                </nav>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure defaultOpen as="div" className={tw`mt-2`}>
          {({ open }) => {
            return (
              <>
                <Disclosure.Button
                  className={tw`flex justify-between tracking-wide items-center w-full px-1 py-2 text-sm uppercase font-medium text-left text-gray-500 focus:outline-none`}
                >
                  <div className={tw`flex items-center`}>
                    {permissions.canAddChannel === true && 'Channels'}
                    {permissions.canAddChannel === false &&
                      channels.length > 0 &&
                      'Channels'}
                    {permissions.canAddChannel === true ? (
                      <button
                        className={tw`bg-gray-100 p-0.5 ml-2 rounded-full`}
                      >
                        <PlusSmIcon className={tw`w-5 h-5`} />
                      </button>
                    ) : null}
                  </div>
                  {permissions.canAddChannel === true && (
                    <ChevronUpIcon
                      className={tw`${
                        open ? '' : 'transform rotate-180'
                      } w-5 h-5`}
                    />
                  )}
                  {permissions.canAddChannel === false &&
                    channels.length > 0 && (
                      <ChevronUpIcon
                        className={tw`${
                          open ? '' : 'transform rotate-180'
                        } w-5 h-5`}
                      />
                    )}
                </Disclosure.Button>
                <Disclosure.Panel className={tw`text-sm text-gray-500`}>
                  {channels.length === 0 &&
                    permissions.canAddChannel === true && (
                      <p className="mt-1 text-sm text-justify text-gray-500">
                        Get started with channels by creating a new one.
                      </p>
                    )}
                  {channels.length > 0 && (
                    <nav
                      aria-label="Sidebar"
                      className={tw`flex flex-col py-2`}
                    >
                      <ul
                        className={tw`flex flex-col gap-3 text-md text-black`}
                      >
                        {channels.map((channel: ProfileTribeChannel) => (
                          <Link
                            key={channel.id}
                            href={`/tribes/${tribeID}/${channel.id}`}
                          >
                            <a
                              onClick={(event) => {
                                if (event.type === 'contextmenu') {
                                  event.preventDefault();
                                  handleViewLeftClick(channel, View.Channel);
                                }
                              }}
                              onContextMenu={(event) => {
                                if (event.type === 'contextmenu') {
                                  event.preventDefault();
                                  handleViewLeftClick(channel, View.Channel);
                                }
                              }}
                              className={tw`cursor-pointer rounded-xl flex items-center text-base font-medium hover:bg-gray-100 hover:text-gray-900`}
                            >
                              <li className={tw`flex justify-between`}>
                                <div className={tw`flex items-center`}>
                                  <div
                                    className={tw`p-0.5 group rounded-xl text-gray-600 bg-gray-100`}
                                  >
                                    <img
                                      className={tw`h-12 w-12 p-1 rounded-xl text-gray-400 bg-white group-hover:text-gray-500`}
                                      alt={
                                        channel.avatar
                                          ? `${channel.name} Avatar image`
                                          : 'Sapien Channel Default logo image of human Sapiens'
                                      }
                                      src={
                                        channel.avatar ||
                                        'https://d151dmflpumpzp.cloudfront.net/tribe-images/sapien-tribe.png'
                                      }
                                      onError={(event) => {
                                        (event.target as HTMLImageElement).src =
                                          'https://d151dmflpumpzp.cloudfront.net/tribe-images/default_temp.jpeg';
                                      }}
                                    />
                                  </div>
                                  <span className={tw`sr-only`}>
                                    Go to {channel.name} Channel
                                  </span>
                                  <div className={tw`flex flex-col gap-1 ml-2`}>
                                    <span className={tw`font-lg`}>Poetry</span>
                                    <span className={tw`text-gray-500`}>
                                      {channel.membersCount} members
                                    </span>
                                  </div>
                                </div>
                              </li>
                            </a>
                          </Link>
                        ))}
                      </ul>
                    </nav>
                  )}
                </Disclosure.Panel>
              </>
            );
          }}
        </Disclosure>
      </div>
    </div>
  );
};

export default TribeNavigation;
