// @ts-nocheck
import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import {
  DotsHorizontalIcon,
  StarIcon,
  LogoutIcon,
} from '@heroicons/react/solid';
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/outline';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

// components
import Store from './Store';
import NoSpn from './NoSpn';
import TxHistory from './TxHistory';
import FilterScreen from './FilterScreen';

// utils
import { mergeClassNames } from 'utils/styles';

enum WalletTabs {
  NFT,
  Spn,
  Store,
  TxHistory,
}

const Wallet = () => {
  const [tab, setTab] = useState<WalletTabs>(WalletTabs.NFT);

  const methods = useForm({
    defaultValues: {
      badgesAmount: 1,
      terms: false,
    },
  });

  const prevTabReference = useRef<WalletTabs>();
  useEffect(() => {
    prevTabReference.current = tab;
  });
  const prevTab = prevTabReference.current;

  const renderMenu = () => {
    return (
      <div className="flex p-2">
        <button
          className={mergeClassNames(
            tab === WalletTabs.NFT ? 'text-black' : '',
            'text(gray-400 sm) gap-1.5 font-bold flex items-center p-3 focus:outline-none'
          )}
          onClick={() => setTab(WalletTabs.NFT)}
        >
          <StarIcon
            className={mergeClassNames(
              tab === WalletTabs.NFT ? 'text-indigo-600 border-indigo-600' : '',
              'h-5 w-5 p-0.5 rounded-full border-2 border-gray-400'
            )}
          />
          My NFTs
        </button>
        <button
          className={mergeClassNames(
            'text(gray-400 sm)',
            tab === WalletTabs.Spn ? 'text-black' : '',
            tab === WalletTabs.Spn ? 'grayscale-0' : '',
            'group gap-1.5 font-bold flex items-center p-3 focus:outline-none filter grayscale'
          )}
          onClick={() => setTab(WalletTabs.Spn)}
        >
          <svg
            fill="none"
            height="18"
            viewBox="0 0 18 18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            className={tab === WalletTabs.Spn ? 'opacity-100' : 'opacity-60'}
          >
            <path
              d="M9 18C13.9705 18 18 13.9705 18 9C18 4.02943 13.9705 0 9 0C4.02943 0 0 4.02943 0 9C0 13.9705 4.02943 18 9 18Z"
              fill="#6200EA"
            ></path>
            <path
              d="M9 18C13.9705 18 18 13.9705 18 9C18 4.02943 13.9705 0 9 0C4.02943 0 0 4.02943 0 9C0 13.9705 4.02943 18 9 18Z"
              fill="url(#paint0_linear)"
              fillOpacity="0.5"
            ></path>
            <path
              d="M8.94111 2.93555C6.79826 2.97077 5.08984 4.47959 5.08984 6.45806C5.08984 8.77116 6.85109 9.6166 8.65932 10.233C8.95285 10.327 9.19941 10.415 9.41082 10.5031C9.36897 10.2032 9.23091 9.92513 9.01743 9.71047C8.38338 8.92968 7.73172 8.09015 7.64366 7.40326C7.60072 7.18045 7.60306 6.95127 7.65055 6.7294C7.69804 6.50751 7.78971 6.29745 7.92009 6.11174C8.05047 5.92603 8.2169 5.76846 8.40946 5.64842C8.60202 5.52839 8.81677 5.44834 9.04092 5.41305C9.70431 5.41305 10.4675 5.74181 11.4656 6.54024L13.0448 4.47959C11.9107 3.48222 10.4514 2.93318 8.94111 2.93555Z"
              fill="white"
              opacity="0.6"
            ></path>
            <path
              d="M9.66936 7.63211C9.29361 7.48534 8.98835 7.36206 8.74765 7.23877C8.77194 7.36238 8.80529 7.48405 8.84746 7.60277C8.88855 7.70257 8.93552 7.80237 8.98249 7.90218C9.13512 8.21333 9.33474 8.48926 9.47568 8.75345C9.92181 9.49319 10.6498 10.2153 10.5911 11.3895C10.5427 11.7423 10.3587 12.0624 10.078 12.2817C9.79734 12.5009 9.4422 12.6021 9.08814 12.5636C8.55515 12.5276 8.03491 12.3843 7.55871 12.1422C7.08252 11.9001 6.66019 11.5642 6.31713 11.1546L4.69678 13.1683C5.25801 13.7595 5.93226 14.232 6.67955 14.5578C7.42683 14.8836 8.23192 15.0559 9.0471 15.0646C10.9433 15.0646 13.3504 14.049 13.3504 11.2779C13.3269 8.9648 11.7418 8.41881 9.66936 7.63211Z"
              fill="white"
              opacity="0.6"
            ></path>
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear"
                x1="3.44707"
                x2="15.5971"
                y1="16.2"
                y2="2.7"
              >
                <stop stopColor="white"></stop>
                <stop offset="1" stopColor="white" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
          Spn
        </button>
        <button
          className={mergeClassNames(
            tab === WalletTabs.Store ? 'text-black' : '',
            'text(gray-400 sm) gap-1.5 p-3 font-bold flex items-center focus:outline-none'
          )}
          onClick={() => setTab(WalletTabs.Store)}
        >
          <ShoppingCartIcon
            className={mergeClassNames`h-6 w-6 ${
              tab === WalletTabs.Store && 'text-indigo-600'
            } `}
          />
          Store
        </button>
      </div>
    );
  };

  const renderTab = () => {
    return (
      <div className="relative h-full">
        <Transition
          show={tab === WalletTabs.NFT}
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom={
            prevTab > WalletTabs.NFT ? '-translate-x-full' : 'translate-x-ful'
          }
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div>
            <FilterScreen />
          </div>
        </Transition>
        <Transition
          appear
          show={tab === WalletTabs.Spn}
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom={
            prevTab > WalletTabs.Spn ? '-translate-x-full' : 'translate-x-full'
          }
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveTo={
            tab < WalletTabs.Spn ? 'translate-x-full' : '-translate-x-full'
          }
          leaveFrom="translate-x-0"
        >
          <div>
            <NoSpn />
          </div>
        </Transition>
        <Transition
          appear
          show={tab === WalletTabs.Store}
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div>
            <Store />
          </div>
        </Transition>
      </div>
    );
  };
  return (
    <>
      <div className="flex justify-between items-center px-4 py-6 border-b border-gray-200">
        <h5 className="text-xl font-extrabold flex gap-4 items-center">
          {tab === WalletTabs.TxHistory && (
            <button
              onClick={() => setTab(prevTab)}
              className="bg-white rounded-md hover:text-gray-500 focus:outline-none"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
          )}
          {tab === WalletTabs.TxHistory ? 'Transactions' : 'Wallet'}
        </h5>
        <Popover className="relative">
          {({ close }) => (
            <>
              <Popover.Button className="bg-white ml-6 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                <DotsHorizontalIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 w-56 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative bg-white p-1">
                      <button
                        onClick={() => {
                          setTab(WalletTabs.TxHistory);
                          close();
                        }}
                        className="flex items-center w-full px-4 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900 flex items-center">
                            <SwitchVerticalIcon
                              className="h-5 w-5 text-gray-400 mr-4"
                              aria-hidden="true"
                            />
                            Transaction History
                          </p>
                        </div>
                      </button>
                    </div>
                    <div className="relative bg-white p-1">
                      <div className="flex items-center w-full px-4 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                        <Link href="/logout">
                          <a
                            href="#"
                            className="text-sm font-medium text-gray-900 flex items-center"
                          >
                            <LogoutIcon
                              className="h-5 w-5 text-gray-400 mr-4"
                              aria-hidden="true"
                            />
                            Disconnect
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
      {tab !== WalletTabs.TxHistory && renderMenu()}
      <div className="h-96 overflow-hidden">
        {tab === WalletTabs.TxHistory ? (
          <TxHistory />
        ) : (
          <FormProvider {...methods}>{renderTab()}</FormProvider>
        )}
      </div>
      {tab === WalletTabs.TxHistory && <div className="h-16"></div>}
    </>
  );
};

export default Wallet;
