import { RefreshIcon } from '@heroicons/react/outline';
import { ExclamationIcon } from '@heroicons/react/solid';
import { useState } from 'react';

// components
import {
  NotificationsView,
  DepositView,
  HistoryView,
  HomeView,
  TokenView,
  WithdrawView,
} from './views';

// hooks
import { useWeb3 } from './providers';

// types
import type { Token } from './types';

enum View {
  Notifications,
  Home,
  Deposit,
  Token,
  Withdraw,
  History,
}

interface Props {
  showDeclarationDialog: () => void;
}

const Wallet = ({ showDeclarationDialog }: Props) => {
  const [view, setView] = useState(View.Home);
  const [token, setToken] = useState<Token | null>(null);

  const { isReady: isWeb3Ready, error: web3Error } = useWeb3();

  const renderView = () => {
    if (web3Error) {
      return (
        <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
          <div className="w-64">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
                Error
                <ExclamationIcon className="w-5" />
              </h5>
            </div>
            <p className="text-sm text-white grid gap-4 items-center justify-center mt-6">
              <span>
                There was an error loading our Web3 library. Please try
                reloading the page or contact{' '}
                <a
                  href="mailto:support@sapien.network"
                  className="text-blue-500 font-bold underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  support@sapien.network
                </a>{' '}
                if the error persists.
              </span>
            </p>
          </div>
        </div>
      );
    }

    if (isWeb3Ready === false) {
      return (
        <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
          <div className="w-56 h-26">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
                Loading Libraries
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

    switch (view) {
      case View.Notifications:
        return <NotificationsView handleBack={() => setView(View.Home)} />;
      case View.Home:
        return (
          <HomeView
            onDeposit={() => setView(View.Deposit)}
            onSelectToken={(token) => {
              setToken(token);
              setView(View.Token);
            }}
            onViewHistory={() => setView(View.History)}
            onViewNotifications={() => setView(View.Notifications)}
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
            showDeclarationDialog={showDeclarationDialog}
          />
        );
      case View.History:
        return <HistoryView handleBack={() => setView(View.Home)} />;
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
