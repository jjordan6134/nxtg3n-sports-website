import { allowRequest, commerceOrigin, createCheckout } from "@/lib/commerce";
import { sameOrigin, privateHeaders } from "@/lib/commerce-security";
import { playbook } from "@/data/digital-products";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    if (!sameOrigin(request, commerceOrigin())) return Response.json({ error: "Invalid request origin." }, { status: 403 });
    if (!await allowRequest(request, "checkout")) return Response.json({ error: "Please wait before trying again." }, { status: 429 });
    const body = await request.text();
    if (body.length > 500) return Response.json({ error: "Invalid product request." }, { status: 400 });
    const payload = JSON.parse(body);
    if (payload.productId !== playbook.id || Object.keys(payload).some(key => key !== "productId")) return Response.json({ error: "Invalid product request." }, { status: 400 });
    return Response.json({ url: await createCheckout() }, { headers: privateHeaders });
  } catch { return Response.json({ error: "Checkout is not available yet. Please explore the free resources or contact support." }, { status: 503, headers: privateHeaders }); }
}
