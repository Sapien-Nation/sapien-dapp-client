import { Popover, Transition } from '@headlessui/react';
import {
  ArrowLeftIcon,
  DotsVerticalIcon,
  LogoutIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid';
import * as Sentry from '@sentry/nextjs';
import { Fragment, useEffect, useRef, useState } from 'react';

// assets
import { Metamask } from '../../assets';

// components
import { Tooltip } from 'components/common';

// hooks
import { hooks as metaMaskHooks, metaMask } from '../../connectors/metaMask';
import { useToast } from 'context/toast';
import { CheckCircleIcon } from '@heroicons/react/outline';

const { useAccounts, useError, useChainId, useIsActive, useIsActivating } =
  metaMaskHooks;

enum View {
  DepositPassport,
  Home,
  Success,
}
interface Props {
  handleBack: () => void;
}

const Deposit = ({ handleBack }: Props) => {
  const [view, setView] = useState(View.Home);
  const error = useError();
  const account = useAccounts();
  const chainId = useChainId();
  const isActive = useIsActive();
  const isActivating = useIsActivating();

  const toast = useToast();
  const depositTokensRef = useRef(null);

  useEffect(() => {
    metaMask.connectEagerly();
  }, []);

  const handleActivateMetamask = async () => {
    await metaMask.activate(chainId);
  };

  const handleDeactivateMetamask = async () => {
    await metaMask.deactivate();
  };

  const handleDeposit = async () => {
    try {
      setView(View.Success);
    } catch (err) {
      Sentry.captureException(err);
      toast({
        message: err,
      });
    }
  };

  const renderView = () => {
    switch (view) {
      case View.DepositPassport: {
        const renderHelperText = () => {
          if (error) {
            return error.message;
          }

          if (isActive)
            return `Address: ...${account[0].slice(29, account[0].length - 1)}`;

          return (
            <>
              <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />
              You will be requesed to connect your wallet
            </>
          );
        };

        return (
          <>
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-extrabold tracking-wide flex items-center gap-2">
                <button onClick={handleBack}>
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                Deposit
              </h5>
              {/* TODO there is no way to really disconnect the wallet */}
              {/* https://github.com/NoahZinsmeister/web3-react/issues/377 */}
              {false && (
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
              )}
            </div>
            {isActive ? (
              <p className="text-sm text-white">
                You will be redirected to Metamask to complete the transaction
              </p>
            ) : (
              <p className="text-sm text-white">
                To deposit SPN tokens to the platform, install Metamask and
                complete the transaction
              </p>
            )}

            <p className="text-sm text-white">
              The SPN passport will be deposited to your Sapien wallet
              automatically
            </p>

            <div className="text-center grid gap-6">
              <button
                type="button"
                onClick={isActive ? handleDeposit : handleActivateMetamask}
                disabled={isActivating}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <Metamask width={25} />
                Deposit With Metamask
              </button>
              <span className="text-xs text-green-500 flex justify-center items-center">
                {renderHelperText()}
              </span>
            </div>
          </>
        );
      }
      case View.Home:
        return (
          <>
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-extrabold tracking-wide flex items-center gap-2">
                <button onClick={handleBack}>
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                Deposit
              </h5>
              {/* TODO there is no way to really disconnect the wallet */}
              {/* https://github.com/NoahZinsmeister/web3-react/issues/377 */}
              {false && (
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
              )}
            </div>
            <p className="text-sm text-white">
              To deposit tokens to the platform, install Metamask and complete
              the transaction.
            </p>
            <div className="text-center grid gap-6">
              <button
                type="button"
                onClick={() => setView(View.DepositPassport)}
                disabled={isActivating}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Deposit Passport
              </button>

              <button
                type="button"
                disabled
                ref={depositTokensRef.current?.setTriggerRef}
                className="w-full py-2 px-4 flex justify-center cursor-not-allowed items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Deposit Tokens
              </button>
              <Tooltip ref={depositTokensRef} text="Cooming Soon." />
            </div>
          </>
        );
      case View.Success:
        return (
          <>
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-green-400 font-extrabold tracking-wide flex items-center gap-2">
                Deposit Succeeded
                <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
              </h5>
            </div>
            <p className="text-white">
              <h5>Transaction Details</h5>
              ...
            </p>
            <p className="text-xs text-white">
              if you have any questions please contact{' '}
              <a
                href="mailto:passports@sapien.network"
                className="text-blue-500 font-extrabold underline"
                target="_blank"
                rel="noreferrer"
              >
                passports@sapien.network
              </a>{' '}
              with details about the issue
            </p>
            <div className="text-center">
              <button
                type="button"
                onClick={handleBack}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Go Home
              </button>
            </div>
          </>
        );
    }
  };
  return <div className="h-full space-y-6 w-72">{renderView()}</div>;
};

export default Deposit;
