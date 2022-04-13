import { useState } from 'react';

// components
import { DepositView, HomeView } from './views';

enum View {
  Home,
  Deposit,
}

const Wallet = () => {
  const [view, setView] = useState(View.Home);

  const renderView = () => {
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
