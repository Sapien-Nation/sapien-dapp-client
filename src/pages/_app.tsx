/* istanbul ignore file */
import { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// types
import type { AppProps } from 'next/app';

// api
import axios from 'api';

// next
import dynamic from 'next/dynamic';
import Head from 'next/head';

// mui
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, NoSsr } from '@material-ui/core';

// utils
import { init as initSentry } from 'utils/sentry';

// styles
import theme from 'styles/theme';

// context
import { AuthenticationProvider } from 'context/user';
import { NavigationProvider } from 'context/tribes';

// components
const General = dynamic(() => import('./general'), { ssr: false });
import Layout from './Layout';
import { Navbar, Sidebar } from 'components/navigation';

initSentry();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }: { queryKey: Array<string> }) => {
        const { data } = await axios.get(queryKey[0]);
        return data;
      }
    }
  }
});

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
        <AuthenticationProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <NavigationProvider>
                <General />
                <Layout>
                  <NoSsr>
                    <Sidebar />
                  </NoSsr>
                  <main>
                    <Navbar />
                    <div>
                      <Component {...pageProps} />
                    </div>
                  </main>
                </Layout>
              </NavigationProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </AuthenticationProvider>
      </SnackbarProvider>
    </>
  );
};

export default MyApp;
