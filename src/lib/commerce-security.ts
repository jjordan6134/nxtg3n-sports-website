import { createHmac, timingSafeEqual, createHash } from "node:crypto";

export function signDownload(orderId: string, version: number, secret: string, now = Date.now()) {
  const body = Buffer.from(JSON.stringify({ id: orderId, v: version, exp: Math.floor(now / 1000) + 72 * 3600 })).toString("base64url");
  return `${body}.${createHmac("sha256", secret).update(body).digest("base64url")}`;
}
export function verifyDownload(token: string, secret: string, now = Date.now()): { id: string; v: number } | null {
  try {
    if (!secret || token.length > 1000) return null;
    const [body, signature, extra] = token.split(".");
    if (extra || !body || !signature) return null;
    const expected = createHmac("sha256", secret).update(body).digest();
    const actual = Buffer.from(signature, "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const value = JSON.parse(Buffer.from(body, "base64url").toString());
    if (!/^[0-9a-f-]{36}$/.test(value.id) || !Number.isInteger(value.v) || !Number.isInteger(value.exp) || value.exp <= now / 1000) return null;
    return { id: value.id, v: value.v };
  } catch { return null; }
}
export function rateKey(request: Request, scope: string) {
  return createHash("sha256").update(`${scope}:${request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"}`).digest("hex");
}
export function sameOrigin(request: Request, origin: string) { return request.headers.get("origin") === origin; }
export const privateHeaders = { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex, nofollow" };
