import { walletIsMainnet, walleBiconomyApiKey } from 'api';
const getConfig = () => {
  return walletIsMainnet === 'true'
    ? {
        MAINNET_NETWORK_ID: 1,
        POLY_NETWORK_ID: 137,
        RPC_PROVIDER: 'https://polygon-rpc.com/',
        SPN_TOKEN_ADDRESS: '0x3Cd92Be3Be24daf6D03c46863f868F82D74905bA', // Mainnet SPN
        BADGE_STORE_ADDRESS: '0x2ee22E2fFBd1f2450A6879D34172341da31726be',
        PASSPORT_ADDRESS: '0x6B0fB07235C94fC922d8E141133280f5BBeBE3C3', // TODO set when deployed
        BICONOMY_API_KEY: walleBiconomyApiKey,
        EXPLORER_BASE_URL: 'https://polygonscan.com/tx/',
      }
    : {
        MAINNET_NETWORK_ID: 5,
        POLY_NETWORK_ID: 80001,
        RPC_PROVIDER: 'https://rpc-mumbai.matic.today',
        SPN_TOKEN_ADDRESS: '0x2d280CeF1B0Ab6E78a700824Ebe368C2E1B00BEd', // Mumbai SPN
        BADGE_STORE_ADDRESS: '0x59cD3d76cC9EA4f626629337664A3CbD78F48474',
        PASSPORT_ADDRESS: '0x6B0fB07235C94fC922d8E141133280f5BBeBE3C3',
        BICONOMY_API_KEY: walleBiconomyApiKey,
        EXPLORER_BASE_URL: 'https://mumbai.polygonscan.com/tx/',
      };
};
export default getConfig;
