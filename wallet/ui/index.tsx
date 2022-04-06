import { Popover, Transition } from '@headlessui/react';
import { XIcon, DotsVerticalIcon, LogoutIcon } from '@heroicons/react/solid';
import { SwitchVerticalIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

// api
import { connectWeb3API } from 'wallet/api';

// context
import { useAuth } from 'context/user';

// hooks
import { useToast } from 'context/toast';

// views
import { Deposit } from './views';
import { refresh } from 'api/authentication';

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
                  <Popover.Panel className="absolute z-10 w-56 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
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
  const [isFetching, setIsFetching] = useState(true);

  const toast = useToast();
  const { me } = useAuth();

  const [tokens] = useLocalStorage<null | {
    token: string;
    torus: string;
    refresh: string;
  }>('tokens', null);

  useEffect(() => {
    const initWeb3API = async () => {
      setIsFetching(true);
      try {
        await connectWeb3API(tokens.torus, me.v2Id || me.id, false);
      } catch (error) {
        Sentry.captureException('initWeb3API error', error);
        try {
          const data = await refresh(tokens.refresh, 'torus');
          await connectWeb3API(data.token, me.v2Id || me.id, false);
        } catch (err) {
          Sentry.captureException('[refresh] initWeb3API error', err);
          toast({ message: 'There was an error with our wallet provider' });
        }
      }
      setIsFetching(false);
    };

    initWeb3API();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      {isFetching ? (
        <div className="flex w-full h-96 absolute">
          <div className="flex animate-pulse w-full px-5 py-1">
            <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
            <div className="flex flex-col space-y-3">
              <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
              <div className="w-24 bg-gray-300 h-6 rounded-md "></div>
            </div>
          </div>
        </div>
      ) : (
        <Wallet />
      )}
    </div>
  );
};

export default WalletProxy;
