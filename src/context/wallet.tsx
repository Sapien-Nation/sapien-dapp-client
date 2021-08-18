import { createContext, useContext, useState, useReducer } from 'react';
// reducers
import { reducer, initialState } from 'components/wallet/walletReducer';

// types
import type { Wallet as WalletType } from 'tools/types/wallet';
import type { ContentAuthor } from 'tools/types/content';

export interface Wallet {
  wallet: WalletType | null;
  setWallet: (wallet: WalletType) => void;
  walletOpen: ContentAuthor | boolean;
  setWalletOpen: (status: ContentAuthor | boolean) => void;
  dispatchWalletState: any;
  globalWalletState: any;
}

export const WalletContext = createContext<Wallet>(null);

interface Props {
  children: React.ReactNode;
}

const WalletProvider = ({ children }: Props) => {
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [walletOpen, setWalletOpen] = useState<ContentAuthor | boolean>(false);
  const [globalWalletState, dispatchWalletState] = useReducer(
    reducer,
    initialState
  );
  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
        walletOpen,
        setWalletOpen,
        dispatchWalletState,
        globalWalletState,
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
