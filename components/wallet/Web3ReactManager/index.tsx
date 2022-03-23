import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from 'hooks/web3';
import { ethereumNetwork } from 'connectors';

interface Props {
  children: React.ReactNode;
}

const Web3ReactManager = ({ children }: Props) => {
  const { active, activate } = useWeb3React('ETHEREUM');

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // after eagerly trying injected, if the network connect is active, activate polygon network
  useEffect(() => {
    if (triedEager && !active) {
      activate(ethereumNetwork);
    }
  }, [activate, active, triedEager]);

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null;
  }

  return <>{children}</>;
};

export default Web3ReactManager;
