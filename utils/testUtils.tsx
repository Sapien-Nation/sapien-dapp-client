import { nanoid } from 'nanoid';
import { axe } from 'jest-axe';
import { render, RenderOptions } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Cache, SWRConfig, SWRConfiguration } from 'swr';

// constants
import { Types as UserTypes, Status as UserStatus } from 'tools/types/user';

// types
import type { NextRouter } from 'next/router';
import type { User } from 'tools/types/user';

// providers
import { AuthenticationProvider } from 'context/user';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ToastProvider } from 'context/toast';
import { ToastContainer } from 'components/common';
import { Web3Librariers, Web3Provider } from 'wallet/providers';

export const cache = new Map();

// Mocks
export const mockUser = ({
  id = '1000',
  ...rest
}: Partial<User> = {}): User => ({
  avatar: '',
  id,
  type: UserTypes.User,
  username: 'jhon',
  status: UserStatus.A,
  firstName: 'doe',
  lastName: 'doe',
  displayName: 'Jhon Doe',
  email: 'jhon@test.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...rest,
});

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
  route?: Partial<NextRouter>;
  swrConfig?: SWRConfiguration;
}

interface AllTheProvidersProps extends ProviderOptions {
  children: React.ReactElement;
  swrCache?: Cache<any>;
}

const AllTheProviders = ({
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
          <AuthenticationProvider>
            <Web3Librariers>
              <Web3Provider>{children}</Web3Provider>
            </Web3Librariers>
          </AuthenticationProvider>
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
  const { route, swrConfig, ...rest } = options;
  const swrCache = new Map(cache);

  const rtl = render(ui, {
    // eslint-disable-next-line react/display-name
    wrapper: ({ children }) => (
      <AllTheProviders route={route} swrCache={swrCache} swrConfig={swrConfig}>
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
  cache.set('/api/v3/user/me', user);
  return user;
};

export const setAllTribes = (tribes = []) =>
  cache.set('/api/v3/profile/tribes', tribes);

export const setLoggedOutUser = (user = mockUser()) =>
  cache.set('/api/v3/user/me', null);

// helpers
export const createFile = (name = 'tet.png', type = 'image/png') =>
  new File([nanoid()], name, { type });

// re-export everything
export * from '@testing-library/preact';

// override render method
export { axe, renderWithProviders as render, userEvent as user };
