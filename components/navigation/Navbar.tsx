import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
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
                <Menu.Items className="absolute right-0 w-56 mt-12 py-4 px-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="h-full">
                    <div className="flex items-center justify-between w-64 text-black">
                      <Link href="/profile" passHref>
                        <a className="flex flex-col">
                          <span className="text-xs truncate w-32">
                            @{me.username}
                          </span>
                          <span className="truncate w-32">
                            {me.displayName}
                          </span>
                        </a>
                      </Link>
                    </div>
                    <Link href="/logout">
                      <a className="mt-8 text-center font-medium text-sm text-purple-600 hover:text-purple-500">
                        Logout
                      </a>
                    </Link>
                  </div>
                </Menu.Items>
              </Transition>
              <Menu.Button
                className="group w-full flex text-sm text-left font-medium  focus:outline-none"
                aria-label="Open Profile Menu"
              >
                <span className="flex w-full items-center">
                  <span className="flex min-w-0 items-center w-full justify-between">
                    <div className=" px-5 py-3 ">
                      <img
                        className="w-10 h-10 rounded-full flex-shrink-0"
                        src={
                          me.avatar ||
                          'https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535652f5fa1ac5ecf7d744_peep-40.svg'
                        }
                        alt=""
                        onError={(event) => {
                          (event.target as HTMLImageElement).src =
                            'https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535652f5fa1ac5ecf7d744_peep-40.svg';
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
