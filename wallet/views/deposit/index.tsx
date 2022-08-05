import { Popover, Transition } from '@headlessui/react';
import {
  ArrowLeftIcon,
  DotsVerticalIcon,
  ExternalLinkIcon,
  LogoutIcon,
  InformationCircleIcon,
  XCircleIcon,
  RefreshIcon,
} from '@heroicons/react/solid';
import * as Sentry from '@sentry/nextjs';
import { useForm } from 'react-hook-form';
import { Fragment, useCallback, useEffect, useState } from 'react';

// assets
import { Metamask } from '../../assets';

// constants
import { Coin } from 'wallet/constants';

// hooks
import { hooks as metaMaskHooks, metaMask } from '../../connectors/metaMask';
import { useToast } from 'context/toast';
import { CheckCircleIcon } from '@heroicons/react/outline';

// web3
import { useWeb3 } from '../../providers';

const { useAccounts, useError, useChainId, useIsActive, useIsActivating } =
  metaMaskHooks;

enum View {
  DepositPassport,
  DepositError,
  DepositCoin,
  Home,
  Success,
}

interface Props {
  handleBack: () => void;
}

interface DepositTokenFormValues {
  amount: number;
  coin: Coin;
}

const Deposit = ({ handleBack }: Props) => {
  const [view, setView] = useState(View.Home);
  const [depositTXHash, setDepositTXHash] = useState('');
  const [tokensToDeposit, setTokensToDeposit] = useState([]);
  const [showPolygonError, setShowPolygonError] = useState(false);
  const [depositTXErrorHash, setDepositTXErrorHash] = useState('');
  const [isFetchingMetamaskTokens, setIsFetchingMetamaskTokens] =
    useState(false);

  const { walletAPI } = useWeb3();
  const {
    formState: { isSubmitting: isSubmittingDepositTokens },
    register,
    handleSubmit,
  } = useForm<DepositTokenFormValues>({
    defaultValues: { amount: 0, coin: Coin.SPN },
  });

  const error = useError();
  const account = useAccounts();
  const chainId = useChainId();
  const isActive = useIsActive();
  const isActivating = useIsActivating();

  const getMetamaskAddress = () => account[0];

  const toast = useToast();

  useEffect(() => {
    metaMask.connectEagerly();
  }, []);

  useEffect(() => {
    const handleFetchMetamaskTokens = async () => {
      setIsFetchingMetamaskTokens(true);
      try {
        const metamaskTokens = await walletAPI.getWalletTokens(
          getMetamaskAddress()
        );
        setTokensToDeposit(metamaskTokens);
      } catch (err) {
        //
      }
      setIsFetchingMetamaskTokens(false);
    };

    if (isActive === true && isFetchingMetamaskTokens === false) {
      handleFetchMetamaskTokens();
    }
  }, [isActive]);

  const handleActivateMetamask = async () => {
    await metaMask.activate(chainId);
  };

  const handleDeactivateMetamask = async () => {
    await metaMask.deactivate();
  };

  const handleDepositCoin = async (values: DepositTokenFormValues) => {
    try {
      const { hash } = await walletAPI.handleFTDeposit(
        values.coin,
        values.amount
      );

      setDepositTXHash(hash);
      setView(View.Success);
    } catch (err) {
      toast({
        message: err?.message,
      });
    }
  };

  const handleDeposit = async () => {
    try {
      const isOnPolygonNetwork = chainId === 137;
      if (isOnPolygonNetwork) {
        const hash = await walletAPI.handleDeposit();

        if (hash === 'Some Error From TX Error') {
          setDepositTXErrorHash(hash);
          setView(View.DepositError);
        }
        setDepositTXHash(hash);
        setView(View.Success);
      } else {
        setShowPolygonError(true);
      }
    } catch (err) {
      Sentry.captureMessage(err);
      toast({
        message: err.message,
      });
    }
  };

  const renderView = () => {
    if (showPolygonError) {
      return (
        <>
          <div className="flex justify-between items-center">
            <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2 text-center">
              Network Issue.
              <XCircleIcon className="w-5" />
            </h5>
          </div>
          <p className="text-sm text-white">
            To continue with the deposit of your passport, please connect to the
            Polygon Network.
          </p>

          <div className="text-center grid gap-6">
            <button
              type="button"
              onClick={() => {
                setShowPolygonError(false);
              }}
              disabled={isActivating}
              className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Deposit Passport
            </button>
          </div>
        </>
      );
    }

    switch (view) {
      case View.DepositPassport: {
        const renderHelperText = () => {
          if (error) {
            return error.message;
          }

          if (isActive) {
            if (isFetchingMetamaskTokens === true) return '';
            if (tokensToDeposit.length === 0)
              return (
                <span className="text-red-400">
                  No Passports in selected wallet
                </span>
              );
            return `Address: ...${account[0].slice(29, account[0].length - 1)}`;
          }

          return (
            <>
              <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />
              You will be requested to connect your wallet
            </>
          );
        };

        const renderDepositButton = () => {
          if (isActivating === true) {
            return (
              <button
                type="button"
                disabled
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <Metamask width={25} />
                Activating Wallet...
              </button>
            );
          }

          if (isActive === false) {
            return (
              <button
                type="button"
                onClick={handleActivateMetamask}
                disabled={isActivating}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <Metamask width={25} />
                Connect Metamask
              </button>
            );
          }

          if (isFetchingMetamaskTokens === true) {
            return (
              <button
                type="button"
                disabled
                className="w-full py-2 cursor-not-allowed px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white  bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <RefreshIcon className="w-5 animate-spin" />
                Fetching Tokens
              </button>
            );
          }

          if (tokensToDeposit.length === 0) {
            return (
              <button
                type="button"
                disabled
                className="w-full py-2 cursor-not-allowed px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white  bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <Metamask width={25} />
                Deposit with Metamask
              </button>
            );
          }

          return (
            <button
              type="button"
              onClick={handleDeposit}
              className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <Metamask width={25} />
              Deposit with Metamask
            </button>
          );
        };

        return (
          <>
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
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
                To deposit, you must have a Sapien Nation NFT passport in your
                Metamask wallet
              </p>
            )}

            <p className="text-sm text-white">
              The SPN passport will be deposited to your Sapien wallet
              automatically
            </p>

            <div className="text-center grid gap-6">
              {renderDepositButton()}
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
              <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
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
                onClick={() => setView(View.DepositCoin)}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Deposit Tokens
              </button>
            </div>
          </>
        );
      case View.DepositCoin: {
        return (
          <>
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
                <button onClick={() => setView(View.Home)}>
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                Deposit Tokens
              </h5>
            </div>

            <form
              onSubmit={handleSubmit(handleDepositCoin)}
              className="space-y-3"
            >
              <div className="mt-1">
                <input
                  id="amount"
                  type="number"
                  step="any"
                  aria-label="Withdraw Amount"
                  required
                  placeholder="10"
                  className="bg-gray-800 appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  {...register('amount')}
                />
              </div>

              <div className="mt-1">
                <label
                  htmlFor="token"
                  className="block text-sm font-medium text-white"
                >
                  Token Type
                </label>
                <select
                  id="token"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white text-black"
                  {...register('coin')}
                >
                  <option value={Coin.SPN}>{Coin.SPN}</option>
                  <option value={Coin.MATIC}>{Coin.MATIC}</option>
                  <option value={Coin.WETH}>{Coin.WETH}</option>
                  <option value={Coin.USDC}>{Coin.USDC}</option>
                  <option value={Coin.USDT}>{Coin.USDT}</option>
                </select>
              </div>

              <div className="text-center gap-2 flex flex-col">
                <button
                  type="submit"
                  className={
                    isSubmittingDepositTokens
                      ? 'cursor-not-allowed w-full flex justify-center mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                      : 'w-full flex justify-center mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                  }
                  disabled={isSubmittingDepositTokens}
                >
                  {isSubmittingDepositTokens && (
                    <RefreshIcon className="animate-spin h-5 w-5 mr-3" />
                  )}
                  Deposit with Metamask
                </button>
              </div>
            </form>

            <div className="text-center grid gap-6">
              <span className="text-xs text-green-500 flex justify-center items-center"></span>
            </div>
          </>
        );
      }

      case View.DepositError:
        return (
          <>
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-red-400 font-bold tracking-wide flex items-center gap-2">
                Deposit Error
                <XCircleIcon className="h-5 w-5" aria-hidden="true" />
              </h5>
            </div>
            <a
              className="underline  text-sm flex flex-row items-center gap-2"
              href={`${process.env.NEXT_PUBLIC_EXPLORER_BASE_URL}${depositTXErrorHash}`}
              target="_blank"
              rel="noreferrer"
            >
              See Transaction Error Details{' '}
              <ExternalLinkIcon className="w-5 h-5" />
            </a>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setView(View.Home)}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Try Again
              </button>
            </div>
          </>
        );
      case View.Success:
        return (
          <>
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-green-400 font-bold tracking-wide flex items-center gap-2">
                Deposit Succeeded
                <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
              </h5>
            </div>
            <a
              className="underline  text-sm flex flex-row items-center gap-2"
              href={`${process.env.NEXT_PUBLIC_EXPLORER_BASE_URL}${depositTXHash}`}
              target="_blank"
              rel="noreferrer"
            >
              See Transaction Details <ExternalLinkIcon className="w-5 h-5" />
            </a>
            <div className="text-center">
              <button
                type="button"
                onClick={handleBack}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                See my Tokens
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
      <div className="h-full space-y-6 w-72">{renderView()}</div>
    </div>
  );
};

export default Deposit;
