# Existing Turnstile widget integration

Updated 15 September 2026 following https://developers.cloudflare.com/turnstile/spin/prompt.md (existing-widget flow).

- Existing widget site key: `0x4AAAAAAE2KzH37PqwhUbvB`. The earlier supplied key is superseded.
- Public runtime binding: `PUBLIC_TURNSTILE_SITE_KEY`, tracked in wrangler.jsonc.
- Secret destination: Cloudflare Worker `softtask-global`, runtime secret `TURNSTILE_SECRET`. Owner reports adding keys in Cloudflare. Secret value has not been retrieved, printed, copied into the repository or independently verified.
- Existing contact endpoint `/api/contact` checks action `contact`; newsletter endpoint `/api/subscribe` checks action `subscribe`.
- Both require strict Siteverify success, matching action and the exact hostname derived from the deployment's SITE_ORIGIN. Production origin is https://softtask.co. A staging deployment needs its own exact origin and an allowed widget hostname; localhost is not accepted by production.
- Each form retains its own widget ID and resets after a submission attempt. The backend rejects blank or oversized tokens, failed verification, wrong actions/hosts, malformed responses and upstream errors. Verification has a 10-second timeout.
- No replacement widget or extra infrastructure was created. Automatic secret retrieval was not attempted; the approved external Wrangler/account/destination requirements for that flow have not been established.

Validation: 17 backend tests pass using controlled mocks, including Siteverify rejection and provider failure cases. These are not live widget validation. Fresh real-token success and replay rejection through the deployed endpoint remain pending the deployment URL and browser verification. Do not claim live delivery or end-to-end Turnstile validation until those checks pass.
