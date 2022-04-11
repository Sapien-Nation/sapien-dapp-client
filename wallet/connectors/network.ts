import { initializeConnector } from '@web3-react/core';
import { Network } from '@web3-react/network';

import { urls } from '../chain';

export const [network, hooks] = initializeConnector<Network>(
  (actions) => new Network(actions, urls),
  Object.keys(urls).map((chainId) => Number(chainId))
);
