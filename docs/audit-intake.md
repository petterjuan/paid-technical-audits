# 90-minute AI & Frontend Technical Audit — Intake & Agenda

Purpose
-------
Provide a targeted, high-impact technical audit that surfaces revenue leaks, integration friction, developer experience problems, and immediate quick wins.

Pre-call deliverables (ask client to provide)
- Repo access: GitHub (read or collaborator) or zipped source
- Deployment URLs: Vercel, Netlify, GH Pages or staging
- Any CI logs or failing builds
- API docs or OpenAPI spec if available
- 1 or 2 key business metrics to protect (e.g., MRR, conversion rate)
- Admin credentials or temporary API key for limited read-only access

Offer: 90-minute AI Funnel Audit
- Price: $3,500 (one-off)
- Deliverable: 3-page executive audit report (delivered within 48 hours)
- Optional follow-on: 2-week implementation sprint — $15,000

90-minute Agenda
-----------------
- 0–10 minutes: Introductions, outcomes, success metrics
- 10–30 minutes: Environment review live (repo layout, build system, branch policy)
- 30–50 minutes: Frontend developer experience walkthrough (SDKs, docs, example code)
- 50–70 minutes: Reliability and infra checks (observability, CI, secrets, deployments)
- 70–85 minutes: Quick-win recommendations and prioritization
- 85–90 minutes: Next steps, proposal outline, time to delivery

Deliverable (within 48 hours)
- 3-page audit report with prioritized fixes
- One recommended, prioritized 2-week remediation plan (cost & timeline estimates)

Technical Intake Checklist (use as a form or checklist during the call)

Project basics
- Project name:
- Primary contact (name + Slack / email):
- Business metric to protect (e.g., MRR, conversion rate):

Access
- GitHub org/repo URL:
- Deployment URL(s):
- CI provider:
- Cloud provider console read-only access? (yes / no):

Repo structure
- `app` folder exists for Next.js app router? (yes / no):
- `package.json` present and scripts validated: (yes / no):
- Node version specified: (yes / no / n/a):

Build and deploy
- Build completes locally? (yes / no):
- CI passing? (yes / no):
- Large files present in repo? (yes / no):
- `.gitignore` and `.gitattributes` checked: (yes / no):

Frontend DX
- TypeScript? (yes / no):
- SDK or wrapper present? (yes / no):
- Storybook or examples? (yes / no):
- README has quick start? (yes / no):

APIs and integration
- OpenAPI/Swagger present? (yes / no):
- Auth method documented? (yes / no):
- Rate limit handling? (yes / no):

Observability and reliability
- Metrics/alerts configured? (yes / no):
- Error tracking (Sentry, Datadog) present? (yes / no):
- Health checks and liveness endpoints? (yes / no):
- Deploy protections (Vercel preview auth) present? (yes / no):

Security
- Secrets in repo? (yes / no):
- Branch protection OR rulesets enabled? (yes / no):
- Large binary files or `node_modules` accidentally committed? (yes / no):

Quick-win priorities (fill during call)
- P0 issue (fix within 1 day):
- P1 issue (fix within 1 week):
- P2 opportunity (reduce friction or add doc):

Immediate checklist to prepare (send to client with booking confirmation)
- Add a temporary read-only account or API key for audit access
- Share CI logs or failing build URLs
- Point to 1–2 customer journeys or endpoints where revenue is most sensitive
- Share any recent incident postmortems or SLOs if available

Notes on outcomes and positioning
- The 90-minute audit is designed to: reveal revenue leakage, improve developer experience, and provide 3 quick wins that can be implemented within days.
- Pricing and upsell: present the optional 2-week remediation sprint ($15k) as the fastest route to realize identified revenue recovery and reliability improvements.

Booking & contact
- Calendly: https://calendly.com/petter2025us/30min
- LinkedIn: https://www.linkedin.com/in/petterjuan/

--
File: `docs/audit-intake.md` — created automatically by assistant
