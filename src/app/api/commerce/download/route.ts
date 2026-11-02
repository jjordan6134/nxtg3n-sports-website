import { allowRequest, commerceOrigin, downloadBook } from "@/lib/commerce";
import { privateHeaders, sameOrigin } from "@/lib/commerce-security";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    if (!sameOrigin(request, commerceOrigin())) return new Response(null, { status: 403, headers: privateHeaders });
    if (!await allowRequest(request, "download", 20)) return Response.json({ error: "Please wait before trying again." }, { status: 429, headers: privateHeaders });
    const body = await request.text();
    if (body.length > 2000) return new Response(null, { status: 413, headers: privateHeaders });
    const token = new URLSearchParams(body).get("token") || "";
    return await downloadBook(token);
  } catch { return Response.json({ error: "Download unavailable. Please contact NXTG3N support." }, { status: 503, headers: privateHeaders }); }
}
