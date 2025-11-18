# paid-technical-audits

This repository contains a minimal landing site and tooling for a paid technical audit service ("90-minute AI & Frontend Audit") built with Next.js (App Router). It includes a one-page marketing site, an intake form flow, observability scaffolding (Sentry), and CI workflows for Sentry releases and Lighthouse performance checks.

Quick links
- Landing page: `app/page.tsx`
- Booking client: `app/components/BookingClient.tsx`
- Audit intake doc: `docs/audit-intake.md`
- Sentry setup docs: `docs/sentry-setup.md`
- Performance docs: `docs/performance.md`

Why this repo
- Productized 90-minute audit offering with a clear CTA and booking flow.
- Built for reliability and quick iteration: observability, Sentry releases, and performance budgets are included out-of-the-box.

Local development

Prerequisites
- Node.js 18+ (tested with Node 20 in CI)
- npm or Yarn

Install and run

```bash
npm install
npm run dev
# open http://localhost:3000
```

Build for production

```bash
npm run build
npm run start
```

Testing health endpoint

```bash
curl http://localhost:3000/api/health
```

Booking & intake

- The landing page includes a client booking component (`app/components/BookingClient.tsx`) with:
	- Pre-fill intake modal (project name, contact, GitHub, business metric) and localStorage persistence.
	- Resilient Calendly iframe with a timeout and fallback (open in new tab / email contact).
	- Best-effort POST to `/api/intake` to capture intake data server-side (currently logs to server console).

Observability (Sentry)

- Lightweight helper: `lib/observability.ts` — initializes Sentry if `@sentry/nextjs` is installed and `SENTRY_DSN` env var is set; otherwise falls back to structured console logs.
- Client/server Sentry config files: `sentry.client.config.js`, `sentry.server.config.js`.
- CI release & sourcemaps upload: `.github/workflows/sentry-release.yml` — runs on pushes to `main` and requires repository secrets:
	- `SENTRY_AUTH_TOKEN` (with project:write), `SENTRY_ORG`, `SENTRY_PROJECT`.
- Programmatic alert provisioning: `scripts/sentry/provision_alerts.js` and `.github/workflows/provision-sentry-alerts.yml` (manual dispatch) — keep alert rules versioned in `scripts/sentry/templates/`.

Performance & CI

- Page rendering strategy: `app/page.tsx` uses ISR via `export const revalidate = 300` (5 minutes) to balance cache hits and quick updates.
- Preconnects and metadata: `app/head.tsx` includes `preconnect` for fonts and Calendly assets.
- Caching headers: `next.config.js` configures `s-maxage` and `stale-while-revalidate` for CDN caching.
- Lighthouse CI: `.lighthouseci/lighthouserc.js` and `.github/workflows/lighthouse.yml` run LHCI on PRs, upload reports to temporary public storage, and enforce performance budgets (LCP, FCP, TBT, CLS, and performance score). Budgets can be tuned in `.lighthouseci/lighthouserc.js`.

Provisioning alert rules

Use the provisioning script to create rules from JSON templates (edit templates in `scripts/sentry/templates/`):

```bash
SENTRY_AUTH_TOKEN=... SENTRY_ORG=your-org SENTRY_PROJECT=your-project node scripts/sentry/provision_alerts.js
```

or run the GitHub Action `Provision Sentry Alerts` from the Actions tab (requires repo secrets).

Deploy notes

- If deploying on Vercel, the Edge runtime (`runtime: 'edge'`) is used for the `app/api/personalize/route.ts` endpoint.
- Set environment variables in your host (Vercel/Netlify/other):
	- `SENTRY_DSN` and/or `NEXT_PUBLIC_SENTRY_DSN`
	- `SENTRY_TRACES_SAMPLE_RATE` (optional)
	- For CI Sentry releases: `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` as GitHub secrets.

Next steps / suggestions

- Wire `/api/intake` to Slack, Google Sheets, or a CRM to persist intake submissions.
- Hook up Calendly webhooks to capture successful bookings and correlate with intake data.
- Tune Lighthouse budgets based on field data (RUM) via Sentry or CrUX.
- Add release/source-map upload step to your deployment pipeline if using a different CI provider.

Contributing

PRs welcome. Work is done on branch `feat/calendly-audit-cta` for the current feature set; merge into `main` when ready.

License

This repo is private/personal by default — add a license if you want to open-source it.
