import { Popover, Transition } from '@headlessui/react';
import {
  XIcon,
  DotsVerticalIcon,
  LogoutIcon,
  ExclamationIcon,
} from '@heroicons/react/solid';
import { SwitchVerticalIcon, RefreshIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { Fragment, useState } from 'react';

// hooks
import { useWeb3Librariers } from './providers';

// views
import { Deposit } from './components';

export enum View {
  Home = 'Vault',
  Deposit = 'Deposit',
  TxHistory = 'Transactions',
}

const Wallet = () => {
  const [view, setView] = useState<View>(View.Deposit);

  const renderWalletView = () => {
    switch (view) {
      case View.Deposit:
        return <Deposit />;
    }
  };

  const renderWalletMenuButton = () => {
    switch (view) {
      case View.TxHistory:
        return (
          <button
            onClick={() => setView(View.Home)}
            className="bg-white ml-6 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        );
      default:
        return (
          <Popover className="justify-end items-end">
            {({ close }) => (
              <>
                <Popover.Button className="bg-white ml-6 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                  <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
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
                  <Popover.Panel className="absolute z-10 w-56 max-w-sm mt-3 transform -translate-x-1/2 right-5 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative bg-white p-1">
                        <button
                          onClick={() => {
                            setView(View.TxHistory);
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
        );
    }
  };

  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl text-black font-extrabold flex gap-4 items-center">
            {view}
          </h5>
          {renderWalletMenuButton()}
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">{renderWalletView()}</div>
    </>
  );
};

const WalletProxy = () => {
  const { mexaError, torusError, isLoadingTorus, isLoadingMexa } =
    useWeb3Librariers();

  const renderView = () => {
    if (mexaError || torusError)
      return (
        <div className="w-full p-3 justify-center flex items-center right-8 rounded-xl absolute bg-sapien-neutral-600">
          <ExclamationIcon className="text-red-500 w-6 mr-3" />
          <h1 className="text-sm">Whoops seems like there was an error....</h1>
        </div>
      );

    if (isLoadingTorus || isLoadingMexa)
      return (
        <div className="w-full p-4 flex justify-center items-center right-8 rounded-xl absolute bg-sapien-neutral-600">
          <RefreshIcon className="animate-spin w-5 mr-3" />
          <h1 className="text-center">Loading</h1>
        </div>
      );

    return <Wallet />;
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg text-white">
      {renderView()}
    </div>
  );
};

export default WalletProxy;
