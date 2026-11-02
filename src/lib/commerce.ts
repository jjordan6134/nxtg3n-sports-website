import Stripe from "stripe";
import postgres from "postgres";
import { randomUUID } from "node:crypto";
import { playbook } from "@/data/digital-products";
import { escapeHtml } from "@/lib/email";
import { privateHeaders, rateKey, signDownload, verifyDownload } from "./commerce-security";

let db: ReturnType<typeof postgres> | undefined;
export function commerceDb() {
  const url = process.env.NXTG3N_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) throw new Error("Commerce database unavailable");
  return db ??= postgres(url, { ssl: "require", max: 3, prepare: false });
}
export function commerceOrigin() {
  const value = process.env.COMMERCE_ORIGIN;
  if (!value || new URL(value).origin !== value || (!value.startsWith("https://") && !value.startsWith("http://localhost:"))) throw new Error("Commerce origin unavailable");
  return value;
}
export function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  const mode = process.env.COMMERCE_PAYMENT_MODE || "test";
  if (!key || !["test", "live"].includes(mode) || !key.startsWith(mode === "live" ? "sk_live_" : "sk_test_") || (mode === "live" && process.env.COMMERCE_LIVE_APPROVED !== "true")) throw new Error("Payment mode unavailable");
  return new Stripe(key, { maxNetworkRetries: 2, timeout: 15000 });
}
export type ProductConfig = { id: string; price_id: string; price_cents: number; status: string; file_version: string; storage_path: string; publication_approved: boolean; refund_policy: string };
export async function getPlaybookOffer() {
  const fallback = { cents: playbook.priceCents, available: false, refundPolicy: "The refund policy will be published before sales open. Questions? Contact NXTG3N support." };
  if (process.env.COMMERCE_ENABLED !== "true") return fallback;
  try {
    const [p] = await commerceDb()<ProductConfig[]>`SELECT * FROM commerce_products WHERE id=${playbook.id}`;
    const available = Boolean(p && p.status === "active" && p.publication_approved && p.refund_policy.trim() && process.env.STRIPE_SECRET_KEY && process.env.RESEND_API_KEY && process.env.FORM_FROM_EMAIL && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.COMMERCE_STORAGE_BUCKET && (process.env.COMMERCE_DOWNLOAD_SECRET?.length || 0) >= 32);
    if (available) { stripeClient(); commerceOrigin(); }
    return p ? { cents: p.price_cents, available, refundPolicy: p.refund_policy || fallback.refundPolicy } : fallback;
  } catch { return fallback; }
}
export async function allowRequest(request: Request, scope: string, limit = 10) {
  const sql = commerceDb();
  const key = rateKey(request, scope);
  const [row] = await sql`INSERT INTO commerce_rate_limits(key,hits,expires_at) VALUES(${key},1,now()+interval '10 minutes')
    ON CONFLICT(key) DO UPDATE SET hits=CASE WHEN commerce_rate_limits.expires_at<now() THEN 1 ELSE commerce_rate_limits.hits+1 END,
    expires_at=CASE WHEN commerce_rate_limits.expires_at<now() THEN now()+interval '10 minutes' ELSE commerce_rate_limits.expires_at END RETURNING hits`;
  return row.hits <= limit;
}
export async function createCheckout() {
  const offer = await getPlaybookOffer();
  if (!offer.available) throw new Error("Sales are not open");
  const sql = commerceDb();
  const [p] = await sql<ProductConfig[]>`SELECT * FROM commerce_products WHERE id=${playbook.id}`;
  if (!p || p.status !== "active" || !p.publication_approved || !p.refund_policy.trim()) throw new Error("Product unavailable");
  const stripe = stripeClient();
  const price = await stripe.prices.retrieve(p.price_id);
  if (!price.active || price.currency !== "usd" || price.unit_amount !== p.price_cents || price.recurring || price.type !== "one_time") throw new Error("Price configuration mismatch");
  const id = randomUUID();
  await sql`INSERT INTO commerce_orders(id,product_id,price_id,amount,file_version,storage_path) VALUES(${id},${p.id},${p.price_id},${p.price_cents},${p.file_version},${p.storage_path})`;
  const origin = commerceOrigin();
  const session = await stripe.checkout.sessions.create({ mode: "payment", line_items: [{ price: p.price_id, quantity: 1 }],
    client_reference_id: id, metadata: { order_id: id, product_id: p.id }, payment_intent_data: { metadata: { order_id: id } },
    success_url: `${origin}/nil-power-playbook/success`, cancel_url: `${origin}/nil-power-playbook?checkout=canceled`,
    custom_text: { submit: { message: p.refund_policy.slice(0, 1200) } },
  }, { idempotencyKey: `checkout-${id}` });
  await sql`UPDATE commerce_orders SET session_id=${session.id},updated_at=now() WHERE id=${id}`;
  if (!session.url || new URL(session.url).hostname !== "checkout.stripe.com") throw new Error("Hosted checkout unavailable");
  return session.url;
}
type Order = { id: string; email: string; status: string; token_version: number; download_count: number; storage_path: string; file_version: string; amount: number; currency: string; session_id: string | null; payment_intent: string | null };
export function paymentCanFulfill(order: Pick<Order,"amount"|"currency"|"session_id">, session: { id: string; amount_total: number | null; currency: string | null; payment_status: string; mode: string | null }) {
  return session.mode === "payment" && session.payment_status === "paid" && session.amount_total === order.amount && session.currency === order.currency && (!order.session_id || order.session_id === session.id);
}
export async function processStripeEvent(event: Stripe.Event) {
  if (event.livemode !== (process.env.COMMERCE_PAYMENT_MODE === "live")) throw new Error("Event mode mismatch");
  const sql = commerceDb();
  const stripe = stripeClient();
  let orderId: string | undefined;
  let state: "paid" | "failed" | "refunded" | "disputed" | undefined;
  let session: Stripe.Checkout.Session | undefined;
  if (["checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed", "checkout.session.expired"].includes(event.type)) {
    session = event.data.object as Stripe.Checkout.Session;
    orderId = session.metadata?.order_id;
    state = ["checkout.session.async_payment_failed", "checkout.session.expired"].includes(event.type) ? "failed" : session.payment_status === "paid" ? "paid" : undefined;
  } else if (event.type === "charge.refunded" || event.type === "charge.dispute.created") {
    const object = event.data.object as Stripe.Charge | Stripe.Dispute;
    const charge = event.type === "charge.refunded" ? object as Stripe.Charge : await stripe.charges.retrieve((object as Stripe.Dispute).charge as string);
    const intentId = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
    if (intentId) { const intent = await stripe.paymentIntents.retrieve(intentId); orderId = intent.metadata.order_id; }
    state = event.type === "charge.refunded" ? "refunded" : "disputed";
  } else return;
  if (!orderId || !/^[0-9a-f-]{36}$/.test(orderId)) return;
  await sql.begin(async tx => {
    const [order] = await tx<Order[]>`SELECT * FROM commerce_orders WHERE id=${orderId!} FOR UPDATE`;
    if (!order) throw new Error("Unknown order");
    const inserted = await tx`INSERT INTO commerce_events(id,event_type,order_id) VALUES(${event.id},${event.type},${orderId!}) ON CONFLICT DO NOTHING RETURNING id`;
    if (!inserted.length || !state) return;
    if (state === "paid") {
      if (!session || !paymentCanFulfill(order, session)) throw new Error("Payment does not match order");
      const email = session.customer_details?.email;
      if (!email) throw new Error("Buyer email missing");
      if (["refunded","disputed"].includes(order.status)) return;
      const intent = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || null;
      await tx`UPDATE commerce_orders SET status='paid', email=${email},session_id=${session.id},payment_intent=${intent},updated_at=now() WHERE id=${orderId!}`;
      await tx`INSERT INTO commerce_outbox(order_id) VALUES(${orderId!}) ON CONFLICT DO NOTHING`;
    } else if (state === "failed") {
      await tx`UPDATE commerce_orders SET status='failed',updated_at=now() WHERE id=${orderId!} AND status='pending'`;
    } else {
      await tx`UPDATE commerce_orders SET status=${state},token_version=token_version+1,updated_at=now() WHERE id=${orderId!}`;
      await tx`UPDATE commerce_outbox SET status='canceled' WHERE order_id=${orderId!} AND status!='sent'`;
    }
  });
  // A duplicate webhook also retries an outstanding confirmation; never short circuit it.
  await deliverConfirmation(orderId);
}
export async function deliverConfirmation(orderId: string) {
  const sql = commerceDb();
  const failed = await sql.begin(async tx => {
    const [order] = await tx<Order[]>`SELECT * FROM commerce_orders WHERE id=${orderId} FOR UPDATE`;
    const [outbox] = await tx`SELECT * FROM commerce_outbox WHERE order_id=${orderId} FOR UPDATE`;
    if (!order || order.status !== "paid" || !outbox || outbox.status === "sent" || outbox.status === "canceled") return;
    if ((process.env.COMMERCE_DOWNLOAD_SECRET?.length || 0) < 32) throw new Error("Download signing unavailable");
    // Stable payload across retries: Resend rejects changed bodies under the same key.
    // Beyond its 24-hour idempotency window, require an operator to inspect delivery first.
    if (Date.now() - new Date(outbox.created_at).getTime() > 23 * 3600 * 1000) return true;
    const token = signDownload(orderId, order.token_version, process.env.COMMERCE_DOWNLOAD_SECRET!, new Date(outbox.created_at).getTime());
    const link = `${commerceOrigin()}/nil-power-playbook/download#${token}`;
    const safeLink = escapeHtml(link);
    if (!process.env.RESEND_API_KEY || !process.env.FORM_FROM_EMAIL) throw new Error("Email unavailable");
    const response = await fetch("https://api.resend.com/emails", { method: "POST", signal: AbortSignal.timeout(15000), headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `book-${orderId}-v${order.token_version}` },
      body: JSON.stringify({ from: process.env.FORM_FROM_EMAIL, to: [order.email], subject: "Your NXTG3N NIL Power Playbook",
        html: `<div style="background:#101722;color:#ffffff;padding:32px;font-family:Arial"><p style="color:#e5c58b">EDUCATION · EMPOWERMENT · PROTECTION</p><h1>Your game plan is ready.</h1><p>Thank you for purchasing The NIL Power Playbook.</p><p><a style="color:#e5c58b" href="${safeLink}">Download your PDF edition</a></p><p>Your link expires in 72 hours and allows up to 10 downloads. Keep it private.</p><p>Order: ${orderId}</p><p>For link recovery or order support: nxtgnsportstalentagencyllc@gmail.com</p></div>`,
        text: `Thank you for purchasing The NIL Power Playbook.\nDownload: ${link}\nExpires in 72 hours; up to 10 downloads. Keep this link private.\nOrder: ${orderId}\nSupport: nxtgnsportstalentagencyllc@gmail.com` }) });
    await tx`UPDATE commerce_outbox SET attempts=attempts+1,status=${response.ok ? "sent" : "pending"},sent_at=${response.ok ? new Date() : null} WHERE order_id=${orderId}`;
    return !response.ok;
  });
  if (failed) throw new Error("Confirmation delivery requires retry or operator review");
}
export async function downloadBook(token: string) {
  const claim = verifyDownload(token, process.env.COMMERCE_DOWNLOAD_SECRET || "");
  if (!claim) return Response.json({ error: "Invalid or expired access. Contact support to recover your purchase." }, { status: 403, headers: privateHeaders });
  const sql = commerceDb();
  // Reserve one download atomically. Revocation and counts are checked for every request.
  const [order] = await sql<Order[]>`UPDATE commerce_orders SET download_count=download_count+1 WHERE id=${claim.id} AND status='paid' AND token_version=${claim.v} AND download_count<${playbook.fulfillment.maxDownloads} RETURNING *`;
  if (!order) return Response.json({ error: "Access unavailable. Contact support with your order reference." }, { status: 403, headers: privateHeaders });
  try {
    const base = process.env.SUPABASE_URL;
    const bucket = process.env.COMMERCE_STORAGE_BUCKET;
    if (!base?.startsWith("https://") || !bucket || !process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("Private storage unavailable");
    const path = order.storage_path.split("/").map(encodeURIComponent).join("/");
    const file = await fetch(`${base}/storage/v1/object/authenticated/${encodeURIComponent(bucket)}/${path}`, { headers: { Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, apikey: process.env.SUPABASE_SERVICE_ROLE_KEY }, cache: "no-store", signal: AbortSignal.timeout(20000) });
    if (!file.ok || !file.body) throw new Error("Private file unavailable");
    return new Response(file.body, { headers: { ...privateHeaders, "Content-Type": "application/pdf", "Content-Disposition": 'attachment; filename="NXTG3N-NIL-Power-Playbook.pdf"', "X-Content-Type-Options": "nosniff" } });
  } catch {
    await sql`UPDATE commerce_orders SET download_count=GREATEST(download_count-1,0) WHERE id=${claim.id}`;
    return Response.json({ error: "Delivery is temporarily unavailable. Your download allowance was restored. Please retry." }, { status: 503, headers: privateHeaders });
  }
}
