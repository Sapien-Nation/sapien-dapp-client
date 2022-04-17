import '@testing-library/jest-dom/extend-expect';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// jest
jest.setTimeout(180000);

// globals
const navigator = { language: 'test-env', userAgent: 'user-agent-test' };

process.env = { NEXT_PUBLIC_DISTRIBUTION_URL: 'HOST' }; // Make a copy

Object.defineProperty(window, 'navigator', {
  value: navigator,
  writable: true,
});

class IntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});
