import { randomUUID } from "node:crypto";
import { z } from "zod";
import { allowRequest, commerceDb, commerceOrigin } from "@/lib/commerce";
import { sameOrigin, privateHeaders } from "@/lib/commerce-security";
import { escapeHtml, sendFormEmail } from "@/lib/email";
import { readinessQuestions } from "@/data/playbook-content";
const schema = z.object({ firstName: z.string().trim().min(1).max(60), email: z.email().max(254), audience: z.enum(["Athlete", "Parent", "Coach", "Advisor", "Other"]), adult: z.literal(true), marketing: z.boolean(), honeypot: z.string().max(100).optional() });
export async function POST(request: Request) {
  try {
    if (!sameOrigin(request, commerceOrigin())) return new Response(null, { status: 403 });
    if (!await allowRequest(request, "lead", 5)) return Response.json({ error: "Please try again later." }, { status: 429 });
    const raw = await request.text();
    if (raw.length > 2000) return new Response(null, { status: 413 });
    const parsed = schema.safeParse(JSON.parse(raw));
    if (!parsed.success) return Response.json({ error: "Enter a first name, valid email, audience and adult confirmation." }, { status: 400 });
    const p = parsed.data;
    if (p.honeypot) return Response.json({ message: "Your checklist request was received." });
    // Consent is recorded separately. No promotional sequence or contact subscription is triggered here.
    await commerceDb()`INSERT INTO commerce_leads(id,first_name,email,audience,marketing_consent,consent_version) VALUES(${randomUUID()},${p.firstName},${p.email},${p.audience},${p.marketing},'playbook-checklist-v1')`;
    const delivery = await sendFormEmail({ to: [p.email], subject: "Your NIL Readiness Checklist", operation: "checklist_delivery",
      html: `<h1>The NIL Readiness Checklist</h1><p>Hi ${escapeHtml(p.firstName)},</p><p>10 questions to discuss before your first NIL deal.</p><ol>${readinessQuestions.map(q => `<li>${escapeHtml(q)}</li>`).join("")}</ol><p><a href="${commerceOrigin()}/resources#readiness-assessment">Continue with the free readiness assessment</a></p><p>Education only. For a specific decision, involve your school and qualified advisors. You have not been automatically subscribed to marketing.</p>`,
      text: `The NIL Readiness Checklist\n\n${readinessQuestions.map((q,i) => `${i+1}. ${q}`).join("\n")}\n\nContinue: ${commerceOrigin()}/resources#readiness-assessment\nEducation only. You have not been automatically subscribed to marketing.`,
      successMessage: "Your checklist is on its way. You can also read it below.",
    });
    if (!delivery.ok) return Response.json({ error: "Your request was saved, but email delivery failed. Read the free checklist below or try again later." }, { status: 502, headers: privateHeaders });
    return delivery;
  } catch { return Response.json({ error: "Checklist email is temporarily unavailable. You can read the free checklist below." }, { status: 503, headers: privateHeaders }); }
}
