import withTwindApp from '@twind/next/app';
import { SWRConfig } from 'swr';
import { ErrorBoundary } from 'react-error-boundary';
import twindConfig from 'twind.config';

// api
import axios from 'api';

// components
import { AppLayout } from 'components';
import { ErrorView, ToastContainer } from 'components/common';

// context
import { ToastProvider } from 'context/toast';

// providers
import { AuthenticationProvider } from 'context/user';
import SocketProvider from 'context/socket';

// types
import type { AppProps } from 'next/app';

import 'styles/global.css';
import 'emoji-mart/css/emoji-mart.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
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
          <AuthenticationProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </AuthenticationProvider>
        </SocketProvider>
        <ToastContainer />
      </ToastProvider>
    </SWRConfig>
  </ErrorBoundary>
);

export default withTwindApp(twindConfig, MyApp);
