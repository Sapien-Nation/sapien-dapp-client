import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { ReactElement, ReactNode, Suspense } from 'react';
import { SWRConfig, SWRConfiguration } from 'swr';

// types
import type { NextRouter } from 'next/router';

// mui
import { ThemeProvider } from '@material-ui/core/styles';

// styles
import theme from 'styles/theme';

// providers
import { AuthenticationContext } from 'context/user';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
interface CustomRenderOptions {
  children?: ReactElement | ReactNode;
  container?: Element;
  fetcher?: (...args: any) => any;
  user?: any | null;
  swrConfig?: SWRConfiguration;
  router?: NextRouter | null;
}

const Providers = ({
  children,
  fetcher,
  router = null,
  user = null,
  swrConfig = {},
}: CustomRenderOptions) => {
  let Wrapper = (
    <Suspense fallback={null}>
      <SWRConfig
        value={{
          dedupingInterval: 0,
          errorRetryCount: 0,
          fetcher,
          revalidateOnFocus: false,
          ...swrConfig,
        }}
      >
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={1}>{children}</SnackbarProvider>
        </ThemeProvider>
      </SWRConfig>
    </Suspense>
  );

  if (router) {
    Wrapper = (
      <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
    );
  }

  if (user) {
    Wrapper = (
      <AuthenticationContext.Provider value={user}>
        <SnackbarProvider maxSnack={1}>{children}</SnackbarProvider>
      </AuthenticationContext.Provider>
    );
  }

  return Wrapper;
};

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { fetcher, router, user, ...rest } = options;
  const rtl = render(ui, {
    wrapper: ({ children }) => (
      <Providers fetcher={fetcher} router={router} user={user}>
        {children}
      </Providers>
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
