import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FALLBACK_EMAIL = "nxtgnsportstalentagencyllc@gmail.com";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

type EmailPayload = {
  subject: string;
  replyTo?: string;
  html: string;
  text: string;
  successMessage?: string;
};

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
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
    });
  } catch {
    return NextResponse.json(
      { error: `We could not reach email delivery. Please email ${FALLBACK_EMAIL}.` },
      { status: 500 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: `We could not deliver your message. Please email ${FALLBACK_EMAIL}.` },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: payload.successMessage ?? "Thanks for reaching out. NXTG3N will be in touch soon." });
}
