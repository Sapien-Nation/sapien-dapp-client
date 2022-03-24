import { Web3Provider } from '@ethersproject/providers';

export default function getLibrary(provider): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}

export const displayAddress = (address: string): string => {
  return (
    address.slice(0, 2) +
    address.slice(2).toLowerCase().slice(0, 4) +
    '...' +
    address.toLowerCase().slice(-4)
  );
};
