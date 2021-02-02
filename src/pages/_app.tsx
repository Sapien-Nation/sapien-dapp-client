/* istanbul ignore file */
import { useEffect, StrictMode } from 'react';

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
import { TribeNavigationProvider } from 'context/tribes';

// components
const Layout = dynamic(() => import('./Layout'), { ssr: false });
const Navbar = dynamic(() => import('components/navigation/Navbar'), { ssr: false });

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
        <TribeNavigationProvider>
          <Layout>
            <Navbar
              tribes={[
                {
                  id: '1',
                  name: 'name',
                  image:
                    'https://images.sapien.network/thumbnails/2d938ca6-f88f-4cf9-8014-dce8a62b557f-144x144.jpeg',
                  notificationNumber: 40
                },
                {
                  id: '2',
                  name: 'general',
                  image:
                    'https://s3.amazonaws.com/sapien-default-tribes/icons/general.png',
                  notificationNumber: 0
                },
                {
                  id: '3',
                  name: 'Crypto',
                  image:
                    'https://s3.amazonaws.com/sapien-default-tribes/icons/cryptocurrency.png',
                  notificationNumber: 14
                }
              ]}
            />
            <main>
              <Component {...pageProps} />
            </main>
          </Layout>
        </TribeNavigationProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
