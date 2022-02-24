import withTwindApp from '@twind/next/app';
import dynamic from 'next/dynamic';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { ErrorBoundary } from 'react-error-boundary';
import twindConfig from 'twind.config';
import { Web3ReactProvider } from '@web3-react/core';

// api
import axios from 'api';

// components
import { AppLayout } from 'components';
import { ErrorView, ToastContainer } from 'components/common';
import Web3ReactManager from 'components/Web3ReactManager';

// context
import { ToastProvider } from 'context/toast';

// providers
import { AuthenticationProvider } from 'context/user';
import SocketProvider from 'context/socket';
import { WalletProvider } from 'context/wallet';

// types
import type { AppProps } from 'next/app';

// utils
import getLibrary from 'utils/web3';

import 'styles/global.css';
import 'emoji-mart/css/emoji-mart.css';

const Web3Provider = dynamic(() => import('components/provider'), {
  ssr: false,
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3Provider getLibrary={getLibrary}>
      <ErrorBoundary FallbackComponent={ErrorView}>
        <SWRConfig
          value={{
            provider: () => new Map(),
            errorRetryCount: 0,
            fetcher: (url: string) =>
              axios(url)
                .then(({ data }) => data)
                .catch(({ response }) => Promise.reject(response.data.error)),
            revalidateOnFocus: false,
          }}
        >
          <ToastProvider>
            <SocketProvider>
              <WalletProvider>
                <AuthenticationProvider>
                  <AppLayout>
                    <Web3ReactManager>
                      <Component {...pageProps} />
                    </Web3ReactManager>
                  </AppLayout>
                </AuthenticationProvider>
              </WalletProvider>
            </SocketProvider>
            <ToastContainer />
          </ToastProvider>
        </SWRConfig>
      </ErrorBoundary>
    </Web3Provider>
  </Web3ReactProvider>
);

export default withTwindApp(twindConfig, MyApp);
