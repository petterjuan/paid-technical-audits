# Performance Tuning — Rendering Strategy & Edge Personalization

Goal: maximize CDN cache hits and fast initial load for the marketing landing page, while enabling light personalization at the edge.

1) Rendering strategy for landing page
- Use SSG / ISR for the marketing landing page to serve cached HTML from the CDN. This repo's `app/page.tsx` exports:

```ts
export const revalidate = 3600; // one hour (ISR)
```

- Benefits: fast TTFB, improved Core Web Vitals, CDN caching. Use ISR when you occasionally update content or pricing and want a short revalidate window.
- If content is fully static, you can omit `revalidate` and Next.js will treat it as static at build time.

2) Personalization with Edge functions
- For small, safe personalization (greeting, low-sensitivity variants), use Edge API routes or Edge server components so the main page stays cacheable.
- This repo includes `app/api/personalize/route.ts` with `export const runtime = 'edge'` as an example. The client can call `/api/personalize` to get a tiny JSON payload (greeting, variant) based on headers or cookies.
- This pattern preserves CDN caching for the main HTML and moves personalization to a fast edge execution path.

3) Where to use server-side personalization
- Use Edge for tiny decisions: language hints, lightweight AB variants, greeting names from a cookie or JWT claim.
- Avoid heavy personalization (per-user dashboards) at the edge if it prevents CDN caching; instead, render such views with server-side rendering or client-side hydration behind authentication.

4) Additional optimizations
- Preconnect to third-party origins used on the page (fonts, booking providers) — included in `app/head.tsx`.
- Load third-party embeds lazily or on interaction — the Calendly iframe is lazy-loaded here.
- Use `next/image` for images to get optimized formats and responsive sizes.
- Set caching headers for static assets (`s-maxage`, `stale-while-revalidate`) in `next.config.js` to let the CDN serve stale content while revalidating.

5) Measuring & enforcing
- Lighthouse CI is configured to run on PRs and enforce budgets (`.lighthouseci/lighthouserc.js`). Tune budgets after collecting field data.
- Consider adding Real User Monitoring (RUM) via Sentry or Web Vitals reporting to calibrate thresholds using actual user metrics.
