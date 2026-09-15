# Soft Task global website

New build for **softtask.co**, hosted on Cloudflare. This repository covers the global corporate website only.

The Singapore, UAE, India and Saudi websites will have separate repositories and their own designs, structures and local content. Shared brand identity does not require shared page layouts.

## Current stage

Development build: 65 generated pages (64 content routes plus 404), with 15 capability pillars, 16 industry families, 72 source subsectors and 32 illustrative problem-to-solution workflows. Navigation, search, service pages, products and enquiry context share one catalogue. Source is maintained on GitHub; no Cloudflare deployment has occurred.

Use Node 22.12+ and npm. Run `npm ci`, `npm run dev`, `npm run build`. Run `npm run check`, `npm test` and `npm run test:browser` for verification. `npm run cf:dev` runs the complete local Worker after a build. Provider credentials are not supplied; live submissions remain unavailable until configured.

See [the development handover](planning/DEVELOPMENT-HANDOVER.md) for architecture, editing, integration setup and launch blockers, and [the toolkit record](planning/TOOLKIT-USED.md) for the requested resources.

This is ready for development review, not public launch. Review previews are intentionally non-indexable. Confirm company records, image licences, publication copy and provider setup before launch.


Content and SEO revision (September 15): see planning/DEVELOPMENT-HANDOVER.md. Preview indexing remains disabled. An approved production build uses the build environment variable PUBLIC_SITE_INDEXABLE=true to coordinate HTML, robots.txt and asset headers. This does not publish or deploy anything. Run `node tests/content-responsive.mjs` against the built preview for metadata and seven-width checks.


## Current website

Includes separate Tubblor, Regulix One and Kytheos pages; company presence and engagement models; Web3 and crypto exchange engineering. Industry pages connect a business problem to a proposed approach, AI's role, human controls, pilot measures and relevant capabilities. These examples are opportunities, not customer case studies or verified delivery outcomes.

`npm run test:seo` checks metadata, structured-data parsing, social images and local links after building. `npm run test:responsive` and `npm run test:interactions` run against the local built preview (default http://127.0.0.1:4322). These browser scripts require Microsoft Edge. `TEST_BASE_URL` and `QA_OUTPUT` control the preview address and review output directory.

GitHub Actions verifies the source on pushes and pull requests. It does not publish to Cloudflare. See planning/DEVELOPMENT-HANDOVER.md for provider configuration and launch steps.

## Governance centre

The governance centre includes 12 policy pages, a governance hub and a 15-address public contact directory. See `/governance/`. Run `node tests/governance.mjs` against the local preview to verify policy navigation, mobile layouts, accessibility and enquiry consent. See `planning/RETENTION-AND-GOVERNANCE-OPERATIONS.md` for the proposed retention schedule and implementation responsibilities.

## Connected capability and industry catalogue

See `planning/INTEGRATED-CATALOGUE-DIRECTION.md`. Public content lives in `src/data/catalogue.json`; the initial generator is `planning/build-catalogue.py`. Update its curated definitions before regenerating so manual JSON changes are not overwritten. Existing detailed service copy remains in `src/data/services.ts`. Run `node tests/catalogue.mjs` against the built preview at port 4322 for responsive, accessibility and journey checks. AI guardrail examples explain proposed design controls; they do not certify a deployed system.
