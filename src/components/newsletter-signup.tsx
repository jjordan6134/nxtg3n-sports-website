"use client";

import { useState } from "react";
import { trackConversion } from "@/lib/analytics";
import { validateNewsletterForm } from "@/lib/form-validation";

const interests = ["Athlete News", "NIL Education", "Recruiting and Development", "NXTG3N Events and Updates"];
const inputClass = "mt-2 w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]";

export function NewsletterSignup({ location }: { location: "homepage" | "news" | "media" | "footer" }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const getText = (name: string) => {
      const value = data.get(name);
      return typeof value === "string" ? value : undefined;
    };
    const validation = validateNewsletterForm({ email: getText("email"), firstName: getText("firstName"), interest: getText("interest"), honeypot: getText("website") });
    if (!validation.ok) {
      setFieldErrors(validation.errors);
      setStatus("error");
      setMessage("Please provide a valid email address.");
      return;
    }
    setFieldErrors({});
    setStatus("idle");
    setMessage("Joining the newsletter...");
    try {
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(validation.values) });
      const result = await response.json();
      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "The newsletter subscription could not be completed.");
        return;
      }
      setStatus("success");
      setMessage(result.message || "Thanks for subscribing to NXTG3N updates.");
      trackConversion({ name: "newsletter_signup", properties: { signup_location: location, interest: validation.values.interest || "unspecified" } });
      form.reset();
    } catch {
      setStatus("error");
      setMessage("The newsletter subscription could not be completed. Please try again later.");
    }
  }

  return <form onSubmit={submit} className="grid gap-4" noValidate aria-describedby={`${location}-newsletter-status`}>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm text-[#C7CCD6]">Email <span className="text-[#2AFF7D]">Required</span><input required name="email" type="email" autoComplete="email" className={inputClass} placeholder="Email address" aria-invalid={fieldErrors.email ? true : undefined} /></label>
      <label className="text-sm text-[#C7CCD6]">First name <span className="text-[#7F8795]">Optional</span><input name="firstName" autoComplete="given-name" className={inputClass} placeholder="First name" /></label>
    </div>
    <label className="text-sm text-[#C7CCD6]">What interests you? <span className="text-[#7F8795]">Optional</span><select name="interest" defaultValue="" className={inputClass}><option value="">Select an interest</option>{interests.map((interest) => <option key={interest}>{interest}</option>)}</select></label>
    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />
    <p className="text-xs leading-5 text-[#C7CCD6]">By subscribing, you agree to receive NXTG3N Sports updates. You can unsubscribe at any time. <a href="/privacy" className="text-[#2AFF7D] hover:text-white">Read our privacy information.</a></p>
    <button type="submit" className="w-fit rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2E7BFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Join the newsletter</button>
    <p id={`${location}-newsletter-status`} role="status" aria-live="polite" className={status === "error" ? "text-sm text-red-300" : "text-sm text-[#2AFF7D]"}>{message}</p>
  </form>;
}