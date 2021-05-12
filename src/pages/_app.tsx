import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';

// types
import type { AppProps } from 'next/app';

// api
import axios from 'api';

// next
import Head from 'next/head';

// mui
import { ThemeProvider } from '@material-ui/core/styles';

// utils
import { init as initSentry } from 'utils/sentry';

// styles
import theme from 'styles/theme';

// components
import { ErrorView } from 'components/common';

// styles
import '../styles/index.css';

initSentry();

const Noop = ({ children }) => children;

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  // @ts-ignore
  const Layout = Component.Layout || Noop;

  return (
    <>
      <Head>
        <title>Sapien Network</title>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <ErrorBoundary FallbackComponent={ErrorView}>
        <SnackbarProvider maxSnack={2}>
          <ThemeProvider theme={theme}>
            <SWRConfig
              value={{
                errorRetryCount: 0,
                fetcher: (url: string) =>
                  axios(url)
                    .then(({ data }) => data)
                    .catch(({ response }) =>
                      Promise.reject(response.data.error)
                    ),
                revalidateOnFocus: false,
              }}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SWRConfig>
          </ThemeProvider>
        </SnackbarProvider>
      </ErrorBoundary>
    </>
  );
};

export default MyApp;
