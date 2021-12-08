import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, PlusSmIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { tw } from 'twind';

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

  const { channels, squares } = useTribe(tribeID as string);

  return (
    <div className={tw`w-full`}>
      <div className={tw`w-full max-w-md p-2 mx-auto bg-white rounded-2xl`}>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={tw`flex justify-between items-center w-full px-1 py-2 text-sm uppercase font-medium text-left text-gray-500 focus:outline-none`}
              >
                <div className={tw`flex items-center`}>
                  Squares
                  <button className={tw`bg-gray-100 p-0.5 ml-2 rounded-full`}>
                    <PlusSmIcon className={tw`w-5 h-5`} />
                  </button>
                </div>
                <ChevronUpIcon
                  className={tw`${open ? '' : 'transform rotate-180'} w-5 h-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className={tw`text-sm text-gray-500`}>
                <nav aria-label="Sidebar" className={tw`flex flex-col py-2`}>
                  <ul className={tw`flex flex-col gap-3 text-md text-black`}>
                    {squares.map((square: ProfileTribeSquare) => (
                      <li key={square.id} className={tw`flex justify-between`}>
                        <span>#{square.name}</span>
                        <span className={tw`text-gray-500`}>3 min</span>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className={tw`mt-2`}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={tw`flex justify-between items-center w-full px-1 py-2 text-sm uppercase font-medium text-left text-gray-500 focus:outline-none`}
              >
                <div className={tw`flex items-center`}>
                  Channels
                  <button className={tw`bg-gray-100 p-0.5 ml-2 rounded-full`}>
                    <PlusSmIcon className={tw`w-5 h-5`} />
                  </button>
                </div>
                <ChevronUpIcon
                  className={tw`${open ? '' : 'transform rotate-180'} w-5 h-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className={tw`text-sm text-gray-500`}>
                <nav aria-label="Sidebar" className={tw`flex flex-col py-2`}>
                  <ul className={tw`flex flex-col gap-3 text-md text-black`}>
                    {channels.map((channel: ProfileTribeChannel) => (
                      <li key={channel.id} className={tw`flex justify-between`}>
                        <div className={tw`flex items-center`}>
                          <Link href={`/tribes/todo`}>
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
                                src={
                                  channel.avatar || '/images/sapien-tribe.png'
                                }
                              />
                              <span className={tw`sr-only`}>Go to Channel</span>
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
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default TribeNavigation;
