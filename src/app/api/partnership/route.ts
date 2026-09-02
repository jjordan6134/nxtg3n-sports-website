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
    if (values.shortlistedAthletes) {
      if (!isRosterRequest) return NextResponse.json({ error: "Athlete shortlists are only available for roster requests." }, { status: 400 });
      const validNames = new Set(athletes.map((athlete) => athlete.name));
      const shortlist = values.shortlistedAthletes.split(",").map((name) => name.trim()).filter(Boolean);
      if (shortlist.length > 4 || shortlist.some((name) => !validNames.has(name))) {
        return NextResponse.json({ error: "Please select a valid athlete shortlist." }, { status: 400 });
      }
    }
    const timestamp = new Date().toISOString();
    const referenceId = `NXT-${timestamp.slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    const entries = [["referenceId", referenceId], ...Object.entries(values).filter(([key]) => key !== "consent" && key !== "honeypot")];
    const html = `<h1>New NXTG3N sponsor campaign brief</h1>${entries.map(([key, value]) => `<p><strong>${escapeHtml(key)}:</strong> ${escapeHtml(String(value))}</p>`).join("")}<p><strong>Submitted:</strong> ${timestamp}</p><p><strong>Source:</strong> Website campaign brief builder</p>`;
    const text = `New NXTG3N sponsor campaign brief\n\n${entries.map(([key, value]) => `${key}: ${value}`).join("\n")}\n\nSubmitted: ${timestamp}\nSource: Website campaign brief builder`;
    return sendFormEmail({ subject: `[${referenceId}] NXTG3N campaign brief for ${values.athlete}`, replyTo: values.email, html, text, successMessage: `Campaign brief received. Reference: ${referenceId}. NXTG3N will follow up after reviewing the details.`, successData: { referenceId } });
  } catch {
    return NextResponse.json({ error: "The partnership request could not be submitted. Please email nxtgnsportstalentagencyllc@gmail.com." }, { status: 500 });
  }
}
