/* istanbul ignore file */
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { SnackbarProvider } from 'notistack';

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

// context
import { AuthenticationProvider } from 'context/user';
import { NavigationProvider } from 'context/tribes';

initSentry();

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Sapien Network</title>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <SnackbarProvider maxSnack={2}>
        <ThemeProvider theme={theme}>
          <SWRConfig
            value={{
              errorRetryCount: 0,
              fetcher: (url: string) =>
                axios(url)
                  .then(({ data }) => data)
                  .catch(({ response }) => Promise.reject(response.data.error)),
              revalidateOnFocus: false,
            }}
          >
            <AuthenticationProvider>
              <NavigationProvider>
                <Component {...pageProps} />
              </NavigationProvider>
            </AuthenticationProvider>
          </SWRConfig>
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
};

export default MyApp;
