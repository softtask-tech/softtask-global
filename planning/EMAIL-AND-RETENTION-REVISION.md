# Email and retention revision

The owner confirmed GA4 verification and approved the retention schedule: unsuccessful enquiries are retained for 12 months after last meaningful contact; unsuccessful recruitment applications for six months after the process ends, subject to documented legal exceptions. Public privacy wording reflects that approval. Mailbox owners must put review and deletion into operation; this website change does not delete historical Google Workspace records.

## Confirmation repair

The confirmation/result page previously returned `Referrer-Policy: no-referrer`. Browser-generated form POSTs can consequently carry `Origin: null` and fail the strict same-origin check. The header is now `strict-origin`: it exposes no token-bearing referrer path or query, and permits the browser to send its correct origin. Foreign and null-origin POSTs remain rejected. GET links remain read-only; confirmation and unsubscribe require an explicit POST. Existing unexpired links continue to work.

The real-browser regression test exercises opening the email link, confirming and unsubscribing through actual browser forms with mocked data/mail transport. It verifies request headers and database changes rather than manually assuming an Origin header. No real subscriber is changed by this test.

## Email design and contact receipts

Resend messages now include HTML and plain-text alternatives. HTML uses the Soft Task logo, company identity, readable paragraphs, a confirmation/unsubscribe button and a copyable link. All dynamic text is escaped. Mobile previews are checked at 320, 390 and 760 pixels; mail-client rendering may vary.

Contact submissions continue to notify the fixed internal mailbox. After provider acceptance, a separate acknowledgement is sent to the submitted email with their enquiry details and the owner-approved commitment to respond within one working day. Acknowledgement failure does not lose the internal enquiry or claim a receipt was sent. Both message types have separate idempotency keys.

## Country links and spacing

Country overview headers link to the Singapore, India and UAE sites, plus the supplied Saudi domain labelled launching soon. USA has no regional website button. Saudi launch availability has not been verified. The full-site mobile heading-to-paragraph audit identified and corrected tight spacing in the homepage industry section, delivery steps and contact-form headings. Newsletter form spacing is more compact while retaining readable labels and consent text.
