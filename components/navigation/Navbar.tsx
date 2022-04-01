import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { LogoutIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';

// context
import { useAuth } from 'context/user';

const Navbar = () => {
  const { me } = useAuth();

  return (
    <div className="shadow">
      <div className="flex-1 flex items-center justify-center lg:justify-end h-16 px-2 sm:px-4 lg:px-8">
        <div className="flex-shrink-0 hidden lg:flex">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 mt-14 z-10 origin-top-right bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 p-4 ring-black ring-opacity-5 focus:outline-none">
                  <div className="h-full">
                    <div className="flex items-center w-64">
                      <div className="px-3 py-3">
                        <img
                          className="w-10 h-10 rounded-full flex-shrink-0"
                          src={
                            me.avatar ||
                            'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240'
                          }
                          alt=""
                          onError={(event) => {
                            (event.target as HTMLImageElement).src =
                              'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240';
                          }}
                        />
                      </div>
                      <Link href="/profile" passHref>
                        <a className="flex flex-col flex-wrap break-words">
                          <span className="text-xs truncate w-30">
                            @{me.username}
                          </span>
                          <span className="truncate w-32 pr-2">
                            {me.displayName}
                          </span>
                        </a>
                      </Link>
                    </div>
                    <div className="flex flex-col text-left mt-4">
                      <Link href="/profile">
                        <a className="font-medium text-sm text-white">
                          View Profile
                        </a>
                      </Link>
                      <Link href="/terms">
                        <a className="mt-2 font-medium text-sm text-white">
                          Terms & Conditions
                        </a>
                      </Link>
                    </div>
                    <div className="mt-4 text-left">
                      <Link href="/logout">
                        <a className="mt-2 font-medium text-sm text-purple-600 hover:text-purple-500 flex">
                          <LogoutIcon
                            className="mr-3 h-5 w-5"
                            aria-hidden="true"
                          />
                          Logout
                        </a>
                      </Link>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
              <Menu.Button
                className="group w-full flex text-sm text-left font-medium  focus:outline-none"
                aria-label="Open Desktop Profile Menu"
              >
                <span className="flex w-full items-center">
                  <span className="flex min-w-0 items-center w-full justify-between">
                    <div className=" px-5 py-3 ">
                      <img
                        className="w-10 h-10 rounded-full flex-shrink-0"
                        src={
                          me.avatar ||
                          'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240'
                        }
                        alt=""
                        onError={(event) => {
                          (event.target as HTMLImageElement).src =
                            'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240';
                        }}
                      />
                    </div>
                  </span>
                </span>
              </Menu.Button>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
