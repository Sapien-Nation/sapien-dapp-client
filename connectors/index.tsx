import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4],
});

export const ethereumNetwork = new NetworkConnector({
  urls: {
    1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
    3: `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
    4: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
  },
  defaultChainId: 3,
  // Seems like this don't exist
  // @ts-ignore
  pollingInterval: 12000,
});
