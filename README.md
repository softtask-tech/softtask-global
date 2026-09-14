# Soft Task global website

New build for **softtask.co**, hosted on Cloudflare. This repository covers the global corporate website only.

The Singapore, UAE, India and Saudi websites will have separate repositories and their own designs, structures and local content. Shared brand identity does not require shared page layouts.

## Current stage

First full development build: 24 static pages, responsive green visual identity, service explorer, search, enquiry and newsletter flows, and cookie preferences. Cloudflare Worker integration code is prepared. No deployment or remote push has occurred.

Use Node 22.12+ and npm. Run `npm ci`, `npm run dev`, `npm run build`. Run `npm run check`, `npm test` and `npm run test:browser` for verification. `npm run cf:dev` runs the complete local Worker after a build. Provider credentials are not supplied; live submissions remain unavailable until configured.

See [the development handover](planning/DEVELOPMENT-HANDOVER.md) for architecture, editing, integration setup and launch blockers, and [the toolkit record](planning/TOOLKIT-USED.md) for the requested resources.

This is ready for development review, not public launch. Review previews are intentionally non-indexable. Confirm company records, image licences, publication copy and provider setup before launch.


Content and SEO revision (September 15): see planning/DEVELOPMENT-HANDOVER.md. Preview indexing remains disabled. An approved production build uses the build environment variable PUBLIC_SITE_INDEXABLE=true to coordinate HTML, robots.txt and asset headers. This does not publish or deploy anything. Run `node tests/content-responsive.mjs` against the built preview for metadata and seven-width checks.


## Current website

30 generated pages, including separate Tubblor, Regulix One and Kytheos pages; company presence and engagement models; Web3 and crypto exchange engineering. The main company and product pages use distinct layouts, subject-specific imagery and responsive diagrams.

`npm run test:seo` checks metadata, structured-data parsing, social images and local links after building. `npm run test:responsive` and `npm run test:interactions` run against the local built preview (default http://127.0.0.1:4322). These browser scripts require Microsoft Edge. `TEST_BASE_URL` and `QA_OUTPUT` control the preview address and review output directory.

GitHub Actions verifies the source on pushes and pull requests. It does not publish to Cloudflare. See planning/DEVELOPMENT-HANDOVER.md for provider configuration and launch steps.
