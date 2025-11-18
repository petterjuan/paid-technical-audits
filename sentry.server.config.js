// Sentry server configuration for Next.js
// See: https://docs.sentry.io/platforms/javascript/guides/nextjs/
const Sentry = require('@sentry/nextjs');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.2'),
  // captureServerExceptions and other server-specific settings can be added here
});
