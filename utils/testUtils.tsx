import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// types
import type { NextRouter } from 'next/router';

// providers
import { RouterContext } from 'next/dist/shared/lib/router-context';

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

interface AllTheProvidersProps {
  children: React.ReactElement;
  route?: Partial<NextRouter>;
}

const AllTheProviders = ({ children, route = {} }: AllTheProvidersProps) => {
  return (
    <RouterContext.Provider value={mockRouter(route)}>
      {children}
    </RouterContext.Provider>
  );
};

interface OptionsProps {}

const customRender = (ui: React.ReactElement, options: OptionsProps = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { axe, customRender as render, userEvent as user };
