import {
  ArrowLeftIcon,
  CheckCircleIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAddress } from 'web3-utils';

// constants
import { ErrorTypes } from 'wallet/constants';

// hooks
import { useToast } from 'context/toast';
import { useWeb3 } from 'wallet/providers';

// types
import type { Token } from '../../types';
import { ExternalLinkIcon, XCircleIcon } from '@heroicons/react/solid';

interface Props {
  handleBack: () => void;
  handleGoHome: () => void;
  token: Token;
}

enum View {
  Form,
  Home,
  Success,
  WithdrawError,
}

interface ForgotPasswordFormValues {
  address: string;
}

const WithdrawView = ({ handleBack, handleGoHome, token }: Props) => {
  const [view, setView] = useState(View.Home);
  const [withdrawTXHash, setWithdrawTXHash] = useState('');
  const [withdrawTXErrorHash, setWithdrawTXErrorHash] = useState('');

  const { walletAPI } = useWeb3();

  const toast = useToast();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setValue,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { address: '' },
  });

  const onSubmit = async ({ address }: ForgotPasswordFormValues) => {
    try {
      const { hash, type } = await walletAPI.handleWithdraw(address, token.id);

      if (type === ErrorTypes.Fail) {
        setWithdrawTXErrorHash(hash);
        setView(View.WithdrawError);
      }

      setWithdrawTXHash(hash);
      setView(View.Success);
    } catch (error) {
      toast({
        message: error,
      });
    }
  };

  const renderView = () => {
    switch (view) {
      case View.Form: {
        return (
          <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
            <div className="w-72 h-96 flex flex-col gap-4">
              <h5 className="text-xl text-white font-extrabold tracking-wide flex items-left gap-2">
                <button onClick={() => setView(View.Home)}>
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                Withdraw from Balance
              </h5>
              <p className="text-sm text-white">
                To withdraw funds, go to your desired external wallet and fetch
                your wallet address
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className="block text-sm font-medium">
                  Destination Wallet
                </label>
                <div className="mt-1">
                  <input
                    id="address"
                    type="text"
                    aria-label="Wallet Address"
                    autoComplete="address"
                    required
                    placeholder="Enter Wallet Address"
                    className="bg-gray-800 appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    {...register('address', {
                      validate: {
                        isValidAddress: (value) => {
                          return isAddress(value);
                        },
                      },
                    })}
                  />
                </div>

                <div className="text-center gap-2 flex flex-col">
                  <button
                    type="submit"
                    className={
                      isSubmitting
                        ? 'cursor-not-allowed w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                        : 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
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
      case View.Home:
        return (
          <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
            <div className="w-72 h-96 flex flex-col gap-4">
              <h5 className="text-xl text-white font-extrabold tracking-wide flex items-left gap-2">
                <button onClick={handleBack}>
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                Withdraw Token
              </h5>
              <p className="text-sm text-white">
                Please confirm that you want to withdraw your passport from your
                Sapien Account. (This action will downgrade your Sapien
                account.){' '}
              </p>
              <p>
                The Token you are about transfer is{' '}
                <span className="underline text-sm font-extrabold">
                  {token.name}
                </span>
              </p>
              <img
                className="rounded-full px-1 py-1 w-20 h-20 self-center"
                src={token.image}
                alt=""
              />
              <div className="text-center grid gap-6">
                <button
                  type="button"
                  onClick={() => setView(View.Form)}
                  className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Go to withdraw
                </button>
              </div>
            </div>
          </div>
        );
      case View.WithdrawError:
        return (
          <>
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-red-400 font-extrabold tracking-wide flex items-center gap-2">
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
          </>
        );
      case View.Success:
        return (
          <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
            <div className="w-72 h-96 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h5 className="text-xl text-green-400 font-extrabold tracking-wide flex items-center gap-2">
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

  return <>{renderView()}</>;
};

export default WithdrawView;
