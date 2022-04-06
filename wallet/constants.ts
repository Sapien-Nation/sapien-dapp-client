export enum StoreSteps {
  BadgesList,
  Confirmation,
  Checkout,
}

export enum MyNFTsSteps {
  BadgesList,
  ReceiversList,
  Confirmation,
}

export const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
export const walletBiconomyApiKey =
  process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY;
export const walletVerifier = process.env.NEXT_PUBLIC_WALLET_VERIFIER;
export const walletSubVerifier = process.env.NEXT_PUBLIC_WALLET_SUB_VERIFIER;
