import { createContext, useContext, useState } from 'react';

// types
import type { Wallet as WalletType } from 'tools/types/wallet';

export interface Wallet {
  wallet: WalletType | null;
  setWallet: (wallet: WalletType) => void;
}

export const WalletContext = createContext<Wallet>(null);

interface Props {
  children: React.ReactNode;
}

const WalletProvider = ({ children }: Props) => {
  const [wallet, setWallet] = useState<WalletType | null>(null);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

function useWallet() {
  const context = useContext(WalletContext);

  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

export { WalletProvider, useWallet };
