const getConfig = (isMainnet: boolean) =>
  isMainnet
    ? {
        MAINNET_NETWORK_ID: 1,
        POLY_NETWORK_ID: 137,
        RPC_PROVIDER: 'https://rpc-mainnet.matic.network',
        SPN_TOKEN_ADDRESS: '0x20f7a3ddf244dc9299975b4da1c39f8d5d75f05a', // Mainnet SPN
        BADGE_STORE_ADDRESS: '',
        BICONOMY_API_KEY: '',
        EXPLORER_BASE_URL: 'https://polygonscan.com/tx/',
      }
    : {
        MAINNET_NETWORK_ID: 5,
        POLY_NETWORK_ID: 80001,
        RPC_PROVIDER: 'https://rpc-mumbai.matic.today',
        SPN_TOKEN_ADDRESS: '0x2d280CeF1B0Ab6E78a700824Ebe368C2E1B00BEd', // Mumbai SPN
        BADGE_STORE_ADDRESS: '0xab221c69D8EEcF6aC7944efD4589DA206AE1046C',
        BICONOMY_API_KEY: 'tYSKReKvQ.c2fbc08c-3991-49b8-8ed8-cb945b0e55fe',
        EXPLORER_BASE_URL: 'https://mumbai.polygonscan.com/tx/',
      };
export default getConfig;
