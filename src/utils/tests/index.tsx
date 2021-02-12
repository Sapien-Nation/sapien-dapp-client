/* istanbul ignore file */
import axios from 'axios';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// types
import { User } from 'types/user';

// mui
import { NoSsr } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

// styles
import theme from 'styles/theme';

// context
import { AuthenticationContext } from 'context/user';
import { NavigationProvider } from 'context/tribes';

// components
import Layout from 'pages/Layout';
import { Navbar, Sidebar } from 'components/navigation';

interface CustomRenderOptions {
  children?: ReactElement | ReactNode;
  container?: Element;
  isPage?: boolean;
  user?: {
    logout: () => void;
    login: () => Promise<unknown>;
    me: null | User;
  } | null;
}

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
const AllTheProviders = ({
  children,
  isPage = false,
  user = null
}: CustomRenderOptions) => {
  return (
    <SnackbarProvider maxSnack={1}>
      <AuthenticationContext.Provider value={user}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <NavigationProvider>
              {isPage ? (
                <Layout>
                  <Sidebar />
                  <main>
                    <Navbar />
                    {children}
                  </main>
                </Layout>
              ) : (
                <>{children}</>
              )}
            </NavigationProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthenticationContext.Provider>
    </SnackbarProvider>
  );
};

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { isPage, user, ...rest } = options;
  const rtl = render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders isPage={isPage} user={user}>
        {children}
      </AllTheProviders>
    ),
    ...rest
  });

  return {
    ...rtl,
    rerender: (ui: ReactElement, rerenderOptions: CustomRenderOptions = {}) =>
      customRender(ui, {
        container: rtl.container,
        ...options,
        ...rerenderOptions
      })
  };
};

export { renderHook, act as actHook } from '@testing-library/react-hooks';
export * from '@testing-library/react';

export { customRender as render, userEvent as user };
