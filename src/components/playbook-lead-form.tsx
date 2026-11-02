"use client";
import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
export function PlaybookLeadForm() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMessage("");
    const f = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/commerce/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ firstName: f.get("firstName"), email: f.get("email"), audience: f.get("audience"), adult: f.get("adult") === "on", marketing: f.get("marketing") === "on", honeypot: f.get("website") }) });
      const data = await response.json(); setMessage(data.message || data.error);
      if (response.ok) { try { track("book_checklist_signup", { audience: String(f.get("audience")) }); } catch {} }
    } catch { setMessage("Email is temporarily unavailable. You can read the checklist without signing up."); }
    setBusy(false);
  }
  const input = "mt-2 w-full rounded-xl border border-white/20 bg-[#0b0e11] px-4 py-3 text-white";
  return <form onSubmit={submit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm">First name<input name="firstName" autoComplete="given-name" required maxLength={60} className={input} /></label><label className="text-sm">Email address<input name="email" type="email" autoComplete="email" required maxLength={254} className={input} /></label></div><label className="block text-sm">I’m an…<select name="audience" required className={input}><option value="">Select your audience</option>{["Athlete", "Parent", "Coach", "Advisor", "Other"].map(x => <option key={x}>{x}</option>)}</select></label><div hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div><label className="flex items-start gap-3 text-sm text-[#c7ccd6]"><input type="checkbox" name="adult" required className="mt-1" />I am 18 or older. Younger athletes can read the checklist freely or ask a parent or guardian to request it.</label><label className="flex items-start gap-3 text-sm text-[#c7ccd6]"><input type="checkbox" name="marketing" className="mt-1" />I’d also like NIL education and product updates from NXTG3N. Optional; unsubscribe by contacting support.</label><p className="text-xs text-[#c7ccd6]">We use your details to deliver this checklist. Marketing consent is separate. <a href="/privacy" className="underline">Privacy policy</a></p><button disabled={busy} className="rounded-full bg-[#e5c58b] px-6 py-3 text-sm font-bold text-[#101722] disabled:opacity-60">{busy ? "Sending…" : "Email me the free checklist"}</button><p role="status" aria-live="polite" className="text-sm text-[#e5c58b]">{message}</p></form>;
}
