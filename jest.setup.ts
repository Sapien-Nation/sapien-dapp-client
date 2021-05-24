import '@testing-library/jest-dom';
import * as Sentry from '@sentry/node';

(global as any).Sentry = Sentry;

jest.mock('@sentry/node');
jest.setTimeout(30000);
