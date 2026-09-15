# Website email activation

The owner confirmed the softtask.co mailboxes in Soft-Task-Corporate-Email-Structure-v2.xlsx are active on Google Workspace. The workbook is reference data; its old Planned labels do not override that confirmation. The owner also confirmed an existing Resend account.

## Routing prepared in source

| Setting | Value |
| --- | --- |
| Contact notifications | contact@softtask.co |
| Sender | Soft Task Website <notifications@softtask.co> |
| Reply to a contact notification | Visitor's validated email address |
| Replies to subscription emails | contact@softtask.co |

Notifications contain the visitor's name, email, company, market, capability and message. No country inbox is assumed active. No notification is routed to abuse@softtask.tech. There is no automatic enquiry acknowledgement to the visitor in this revision. Newsletter confirmation emails are a separate, explicit opt-in flow.

## Required account configuration

1. In Resend, verify softtask.co for sending from notifications@softtask.co. Use the DNS values shown in that account; do not invent records. Keep Google Workspace's incoming-mail MX records. Do not enable Resend receiving or replace the root MX records. If a different sending subdomain is already verified, change MAIL_FROM to an address at that verified subdomain before testing.
2. Create a Resend API key with sending access limited to the verified domain. Store it as the Cloudflare Worker secret MAIL_API_KEY. Do not put it in source, chat or a PUBLIC_ variable.
3. Create a Cloudflare Turnstile widget for the actual website hostname. Store the secret as TURNSTILE_SECRET and the public site key as PUBLIC_TURNSTILE_SITE_KEY on the Worker. The server checks the challenge action and exact hostname against SITE_ORIGIN.
4. Deploy the Worker with its built static assets, using wrangler.jsonc. Static-only hosting cannot run /api/contact. SITE_ORIGIN must exactly match the browser's origin. Use a separate environment for preview hostnames.
5. The contact form does not require a database. Newsletter subscriptions additionally require a D1 binding named DB and worker/migrations/0001_subscribers.sql. Provider credentials alone do not activate newsletter storage.

Use Cloudflare's Worker Settings > Variables and Secrets to enter secrets. The recipient, sender and default Reply-to are already present as non-secret variables in wrangler.jsonc.

## Activation verification

- GET /api/config must report active: true on the deployed hostname. This reports configuration readiness, not proof of mailbox delivery.
- Submit one clearly labelled test enquiry through the deployed form, including a real Turnstile check. Confirm Resend accepts it and the message actually arrives in the Google Workspace inbox. Check the spam folder and, if the mailbox is a Google Group, its external-posting permissions.
- Check the received message contains every submitted field and Reply addresses the visitor. Provider acceptance alone does not establish inbox delivery.
- A rejected challenge or failed provider response must never produce a successful submission message. The visitor's input remains available for retry on failure.
- Confirm the final website privacy notice reflects the actual hosting and email processors before public launch.

## Verification in this revision

15 backend tests pass with mocked email delivery and spam verification, including recipient protection, visitor Reply-to, provider failure, configuration gating, subscription confirmation and unsubscribe. No real email has been sent and no live credentials were available during these tests.

## Primary references

- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/api-reference/emails/send-email
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
