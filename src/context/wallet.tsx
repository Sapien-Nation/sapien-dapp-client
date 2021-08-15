import { createContext, useContext, useState } from 'react';

// types
import type { Wallet as WalletType } from 'tools/types/wallet';
import type { ContentAuthor } from 'tools/types/content';

export interface Wallet {
  wallet: WalletType | null;
  setWallet: (wallet: WalletType) => void;
  walletOpen: ContentAuthor | boolean;
  setWalletOpen: (status: ContentAuthor | boolean) => void;
}

export const WalletContext = createContext<Wallet>(null);

interface Props {
  children: React.ReactNode;
}

const WalletProvider = ({ children }: Props) => {
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [walletOpen, setWalletOpen] = useState<ContentAuthor | boolean>(false);
  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
        walletOpen,
        setWalletOpen,
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
