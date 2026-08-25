import { NextResponse } from "next/server";
import { isHoneypotTriggered, validateApplicationForm, type ApplicationFormValues } from "@/lib/form-validation";
import { escapeHtml, getClientIp, isRateLimited, sendFormEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (isHoneypotTriggered(payload.honeypot)) {
      return NextResponse.json({ message: "Your athlete application has been received." });
    }
    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }
    const validation = validateApplicationForm(payload);

    if (!validation.ok) {
      return NextResponse.json(
        {
          error: "Please complete the required fields before submitting.",
          details: validation.errors,
        },
        { status: 400 },
      );
    }

    const values = validation.values as ApplicationFormValues;
    const timestamp = new Date().toISOString();
    const fields = Object.entries(values).filter(([key]) => key !== "honeypot" && key !== "consent");
    const html = `<h1>New NXTG3N athlete application</h1>${fields.map(([key, value]) => `<p><strong>${escapeHtml(key)}:</strong> ${escapeHtml(String(value))}</p>`).join("")}<p><strong>Submitted:</strong> ${timestamp}</p><p><strong>Source:</strong> Website athlete application</p>`;
    const text = `New NXTG3N athlete application\n\n${fields.map(([key, value]) => `${key}: ${value}`).join("\n")}\n\nSubmitted: ${timestamp}\nSource: Website athlete application`;
    const response = await sendFormEmail({ subject: `NXTG3N athlete application from ${values.name}`, replyTo: values.email, html, text, successMessage: "Your athlete application has been received. NXTG3N will review it shortly." });
    return response;
  } catch {
    return NextResponse.json(
      {
        error: "The application could not be submitted. Please try again.",
      },
      { status: 500 },
    );
  }
}
