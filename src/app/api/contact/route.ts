import { NextResponse } from "next/server";
import { isHoneypotTriggered, validateContactForm, type ContactFormValues } from "@/lib/form-validation";
import { escapeHtml, getClientIp, isRateLimited, sendFormEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (isHoneypotTriggered(payload.honeypot)) {
      return NextResponse.json({ message: "Thanks for reaching out. NXTG3N will be in touch soon." });
    }
    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }
    const validation = validateContactForm(payload);

    if (!validation.ok) {
      return NextResponse.json(
        {
          error: "Please correct the form and try again.",
          details: validation.errors,
        },
        { status: 400 },
      );
    }

    const values = validation.values as ContactFormValues;
    const timestamp = new Date().toISOString();
    const html = `<h1>New NXTG3N contact message</h1><p><strong>Name:</strong> ${escapeHtml(values.name)}</p><p><strong>Email:</strong> ${escapeHtml(values.email)}</p><p><strong>Message:</strong><br>${escapeHtml(values.message).replace(/\n/g, "<br>")}</p><p><strong>Submitted:</strong> ${timestamp}</p><p><strong>Source:</strong> Website contact form</p>`;
    const text = `New NXTG3N contact message\n\nName: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}\n\nSubmitted: ${timestamp}\nSource: Website contact form`;
    const response = await sendFormEmail({ subject: `NXTG3N contact inquiry from ${values.name}`, replyTo: values.email, html, text, successMessage: "Thanks for reaching out. NXTG3N will be in touch soon." });
    return response;
  } catch {
    return NextResponse.json(
      {
        error: "The message could not be processed. Please try again.",
      },
      { status: 500 },
    );
  }
}
