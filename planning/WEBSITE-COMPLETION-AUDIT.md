# Website completion audit — 15 September 2026

## Latest follow-up: country pages and newsletter

Commit `afeb554` is live; GitHub verification passed. The five country overview pages use internal footer/location links. The USA is restored to the footer, Singapore/UAE/USA use the owner-provided office addresses, and Saudi Arabia is marked launching soon. The US postal address remains labelled as a contact address. Country pages and footer passed 32 responsive checks and eight accessibility scans. The live sitemap now contains 103 public URLs; all passed the live page audit.

Newsletter collection is now active. The owner approved the private D1 database with an Asia Pacific placement preference. The database schema and production binding are installed, and `/api/config` reports `newsletterActive: true`. Email confirmation, active-only export and unsubscribe are implemented. Real inbox delivery/confirmation remains to be tested. See `NEWSLETTER-OPERATIONS.md` for the private subscriber view and CSV export; marketing campaign sending is a separate operational workflow.

## Implemented in this revision

- Neutral, practical solution language replaces the repeated disclaimers in 32 solution briefs, 16 industry pages and their visible search answers. Interface captions and responsible-AI examples use concise descriptive language. Product availability, investigation constraints and human approval boundaries remain accurate.
- Soft Task cybersecurity has a dedicated `/services/cybersecurity/` page: eleven service areas, four business-risk scenarios, a scoped engagement process and STRID contact. It remains one of the existing 15 pillars. Menus, search, related industries, service metadata, sitemap and the public text directory use the service route.
- Kytheos is a separate product: Guardian public beta, wider portfolio in development. Cybersecurity and STRID delivery enquiries belong to Soft Task.
- Inner-page line height and heading-to-body spacing improved. The security diagram draws once; expanding service details uses a short transition. Reduced-motion preferences disable both effects.
- GA4 `G-REH51537N8` now uses advanced consent mode, explicitly selected by the owner. The production head bootstraps the tag with storage denied before configuration. Analytics cookies require consent; cookieless measurement is possible before consent and after rejection. Advertising storage and personalisation stay denied. Custom lead/email events require consent; our event code excludes form contents and URL query strings. Preferences and policies explain the behavior and ask visitors with old consent records to choose again.

## Verification

- Production build: 99 HTML pages, including 404; 98 public content URLs.
- Full metadata/internal-link checks and search-readiness checks passed; backend has 20 passing tests.
- Browser checks cover nine representative pages at 320, 390, 768, 1024 and 1440 pixels, including cybersecurity and Kytheos; 27 accessibility scans passed.
- Controlled browser test confirms consent order, single tag per page, sanitised URLs, consent-gated conversion events, withdrawal, cookie removal and persisted rejection. Google and email delivery are mocked in this test; it does not prove account-side reporting or inbox receipt.
- Published code commit: `d1ca0cf`; GitHub verification passed and Cloudflare serves the new cybersecurity page.
- Live audit: all 98 public content URLs return 200 with correct canonicals and indexable metadata. The sitemap contains all 98. The www host redirects permanently and the worker preview remains noindex.
- Live browser fetched the actual Google tag successfully (HTTP 200), found one tag, confirmed no Analytics cookies before consent and Analytics cookies after acceptance. Measurement requests were intercepted to avoid recording test traffic; account-side detection and Realtime remain to be checked by the owner.
- IndexNow returned HTTP 200 for 98 submitted URLs. This confirms receipt, not indexing or ranking.
- Expanded cybersecurity service panels also passed keyboard, reduced-motion, overflow and accessibility checks at four widths. Automated checks are a useful baseline; ongoing content and accessibility review remains necessary.

## Owner / operations actions still needed

| Priority | Item | Completion evidence |
| --- | --- | --- |
| High | GA4 account verification | Open the live site in Google Tag Assistant, confirm the new tag is detected, and verify a consenting visit in GA4 Realtime. Mark `generate_lead` as a key event. Review Enhanced Measurement settings so form interactions or site-search queries do not introduce information outside the tracking code reviewed here. |
| High | End-to-end enquiry receipt | Submit an agreed test enquiry, verify the notification reaches contact@softtask.co and check the reply address. Provider acceptance and configuration readiness alone do not establish inbox delivery. |
| High | Data retention operations | Approve or amend the proposed 12-month unsuccessful-enquiry / 6-month unsuccessful-recruitment schedule; assign mailbox owners and implement review/deletion processes. |
| Medium | Newsletter | Collection is active. Complete an owner-approved real inbox confirmation/unsubscribe check, then assign campaign ownership and provider suppression handling before sending bulk campaigns. |
| Medium | Address completion | Supply UAE and Saudi publication addresses when ready. Keep the US location labelled as a contact address. |
| Medium | Trust evidence | Confirm image usage rights and approve any named clients, testimonials or publishable outcomes before adding them. Maintain current product availability statements. |
| Ongoing | Search and reliability | Review Search Console and Bing Webmaster Tools, field performance, genuine crawl access, uptime, mailbox delivery failures and security dependencies. Indexing and ranking depend on search engines. |

## Analytics reference

Google describes the difference between basic and advanced consent mode, including cookieless pings with denied storage: https://developers.google.com/tag-platform/security/concepts/consent-mode

Google's verification workflow: https://developers.google.com/tag-platform/security/guides/consent-debugging

The earlier search strategy's strict opt-in description is superseded by this owner-approved advanced-mode implementation. This mode does not by itself determine whether every jurisdiction's consent requirements are met; the responsible company should review its chosen processing and notices with its privacy adviser.
