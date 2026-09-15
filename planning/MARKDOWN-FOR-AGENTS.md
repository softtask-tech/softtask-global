# Markdown content negotiation

Implemented 16 September 2026 using the requested skill:
https://isitagentready.com/.well-known/agent-skills/markdown-negotiation/SKILL.md
Reference: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/

The Astro build generates Markdown for every public index.html page from the same rendered content. The Worker serves it at the original page URL for GET/HEAD requests explicitly accepting text/markdown, provided HTML is not preferred with a higher quality value. Missing Accept, browser Accept and wildcards default to HTML. q=0 refuses Markdown.

Main-page content includes headings, lists, links, tables, meaningful diagram labels, metadata and JSON-LD. Scripts, styling, navigation, forms and decorative controls are omitted. Links resolve against the canonical public URL. No external conversion service, AI binding or new secret is needed.

Both HTML and Markdown include Vary: Accept. Markdown discards HTML validators/body headers, preserves security/indexing headers and includes an approximate x-markdown-tokens count (UTF-8 byte length divided by four, rounded up; not model-specific tokenization). Preview pages remain noindex. API requests, newsletter tokens, static images, redirects and 404 responses do not become Markdown. Generated asset URLs are inaccessible directly through the Worker.

Validation: build first, then npm test, npm run test:seo and npm run test:search. CI builds before testing. Smoke test public pages with Accept: text/markdown and text/html, including HEAD and cache validators. Optional external check: POST https://isitagentready.com/api/scan with JSON {"url":"https://softtask.co"}; inspect checks.contentAccessibility.markdownNegotiation.status.

For country websites, retain this build hook and Worker module; use that country's canonical metadata and deployment settings. Cloudflare's managed conversion toggle is not required for this application implementation. This feature improves content access; it does not guarantee crawling, ranking or AI citations.
