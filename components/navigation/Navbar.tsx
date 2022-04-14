import { Menu } from '@headlessui/react';
import { CreditCardIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// context
import { useAuth } from 'context/user';
import { ProfileDialog } from 'components/profile';

// ui
// @ts-ignore
const Wallet = dynamic(() => import('wallet/Wallet'));

enum Dialog {
  Profile,
}

const Navbar = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const { me } = useAuth();

  return (
    <>
      <div className="shadow">
        <div className="flex-1 flex items-center justify-center lg:justify-end h-16 px-2 sm:px-4 lg:px-8">
          <div className="flex-shrink-0 hidden lg:flex relative">
            {/* Wallet dropdown */}
            <Menu as="div">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Items className="block absolute overflow-y-auto right-0 h-auto w-auto max-h-80 top-full z-10 origin-top-right border border-gray-800 bg-sapien-neutral-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
            {/* Profile dropdown */}
            <Menu as="div">
              <div>
                <Menu.Items className="absolute right-0 w-56 mt-14 z-10 origin-top-right bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 p-4 ring-black ring-opacity-5 focus:outline-none">
                  <div className="h-full">
                    <div className="flex items-center">
                      <div className="px-3 py-3">
                        {me.avatar ? (
                          <img
                            className="w-10 h-10 rounded-full flex-shrink-0"
                            src={me.avatar}
                            alt=""
                          />
                        ) : (
                          <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
                            {me.displayName[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-wrap break-words">
                        <span className="text-xs truncate w-30">
                          @{me.username}
                        </span>
                        <span className="truncate w-32 pr-2">
                          {me.displayName}
                        </span>
                      </div>
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
                          Logout
                        </a>
                      </Link>
                    </div>
                  </div>
                </Menu.Items>
                <Menu.Button
                  className="group w-full flex text-sm text-left font-medium  focus:outline-none"
                  aria-label="Open Desktop Profile Menu"
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
                          <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
                            {me.displayName[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                    </span>
                  </span>
                </Menu.Button>
              </div>
            </Menu>
          </div>
        </div>
      </div>

      {/* Dialogs */}

      {dialog === Dialog.Profile && (
        <ProfileDialog onClose={() => setDialog(null)} />
      )}
    </>
  );
};

export default Navbar;
