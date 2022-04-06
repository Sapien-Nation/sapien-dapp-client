// types
import type { Content } from 'tools/types/content';

// todo: potentially buttbreaking
export enum WalletTabs {
  NFT,
  Spn,
  Store,
  TxHistory,
}

interface Tokens {
  token: string;
  torus: string;
  refresh: string;
}

export interface Web3API {
  balance: string;
  PassportData: any;
  transferSPN: (
    fromUserId: string,
    toUserId: string,
    toAddress: string,
    spnAmount: number,
    contentId?: string
  ) => void;
  //deprecated TODO: convert to support generic NFTs
  purchaseBadge: (
    amount: number,
    blockchainId: number,
    ownerId,
    parentBadgeId,
    totalPrice: number,
    isJoiningTribe?: boolean
  ) => Promise<void>;
  //deprecated TODO: convert to support generic NFTs
  transferBadge: (
    fromUserId: string,
    toUserId: string,
    toAddress: string,
    amount: number,
    badgeId: string,
    badgeBlockchainId: number,
    userIsAdmin: boolean,
    contentId?: string
  ) => Promise<void>;
}

export interface Wallet {
  web3API: Web3API | null;
  setWeb3API: (web3API: Web3API | null) => void;
  walletOpen: Content | boolean;
  setWalletOpen: (status: Content | boolean) => void;
  dispatchWalletState: any;
  globalWalletState: any;
  connecting: boolean;
  setConnecting: (connecting: boolean) => void;
  tab: WalletTabs;
  setTab: (tab: WalletTabs) => void;
  tokens: Tokens;
}
