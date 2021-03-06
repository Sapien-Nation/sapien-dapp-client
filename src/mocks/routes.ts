// types
import type { NextRouter } from 'next/router';

export const mockRouter = (router: Partial<NextRouter> = {}): NextRouter => ({
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  isReady: false,
  push: jest.fn().mockResolvedValue(true),
  replace: jest.fn().mockResolvedValue(true),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  ...router,
});
