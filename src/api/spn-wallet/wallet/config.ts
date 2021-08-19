const getConfig = (isMainnet: boolean) =>
  isMainnet
    ? {
        MAINNET_NETWORK_ID: 1,
        POLY_NETWORK_ID: 137,
        RPC_PROVIDER: 'https://rpc-mainnet.matic.network',
        SPN_TOKEN_ADDRESS: '0x20f7a3ddf244dc9299975b4da1c39f8d5d75f05a', // Mainnet SPN
        BADGE_STORE_ADDRESS: '',
        BICONOMY_API_KEY: '',
      }
    : {
        MAINNET_NETWORK_ID: 5,
        POLY_NETWORK_ID: 80001,
        RPC_PROVIDER: 'https://rpc-mumbai.matic.today',
        SPN_TOKEN_ADDRESS: '0x8174Ab11EEd70297311f7318a71d9e9f48466Fff', // Mumbai SPN
        BADGE_STORE_ADDRESS: '0xab221c69D8EEcF6aC7944efD4589DA206AE1046C',
        BICONOMY_API_KEY: 'tYSKReKvQ.c2fbc08c-3991-49b8-8ed8-cb945b0e55fe',
      };
export default getConfig;
