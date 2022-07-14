import { nanoid } from 'nanoid';
import { axe } from 'jest-axe';
import { render, RenderOptions } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Cache, SWRConfig, SWRConfiguration } from 'swr';

// types
import type { NextRouter } from 'next/router';

// providers
import { AuthenticationProvider } from 'context/user';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ToastProvider } from 'context/toast';
import { ToastContainer } from 'components/common';
import { SocketContext } from 'context/socket';

// mocks
import { mockUser } from 'tools/mocks/user';

export const cache = new Map();

// mocks
export const mockRouter = (props: Partial<NextRouter> = {}): NextRouter => ({
  asPath: '/',
  basePath: '/',
  back: jest.fn(() => Promise.resolve(true)),
  beforePopState: jest.fn(() => Promise.resolve(true)),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: true,
  isPreview: true,
  isReady: true,
  pathname: '/',
  push: jest.fn(() => Promise.resolve(true)),
  prefetch: jest.fn(() => Promise.resolve()),
  reload: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  route: '/',
  query: {},
  ...props,
});

export interface ProviderOptions extends RenderOptions {
  socket?: { send: () => void; onmessage: () => void };
  route?: Partial<NextRouter>;
  swrConfig?: SWRConfiguration;
}

interface AllTheProvidersProps extends ProviderOptions {
  children: React.ReactElement;
  swrCache?: Cache<any>;
}

const mockedSocket = {
  send: jest.fn(),
  onmessage: jest.fn(),
};

const AllTheProviders = ({
  socket = mockedSocket,
  children,
  route = {},
  swrConfig = {},
  swrCache,
}: AllTheProvidersProps) => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 0,
        errorRetryCount: 0,
        fetcher: undefined,
        revalidateOnFocus: false,
        ...swrConfig,
        provider: () => swrCache,
      }}
    >
      <RouterContext.Provider value={mockRouter(route)}>
        <ToastProvider>
          <AuthenticationProvider>{children}</AuthenticationProvider>
          <ToastContainer />
        </ToastProvider>
      </RouterContext.Provider>
    </SWRConfig>
  );
};

const renderWithProviders = (
  ui: React.ReactElement,
  options: ProviderOptions = {}
) => {
  const { route, swrConfig, socket, ...rest } = options;
  const swrCache = new Map(cache);

  const rtl = render(ui, {
    // eslint-disable-next-line react/display-name
    wrapper: ({ children }) => (
      <AllTheProviders
        route={route}
        swrCache={swrCache}
        swrConfig={swrConfig}
        socket={socket}
      >
        {children}
      </AllTheProviders>
    ),
    ...rest,
  });

  return {
    ...rtl,
    rerender: (ui: React.ReactElement, rerenderOptions?: ProviderOptions) =>
      renderWithProviders(ui, {
        container: rtl.container,
        ...options,
        ...rerenderOptions,
      }),
    history,
    swrCache,
  };
};

// Cache Set
export const setUser = (user = mockUser()) => {
  cache.set('/user-api/me', user);
  return user;
};

export const setAllTribes = (tribes = []) =>
  cache.set('/core-api/user/tribes', tribes);

export const setLoggedOutUser = (user = mockUser()) =>
  cache.set('/user-api/me', null);

// helpers
export const createFile = (name = 'tet.png', type = 'image/png') =>
  new File([nanoid()], name, { type });

// re-export everything
export * from '@testing-library/preact';

// override render method
export { axe, renderWithProviders as render, userEvent as user };
