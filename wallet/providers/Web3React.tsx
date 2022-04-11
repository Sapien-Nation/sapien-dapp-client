import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';

import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';

// connectors
import { hooks as networkHooks, network } from '../connectors/network';
import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask';

const connectors: [Network | MetaMask, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [network, networkHooks],
];

const Web3React = () => {
  return <Web3ReactProvider connectors={connectors}>{null}</Web3ReactProvider>;
};

export default Web3React;
