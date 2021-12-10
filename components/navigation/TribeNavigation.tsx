import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, PlusSmIcon } from '@heroicons/react/solid';
import { UserGroupIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { tw } from 'twind';

// components
import { Image, NoContent } from 'components/common';

// utils
import { getFormattedDate } from 'utils/date';

// types
import type {
  ProfileTribeSquare,
  ProfileTribeChannel,
} from 'tools/types/tribe';
import { useTribe } from 'hooks/tribe';

const TribeNavigation = () => {
  const { query } = useRouter();
  const { tribeID } = query;

  const { name, channels, squares, permissions } = useTribe(tribeID as string);

  const renderSquares = () => {
    if (squares.length > 0) {
      return (
        <nav aria-label="Sidebar" className={tw`flex flex-col py-2`}>
          <ul className={tw`flex flex-col gap-3 text-md text-black`}>
            {squares.map((square: ProfileTribeSquare) => (
              <Link href={`/tribes/${tribeID}/${square.id}`} key={square.id}>
                <a>
                  <li
                    className={tw`flex justify-between py-1 px-2 rounded-lg cursor-pointer hover:bg-gray-100`}
                  >
                    <span>#{square.name}</span>
                    <span className={tw`text-gray-500`}>3 min</span>
                  </li>
                </a>
              </Link>
            ))}
          </ul>
        </nav>
      );
    }

    return (
      <NoContent
        action={
          permissions.canAddSquare ? (
            <>
              <p className={tw`absolute text-gray-500`}>No Squares</p>
              <button
                className={tw`py-1 px-2 rounded-lg font-medium bg-gray-100 text(gray-500 xs)`}
              >
                Create the first one
              </button>
            </>
          ) : null
        }
      />
    );
  };

  const renderChannels = () => {
    if (channels.length > 0) {
      return (
        <nav aria-label="Sidebar" className={tw`flex flex-col py-2`}>
          <ul className={tw`flex flex-col gap-3 text-md text-black`}>
            {channels.map((channel: ProfileTribeChannel) => (
              <li
                key={channel.id}
                className={tw`flex justify-between rounded-xl cursor-pointer hover:bg-gray-100`}
              >
                <div className={tw`flex items-center`}>
                  <Link href={`/tribes/${tribeID}/${channel.id}`}>
                    <a
                      className={tw`group p-0.5 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-600 bg-gray-100 hover:bg-gray-50 hover:text-gray-900`}
                    >
                      <Image
                        height={12}
                        width={12}
                        className={tw`h-12 w-12 p-1 rounded-xl text-gray-400 bg-white group-hover:text-gray-500`}
                        alt={
                          channel.avatar
                            ? `${channel.name} Avatar image`
                            : 'Sapien Channel Default logo image of human Sapiens'
                        }
                        src={channel.avatar || '/images/sapien-tribe.png'}
                        fallbackSrc="/images/default_temp.jpeg"
                      />
                      <span className={tw`sr-only`}>
                        Go to {channel.name} Channel
                      </span>
                    </a>
                  </Link>
                  <div className={tw`flex flex-col gap-1 ml-2`}>
                    <span className={tw`font-lg`}>Poetry</span>
                    <span className={tw`text-gray-500`}>
                      {channel.membersCount} members
                    </span>
                  </div>
                </div>
                <span className={tw`text-gray-500`}>
                  {getFormattedDate(channel.lastUpdatedAt)}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      );
    }

    return (
      <NoContent
        action={
          permissions.canAddChannel ? (
            <>
              <p className={tw`absolute text-gray-500`}>No Channels</p>
              <button
                className={tw`py-1 px-2 rounded-lg font-medium bg-gray-100 text(gray-500 xs)`}
              >
                Create the first
              </button>
            </>
          ) : null
        }
      />
    );
  };

  return (
    <div className={tw`w-full`}>
      <nav className={tw`py-4`}>
        <ul className={tw`flex flex-col`}>
          <li>
            <button
              className={tw`w-full flex tracking-wide items-center uppercase font-medium text(sm gray-500) px-4 py-2 flex bg-gray-100 rounded-lg focus:outline-none`}
            >
              <UserGroupIcon className={tw`h-5 w-5 mr-4`} />
              {name}
            </button>
          </li>
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
                {renderSquares()}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure defaultOpen as="div" className={tw`mt-2`}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={tw`flex justify-between tracking-wide items-center w-full px-1 py-2 text-sm uppercase font-medium text-left text-gray-500 focus:outline-none`}
              >
                <div className={tw`flex items-center`}>
                  Channels
                  {permissions.canAddChannel ? (
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
                {renderChannels()}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default TribeNavigation;
