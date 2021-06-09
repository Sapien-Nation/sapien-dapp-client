import { createContext, useContext, useState } from 'react';

export interface Wallet {
  wallet: unknown | null;
  setWallet: (wallet: unknown) => void;
}

export const WalletContext = createContext<Wallet>(null);

interface Props {
  children: React.ReactNode;
}

const WalletProvider = ({ children }: Props) => {
  const [wallet, setWallet] = useState<unknown | null>(null);

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
