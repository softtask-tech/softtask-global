# Newsletter operations

Activation status (15 September 2026): owner-approved Asia Pacific placement preference; database and subscriber table created; binding published in commit `afeb554`. Live `/api/config` reports `newsletterActive: true`. The confirmation/unsubscribe logic passes backend tests. A real inbox confirmation is still pending; no test message has been sent without the owner's answer to the test-mail question.

## How addresses are collected

The public `/newsletter/` form asks for an email, topic and explicit subscription consent, protected by Turnstile. Resend delivers a 24-hour confirmation link. Opening the link shows a confirmation button; only pressing it activates the subscription, which also avoids activation by email-link scanners. The welcome message contains an unsubscribe link. Unsubscribe requires a confirmation action and removes the record. Unconfirmed expired requests are cleaned up by the scheduled worker.

Google Analytics does not supply visitor email addresses. Contact enquiries are not automatically newsletter subscriptions.

## Activation checklist

1. In the same Cloudflare account as worker `softtaskglobalwebsite`, create or reuse a D1 database named `softtask-newsletter`.
2. Apply `worker/migrations/0001_subscribers.sql` to that database. It creates the subscriber table without overwriting an existing table.
3. Bind that database to the worker with the exact binding name `DB`.
4. Save the real database ID and `migrations_dir: "worker/migrations"` in the `d1_databases` entry of `wrangler.jsonc` so later deployments preserve the binding. Do not use a placeholder ID in production.
5. Verify `/api/config` reports `newsletterActive: true`. Test the full email-confirmation and unsubscribe flow using an owner-approved test mailbox.

Existing Resend and Turnstile secrets stay private in Cloudflare. No new email API provider is required for confirmation and welcome messages.

## Retrieve the confirmed list

The Cloudflare D1 console, available to authorised account members, can show the list with:

```sql
SELECT email, topic, created_at, updated_at
FROM subscribers
WHERE status = 'active'
ORDER BY email;
```

For a CSV that opens in Excel, an authorised developer can run `node scripts/export-newsletter.mjs` after Wrangler sign-in. The file is saved under `private-exports/`, excluded from Git. The command exports only confirmed subscribers, avoids confirmation/unsubscribe token hashes and does not print subscriber addresses to the terminal.

Before each campaign, export a fresh list and respect its selected topics. An old CSV is not a live subscription list: someone may have unsubscribed. Campaign sending, provider suppression handling and unsubscribe links must be configured before sending a bulk newsletter. This revision enables collection and transactional confirmation; it does not send marketing campaigns.

Keep access limited to the people responsible for newsletter operations and manage exported copies under the company retention policy.
