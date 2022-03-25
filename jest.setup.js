import '@testing-library/jest-dom/extend-expect';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// jest
jest.setTimeout(180000);

// globals
const navigator = { language: 'test-env', userAgent: 'user-agent-test' };

Object.defineProperty(window, 'navigator', {
  value: navigator,
  writable: true,
});
