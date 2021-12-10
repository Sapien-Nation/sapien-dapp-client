/* eslint-disable @next/next/no-img-element */
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { XIcon, GlobeAltIcon, PlusIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { tw } from 'twind';

// components
import { CreateTribeDialog } from 'components/tribe/dialogs';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  tribes: Array<ProfileTribe>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

enum Dialog {
  CreateTribe,
}

const TribeBar = ({ tribes, mobileMenuOpen, setMobileMenuOpen }: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const { pathname, query } = useRouter();
  const { tribeID } = query;

  return (
    <>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <HeadlessDialog
          as="div"
          className={tw`fixed inset-0 flex z-40 lg:hidden`}
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter={tw`transition-opacity ease-linear duration-300`}
            enterFrom={tw`opacity-0`}
            enterTo={tw`opacity-100`}
            leave={tw`transition-opacity ease-linear duration-300`}
            leaveFrom={tw`opacity-100`}
            leaveTo={tw`opacity-0`}
          >
            <HeadlessDialog.Overlay
              className={tw`fixed inset-0 bg-gray-600 bg-opacity-75`}
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter={tw`transition ease-in-out duration-300 transform`}
            enterFrom={tw`-translate-x-full`}
            enterTo={tw`translate-x-0`}
            leave={tw`transition ease-in-out duration-300 transform`}
            leaveFrom={tw`translate-x-0`}
            leaveTo={tw`-translate-x-full`}
          >
            <div
              className={tw`relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none`}
            >
              <Transition.Child
                as={Fragment}
                enter={tw`ease-in-out duration-300`}
                enterFrom={tw`opacity-0`}
                enterTo={tw`opacity-100`}
                leave={tw`ease-in-out duration-300`}
                leaveFrom={tw`opacity-100`}
                leaveTo={tw`opacity-0`}
              >
                <div className={tw`absolute top-0 right-0 -mr-12 pt-4`}>
                  <button
                    type="button"
                    className={tw`ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={tw`sr-only`}>Close sidebar</span>
                    <XIcon
                      className={tw`h-6 w-6 text-white`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className={tw`pt-5 pb-4`}>
                <nav aria-label="Sidebar" className={tw`mt-5`}>
                  <div className={tw`px-2 space-y-1`}>
                    {tribes.map((tribe: ProfileTribe) => (
                      <Link
                        href={`/tribes/${tribe.id}/${tribe.mainSquareId}`}
                        key={tribe.id}
                      >
                        <a
                          className={tw`group p-2 rounded-md flex items-center text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
                        >
                          <img
                            className={tw`mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500`}
                            alt={
                              tribe.avatar
                                ? `${tribe.name} Avatar image`
                                : 'Sapien Tribe Default logo image of human Sapiens'
                            }
                            onError={(event) => {
                              (event.target as HTMLImageElement).src =
                                '/images/default_temp.jpeg';
                            }}
                            src={tribe.avatar || '/images/sapien-tribe.png'}
                          />
                          <span className={tw`sr-only`}>
                            Go to {tribe.name}
                          </span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className={tw`flex-shrink-0 w-14`} aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </HeadlessDialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className={tw`hidden lg:flex lg:flex-shrink-0`}>
        <div className={tw`flex flex-col w-20`}>
          <div
            className={tw`flex-1 flex flex-col min-h-0 overflow-y-auto bg-gray-900`}
          >
            <div className={tw`flex-1`}>
              <nav
                aria-label="Sidebar"
                className={tw`py-6 flex flex-col items-center space-y-3`}
              >
                {tribes.map((tribe: ProfileTribe) => (
                  <Link
                    href={`/tribes/${tribe.id}/${tribe.mainSquareId}`}
                    key={tribe.id}
                  >
                    <a
                      className={tw`group p-0.5 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-600 bg-gray-700 hover:bg-gray-50 hover:text-gray-900 ${
                        tribeID === tribe.id && 'bg-gray-50'
                      }`}
                    >
                      <img
                        className={tw`h-12 w-12 p-1 rounded-xl text-gray-400 bg-gray-900 group-hover:text-gray-500`}
                        alt={
                          tribe.avatar
                            ? `${tribe.name} Avatar image`
                            : 'Sapien Tribe Default logo image of human Sapiens'
                        }
                        src={tribe.avatar || '/images/sapien-tribe.png'}
                        onError={(event) => {
                          (event.target as HTMLImageElement).src =
                            '/images/default_temp.jpeg';
                        }}
                      />
                      <span className={tw`sr-only`}>Go to {tribe.name}</span>
                    </a>
                  </Link>
                ))}
                <Link href="/discovery">
                  <a
                    className={tw`group p-3 cursor-pointer rounded-xl flex items-center text-base font-medium ${
                      pathname === '/discovery'
                        ? 'text-gray-900 bg-gray-50 hover:bg-gray-700 hover:text-gray-50'
                        : 'text-gray-50 bg-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <GlobeAltIcon className={tw`h-6 w-6`} />
                    <span className={tw`sr-only`}>Go to Explore</span>
                  </a>
                </Link>
                <button
                  onClick={() => setDialog(Dialog.CreateTribe)}
                  type="button"
                  className={tw`group p-3 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-50 bg-gray-700 hover:bg-gray-50 hover:text-gray-900`}
                >
                  <PlusIcon className={tw`h-6 w-6`} />
                  <span className={tw`sr-only`}>
                    Click here to create a new Tribe
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}

      {dialog === Dialog.CreateTribe && (
        <CreateTribeDialog onClose={() => setDialog(null)} />
      )}
    </>
  );
};

export default TribeBar;
