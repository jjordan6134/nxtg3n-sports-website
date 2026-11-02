# Playbook QA report

Executed November 1–2, 2026 (America/Phoenix).

| Check | Actual result |
| --- | --- |
| Production build, Next.js 16.4.3 | PASS: compilation, TypeScript and 80 generated pages |
| ESLint | PASS after fixing analytics imports and download initialization |
| Staged PR source tests, lint and TypeScript | PASS: 7 passed, 1 database integration skipped; no media-monitor files required |
| Staged PR production build | PASS: webpack build, 78 generated pages; Turbopack cannot follow this review-only external dependency junction |
| Full existing + commerce unit suite | 21 passed, 0 failed, 2 database integration tests skipped |
| Production npm audit | PASS: 0 vulnerabilities after Next.js, Zod and compatible transitive updates |
| All dependency audit | Development dependency advisories remain; production result is not an all-dependencies clean bill |
| Local production HTTP checks | PASS: book, Store, checklist, resources, services, homepage, sitemap, download and success return 200 |
| Unconfigured commerce endpoints | PASS: checkout/download/lead return 503, unsigned webhook returns 400 |
| Metadata/SEO assertions | PASS: canonical, sitemap entries, no available Offer or fake ratings while sales closed, unapproved excerpt not rendered |
| Download analytics assertion | PASS: no GA source on initial private download page |
| Paid manuscript exposure | No PDF/DOCX/EPUB copied into public or git; only JPG cover added |
| Visual mobile/tablet/desktop | NOT COMPLETED: in-app browser could not reach the sandbox server; native Computer Use stopped because it could not confidently verify the browser URL |
| Real Stripe payment/wallet/failed/pending/refund/dispute flow | NOT RUN: no Stripe sandbox keys or webhook secret |
| Commerce Postgres concurrency/idempotency test | SKIPPED: no isolated TEST_COMMERCE_DATABASE_URL; do not use the existing site database as a disposable test DB |
| Private storage downloads, expiration in real browser, email delivery/rendering | NOT RUN: storage and Resend credentials unavailable |
| Keyboard/screen reader, contrast, Core Web Vitals, social preview validator | NOT RUN: browser verification remains an owner launch dependency |

Reproduce with `npm run lint`, `npm test`, `npx tsc --noEmit`, `npm run build`, and `npm audit --omit=dev`. Run the production server on port 3100 then `node scripts/verify-playbook-http.mjs` with commerce/excerpt defaults off. For preview set PLAYBOOK_QA_ORIGIN to its HTTPS origin; deployment protection may require an approved bypass mechanism.

New unit tests cover token tampering/expiry/wrong keys, payment amount/currency/session/mode mismatch, raw-body webhook signatures including stale signatures, live-mode approval guards and strict request origins. The opt-in real Postgres test covers concurrent duplicate event handling, one confirmation, failed payment, unauthorized access and refund revocation. A skipped test is not evidence of a passing integration.

No production database migration or live payment activation was performed. Sandbox payment tests, visual QA and final publication/customer-term approval remain required before launch.
