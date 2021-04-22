/* istanbul ignore file */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { ReactElement, ReactNode, Suspense } from 'react';
import { SWRConfig } from 'swr';

// types
import type { NextRouter } from 'next/router';

// mui
import { ThemeProvider } from '@material-ui/core/styles';

// styles
import theme from 'styles/theme';

// mocks
import { mockRouter } from 'mocks/routes';

// providers
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { AuthenticationProvider } from 'context/user';

interface CustomRenderOptions {
  children?: ReactElement | ReactNode;
  container?: Element;
  fetcher?: (...args: any) => any;
  router?: NextRouter | null;
}

const AllTheProviders = ({
  children,
  fetcher,
  router = null,
}: CustomRenderOptions) => (
  <SnackbarProvider maxSnack={1}>
    <Suspense fallback={null}>
      <SWRConfig
        value={{
          dedupingInterval: 0,
          errorRetryCount: 0,
          fetcher,
          revalidateOnFocus: false,
        }}
      >
        <ThemeProvider theme={theme}>
          <RouterContext.Provider value={mockRouter(router)}>
            <AuthenticationProvider>{children}</AuthenticationProvider>
          </RouterContext.Provider>
        </ThemeProvider>
      </SWRConfig>
    </Suspense>
  </SnackbarProvider>
);

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { fetcher, router, ...rest } = options;
  const rtl = render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders fetcher={fetcher} router={router}>
        {children}
      </AllTheProviders>
    ),
    ...rest,
  });

  return {
    ...rtl,
    rerender: (ui: ReactElement, rerenderOptions: CustomRenderOptions = {}) =>
      customRender(ui, {
        container: rtl.container,
        ...options,
        ...rerenderOptions,
      }),
  };
};

export const createRandomString = (length: number) =>
  Array.from({ length }, () => 'w').join('');

export { renderHook, act as actHook } from '@testing-library/react-hooks';
export * from '@testing-library/react';

export { customRender as render, userEvent as user };
