import {
  ArrowLeftIcon,
  CheckCircleIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAddress } from 'web3-utils';

// components
import { WithdrawConfirmationDialog } from 'wallet/views/dialogs';

// constants
import { Coin, CoinMap, ErrorTypes } from 'wallet/constants';

// hooks
import { useToast } from 'context/toast';
import { useWeb3 } from 'wallet/providers';

// types
import { ExternalLinkIcon, XCircleIcon } from '@heroicons/react/solid';
import { useAuth } from 'context/user';

interface Props {
  handleBack: () => void;
  handleGoHome: () => void;
  coin: Coin;
}

enum View {
  Form,
  Home,
  Success,
  WithdrawError,
}

interface WithdrawCoinFormValues {
  address: string;
  amount: number;
}

const WithdrawCoinView = ({ handleGoHome, coin }: Props) => {
  const [view, setView] = useState(View.Form);
  const [address, setAddress] = useState(null);
  const [withdrawTXHash, setWithdrawTXHash] = useState('');
  const [confirmModal, showConfirmModal] = useState(false);
  const [withdrawTXErrorHash, setWithdrawTXErrorHash] = useState('');

  const coinData = CoinMap[coin];
  const { walletAPI } = useWeb3();

  const toast = useToast();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setValue,
  } = useForm<WithdrawCoinFormValues>({
    defaultValues: { address: '', amount: 0 },
  });

  const onSubmit = async (values: WithdrawCoinFormValues) => {
    try {
      const { hash, type } = await walletAPI.handleFTWithdraw(
        values.address,
        coin,
        values.amount
      );

      if (type === ErrorTypes.Fail) {
        setWithdrawTXErrorHash(hash);
        setView(View.WithdrawError);
      }
      setWithdrawTXHash(hash);
      setView(View.Success);
      setAddress(null);
      showConfirmModal(false);
    } catch (error) {
      toast({
        message: error,
      });
      showConfirmModal(false);
    }
  };

  const renderView = () => {
    switch (view) {
      case View.Form: {
        return (
          <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
            <div className="w-72 flex flex-col gap-4">
              <h5 className="text-xl text-white font-bold tracking-wide flex items-left gap-2">
                <button onClick={() => setView(View.Home)}>
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                Withdraw {coinData.name}
              </h5>
              <p className="text-sm text-white">
                Enter your destination wallet to withdraw your token.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="mt-1">
                  <input
                    id="address"
                    type="text"
                    aria-label="Wallet Address"
                    autoComplete="address"
                    required
                    placeholder="Destination Wallet"
                    className="bg-gray-800 appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    {...register('address')}
                  />
                </div>

                <div className="mt-1">
                  <input
                    id="amount"
                    type="number"
                    step="any"
                    aria-label="Wallet Address"
                    autoComplete="amount"
                    required
                    placeholder="Amount"
                    className="bg-gray-800 appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    {...register('amount')}
                  />
                </div>

                <div className="text-center gap-2 flex flex-col">
                  <button
                    type="submit"
                    className={
                      isSubmitting
                        ? 'cursor-not-allowed w-full flex justify-center mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                        : 'w-full flex justify-center mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                    }
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <RefreshIcon className="animate-spin h-5 w-5 mr-3" />
                    )}
                    Withdraw
                  </button>
                  {errors.address ? (
                    <span className="text-xs text-red-400">
                      Destination Wallet invalid.
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">
                      Additional Fees may apply
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        );
      }
      case View.WithdrawError:
        return (
          <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
            <div className="w-72 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h5 className="text-xl text-red-400 font-bold tracking-wide flex items-center gap-2">
                  Deposit Error
                  <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                </h5>
              </div>
              <a
                className="underline  text-sm flex flex-row items-center gap-2"
                href={`${process.env.NEXT_PUBLIC_EXPLORER_BASE_URL}${withdrawTXErrorHash}`}
                target="_blank"
                rel="noreferrer"
              >
                See Transaction Error Details{' '}
                <ExternalLinkIcon className="w-5 h-5" />
              </a>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setView(View.Form)}
                  className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        );
      case View.Success:
        return (
          <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
            <div className="w-72 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h5 className="text-xl text-green-400 font-bold tracking-wide flex items-center gap-2">
                  Withdraw Succeeded
                  <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                </h5>
              </div>
              <a
                className="underline  text-sm flex flex-row items-center gap-2"
                href={`${process.env.NEXT_PUBLIC_EXPLORER_BASE_URL}${withdrawTXHash}`}
                target="_blank"
                rel="noreferrer"
              >
                See Transaction Details <ExternalLinkIcon className="w-5 h-5" />
              </a>
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleGoHome}
                  className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Go to my tokens
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderView()}{' '}
      {confirmModal && (
        <WithdrawConfirmationDialog
          onClose={() => {
            showConfirmModal(false);
          }}
          onWithdraw={onSubmit}
          address={address}
          token={{ name: coinData.name }}
        />
      )}{' '}
    </>
  );
};

export default WithdrawCoinView;
