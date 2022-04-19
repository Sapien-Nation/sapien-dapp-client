// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://9f7b808280284e358fb721b089712449@o415262.ingest.sentry.io/6346908',
  enabled: process.env.NEXT_PUBLIC_ENV === 'POC',
  tracesSampleRate: 1.0,
});
