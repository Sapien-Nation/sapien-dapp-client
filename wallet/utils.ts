import { Web3Provider } from '@ethersproject/providers';

// api
import { connectWeb3API } from './';
import { refresh } from 'api/authentication';

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

export async function initWeb3API(me, context) {
  const { tokens, web3API, setWeb3API, connecting, setConnecting } = context;
  if (tokens && Boolean(me) && Boolean(!web3API) && !connecting) {
    setConnecting(true);
    try {
      //debugger;
      //fetch wallet api object
      //TODO test that all wallet API methods are available
      const apiConnected = await connectWeb3API(
        tokens.torus,
        me.v2Id || me.id,
        false
      );
      //debugger;
      setWeb3API(apiConnected);
      setConnecting(false);
    } catch (error) {
      try {
        //debugger;
        const { token } = await refresh(tokens.refresh, 'torus');
        //debugger;
        const apiConnected = await connectWeb3API(
          token,
          me.v2Id || me.id,
          false
        );
        //debugger;
        setWeb3API(apiConnected);
        //setNewUser(false);
        setConnecting(false);
      } catch (err) {
        // TODO add Sentry ERROR
        //debugger;
        console.log('Wallet Error:', err);
      }
    }
  }
}
