import { Popover, Transition } from '@headlessui/react';
import { DotsVerticalIcon, LogoutIcon } from '@heroicons/react/solid';
import { Fragment, useEffect } from 'react';

// assets
import { Metamask } from './assets';

// hooks
import { hooks as metaMaskHooks, metaMask } from './connectors/metaMask';

// providers
import Web3React from './providers/Web3React';

const { useAccounts, useError, useIsActivating, useChainId, useIsActive } =
  metaMaskHooks;

const Wallet = () => {
  const account = useAccounts();
  const chainId = useChainId();
  const error = useError();
  const isActive = useIsActive();
  const isActivating = useIsActivating();

  useEffect(() => {
    metaMask.connectEagerly();
  }, []);

  const handleActivateMetamask = async () => {
    await metaMask.activate(chainId);
  };

  const handleDeactivateMetamask = async () => {
    await metaMask.deactivate();
  };

  const renderView = () => {
    if (isActivating)
      return (
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <h5 className="text-xl text-red-400 font-extrabold flex gap-4 items-center">
              ...
            </h5>
          </div>
          <div className="flex flex-col justify-between items-center w-full h-96">
            <div className="flex flex-col justify-center items-center p-8">
              <div className="pb-6 py-3 space-y-2">
                <p className="text-red-00">Loading...</p>
              </div>
            </div>
          </div>
        </div>
      );

    if (error) {
      return (
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <h5 className="text-xl text-red-400 font-extrabold flex gap-4 items-center">
              Deposit passport
            </h5>
          </div>
          <div className="flex flex-col justify-between items-center w-full h-96">
            <div className="flex flex-col justify-center items-center p-8">
              <div className="pb-6 py-3 space-y-2">
                <p className="text-red-00">
                  To deposit your passport to the platform, Install Metamask and
                  complete the transation
                </p>
                <p className="text-red-500 font-extrabold mt-3">
                  Once you installed it the passport will be deposited to your
                  Sapien Wallet automatically.
                </p>
              </div>
            </div>
            <div className="px-5 py-4 w-full border-t">
              <button
                type="button"
                onClick={handleActivateMetamask}
                className="
        w-full py-2 px-4 flex justify-center items-center gap-2 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <Metamask width={25} />
                Deposit with Metamask
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (isActive === false) {
      return (
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <h5 className="text-xl text-black font-extrabold flex gap-4 items-center">
              Deposit passport
            </h5>
          </div>
          <div className="flex flex-col justify-between items-center w-full h-96">
            <div className="flex flex-col justify-center items-center p-8">
              <div className="pb-6 py-3 space-y-2">
                <p className="text-gray-400">
                  To deposit your passport to the platform, Install Metamask and
                  complete the transation
                </p>
                <p className="text-gray-400 mt-6">
                  The passport will be deposited to your Sapien Wallet
                  automatically.
                </p>
              </div>
            </div>
            <div className="px-5 py-4 w-full border-t">
              <button
                type="button"
                onClick={handleActivateMetamask}
                className="
        w-full py-2 px-4 flex justify-center items-center gap-2 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <Metamask width={25} />
                Deposit with Metamask
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (isActive) {
      return (
        <>
          <div className="px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-black font-extrabold flex gap-4 items-center">
                Deposit passport
              </h5>
              <Popover className="justify-end items-end">
                {() => (
                  <>
                    <Popover.Button className="bg-white ml-6 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                      <DotsVerticalIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
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
                            <div className="flex items-center w-full px-4 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                              <button
                                onClick={handleDeactivateMetamask}
                                className="text-sm font-medium text-gray-900 flex items-center"
                              >
                                <LogoutIcon
                                  className="h-5 w-5 text-gray-400 mr-4"
                                  aria-hidden="true"
                                />
                                Disconnect
                              </button>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6 text-black">
            <span className="text-xs">Welcome Account {account[0]}</span>
          </div>
        </>
      );
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg text-white">
      <Web3React />
      {renderView()}
    </div>
  );
};

export default Wallet;
