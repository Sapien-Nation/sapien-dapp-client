import { CreditCardIcon, MenuIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import { LogoutIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// context
import { useAuth } from 'context/user';

// components
import { Avatar } from 'components/common';

// ui
// @ts-ignore
const Wallet = dynamic(() => import('wallet/Wallet'));
// @ts-ignore
const ProfileDialog = dynamic<any>(() =>
  import('components/profile').then((mod) => mod.ProfileDialog)
);

interface Props {
  setMobileMenuOpen: (isOpen: boolean) => void;
}

enum Dialog {
  Profile,
}

const MobileNavbar = ({ setMobileMenuOpen }: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const { me } = useAuth();

  return (
    <>
      <div className="bg-gray-900 px-4 flex items-center justify-between sm:px-6 lg:px-8 w-full">
        <button
          type="button"
          className="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-gray-900 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        {/* Wallet dropdown */}
        <div className="flex relative gap-2">
          <Menu as="div">
            {({ open }) => (
              <>
                <div>
                  <Menu.Items className="block absolute overflow-y-auto right-0 h-auto w-auto max-h-80 top-full z-10 origin-top-right border border-gray-800 bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Wallet />
                  </Menu.Items>
                </div>

                <Menu.Button
                  type="button"
                  className={`${
                    open ? 'bg-gray-800' : ''
                  } group px-5 py-3 w-full flex flex-col justify-center h-full text-sm text-left font-medium focus:outline-none hover:bg-gray-800`}
                >
                  <>
                    <span className="sr-only">View wallet</span>
                    <CreditCardIcon className="h-6 w-6" aria-hidden="true" />
                  </>
                </Menu.Button>
              </>
            )}
          </Menu>
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
                    <div className="flex items-center">
                      <div className="px-3 py-3">
                        <img
                          className="w-10 h-10 rounded-full flex-shrink-0"
                          src={me.avatar}
                          alt=""
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
                      <button
                        className="font-medium text-sm text-white text-left"
                        onClick={() => setDialog(Dialog.Profile)}
                      >
                        View Profile
                      </button>
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
                aria-label="Open Profile Menu"
              >
                <span className="flex w-full items-center">
                  <span className="flex min-w-0 items-center w-full justify-between">
                    <div className=" px-5 py-3 ">
                      {me.avatar ? (
                        <img
                          className="w-10 h-10 rounded-full flex-shrink-0"
                          src={me.avatar}
                          alt=""
                        />
                      ) : (
                        <Avatar />
                      )}
                    </div>
                  </span>
                </span>
              </Menu.Button>
            </div>
          </Menu>
        </div>
      </div>

      {/* Dialogs */}
      {dialog === Dialog.Profile && (
        <ProfileDialog onClose={() => setDialog(null)} />
      )}
    </>
  );
};

export default MobileNavbar;
