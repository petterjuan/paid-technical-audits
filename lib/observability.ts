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
    // Use dynamic import so bundlers don't statically require the package
    // when it may intentionally be absent in some environments.
    // In production, keep `@sentry/nextjs` installed and set `SENTRY_DSN`.
    const mod = await import('@sentry/nextjs').catch(() => null);
    const Sentry = mod ? (mod as any).default || mod : null;

    if (!Sentry) {
      // eslint-disable-next-line no-console
      console.warn('Sentry package not found; skipping initialization');
      return;
    }

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
      // dynamic import to avoid static bundling issues
      import('@sentry/nextjs')
        .then((m) => {
          const Sentry = (m as any).default || m;
          // @ts-ignore
          Sentry.captureMessage(JSON.stringify(payload));
        })
        .catch(() => {
          // ignore
        });
      return;
    }
  } catch (_) {
    // fallthrough to console
  }

  // Fallback: structured console log
  // eslint-disable-next-line no-console
  console.log('[obs]', JSON.stringify(payload));
}
