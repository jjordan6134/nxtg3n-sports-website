"use client";

import { useRef, useState } from "react";
import { validateApplicationForm } from "@/lib/form-validation";
import { trackConversion } from "@/lib/analytics";

export default function ApplyPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const applicationStarted = useRef(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      sport: String(formData.get("sport") ?? ""),
      school: String(formData.get("school") ?? ""),
      graduationYear: String(formData.get("graduationYear") ?? ""),
      position: String(formData.get("position") ?? ""),
      socialLink: String(formData.get("socialLink") ?? ""),
      goals: String(formData.get("goals") ?? ""),
      consent: formData.get("consent") === "on",
      honeypot: String(formData.get("website") ?? ""),
    };

    const validation = validateApplicationForm(payload);
    if (!validation.ok) {
      setFieldErrors(validation.errors);
      setStatus("error");
      setMessage("Please complete the required fields and confirm your information.");
      return;
    }

    setFieldErrors({});
    setStatus("idle");
    setMessage("Submitting your application...");

    const response = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.values),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(data.error || "Something went wrong while submitting your application.");
      return;
    }

    setStatus("success");
    setMessage(data.message || "Your application has been received.");
    trackConversion({ name: "athlete_application_submit", properties: {} });
    event.currentTarget.reset();
  }

  function handleFormFocus() {
    if (applicationStarted.current) return;
    applicationStarted.current = true;
    trackConversion({ name: "athlete_application_start", properties: {} });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2AFF7D]">Application</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Athlete interest form</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#C7CCD6]">
          Share your information and goals. We review every submission with care and respond as quickly as possible.
        </p>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8">
        <form className="grid gap-5 md:grid-cols-2" aria-label="Athlete interest form" onSubmit={handleSubmit} onFocus={handleFormFocus} noValidate>
          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Athlete name</span>
            <input name="name" type="text" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="Full name" />
            {fieldErrors.name ? <span className="mt-2 block text-xs text-red-300">{fieldErrors.name}</span> : null}
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Email</span>
            <input name="email" type="email" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="Email address" />
            {fieldErrors.email ? <span className="mt-2 block text-xs text-red-300">{fieldErrors.email}</span> : null}
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Phone</span>
            <input name="phone" type="tel" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="Phone number" />
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Sport</span>
            <input name="sport" type="text" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="Basketball" />
            {fieldErrors.sport ? <span className="mt-2 block text-xs text-red-300">{fieldErrors.sport}</span> : null}
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Current school/team</span>
            <input name="school" type="text" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="School or team" />
            {fieldErrors.school ? <span className="mt-2 block text-xs text-red-300">{fieldErrors.school}</span> : null}
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Graduation year</span>
            <input name="graduationYear" type="text" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="2027" />
            {fieldErrors.graduationYear ? <span className="mt-2 block text-xs text-red-300">{fieldErrors.graduationYear}</span> : null}
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Position</span>
            <input name="position" type="text" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="Guard / Forward" />
            {fieldErrors.position ? <span className="mt-2 block text-xs text-red-300">{fieldErrors.position}</span> : null}
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Social/highlight link</span>
            <input name="socialLink" type="url" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="https://..." />
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-2">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Goals</span>
            <textarea name="goals" rows={6} className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="Tell us about your goals and what support you are looking for." />
            {fieldErrors.goals ? <span className="mt-2 block text-xs text-red-300">{fieldErrors.goals}</span> : null}
          </label>

          <label className="flex items-start gap-3 text-sm text-[#C7CCD6] md:col-span-2">
            <input name="consent" type="checkbox" className="mt-1 h-4 w-4 rounded border-white/10 bg-[#0B0E11] accent-[#1F6AE1]" />
            <span>I confirm that this information is accurate and I consent to NXTG3N reviewing my application.</span>
          </label>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />
          {fieldErrors.consent ? <span className="md:col-span-2 block text-xs text-red-300">{fieldErrors.consent}</span> : null}

          <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button type="submit" className="rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2E7BFF]">
              Submit application
            </button>
            <p className="text-sm text-[#C7CCD6]">
              Email <a href="mailto:nxtgnsportstalentagencyllc@gmail.com" className="text-[#2AFF7D] hover:text-white">nxtgnsportstalentagencyllc@gmail.com</a> as an alternative.
            </p>
          </div>

          {message ? (
            <p role="status" aria-live="polite" className={status === "success" ? "md:col-span-2 text-sm text-[#2AFF7D]" : status === "error" ? "md:col-span-2 text-sm text-red-300" : "md:col-span-2 text-sm text-[#C7CCD6]"}>
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
