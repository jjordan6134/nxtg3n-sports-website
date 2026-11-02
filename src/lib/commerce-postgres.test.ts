import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import postgres from "postgres";
import type Stripe from "stripe";
import { commerceDb, processStripeEvent, downloadBook } from "./commerce";
import { signDownload } from "./commerce-security";

test("isolated Postgres: duplicate webhooks, failure, revocation and download authorization", { skip: !process.env.TEST_COMMERCE_DATABASE_URL && "TEST_COMMERCE_DATABASE_URL must name an isolated disposable test database" }, async () => {
  const url = process.env.TEST_COMMERCE_DATABASE_URL!;
  process.env.NXTG3N_DATABASE_URL = url;
  process.env.STRIPE_SECRET_KEY = "sk_test_placeholder";
  process.env.COMMERCE_PAYMENT_MODE = "test";
  process.env.COMMERCE_ORIGIN = "https://example.com";
  process.env.RESEND_API_KEY = "test-placeholder";
  process.env.FORM_FROM_EMAIL = "test@example.com";
  process.env.COMMERCE_DOWNLOAD_SECRET = "test-only-download-signing-secret-longer-than-32";
  const sql = postgres(url, { ssl: "require", max: 2 });
  const originalFetch = globalThis.fetch;
  let sends = 0;
  globalThis.fetch = async () => { sends++; return Response.json({ id: "test-message" }); };
  const product = `test-${randomUUID()}`;
  const paidId = randomUUID(); const failedId = randomUUID();
  try {
    await sql.unsafe(await readFile("migrations/003_commerce.sql", "utf8"));
    await sql`INSERT INTO commerce_products(id,price_id,price_cents,file_version,storage_path) VALUES(${product},'price_test',1499,'test','test.pdf')`;
    for (const id of [paidId,failedId]) await sql`INSERT INTO commerce_orders(id,product_id,price_id,amount,file_version,storage_path) VALUES(${id},${product},'price_test',1499,'test','test.pdf')`;
    function event(id: string, orderId: string, type: string, payment_status: string) {
      return { id, type, livemode: false, data: { object: { id: `cs_${orderId}`, metadata: { order_id: orderId }, payment_status, mode: "payment", amount_total: 1499, currency: "usd", customer_details: { email: "buyer@example.com" }, payment_intent: `pi_${orderId}` } } } as unknown as Stripe.Event;
    }
    const paid = event(`evt_${randomUUID()}`,paidId,"checkout.session.completed","paid");
    await Promise.all([processStripeEvent(paid),processStripeEvent(paid)]);
    assert.equal(sends,1);
    const [ledger] = await sql`SELECT count(*)::integer AS count FROM commerce_events WHERE order_id=${paidId}`;
    assert.equal(ledger.count,1);
    await processStripeEvent(event(`evt_${randomUUID()}`,failedId,"checkout.session.async_payment_failed","unpaid"));
    assert.equal(sends,1);
    assert.equal((await sql`SELECT status FROM commerce_orders WHERE id=${failedId}`)[0].status,"failed");
    assert.equal((await downloadBook("forged")).status,403);
    const secret = process.env.COMMERCE_DOWNLOAD_SECRET;
    assert.equal((await downloadBook(signDownload(failedId,1,secret))).status,403);
    await sql`UPDATE commerce_orders SET status='refunded',token_version=token_version+1 WHERE id=${paidId}`;
    assert.equal((await downloadBook(signDownload(paidId,1,secret))).status,403);
    await processStripeEvent(event(`evt_${randomUUID()}`,paidId,"checkout.session.async_payment_succeeded","paid"));
    assert.equal((await sql`SELECT status FROM commerce_orders WHERE id=${paidId}`)[0].status,"refunded");
    assert.equal(sends,1);
  } finally {
    globalThis.fetch = originalFetch;
    await sql`DELETE FROM commerce_outbox WHERE order_id IN (${paidId},${failedId})`;
    await sql`DELETE FROM commerce_events WHERE order_id IN (${paidId},${failedId})`;
    await sql`DELETE FROM commerce_orders WHERE product_id=${product}`;
    await sql`DELETE FROM commerce_products WHERE id=${product}`;
    await sql.end();
    await commerceDb().end();
  }
});
