import { ExclamationIcon, RefreshIcon } from '@heroicons/react/outline';
import { useState } from 'react';

// components
import { DepositView, HomeView, TokenView, WithdrawView } from './views';

// hooks
import { useWeb3 } from './providers';
import { useTorus } from './providers/Torus';

// types
import type { Token } from './types';

enum View {
  Home,
  Deposit,
  Token,
  Withdraw,
}

const Wallet = () => {
  const [view, setView] = useState(View.Home);
  const [token, setToken] = useState<Token | null>(null);

  const { isWeb3Ready, web3Error } = useWeb3();
  const { isReady: isTorusReady, error: torusError, retryConnect } = useTorus();

  const renderView = () => {
    if (torusError) {
      return (
        <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
          <div className="w-64 h-64">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-extrabold tracking-wide flex items-center gap-2">
                Error
                <ExclamationIcon className="w-5" />
              </h5>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-white grid gap-4 items-center justify-center mt-6 ">
                <span>
                  There was an error while loading the Sapien Wallet API
                </span>
                <span>
                  We recommend you to close and re-open this Dialog or click the
                  Re connect button below, if error persist please contact{' '}
                  <a
                    href="mailto:passports@sapien.network"
                    className="text-blue-500 font-extrabold underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    passports@sapien.network
                  </a>{' '}
                </span>
              </p>
              <button
                type="button"
                onClick={retryConnect}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (web3Error) {
      return (
        <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
          <div className="w-64 h-64">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-extrabold tracking-wide flex items-center gap-2">
                Error
                <ExclamationIcon className="w-5" />
              </h5>
            </div>
            <p className="text-sm text-white grid gap-4 items-center justify-center mt-6 ">
              <span>
                There was an error while loading the Web3 libraries we use to
                give you the best wallet experience
              </span>
              <span>
                We recommend you to close and re-open this Dialog, if error
                persist please contact{' '}
                <a
                  href="mailto:passports@sapien.network"
                  className="text-blue-500 font-extrabold underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  passports@sapien.network
                </a>
              </span>
            </p>
          </div>
        </div>
      );
    }

    if (isTorusReady === false) {
      return (
        <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
          <div className="w-56 h-26">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-extrabold tracking-wide flex items-center gap-2">
                Loading Sapien Wallet
                <RefreshIcon className="w-5 animate-spin" />
              </h5>
            </div>
            <p className="text-sm text-white flex items-center justify-center mt-4">
              Bring the bananas, and leave the APIs to us 🙉.
            </p>
          </div>
        </div>
      );
    }

    if (isWeb3Ready === false) {
      return (
        <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
          <div className="w-56 h-26">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-extrabold tracking-wide flex items-center gap-2">
                Loading Libraries
                <RefreshIcon className="w-5 animate-spin" />
              </h5>
            </div>
            <p className="text-sm text-white flex items-center justify-center mt-4">
              Okay i see you get the bananas now get confortable, we are almost
              there
            </p>
          </div>
        </div>
      );
    }

    switch (view) {
      case View.Home:
        return (
          <HomeView
            onDeposit={() => setView(View.Deposit)}
            onSelectToken={(token) => {
              setToken(token);
              setView(View.Token);
            }}
          />
        );
      case View.Token:
        return (
          <TokenView
            token={token}
            handleBack={() => {
              setView(View.Home);
              setToken(null);
            }}
            onWithdraw={() => {
              setView(View.Withdraw);
            }}
          />
        );
      case View.Deposit:
        return <DepositView handleBack={() => setView(View.Home)} />;
      case View.Withdraw:
        return (
          <WithdrawView
            handleBack={() => {
              setView(View.Token);
            }}
            handleGoHome={() => {
              setToken(null);
              setView(View.Home);
            }}
            token={token}
          />
        );
    }
  };

  return <>{renderView()}</>;
};

export default Wallet;
