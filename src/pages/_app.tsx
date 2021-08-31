import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';

// types
import type { AppProps } from 'next/app';

// api
import axios from 'api';

// mui
import {
  CssBaseline,
  IconButton,
  makeStyles,
  ThemeProvider,
  Zoom,
} from '@material-ui/core';
import {
  CheckCircleOutlineOutlined as SuccessIcon,
  Close as CloseIcon,
  ErrorOutline as ErrorIcon,
  InfoOutlined as InfoIcon,
} from '@material-ui/icons';

// components
const DynamicErrorView = dynamic<any>(
  () => import('components/common').then((mod) => mod.ErrorView) as any,
  { ssr: false }
);

// Providers
import { AuthenticationProvider } from 'context/user';
import { WalletProvider } from 'context/wallet';
import SocketProvider from 'context/socket';

// styles
import { blue, green, neutral, red, secondary } from 'styles/colors';
import theme from 'styles/theme';

import '../styles/index.css';

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
    <IconButton
      aria-label="Close snackbar"
      onClick={() => closeSnackbar(snackKey)}
    >
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
      <ErrorBoundary FallbackComponent={DynamicErrorView}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
              <SocketProvider>
                <WalletProvider>
                  <AuthenticationProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </AuthenticationProvider>
                </WalletProvider>
              </SocketProvider>
            </SWRConfig>
          </SnackbarProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
};

export default MyApp;
