// Sentry client configuration for Next.js
// See: https://docs.sentry.io/platforms/javascript/guides/nextjs/
const Sentry = require('@sentry/nextjs');

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
  tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.2'),
  // Adjust beforeSend or integrations here if needed
});
