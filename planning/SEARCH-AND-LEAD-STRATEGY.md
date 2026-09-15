# Soft Task search and lead-generation handover

Prepared 15 September 2026. Scope: softtask.co, the global company website. This work improves discovery, clarity and conversion measurement; it cannot guarantee rankings, AI citations or a number of leads.

## The critical finding

The live site initially returned `noindex, nofollow` in its HTML and X-Robots-Tag header, with `Disallow: /` in its origin robots.txt. Cloudflare also added its managed content-signal rules. Allowing AI crawling in the dashboard did not remove the origin's blocking directives.

Production builds now publish indexable content by default. Set PUBLIC_SITE_INDEXABLE=false for preview builds. The Worker redirects www GET requests to the canonical domain, excludes the workers.dev preview from indexing, and marks API responses and 404s noindex. Do not use a false build variable in the production Cloudflare build. Keep API submission protection and the exact-origin allowlist intact.

Submit **https://softtask.co/sitemap-index.xml** to Search Console and Bing Webmaster Tools. The index points to sitemap-0.xml. The production sitemap covers 97 content pages; the 404 page, API endpoints and text directory are excluded. No fabricated publication dates or automatically refreshed lastmod claims were added.

## Content and keyword architecture

The site has 98 HTML pages including 404, with 15 capability pillars, 16 industry families, 32 standalone solution briefs and a global-delivery page. All content routes are reachable through ordinary HTML links. Headings, descriptions, canonical URLs, social images and structured data are checked across the entire generated site.

`SEARCH-PAGE-MAP.md` maps every content URL to its search title and description. `src/data/discovery.ts` holds the curated topic definitions and buyer questions. These are intent-based editorial targets, not measured keyword volumes. Once Search Console has impressions, prioritise actual queries and conversion quality rather than invented demand estimates.

| Buyer intent | Destination and focus |
|---|---|
| Find a delivery partner | Capability pages: custom software, AI development, data engineering, cloud/DevOps, data centres, blockchain/Web3, ERP/CRM, managed IT, fintech, testing, IoT and API integration |
| Understand an industry workflow | Industry pages: the operational context, representative problems, technology's role, human responsibility and connected services |
| Solve a specific problem | Descriptive solution URLs: shipment documents, payment reconciliation, batch recalls, referral tracking, capacity planning and other matrix-derived workflows |
| Evaluate trust and fit | Company, how we work, engagement models, governance, confirmed presence and global delivery |
| Start a conversation | Direct contact email and a shorter form preserving service, industry and workflow context |

Each solution brief includes the business problem, proposed system, bounded AI role, human oversight, pilot measures and integration questions. They are labelled illustrative opportunities, not fabricated project evidence. FAQs are visible HTML and use matching schema.org question/answer data; they are not a claim of eligibility for Google's discontinued FAQ rich results.

## International enquiries

The global-delivery page distinguishes confirmed presence from markets where a project can be discussed. Priority groups cover Asia Pacific, the Middle East, North America and Europe. Singapore remains the headquarters; India, UAE and the US contact address retain their existing descriptions, and Saudi presence stays planned.

Do not create interchangeable city pages, pretend to have local offices, or add lists of countries to every title. Regional work should be backed by relevant delivery detail, local proof and accurate contact information. The regional domains can receive reciprocal hreflang only when genuinely equivalent, published regional pages have been confirmed. No invented hreflang pairs were added between unrelated homepages.

The next editorial advantage should come from publishable engineering experience: permissioned case studies, named technical reviewers, original diagrams, detailed integration examples and measured outcomes. NDA-protected work stays private. Review each solution brief with the relevant delivery lead before using it as a sales commitment.

## Search and AI access

The production origin robots file allows public content and excludes /api/. Important text, answers, links and diagrams' explanations are in the initial HTML, so basic content discovery does not depend on JavaScript. `/llms.txt` is a generated public directory for systems that choose to use it; it is not a Google ranking input.

| Platform | Discovery control to review |
|---|---|
| Google Search, AI Overviews and AI Mode | Googlebot access, indexable pages, useful content and snippets. Google-Extended is a separate control. |
| Bing and Copilot | Bingbot access, Bing Webmaster Tools, sitemap and IndexNow notifications |
| ChatGPT search | OAI-SearchBot for search discovery; ChatGPT-User for user-requested access. GPTBot is a separate training crawler. |
| Claude | Claude-SearchBot and Claude-User; ClaudeBot has a separate training role. |
| Perplexity | PerplexityBot and Perplexity-User, subject to its documented access rules |

Cloudflare's managed rules initially blocked several training crawlers, including GPTBot and ClaudeBot. Those account-level settings were not changed. Training permission and search visibility are different decisions. Review verified-bot traffic in Cloudflare to identify actual WAF/challenge blocks; spoofing a user-agent is not proof that a genuine crawler can access the site. Allowing a crawler does not guarantee inclusion in its results.

## Analytics and conversions

GA4 measurement ID: G-REH51537N8. The shared script covers the public site's pages. It uses basic opt-in behaviour: no Google tag loads until analytics consent. Consent version 2 asks visitors with old stored preferences to choose again. Withdrawal disables the tag and removes accessible first-party GA cookies. Advertising consent remains denied. Local and workers.dev previews do not load GA.

Custom events are `generate_lead` after the contact endpoint accepts delivery and `contact_email_click` for email links. Acceptance is not proof of mailbox delivery. Our event code does not send names, email addresses, phone numbers, company names or message content. It strips query strings and fragments from its page-location values. Tests use a controlled Google-script stub and do not send analytics or enquiry data to live services.

In GA4, mark `generate_lead` as a key event; link Search Console; verify a consented visit in Realtime. Review Enhanced Measurement: disable form interactions and site-search query collection if enabled, since this integration supplies deliberate conversion events. Review data retention and internal-traffic filtering in the account. Those dashboard settings were not changed from this workspace.

## Accounts and next actions

1. Google Search Console: submit the sitemap index, inspect the homepage and representative service, industry and solution pages, then request indexing. Monitor exclusions, canonicals and query/country performance.
2. Bing Webmaster Tools: add or import the verified site, submit the same sitemap and use its URL inspection tools. IndexNow submission tooling is included in scripts/submit-indexnow.mjs; it checks the deployed verification file and indexability before submission. A 200 or 202 receipt is not confirmation of indexing.
3. Google Business Profile: use only eligible real operations. A mailing/virtual office alone is not eligible. Do not turn the US contact address or planned Saudi presence into unverified local-office listings.
4. Domain migration: if softtask.tech still receives traffic or links, implement relevant permanent redirects and use Google's Change of Address where applicable. Preserve old-domain HTTPS and email DNS. No old-domain DNS changes were made here.
5. Review after enough search data accumulates: compare non-brand impressions, click-through rates, qualified enquiry volume and conversion by landing page/market. Improve the pages with evidence, not repeated keyword blocks. Analytics alone does not improve ranking.

## Primary references checked

- [Google AI guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google AI features and crawl requirements](https://developers.google.com/search/docs/appearance/ai-features)
- [Google documentation changes: FAQ feature and llms.txt](https://developers.google.com/search/updates)
- [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google consent mode](https://developers.google.com/tag-platform/security/guides/consent)
- [GA4 configuration](https://developers.google.com/analytics/devguides/collection/ga4/reference/config)
- [Bing Webmaster guidance](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a)
- [IndexNow protocol](https://www.indexnow.org/documentation)
- [OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [Claude crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Business Profile representation rules](https://support.google.com/business/answer/3038177)

## Verified deployment result

The code revision passed GitHub verification and deployed at softtask.co. All 97 public content URLs returned HTTP 200 with matching canonical URLs and indexable directives. The public sitemap contained all 97 URLs. The www contact URL returned a permanent 308 redirect to softtask.co; the workers.dev preview returned noindex. IndexNow received 97 URLs with HTTP 202 (key verification pending). This confirms delivery of the notification, not search-engine indexing.

Final local checks: 98-page static search audit, 20 backend tests, 35 responsive checks, 21 accessibility scans, five-width contact checks and analytics-consent tests passed. Lighthouse mobile lab: performance 88, accessibility 100, best practices 100, SEO 100. These are local measurements, not production field Core Web Vitals.
