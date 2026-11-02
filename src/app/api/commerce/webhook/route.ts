import { stripeClient, processStripeEvent } from "@/lib/commerce";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return Response.json({ error: "Webhook unavailable." }, { status: 400 });
  let event;
  try {
    const raw = await request.text();
    if (raw.length > 1024 * 1024) return new Response(null, { status: 413 });
    event = stripeClient().webhooks.constructEvent(raw, signature, secret);
  } catch { return Response.json({ error: "Invalid webhook signature." }, { status: 400 }); }
  try { await processStripeEvent(event); return Response.json({ received: true }); }
  catch { console.error("Commerce webhook requires retry", { eventId: event.id, type: event.type }); return Response.json({ error: "Retry required." }, { status: 500 }); }
}
