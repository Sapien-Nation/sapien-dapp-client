enum View {
  Tabs,
  Deposit,
  Withdraw,
  Transactions,
}

enum StoreSteps {
  BadgesList,
  Confirmation,
  Checkout,
}

enum MyNFTsSteps {
  BadgesList,
  ReceiversList,
  Confirmation,
}

export { MyNFTsSteps, StoreSteps, View };

export const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
export const walleBiconomyApiKey =
  process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY;
export const walletVerifier = process.env.NEXT_PUBLIC_WALLET_VERIFIER;
export const walletSubVerifier = process.env.NEXT_PUBLIC_WALLET_SUB_VERIFIER;
