# NIL Power Playbook operations

## Launch state

Sales and publication excerpts default off. The supplied manuscript identifies itself as a working edition, so no manuscript, EPUB or print proof is copied into public assets or committed. Only the unchanged cover JPG is public. The $14.99 launch price is proposed, not approved. No invented refund policy, reviews, rankings, ISBN or guaranteed results are published.

## Environment setup

Use separate Vercel Preview and Production scopes, separate Stripe test/live keys, and an isolated preview database/private bucket. Never point sandbox migrations at the live database. See `.env.example` for names; never put secrets in `NEXT_PUBLIC_*`.

| Variable | Purpose |
| --- | --- |
| NXTG3N_DATABASE_URL | Existing preferred server-only Postgres URL; DATABASE_URL remains fallback |
| COMMERCE_ENABLED | `false` by default; `true` enables configuration lookup, not unconditional sales |
| COMMERCE_ORIGIN | Exact trusted origin, e.g. `https://your-preview.vercel.app`, no trailing slash |
| COMMERCE_PAYMENT_MODE | `test` by default; must match Stripe key and webhook mode |
| COMMERCE_LIVE_APPROVED | Must explicitly equal `true` before a live key is accepted |
| STRIPE_SECRET_KEY | `sk_test_…` for preview; never expose in browser code |
| STRIPE_WEBHOOK_SECRET | Signing secret for this environment’s endpoint |
| COMMERCE_DOWNLOAD_SECRET | At least 32 random characters from a password generator |
| SUPABASE_URL | Trusted HTTPS Supabase project origin |
| SUPABASE_SERVICE_ROLE_KEY | Server-only private Storage access key |
| COMMERCE_STORAGE_BUCKET | Private bucket; verify anonymous GET fails |
| RESEND_API_KEY, FORM_FROM_EMAIL | Existing Resend provider; use a verified sender |
| FORM_TO_EMAIL | Existing forms configuration; needed for checklist delivery |
| PLAYBOOK_EXCERPT_APPROVED | `true` only after approving the exact excerpt in playbook-content.ts |
| COMMERCE_MIGRATION_REVIEWED | Operator-only guard for commerce migration |
| TEST_COMMERCE_DATABASE_URL | Isolated disposable database for commerce integration tests |

1. Review `migrations/003_commerce.sql`, configure the **preview** database, set the migration guard in the operator environment and run `node --env-file-if-exists=.env.local scripts/migrate-commerce.mjs`. This migration does not run the separate media/roster migrations. RLS is enabled without anonymous policies; use a dedicated trusted server role and restrict dashboard access.
2. Provision a Supabase Storage **private** bucket. Upload the approved PDF under a versioned path such as `nil-power-playbook/v1/book.pdf`. Do not upload the working manuscript for public sale. Confirm its file checksum, type and content privately. A private bucket does not prevent an authorized buyer from redistributing a downloaded file.
3. Create a Stripe Product and a one-time USD Price. Set $14.99 only when approved. Ensure the price is exclusive of any unimplemented tax configuration; owner must determine applicable digital-goods tax requirements before launch. Checkout does not currently calculate automatic tax or apply promotion codes.
4. In the authenticated SQL dashboard, insert a row into `commerce_products` with id `nil-power-playbook`, Stripe `price_id`, integer `price_cents`, approved `file_version`, private `storage_path`, approved plain-text `refund_policy`, and `publication_approved=true`. Keep status `draft` until QA. Then set `active` in preview. Pricing is managed without code: create the new Stripe Price and update both `price_id` and `price_cents`. Existing orders keep their original snapshots. An unmatched Stripe amount/currency fails closed.
5. Register `/api/commerce/webhook` for `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`, `charge.refunded`, and `charge.dispute.created`. Preserve the raw request body. Use a Stripe snapshot endpoint compatible with the installed SDK. Register preview and production separately.
6. Enable preview commerce and run all sandbox tests below. Only after explicit owner approval, configure production keys, origin and live approval. Never merge as a substitute for approval.

## Fulfillment and recovery

Checkout stores a pending order with a server-side price/file snapshot. Only verified provider events change its state. Email outbox insertion is committed with the paid state. Duplicate events are unique in the audit ledger and also retry an outstanding email. Payment failure does not fulfill; success-page visits grant nothing. Full or partial refunds and new disputes revoke the entire book entitlement conservatively. Dispute resolution does not automatically reinstate access; an operator must review the outcome. Pending events never downgrade a paid order. Refund/dispute events arriving before paid events remain terminal for access.

Confirmation email requests use a stable body and Resend idempotency key. Automatic retries stop after 23 hours to remain inside Resend’s 24-hour idempotency window. Inspect provider delivery logs before manual recovery. Do not change sender/origin/signing secret while retrying the same key. A delivery timeout may mean the message was sent: retry the same key within the window, never blindly send a new one.

Run `node --env-file-if-exists=.env.local --import tsx scripts/retry-commerce.ts` in an authorized operator environment to retry up to 20 recent pending confirmations. Stripe retries also trigger this path. No public admin or cron endpoint is exposed. Add this command to an approved private scheduler after operational ownership is established. Inspect pending confirmations daily until scheduled monitoring is connected.

For expired links, verify the buyer against the Stripe receipt/customer email privately. In one transaction lock the paid order, increment `token_version`, reset `download_count` only if appropriate, and set its outbox row to `pending`, `created_at=now()`, `sent_at=NULL`; then retry confirmation. This revokes prior links and generates a fresh idempotency key. Never send raw tokens through support logs. Refund in Stripe; the verified event updates access. Disputes require dashboard review. Do not reinstate a refunded order by editing its state.

The email link carries an expiring capability in its fragment. Fragments do not reach server access logs. The download page clears the fragment and submits it in a POST body. Never log bodies at the application, proxy or analytics layer. No public analytics mount on initial visits to private download/confirmation pages. Native PDF responses use private/no-store, no-referrer, noindex and attachment headers. Each request checks payment state, token version and an atomic maximum of ten downloads. A storage-fetch failure restores the reserved allowance; an interrupted transfer after headers may consume an attempt. Link expiry is 72 hours from outbox creation. Key rotation invalidates existing links; provide recovery.

## Leads and email consent

Checklist is available freely at `/resources/nil-readiness-checklist`, including for younger readers. Email requests require confirmation of age 18+; minors are directed to a parent/guardian. Store only first name, email, audience, checkbox consent, consent-text version and timestamp. No sport, school or sensitive athlete data is requested. Marketing checkbox starts unchecked and is independent of delivery. Purchases never create marketing subscriptions.

The requested promotional sequence is **not activated**. Recorded consent alone does not start campaigns. Before connecting it, approve provider access, sender details, postal address, consent retention, suppression synchronization and an unsubscribe mechanism. Honor manual unsubscribe requests at the published support email immediately; keep a suppression record and never import suppressed contacts. Delete checklist data under the existing privacy policy and establish a retention schedule before launch.

Proposed sequence for approved opt-ins only: immediate checklist delivery (implemented transactionally), preparation mistakes, book introduction, athlete brand framework, then an invitation to education/development services. Draft campaign copy and automation require owner review; no NIL outcomes are promised.

## Analytics and content

Existing Vercel analytics emits `book_product_view` (page mount), `book_preview_click` (preview anchor), `book_checkout_start` (successful session creation in browser), `book_checklist_signup` (successful checklist email) and `book_resource_click` (book-page tool/service links). Properties contain only product ID or audience category. No email, order ID, private link, token or card detail is sent. No purchase event fires from the success page. Confirmed sales/revenue are available from `commerce_sales_metrics`, order ledger and Stripe, avoiding false client purchase attribution. Checkout conversion can compare session starts and confirmed orders; provider and analytics reporting will differ because of blocking or incomplete navigation.

Existing site analytics supplies organic landing and campaign reports. Persistent UTM-to-order and email-to-purchase attribution are not implemented; do not claim those reports exist. Add a consent-reviewed allowlist of campaign codes before introducing attribution persistence. Never pass arbitrary UTM content or customer identifiers through custom events.

Reuse these existing guides rather than publish duplicates: `nil-fundamentals-for-student-athletes` for families/college NIL; `athlete-personal-brand-development-guide` for branding; `nil-contract-and-usage-rights-checklist` for sponsorship questions. Book recommendations are integrated into resource guides, Resource Center, homepage, services and Store. Athlete profiles are untouched.

## Product management and future products

Editorial metadata, cover, descriptions and SEO live in `src/data/digital-products.ts`; no CMS exists. Operational status, price, refund terms and private file versions live in Postgres. Use authorized Stripe and database dashboards for orders, refunds, failures and sales metrics. Do not expose server-role credentials to any client admin UI. Stripe’s dashboard can issue refunds; discount codes are intentionally not enabled until discount/amount validation is designed.

To add a future product, add its editorial record, configure its Stripe Price and private file, then extend the server-side allowlist/lookup and landing route. This initial checkout only accepts `nil-power-playbook`; adding a row alone does not make an arbitrary product sellable. Keep public marketing data separate from private storage paths. Bundles and courses are future configuration, not launched functionality.

## Owner launch checklist

- Approve final PDF/version, artwork, price, exact excerpt, refund terms and support process.
- Complete independent publication reviews and proof approval identified in the supplied manuscript.
- Verify tax obligations, customer terms, privacy/retention and email sender requirements.
- Apply the commerce migration to preview; provision private storage and verify anonymous denial.
- Connect test Stripe and email credentials; verify success, failure, duplicate/pending events, refunds, disputes, expired links, max-download behavior and recovery.
- Review desktop/mobile layout, keyboard access, metadata, schema, sitemap and regression checks.
- Configure monitoring for pending orders/outbox and event failures; schedule safe retries privately.
- Approve the PR/preview, then separately approve production deployment and live activation.

## Rollback

Set `COMMERCE_ENABLED=false` and product status `draft` to stop new purchases. Keep webhook handling enabled for already-paid orders, refunds and outstanding confirmations. Do not rotate the download key or remove private files if existing customers still need access. Revert only the book feature commits for a UI rollback after taking a database backup; leave additive commerce tables intact for accounting and fulfillment. A full code rollback removes delivery routes, so first arrange an alternate customer delivery/support process. Never drop order/event tables as routine rollback.

Provider references: [Stripe fulfillment](https://docs.stripe.com/checkout/fulfillment), [Resend idempotency window](https://resend.com/docs/dashboard/emails/idempotency-keys), [Supabase private buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals).
