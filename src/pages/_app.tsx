import Head from 'next/head';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';

// types
import type { AppProps } from 'next/app';

// api
import axios from 'api';

// mui
import { makeStyles, ThemeProvider, Zoom } from '@material-ui/core';

// components
import { ErrorView } from 'components/common';

// Providers
import { AuthenticationProvider } from 'context/user';

// styles
import '../styles/index.css';
import { primary, red } from 'styles/colors';
import theme from 'styles/theme';

// initSentry();

const useStyles = makeStyles(() => ({
  success: { backgroundColor: primary },
  error: { backgroundColor: red },
  warning: { backgroundColor: primary },
  info: { backgroundColor: primary },
}));

const Noop = ({ children }) => children;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const classes = useStyles();

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
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            TransitionComponent={Zoom}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            classes={{
              variantSuccess: classes.success,
              variantError: classes.error,
              variantWarning: classes.warning,
              variantInfo: classes.info,
            }}
            maxSnack={2}
          >
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
              <AuthenticationProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </AuthenticationProvider>
            </SWRConfig>
          </SnackbarProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
};

export default MyApp;
