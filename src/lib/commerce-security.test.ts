import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import Stripe from "stripe";
import { signDownload, verifyDownload, sameOrigin, rateKey } from "./commerce-security";
import { paymentCanFulfill, stripeClient } from "./commerce";

const secret = "test-only-secret-longer-than-thirty-two-characters";
const now = 1800000000000;
test("signed download rejects forgery, expiry, malformed tokens and wrong secret", () => {
  const id = randomUUID(); const token = signDownload(id, 2, secret, now);
  assert.deepEqual(verifyDownload(token, secret, now), { id, v: 2 });
  assert.equal(verifyDownload(token, secret, now+72*3600*1000), null);
  assert.equal(verifyDownload(token, "wrong", now), null);
  assert.equal(verifyDownload(token+".extra", secret, now), null);
  const [body,sig] = token.split(".");
  assert.equal(verifyDownload(body+"x."+sig,secret,now),null);
  for (const value of ["", "x", "a.b", "a".repeat(1200)]) assert.equal(verifyDownload(value,secret,now),null);
});
test("confirmed payment must match amount, currency, session and payment mode", () => {
  const order = { amount: 1499, currency: "usd", session_id: "cs_test_one" };
  const paid = { id: "cs_test_one", amount_total: 1499, currency: "usd", payment_status: "paid", mode: "payment" };
  assert.equal(paymentCanFulfill(order, paid), true);
  for (const override of [{amount_total:1},{currency:"eur"},{payment_status:"unpaid"},{id:"cs_other"},{mode:"subscription"}]) assert.equal(paymentCanFulfill(order,{...paid,...override}), false);
});
test("Stripe verifies exact raw body and rejects forged and stale webhook signatures", () => {
  const stripe = new Stripe("sk_test_placeholder");
  const payload = JSON.stringify({ id: "evt_test", type: "checkout.session.completed", data: { object: {} } });
  const header = stripe.webhooks.generateTestHeaderString({ payload, secret });
  assert.equal(stripe.webhooks.constructEvent(payload,header,secret).id,"evt_test");
  assert.throws(() => stripe.webhooks.constructEvent(payload+" ",header,secret));
  assert.throws(() => stripe.webhooks.constructEvent(payload,header,"wrong"));
  const old = stripe.webhooks.generateTestHeaderString({ payload, secret, timestamp: 1 });
  assert.throws(() => stripe.webhooks.constructEvent(payload,old,secret));
});
test("live payment keys fail closed without explicit approval", () => {
  const original = { key: process.env.STRIPE_SECRET_KEY, mode: process.env.COMMERCE_PAYMENT_MODE, approved: process.env.COMMERCE_LIVE_APPROVED };
  try {
    process.env.STRIPE_SECRET_KEY="sk_live_placeholder"; process.env.COMMERCE_PAYMENT_MODE="test";
    assert.throws(stripeClient);
    process.env.COMMERCE_PAYMENT_MODE="live"; delete process.env.COMMERCE_LIVE_APPROVED;
    assert.throws(stripeClient);
  } finally {
    for (const [key,value] of Object.entries({ STRIPE_SECRET_KEY: original.key, COMMERCE_PAYMENT_MODE: original.mode, COMMERCE_LIVE_APPROVED: original.approved })) { if (value===undefined) delete process.env[key]; else process.env[key]=value; }
  }
});
test("origin checks are strict and rate-limit keys contain no raw IP address", () => {
  const request = new Request("https://example.com", { headers: { origin: "https://example.com", "x-forwarded-for": "192.0.2.1" } });
  assert.equal(sameOrigin(request,"https://example.com"),true);
  assert.equal(sameOrigin(request,"https://attacker.example"),false);
  assert.match(rateKey(request,"checkout"),/^[a-f0-9]{64}$/);
  assert.notEqual(rateKey(request,"checkout"),rateKey(request,"lead"));
});
