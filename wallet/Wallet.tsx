import { ExclamationIcon, RefreshIcon } from '@heroicons/react/outline';
import { useState } from 'react';

// components
import { DepositView, HomeView } from './views';

// hooks
import { useTorus, useWeb3 } from './providers';

enum View {
  Home,
  Deposit,
}

const Wallet = () => {
  const [view, setView] = useState(View.Home);

  const { retryConnect } = useTorus();
  const { isTorusReady, torusError, isWeb3Ready, web3Error } = useWeb3();

  const renderView = () => {
    if (isTorusReady === false || isWeb3Ready === false) {
      return (
        <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
          <div className="w-56 h-26">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-extrabold tracking-wide flex items-center gap-2">
                Loading Libraries
                <RefreshIcon className="w-5 animate-spin" />
              </h5>
            </div>
            <p className="text-sm text-white flex items-center justify-center mt-14 animate-pulse">
              {isTorusReady === false
                ? 'Loading Sapien Wallet'
                : 'Almost There'}{' '}
              {' ...'}
            </p>
          </div>
        </div>
      );
    }

    if (torusError || web3Error) {
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
              {torusError ? (
                <>
                  <span>There was an error while loading Torus Wallet</span>
                  <span>
                    Click the button below to try again connect to Torus, if the
                    error persist please contact{' '}
                    <a
                      href="mailto:passports@sapien.network"
                      className="text-blue-500 font-extrabold underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      passports@sapien.network
                    </a>{' '}
                  </span>
                  <button
                    type="button"
                    onClick={retryConnect}
                    className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Connect
                  </button>
                </>
              ) : null}

              {web3Error && (
                <>
                  <span>
                    There was an error while loading the Web3 libraries we use
                    to give you the best wallet experience
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
                    </a>{' '}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      );
    }

    switch (view) {
      case View.Home:
        return <HomeView onDeposit={() => setView(View.Deposit)} />;
      case View.Deposit:
        return <DepositView handleBack={() => setView(View.Home)} />;
    }
  };

  return (
    <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
      {renderView()}
    </div>
  );
};

export default Wallet;
