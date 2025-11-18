# Sentry Setup — Observability

This project includes lightweight observability scaffolding. These notes explain how to enable Sentry for error reporting and performance monitoring in production.

Files added
- `sentry.client.config.js` — Sentry client configuration for Next.js
- `sentry.server.config.js` — Sentry server configuration for Next.js
- `lib/observability.ts` — lightweight helper used by the landing page to initialize Sentry (if installed) and emit simple `trackEvent` messages.

Quick steps to enable Sentry

1. Install the Sentry SDK

```bash
npm install --save @sentry/nextjs
```

2. Set environment variables

- `SENTRY_DSN` — server DSN (recommended to set in build / server environment)
- `NEXT_PUBLIC_SENTRY_DSN` — optional public DSN for client usage (or `SENTRY_DSN` will be used)
- `SENTRY_TRACES_SAMPLE_RATE` — optional traces sample rate (0.0 - 1.0). Default: `0.2`.

Example `.env` (do not commit secrets):

```
SENTRY_DSN=https://<public>@o0.ingest.sentry.io/0
NEXT_PUBLIC_SENTRY_DSN=https://<public>@o0.ingest.sentry.io/0
SENTRY_TRACES_SAMPLE_RATE=0.2
```

3. Source maps & Release (optional, recommended)

- For accurate stack traces and source mapping, configure a `SENTRY_RELEASE` environment variable during your CI/build step and upload releases/sourcemaps following Sentry's Next.js docs.

4. Verify locally

- Run the Next.js app locally, visit the page and trigger an error to verify Sentry receives events. The `lib/observability.ts` helper will attempt to initialize Sentry automatically if the package is installed and `SENTRY_DSN` is set.

Notes
- The repo already includes a defensive helper at `lib/observability.ts` so the app will not fail if Sentry isn't installed. Install the SDK and set the DSN to fully enable error reporting.
- We added a `/api/health` endpoint used for uptime checks.

If you want, I can also:
- Add a `sentry.properties` or CI steps to upload release artifacts automatically.
- Configure Sentry environments and integration with Slack/PagerDuty.
