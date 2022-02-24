import { createWeb3ReactRoot } from '@web3-react/core';

const Web3ProviderEthereumNetwork = createWeb3ReactRoot('ETHEREUM');

interface Props {
  children: React.ReactNode;
  getLibrary: any;
}

const Web3Provider = ({ children, getLibrary }: Props) => (
  <Web3ProviderEthereumNetwork getLibrary={getLibrary}>
    {children}
  </Web3ProviderEthereumNetwork>
);

export default Web3Provider;
