/* istanbul ignore file */
import { useEffect } from 'react';

// types
import type { AppProps } from 'next/app';

// next
import dynamic from 'next/dynamic';
import Head from 'next/head';

// mui
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

// utils
import { init as initSentry } from 'utils/sentry';

// styles
import theme from 'styles/theme';

// context
import { NavigationProvider } from 'context/tribes';

// components
const Layout = dynamic(() => import('./Layout'), { ssr: false });
const Navbar = dynamic(() => import('components/navigation'), {
  ssr: false
});

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
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationProvider>
          <Layout>
            <Navbar />
            <main>
              <Component {...pageProps} />
            </main>
          </Layout>
        </NavigationProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
