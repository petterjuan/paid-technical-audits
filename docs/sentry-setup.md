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

CI integration (release & sourcemaps)
-----------------------------------
A GitHub Actions workflow has been added at `.github/workflows/sentry-release.yml`.
It runs on pushes to `main`, builds the app, creates a Sentry release with the commit SHA, uploads `.next` sourcemaps, and finalizes the release.

Required repository secrets (set these in GitHub Settings → Secrets):
- `SENTRY_AUTH_TOKEN` — Sentry auth token with `project:write` and `org:read` permissions.
- `SENTRY_ORG` — your Sentry organization slug
- `SENTRY_PROJECT` — your Sentry project slug

Alerting & Integrations (Slack / PagerDuty)
-----------------------------------------
Sentry supports native integrations for Slack and PagerDuty. Recommended approach:

- In Sentry UI, go to `Settings → Integrations` and add the Slack integration (choose channels for alerts).
- For PagerDuty, add the PagerDuty integration and configure which Sentry projects trigger incidents.

If you prefer programmatic creation of alert rules, Sentry exposes REST APIs — but it's often safer to create alert rules via the Sentry UI where you can test and tune thresholds interactively.

Suggested alert rules to create (in Sentry Alerts UI):
- High error-rate alert: trigger when the error count for `production` increases by X% over Y minutes.
- Performance alert: trigger when p95 request duration for the booking flow exceeds a threshold.
- Transaction duration alert: specific to critical endpoints (e.g., `/api/health` or booking webhook handler).

Notifications
- Connect Sentry -> Slack to send alerts to a channel.
- Connect Sentry -> PagerDuty to open incidents for high-severity alerts.

Automatic remediation and runbooks
--------------------------------
Once alerts are in place, attach runbooks in Sentry alert rules or the integrations so that on-call responders have direct remediation steps and escalation paths (Slack threads, PagerDuty runbook URLs).

If you want, I can add an example Node script to call Sentry's API to create a sample alert rule from the repo using `SENTRY_AUTH_TOKEN`, or I can create a short GitHub Action that will call the script during deployment to ensure your alert rules are provisioned consistently.
