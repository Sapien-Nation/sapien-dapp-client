import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, PlusSmIcon } from '@heroicons/react/solid';
import { BellIcon, StarIcon, UserGroupIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { tw } from 'twind';

// api
import { notificationInstance } from 'api';

// constants
import { View } from 'constants/tribe';

// components
import { Query } from 'components/common';
import { CreateChannelDialog } from 'components/tribe/dialogs';

// hooks
import { useTribe } from 'hooks/tribe';

// types
import type {
  ProfileTribe,
  ProfileTribeSquare,
  ProfileTribeChannel,
} from 'tools/types/tribe';

enum Dialog {
  Channel,
}

const TribeNavigation = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const { asPath, query } = useRouter();
  const { tribeID } = query;

  const tribe = useTribe(tribeID as string);
  const { name, channels, permissions } = tribe;

  const handleViewLeftClick = (
    view: ProfileTribeChannel | ProfileTribeSquare | ProfileTribe,
    type: View
  ) => {
    console.log('clicked view', { view });
    console.log('clicked view type', type);
  };

  return (
    <>
      <div className={tw`w-full`}>
        <div>
          <nav>
            <ul>
              <li>
                <Link href={`/tribes/${tribeID}/home`}>
                  <a
                    className={tw`relative mt-2 w-full cursor-pointer tracking-wide items-center uppercase font-medium text(sm gray-500) px-4 py-2 flex rounded-lg focus:outline-none ${
                      asPath === `/tribes/${tribeID}/home`
                        ? 'font-extrabold'
                        : ''
                    }`}
                  >
                    <UserGroupIcon className={tw`h-5 w-5 mr-4`} />
                    {name}
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/*<div>
          <nav>
            <ul>
              <li>
                <Link href={`/tribes/${tribeID}/notifications`}>
                  <a
                    className={tw`relative mt-2 w-full cursor-pointer tracking-wide items-center uppercase font-medium text(sm gray-500) px-4 py-2 flex rounded-lg focus:outline-none ${
                      asPath === `/tribes/${tribeID}/notifications`
                        ? 'font-extrabold'
                        : ''
                    }`}
                  >
                    <span className={tw`flex`}>
                      <BellIcon className={tw`h-5 w-5 mr-4`} />
                      <Query
                        api="/api/v3/notification/all"
                        loader={null}
                        options={{
                          fetcher: async (url) =>
                            notificationInstance
                              .get(url)
                              .then((res) => res.data),
                        }}
                      >
                        {() => (
                          <span
                            className={tw`absolute animate-ping h-1 w-1 rounded-full bg-purple-400 opacity-75 top-1 left-8`}
                          />
                        )}
                      </Query>
                    </span>
                    Whats new ?
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>*/}
        {/*<div>
          <nav>
            <ul>
              <li>
                <Link href={`/tribes/${tribeID}/favorites`}>
                  <a
                    className={tw`relative mt-2 w-full cursor-pointer tracking-wide items-center uppercase font-medium text(sm gray-500) px-4 py-2 flex rounded-lg focus:outline-none ${
                      asPath === `/tribes/${tribeID}/favorites`
                        ? 'font-extrabold'
                        : ''
                    }`}
                  >
                    <span className={tw`flex`}>
                      <StarIcon className={tw`h-5 w-5 mr-4`} />
                    </span>
                    Favorites
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
                  </div>*/}
        {/*<div className={tw`w-full max-w-md p-2 mx-auto bg-white rounded-2xl`}>
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
                          onClick={(event) => {
                            event.stopPropagation();
                            setDialog(Dialog.Channel);
                          }}
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
                        <>
                          <p
                            className={tw`mt-1 text-sm text-justify text-gray-500`}
                          >
                            Get started with channels by .
                          </p>{' '}
                          <span
                            className={tw`cursor-pointer inline text-purple-700`}
                            onClick={() => setDialog(Dialog.Channel)}
                          >
                            creating a new one
                          </span>
                        </>
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
                                        className={tw`h-8 w-8 p-1 rounded-xl text-gray-400 bg-white group-hover:text-gray-500`}
                                        alt={
                                          channel.avatar
                                            ? `${channel.name} Avatar image`
                                            : 'Sapien Channel Default logo image of human Sapiens'
                                        }
                                        src={
                                          channel.avatar ||
                                          'https://dutuyaq1w3dqh.cloudfront.net/thumbnails/tribes/avatar/sapien_logo-40x40.png'
                                        }
                                        onError={(event) => {
                                          (
                                            event.target as HTMLImageElement
                                          ).src =
                                            'https://dutuyaq1w3dqh.cloudfront.net/thumbnails/tribes/avatar/sapien_logo-40x40.png';
                                        }}
                                      />
                                    </div>
                                    <span className={tw`sr-only`}>
                                      Go to {channel.name} Channel
                                    </span>
                                    <div
                                      className={tw`flex flex-col gap-1 ml-2`}
                                    >
                                      <span className={tw`font-lg flex`}>
                                        <p className={tw`truncate	w-20`}>
                                          {channel.name}
                                        </p>
                                        <small
                                          className={tw`font-xs text-gray-300 ml-4`}
                                        >
                                          {channel.membersCount} members
                                        </small>
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
          </div>*/}
      </div>

      {/* Dialogs */}
      {dialog === Dialog.Channel && (
        <CreateChannelDialog onClose={() => setDialog(null)} />
      )}
    </>
  );
};

export default TribeNavigation;
