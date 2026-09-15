# Development handover

## Implemented

98 generated pages: 97 content routes plus a 404 page. Search revision adds 32 standalone solution briefs and global delivery. The connected catalogue adds 16 industry detail pages, industry and problem directories, six service pages and an AI guardrails page. All 15 pillars connect to relevant industries; specialist pillars route to the three products. The 32 workflows are illustrative opportunities, not customer success claims. Governance, company, presence, engagement models, Web3 and exchange-development pages remain included.

Responsive design, self-hosted fonts, optimised owner-supplied photographs, service tabs with keyboard control, search with empty state, mobile navigation, native dialogs, persistent versioned cookie preferences, contact prefill and error handling. Google Analytics is installed with analytics opt-in, denied advertising consent and no custom-event form contents. See SEARCH-AND-LEAD-STRATEGY.md.

Cloudflare Worker code includes same-origin validation, size limits, field validation, Turnstile server verification, Resend contact delivery and D1 newsletter subscriptions. Newsletter flow uses hashed one-use confirmation tokens, explicit POST confirmation, topic selection, unsubscribe and expired-pending cleanup. Link-scanning GET requests do not subscribe or unsubscribe. No live email has been sent; provider tests use controlled mocks.

## Run

Use Node 22.12+ (Node 24 used here) and npm. Run `npm ci`, `npm run dev`. Build with `npm run build`; check with `npm run check` and `npm test`. Run `npm run test:browser` against the running preview; set TEST_BASE_URL for a different port. Microsoft Edge is used by the browser test; change the channel or install Playwright Chromium on another platform.

For the complete local Worker runtime, build then run `npm run cf:dev`. The default configuration has no accounts or secrets, so forms return a clear unavailable response. For local credentials use .dev.vars, which is ignored. Astro-only previews do not provide /api endpoints.

## Activate integrations

1. Use a company-owned Cloudflare account and an access-protected staging hostname. Set SITE_ORIGIN to the exact preview origin and use a matching Turnstile widget.
2. Create a D1 database, add its binding as DB in wrangler.jsonc, and apply worker/migrations/0001_subscribers.sql. Do not insert a made-up database identifier.
3. Configure a verified sender with Resend. Store MAIL_API_KEY and TURNSTILE_SECRET as secrets. Set MAIL_FROM, NOTIFY_TO and PUBLIC_TURNSTILE_SITE_KEY. The owner-confirmed defaults are contact@softtask.co for enquiries and notifications@softtask.co for sending, with visitor Reply-to. Credentials and live verification remain pending.
4. Test real enquiry delivery, invalid/replayed challenges, subscription confirmation, preference reconfirmation, expiry and unsubscribe in staging using an authorised test inbox. Add account-level rate limits and operational monitoring.
5. Select the actual newsletter campaign workflow before sending campaigns. This build stores subscriptions and handles transactional confirmation; it does not include a campaign editor or bulk sender. Campaign sends must use only active subscriptions and supply a working unsubscribe route. Obtain explicit send authorization.

## Editing content

The shared catalogue lives in src/data/catalogue.json and controls the 15 pillars, 16 industry families, subsectors and 32 scenarios, with relationships reused in menus, search, page links and form validation. Its initial generator is planning/build-catalogue.py; update curated generator definitions before regeneration. Existing detailed service entries live in src/data/services.ts; articles in src/data/articles.ts. Enquiry context is optional and validated server-side; notification labels come from the catalogue. Run tests/catalogue.mjs against the built preview for the integrated journey. Edit through a Git branch, preview, check and review before merging. Nontechnical CMS integration remains a later operational choice; no hosted editor is configured.

Add approved assets through scripts/prepare-images.mjs, retaining provenance in planning/image-register.json. The source photographs are from the owner's freeimages folder and require source/licence confirmation before public use. No competitor photos were downloaded. The hero photograph is illustrative, not a Soft Task employee claim.

## Publication blockers

- The owner confirmed Soft Task Singapore Pte. Ltd. as the website operator. Singapore and India street addresses are owner-confirmed; the owner requested the Dover US contact address from the legacy global site. UAE and Saudi addresses remain pending. UK presence is omitted. See CONFIRMED-PUBLIC-FACTS.md.
- Confirm mailboxes, service scope and actual delivery commitments. No registration numbers, ISO claims, client logos, defence/NDA information or invented metrics are published.
- Obtain technical/editorial review of the three drafted explainers; add accountable reviewers and review dates. These are explainers, not original research studies or project evidence.
- Finalise privacy, terms, data processing, retention and monitored contact details for the actual operator. Current policy pages explicitly identify the development state.
- Verify photo licences and get genuine company/team or approved project imagery where available.
- Connect and test providers. Set the final domain only after approved launch readiness.
- Production builds are indexable by default. Set PUBLIC_SITE_INDEXABLE=false explicitly for staging and local review builds. The build coordinates the HTML robots directive, robots.txt and Cloudflare asset headers, and advertises the sitemap. Do not retain a false build override in the production Cloudflare project. Do not edit the three outputs independently. This flag does not deploy the site.
- Prepare relevant softtask.tech redirects from real legacy usage; do not preserve bad routes mechanically. Maintain old HTTPS and all email-related DNS records.

## Validation scope

Build and type checks, Worker unit/flow tests with mocks, browser checks and saved screenshots. Automated accessibility checks cover representative routes, not full conformance certification. Lighthouse results are local lab measurements, not production Core Web Vitals. Real Cloudflare bindings, live email delivery and legal facts remain unverified.

## Deployment and rollback

The source repository is softtask-tech/softtask-global. The owner has deployed the website to Cloudflare Worker softtaskglobalwebsite at softtask.co. Cloudflare may deploy a GitHub push through its connected build. Record the current live DNS and deployment before cutover. Deploy protected staging first, then an approved production version. Use Cloudflare deployment history to roll back the Worker/assets together; preserve the previous site until form and route checks pass. D1 backups and migration rollback need an operational owner before launch.


## September 15 content and responsive revision

- Expanded delivery approach: four phases, outputs, roles, change control and common buyer questions.
- Added capability-specific project scenarios, validation checklists, FAQs and related articles across all six services. Scenarios are illustrative, not client case studies.
- Enriched company, regional entry points, careers, contact, newsletter and product content. Added practical working briefs to all three technical explainers.
- Added centralized unique metadata, canonical URLs, social metadata and JSON-LD for pages, services, articles and breadcrumbs. No unverified addresses, legal names, testimonials or performance metrics appear in structured data.
- Selected subject-specific assets from the updated owner folder. Generated data-centre imagery is explicitly illustrative. Tubblor and Kytheos screenshots are public website views. The later revision uses the owner-supplied Regulix analytics screenshot with a presentation crop that excludes the account header and sidebar. The original source asset remains in the image files; screen values are described as captured interface data, not performance claims.
- Policy copy remains an explicit development draft until operator and processing facts are confirmed. More words cannot resolve missing legal facts.
- Page content is static HTML, including expandable FAQs, so it is available without client-side rendering. This supports crawlability when launch indexing is enabled; it does not guarantee search rankings or inclusion in AI answers.
- Image dimensions and actual responsive widths are recorded in src/data/image-dimensions.json. Preserve source licences and original files outside the public repository.


## Inner-page and product revision

The homepage composition is preserved. Company presence, product details and capability pages have distinct layouts. Relevant owner-supplied schematics informed responsive HTML/SVG architecture and workflow components; source document scripts are not embedded. Diagrams are conceptual and do not imply that planned product modules are live.

- Shared interactions: country selection, workflow-stage selection, and a single connector animation when a diagram first enters view. Reduced motion skips the animation.
- SEO: unique titles/descriptions, canonical URLs, sitemap, contextual internal linking and search entries; Organization, WebPage, BreadcrumbList, Service, Article, SoftwareApplication and catalogue ItemList markup where relevant.
- Product markup describes the product only. No prices, reviews or ratings are invented to qualify for a Google rich result.
- Each route gets a generated 1200 x 630 social image during the build. Public assets are generated into dist; no unpublished content is included.
- CI: GitHub Actions checks types, build, static SEO/internal links and backend tests. It does not deploy and does not use production secrets. Browser checks are run locally with Microsoft Edge.
- Google Search guidance: https://developers.google.com/search/docs/appearance/ai-features and https://developers.google.com/search/docs/appearance/structured-data/software-app. Static text, internal links and accurate markup support discoverability; no special AI markup or ranking guarantee is claimed.
- Current product sources reviewed September 15: https://www.tubblor.com/ , https://regulixone.com/ , https://kytheos.com/ . Product availability belongs to those sites. UAE is the current Regulix market; Guardian is the current public Kytheos beta.

## Governance revision

12 structured policy pages plus a governance directory and public contact directory. Singapore operator confirmed for website privacy. Proposed 12-month enquiry / 6-month recruitment retention schedule awaits adoption and operational implementation. See RETENTION-AND-GOVERNANCE-OPERATIONS.md for responsibilities. Contact consent is required, unselected and purpose-specific; the server rejects a stale notice version and records agreement context in the email notification. No blanket compliance certification is asserted.
