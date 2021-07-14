import { useState } from 'react';

// types
import type { Wallet as WalletType } from 'tools/types/wallet';

// mui
import { Divider } from '@material-ui/core';

// components
import {
  Deposit,
  Transactions,
  WalletHeader,
  WalletTabs,
  Withdraw,
} from 'components/wallet';

// emums
import { View } from './WalletEnums';

const WalletMenu = ({ wallet }: { wallet: WalletType }) => {
  const [view, setView] = useState(View.Tabs);
  const renderView = () => {
    switch (view) {
      case View.Deposit:
        return <Deposit setView={setView} />;
      case View.Withdraw:
        return <Withdraw setView={setView} />;
      case View.Transactions:
        return <Transactions />;
      default:
        return <WalletTabs />;
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <WalletHeader currentView={view} setView={setView} wallet={wallet} />
      <Divider
        style={{
          borderColor: '#EDEEF0 !important',
          borderWidth: 1,
        }}
      />
      <div
        style={{
          height: 'calc(100% - 89px)',
        }}
      >
        {renderView()}
      </div>
    </div>
  );
};

export default WalletMenu;
