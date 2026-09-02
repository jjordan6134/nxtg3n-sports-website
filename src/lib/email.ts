import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FALLBACK_EMAIL = "nxtgnsportstalentagencyllc@gmail.com";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

type EmailPayload = {
  to?: string[];
  subject: string;
  replyTo?: string;
  html: string;
  text: string;
  successMessage?: string;
  operation?: string;
  successData?: Record<string, string>;
};

const RESEND_USER_AGENT = "NXTG3N-Website/1.0";

function getResendHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "User-Agent": RESEND_USER_AGENT,
  };
}

async function logResendFailure(operation: string, response: Response | null, errorCode = "network_error") {
  let errorName = "unknown";
  let responseCode = errorCode;
  if (response) {
    try {
      const payload = await response.clone().json() as { name?: unknown; code?: unknown };
      if (typeof payload.name === "string") errorName = payload.name.slice(0, 100);
      if (typeof payload.code === "string") responseCode = payload.code.slice(0, 100);
    } catch {
      // Keep provider response details out of logs when the body is not safe JSON.
    }
  }
  console.error("Resend request failed", { operation, status: response?.status ?? "network_error", errorName, errorCode: responseCode });
}

export function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

export function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FORM_TO_EMAIL;
  const from = process.env.FORM_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return null;
  }

  return { apiKey, to, from };
}

export async function sendFormEmail(payload: EmailPayload) {
  const config = getEmailConfig();

  if (!config) {
    return NextResponse.json(
      { error: `Email delivery is not configured. Please email ${FALLBACK_EMAIL}.` },
      { status: 503 },
    );
  }

  let response: Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: getResendHeaders(config.apiKey),
      body: JSON.stringify({
        from: config.from,
        to: payload.to ?? [config.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
    });
  } catch {
    await logResendFailure(payload.operation ?? "send_email", null);
    return NextResponse.json(
      { error: `We could not reach email delivery. Please email ${FALLBACK_EMAIL}.` },
      { status: 500 },
    );
  }

  if (!response.ok) {
    await logResendFailure(payload.operation ?? "send_email", response);
    return NextResponse.json(
      { error: `We could not deliver your message. Please email ${FALLBACK_EMAIL}.` },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: payload.successMessage ?? "Thanks for reaching out. NXTG3N will be in touch soon.", ...payload.successData });
}

export async function syncNewsletterContact(email: string, firstName?: string) {
  const config = getEmailConfig();
  if (!config) return { ok: false as const, response: NextResponse.json({ error: "Newsletter delivery is not configured. Please try again later." }, { status: 503 }) };

  const headers = getResendHeaders(config.apiKey);
  const contactUrl = `https://api.resend.com/contacts/${encodeURIComponent(email)}`;
  let existingResponse: Response;
  try {
    existingResponse = await fetch(contactUrl, { headers });
  } catch {
    await logResendFailure("retrieve_newsletter_contact", null);
    return { ok: false as const, response: NextResponse.json({ error: "We could not reach newsletter delivery. Please try again later." }, { status: 500 }) };
  }

  const contactProperties = firstName ? { first_name: firstName } : {};
  if (existingResponse.ok) {
    let updateResponse: Response;
    try {
      updateResponse = await fetch(contactUrl, { method: "PATCH", headers, body: JSON.stringify({ unsubscribed: false, ...contactProperties }) });
    } catch {
      await logResendFailure("update_newsletter_contact", null);
      return { ok: false as const, response: NextResponse.json({ error: "We could not update your newsletter subscription. Please try again later." }, { status: 500 }) };
    }
    if (!updateResponse.ok) await logResendFailure("update_newsletter_contact", updateResponse);
    if (!updateResponse.ok) return { ok: false as const, response: NextResponse.json({ error: "We could not update your newsletter subscription. Please try again later." }, { status: 500 }) };
    return { ok: true as const, isNew: false };
  }

  if (existingResponse.status !== 404) {
    await logResendFailure("retrieve_newsletter_contact", existingResponse);
    return { ok: false as const, response: NextResponse.json({ error: "We could not verify your newsletter subscription. Please try again later." }, { status: 502 }) };
  }

  let createResponse: Response;
  try {
    createResponse = await fetch("https://api.resend.com/contacts", { method: "POST", headers, body: JSON.stringify({ email, unsubscribed: false, ...contactProperties }) });
  } catch {
    await logResendFailure("create_newsletter_contact", null);
    return { ok: false as const, response: NextResponse.json({ error: "We could not complete your newsletter subscription. Please try again later." }, { status: 500 }) };
  }
  if (createResponse.ok) return { ok: true as const, isNew: true };
  if (createResponse.status === 409) return { ok: true as const, isNew: false };
  await logResendFailure("create_newsletter_contact", createResponse);
  return { ok: false as const, response: NextResponse.json({ error: "We could not complete your newsletter subscription. Please try again later." }, { status: 500 }) };
}
