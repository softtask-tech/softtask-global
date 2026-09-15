# Soft Task global website

Global corporate website for **softtask.co**. Cloudflare Worker: **softtaskglobalwebsite**. Singapore headquarters; regional websites remain separate projects.

## Current build

98 generated HTML pages (97 content routes plus 404): 15 capability pillars, 16 industry families, 32 solution briefs, three product pages, company and governance information. The global-delivery page separates enquiry markets from confirmed presence.

Shared catalogue: src/data/catalogue.json. Search titles, solution URLs and buyer answers: src/data/discovery.ts. Detailed existing services: src/data/services.ts. Governance: src/data/governance.ts.

## Develop and verify

Use Node 24 and npm. Run npm ci, npm run dev, npm run check and npm test. Build with npm run build. Static SEO: npm run test:seo. Production search checks: node tests/search-readiness.mjs. Browser scripts tests/contact-ui.mjs, tests/search-ui.mjs and tests/analytics-consent.mjs use Microsoft Edge; local page previews use port 4322.

**Production builds are indexable by default.** Set PUBLIC_SITE_INDEXABLE=false for staging/local review builds. CI explicitly tests non-indexable and production modes. The Worker applies noindex to workers.dev previews and API/error responses, and redirects www to softtask.co. Production Cloudflare must not retain a false PUBLIC_SITE_INDEXABLE build override.

## Analytics and forms

GA4 G-REH51537N8 loads on the public domain only after analytics consent. Form data is not included in our analytics event payloads. Consent version 2 re-prompts older saved choices. See planning/SEARCH-AND-LEAD-STRATEGY.md for GA4 dashboard settings and verification.

Contact delivery uses Resend and Turnstile runtime secrets. Newsletter operation additionally requires Cloudflare D1 and its migration. No credentials belong in Git. The owner configured the live contact bindings; real delivery verification is separate from automated mocked tests.

## Search handover

Sitemap: https://softtask.co/sitemap-index.xml

- planning/SEARCH-AND-LEAD-STRATEGY.md — findings, regional strategy, crawler distinctions and account actions.
- planning/SEARCH-PAGE-MAP.md — complete page/topic map.
- planning/DEVELOPMENT-HANDOVER.md — architecture and operational setup.
- planning/TURNSTILE-INTEGRATION.md — existing widget and origin validation.

IndexNow: node scripts/submit-indexnow.mjs is a dry run; use --submit after the key file and indexable build are live. It notifies participating search engines, not Google. A receipt is not indexing or ranking confirmation.

Public case studies, image licences, operational policy adoption and any delivery claims still require their appropriate evidence and owners. See the handover for outstanding operational work.
