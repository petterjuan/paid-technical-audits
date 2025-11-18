// Lightweight observability helper.
// - Initializes Sentry (if available and SENTRY_DSN env var set).
// - Exposes `trackEvent` for simple structured events.
// This file is intentionally defensive: if Sentry isn't installed, it falls back to console logging.

type EventPayload = {
  event: string;
  props?: Record<string, unknown>;
};

let sentryInitialized = false;

export async function initObservability(): Promise<void> {
  if (sentryInitialized) return;

  try {
    // Importing `@sentry/nextjs` only when available to avoid hard dependency in this example.
    // In production, install `@sentry/nextjs` and configure SENTRY_DSN in environment.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Sentry = require('@sentry/nextjs');

    if (process.env.SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 0.2,
      });
      // @ts-ignore
      sentryInitialized = true;
      console.info('Sentry initialized');
    } else {
      console.info('SENTRY_DSN not set — skipping Sentry initialization');
    }
  } catch (err) {
    // Sentry not installed — degrade gracefully.
    // eslint-disable-next-line no-console
    console.warn('Sentry not available; install @sentry/nextjs to enable error reporting');
  }
}

export function trackEvent(event: string, props?: Record<string, unknown>) {
  const payload: EventPayload = { event, props };

  try {
    if (sentryInitialized) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Sentry = require('@sentry/nextjs');
      // @ts-ignore
      Sentry.captureMessage(JSON.stringify(payload));
      return;
    }
  } catch (_) {
    // fallthrough to console
  }

  // Fallback: structured console log
  // eslint-disable-next-line no-console
  console.log('[obs]', JSON.stringify(payload));
}
