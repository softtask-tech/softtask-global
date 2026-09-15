# Existing Turnstile widget integration

Updated 15 September 2026 following https://developers.cloudflare.com/turnstile/spin/prompt.md (existing-widget flow).

- Existing widget site key: `0x4AAAAAAE2KzH37PqwhUbvB`. The earlier supplied key is superseded.
- Public runtime binding: `PUBLIC_TURNSTILE_SITE_KEY`, tracked in wrangler.jsonc.
- Secret destination: Cloudflare Worker `softtaskglobalwebsite`, runtime secret `TURNSTILE_SECRET`. Owner supplied its workers.dev address and reports adding keys in Cloudflare. Configuration name now matches that deployed Worker. Secret value has not been retrieved, printed, copied into the repository or independently verified.
- Existing contact endpoint `/api/contact` checks action `contact`; newsletter endpoint `/api/subscribe` checks action `subscribe`.
- Both require strict Siteverify success, matching action and the exact hostname of the accepted request URL. SITE_ORIGIN is https://softtask.co; ADDITIONAL_SITE_ORIGINS explicitly permits https://www.softtask.co and https://softtaskglobalwebsite.softtask-tech.workers.dev. The browser Origin must match its request URL, and that origin must be in this configured list. No arbitrary-origin reflection or localhost allowance is used. Turnstile's widget hostname settings must also permit any alternate hostname used for submissions.
- Each form retains its own widget ID and resets after a submission attempt. The backend rejects blank or oversized tokens, failed verification, wrong actions/hosts, malformed responses and upstream errors. Verification has a 10-second timeout.
- No replacement widget or extra infrastructure was created. Automatic secret retrieval was not attempted; the approved external Wrangler/account/destination requirements for that flow have not been established.

Validation: 17 backend tests pass using controlled mocks, including Siteverify rejection and provider failure cases. Live GET /api/config on softtask.co and softtaskglobalwebsite.softtask-tech.workers.dev returns the new public site key, active=true and newsletterActive=false. The widget renders on https://softtask.co/contact/. Fresh real-token submission success and replay rejection remain pending; no live test enquiry has been sent. Do not claim live delivery or end-to-end Turnstile validation until those checks pass.
