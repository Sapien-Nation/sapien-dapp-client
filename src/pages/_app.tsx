import Head from 'next/head';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';

// types
import type { AppProps } from 'next/app';

// api
import axios from 'api';

// mui
import { IconButton, makeStyles, ThemeProvider, Zoom } from '@material-ui/core';
import {
  CheckCircleOutlineOutlined as SuccessIcon,
  Close as CloseIcon,
  ErrorOutline as ErrorIcon,
  InfoOutlined as InfoIcon,
} from '@material-ui/icons';

// components
import { ErrorView } from 'components/common';

// Providers
import { AuthenticationProvider } from 'context/user';
import { WalletProvider } from 'context/wallet';

// styles
import '../styles/index.css';
import { blue, green, neutral, red, secondary } from 'styles/colors';
import theme from 'styles/theme';

// initSentry();

const useStyles = makeStyles(() => ({
  customSnackbar: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 15px 30px rgba(56, 49, 67, 0.05)',
    borderRadius: 10,
    color: neutral[700],
    fontSize: 14,
  },
}));

const SnackbarCloseButton = ({ snackKey }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackKey)}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

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
            action={(key) => <SnackbarCloseButton snackKey={key} />}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            classes={{
              variantSuccess: classes.customSnackbar,
              variantError: classes.customSnackbar,
              variantWarning: classes.customSnackbar,
              variantInfo: classes.customSnackbar,
            }}
            iconVariant={{
              success: (
                <SuccessIcon
                  fontSize="small"
                  style={{ marginRight: 10, color: green[700] }}
                />
              ),
              error: (
                <ErrorIcon
                  fontSize="small"
                  style={{ marginRight: 10, color: red[700] }}
                />
              ),
              warning: (
                <ErrorIcon
                  fontSize="small"
                  style={{ marginRight: 10, color: secondary[700] }}
                />
              ),
              info: (
                <InfoIcon
                  fontSize="small"
                  style={{ marginRight: 10, color: blue[700] }}
                />
              ),
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
                <WalletProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </WalletProvider>
              </AuthenticationProvider>
            </SWRConfig>
          </SnackbarProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
};

export default MyApp;
