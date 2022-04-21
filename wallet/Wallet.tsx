import { RefreshIcon } from '@heroicons/react/outline';
import { useState } from 'react';

// components
import { DepositView, HomeView, TokenView, WithdrawView } from './views';

// hooks
import { useWeb3 } from './providers';

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

  const { isWeb3Ready } = useWeb3();

  const renderView = () => {
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
              Bring the bananas, and leave the APIs to us 🙉.
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
