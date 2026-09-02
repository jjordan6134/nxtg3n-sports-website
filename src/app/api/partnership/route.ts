import { NextResponse } from "next/server";
import { isHoneypotTriggered, validatePartnershipForm } from "@/lib/form-validation";
import { escapeHtml, getClientIp, isRateLimited, sendFormEmail } from "@/lib/email";
import { athletes } from "@/data/athletes";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (isHoneypotTriggered(payload.website)) return NextResponse.json({ message: "Your partnership request has been received." });
    if (isRateLimited(getClientIp(request))) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    const validation = validatePartnershipForm(payload);
    if (!validation.ok) return NextResponse.json({ error: "Please complete the required fields.", details: validation.errors }, { status: 400 });
    const values = validation.values;
    const isRosterRequest = values.athleteSlug === "roster" && values.athlete === "the NXTG3N roster";
    const selectedAthlete = athletes.find((athlete) => athlete.slug === values.athleteSlug);
    if (!isRosterRequest && (!selectedAthlete || selectedAthlete.name !== values.athlete)) {
      return NextResponse.json({ error: "Please select a valid athlete profile before submitting.", details: { athleteSlug: "The selected athlete could not be verified." } }, { status: 400 });
    }
    const timestamp = new Date().toISOString();
    const entries = Object.entries(values).filter(([key]) => key !== "consent" && key !== "honeypot");
    const html = `<h1>New NXTG3N athlete partnership request</h1>${entries.map(([key, value]) => `<p><strong>${escapeHtml(key)}:</strong> ${escapeHtml(String(value))}</p>`).join("")}<p><strong>Submitted:</strong> ${timestamp}</p><p><strong>Source:</strong> Website athlete partnership form</p>`;
    const text = `New NXTG3N athlete partnership request\n\n${entries.map(([key, value]) => `${key}: ${value}`).join("\n")}\n\nSubmitted: ${timestamp}\nSource: Website athlete partnership form`;
    return sendFormEmail({ subject: `NXTG3N partnership request for ${values.athlete}`, replyTo: values.email, html, text, successMessage: "Your partnership request has been received. NXTG3N will follow up after reviewing the details." });
  } catch {
    return NextResponse.json({ error: "The partnership request could not be submitted. Please email nxtgnsportstalentagencyllc@gmail.com." }, { status: 500 });
  }
}
