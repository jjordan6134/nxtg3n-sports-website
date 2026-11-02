"use client";

import { useState } from "react";
import { trackConversion } from "@/lib/analytics";
import { validateNewsletterForm } from "@/lib/form-validation";

export function GuideDownload({ guideSlug, guideTitle, downloadPath }: { guideSlug: string; guideTitle: string; downloadPath: string }) {
  const [status, setStatus] = useState<"idle" | "working" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    const firstName = String(data.get("firstName") ?? "");
    const honeypot = String(data.get("website") ?? "");
    const validation = validateNewsletterForm({ email, firstName, honeypot, interest: `Guide: ${guideSlug}` });
    if (!validation.ok) { setStatus("error"); setMessage("Please provide a valid email address."); return; }
    setStatus("working"); setMessage("Preparing your checklist...");
    try {
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(validation.values) });
      const result = await response.json();
      if (!response.ok) { setStatus("error"); setMessage(result.error || "We could not prepare the checklist."); return; }
      setStatus("success");
      setMessage("Your checklist is ready. The download should begin automatically.");
      trackConversion({ name: "guide_download", properties: { guide_slug: guideSlug, asset_type: "pdf_checklist" } });
      trackConversion({ name: "newsletter_signup", properties: { signup_location: `guide_${guideSlug}`, interest: "NIL guide checklist" } });
      const link = document.createElement("a"); link.href = downloadPath; link.download = ""; document.body.appendChild(link); link.click(); link.remove();
      form.reset();
    } catch { setStatus("error"); setMessage("We could not prepare the checklist. Please try again."); }
  }

  return <section className="mt-12 rounded-[2rem] border border-[#2AFF7D]/35 bg-gradient-to-br from-[#10251C] to-[#101722] p-6 sm:p-8">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2AFF7D]">Free PDF action checklist</p><h2 className="mt-3 text-3xl font-black text-white">Take the next steps with you.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7CCD6]">Get the printable companion to <strong className="text-white">{guideTitle}</strong>, including action items, decision prompts, notes, and a 30-day follow-up.</p>
    <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end" noValidate>
      <label className="text-sm text-[#C7CCD6]">Email <span className="text-[#2AFF7D]">Required</span><input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" placeholder="you@example.com" /></label>
      <label className="text-sm text-[#C7CCD6]">First name <span className="text-[#7F8795]">Optional</span><input name="firstName" autoComplete="given-name" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" placeholder="First name" /></label>
      <button type="submit" disabled={status === "working"} className="rounded-full bg-[#2AFF7D] px-5 py-3 text-sm font-black text-[#07120B] hover:bg-white disabled:opacity-60">Get the checklist</button>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />
    </form>
    <p className="mt-4 text-xs leading-5 text-[#9AA3B2]">By requesting the checklist, you agree to receive NXTG3N Sports NIL education and updates. Unsubscribe anytime. <a href="/privacy" className="text-[#2AFF7D]">Privacy information</a>.</p>
    <p className={`mt-3 text-sm ${status === "error" ? "text-red-300" : "text-[#2AFF7D]"}`} role="status" aria-live="polite">{message}</p>
    {status === "success" ? <a href={downloadPath} download onClick={() => trackConversion({ name: "guide_download", properties: { guide_slug: guideSlug, asset_type: "pdf_checklist_manual" } })} className="mt-2 inline-flex text-sm font-bold text-white underline decoration-[#2AFF7D] underline-offset-4">Download again</a> : null}
  </section>;
}
