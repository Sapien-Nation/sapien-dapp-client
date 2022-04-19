import { SWRConfig } from 'swr';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from 'next-themes';
import * as Sentry from '@sentry/nextjs';

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

// styles
import '../styles/global.css';
import 'styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider defaultTheme="dark" attribute="class">
    <ErrorBoundary FallbackComponent={() => <ErrorView />}>
      <SWRConfig
        value={{
          provider: () => new Map(),
          errorRetryCount: 0,
          fetcher: (url: string) =>
            axios(url)
              .then(({ data }) => data)
              .catch(({ response }) => {
                Sentry.captureException(response);
                return Promise.reject(response.data.message);
              }),
          revalidateOnFocus: false,
        }}
      >
        <ToastProvider>
          <AuthenticationProvider>
            <SocketProvider>
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
            </SocketProvider>
          </AuthenticationProvider>
          <ToastContainer />
        </ToastProvider>
      </SWRConfig>
    </ErrorBoundary>
  </ThemeProvider>
);

export default MyApp;
