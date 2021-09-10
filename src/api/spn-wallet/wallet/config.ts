import { walletIsMainnet, walleBiconomyApiKey } from 'api';
const getConfig = () => {
  return walletIsMainnet === 'true'
    ? {
        MAINNET_NETWORK_ID: 1,
        POLY_NETWORK_ID: 137,
        RPC_PROVIDER: 'https://polygon-rpc.com/',
        SPN_TOKEN_ADDRESS: '0x3Cd92Be3Be24daf6D03c46863f868F82D74905bA', // Mainnet SPN
        BADGE_STORE_ADDRESS: '0x2ee22E2fFBd1f2450A6879D34172341da31726be',
        BICONOMY_API_KEY: walleBiconomyApiKey,
        EXPLORER_BASE_URL: 'https://polygonscan.com/tx/',
      }
    : {
        MAINNET_NETWORK_ID: 5,
        POLY_NETWORK_ID: 80001,
        RPC_PROVIDER: 'https://rpc-mumbai.matic.today',
        SPN_TOKEN_ADDRESS: '0x2d280CeF1B0Ab6E78a700824Ebe368C2E1B00BEd', // Mumbai SPN
        BADGE_STORE_ADDRESS: '0x59cD3d76cC9EA4f626629337664A3CbD78F48474',
        BICONOMY_API_KEY: walleBiconomyApiKey,
        EXPLORER_BASE_URL: 'https://mumbai.polygonscan.com/tx/',
      };
};
export default getConfig;
