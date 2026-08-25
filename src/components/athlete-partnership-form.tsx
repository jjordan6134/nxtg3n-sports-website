"use client";

import { useRef, useState } from "react";
import { validatePartnershipForm } from "@/lib/form-validation";

const campaignTypes = ["NIL Campaign", "Brand Ambassador", "Social Content", "Appearance", "Media Interview", "Merchandise Collaboration", "Community Event", "Other"];
const inputClass = "mt-2 w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white";

export function AthletePartnershipForm({ athlete, athleteSlug }: { athlete: string; athleteSlug: string }) {
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const firstInvalidRef = useRef<HTMLElement | null>(null);

  function showErrors(errors: Record<string, string>, form: HTMLFormElement) {
    setFieldErrors(errors);
    setError(true);
    setStatus(`Please fix ${Object.keys(errors).length} field${Object.keys(errors).length === 1 ? "" : "s"} before submitting.`);
    const firstField = Object.keys(errors)[0];
    const targetName = firstField === "athleteSlug" ? "name" : firstField;
    firstInvalidRef.current = form.elements.namedItem(targetName) as HTMLElement | null;
    window.requestAnimationFrame(() => {
      firstInvalidRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalidRef.current?.focus();
    });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      athleteSlug,
      athlete: String(formData.get("athlete") ?? ""),
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      campaignType: String(formData.get("campaignType") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      description: String(formData.get("description") ?? ""),
      consent: formData.get("consent") === "on",
      honeypot: String(formData.get("website") ?? ""),
    };
    const validation = validatePartnershipForm(payload);
    if (!validation.ok) {
      showErrors(validation.errors, form);
      return;
    }

    setFieldErrors({});
    setError(false);
    setStatus("Sending request...");
    try {
      const response = await fetch("/api/partnership", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(validation.values) });
      const data = await response.json();
      if (!response.ok) {
        if (data.details) showErrors(data.details, form);
        else { setError(true); setStatus(data.error || "The request could not be submitted. Please email nxtgnsportstalentagencyllc@gmail.com."); }
        return;
      }
      setStatus(data.message || "Your partnership request has been received.");
      form.reset();
    } catch {
      setError(true);
      setStatus("The request could not be submitted. Please email nxtgnsportstalentagencyllc@gmail.com.");
    }
  }

  function fieldProps(name: string) {
    return { id: `partnership-${name}`, "aria-invalid": fieldErrors[name] ? true : undefined, "aria-describedby": fieldErrors[name] ? `partnership-${name}-error` : undefined };
  }
  function errorMessage(name: string) {
    return fieldErrors[name] ? <span id={`partnership-${name}-error`} className="mt-1 block text-xs text-red-300">{fieldErrors[name]}</span> : null;
  }

  return <form onSubmit={submit} className="mt-5 grid gap-4" noValidate aria-describedby="partnership-form-status">
    <input type="hidden" name="athlete" value={athlete} />
    <input type="hidden" name="athleteSlug" value={athleteSlug} />
    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />
    <p className="text-xs text-[#C7CCD6]">Fields marked Required must be completed. Campaign description: 20-1,000 characters.</p>
    <label className="text-sm text-[#C7CCD6]">Name <span className="text-[#2AFF7D]">Required</span><input {...fieldProps("name")} required name="name" className={inputClass} />{errorMessage("name")}</label>
    <label className="text-sm text-[#C7CCD6]">Company / organization <span className="text-[#2AFF7D]">Required</span><input {...fieldProps("company")} required name="company" className={inputClass} />{errorMessage("company")}</label>
    <label className="text-sm text-[#C7CCD6]">Email <span className="text-[#2AFF7D]">Required</span><input {...fieldProps("email")} required type="email" name="email" className={inputClass} />{errorMessage("email")}</label>
    <label className="text-sm text-[#C7CCD6]">Phone <span className="text-[#7F8795]">Optional</span><input {...fieldProps("phone")} name="phone" type="tel" className={inputClass} /></label>
    <label className="text-sm text-[#C7CCD6]">Campaign type <span className="text-[#2AFF7D]">Required</span><select {...fieldProps("campaignType")} required name="campaignType" defaultValue="" className={inputClass}><option value="" disabled>Select a campaign type</option>{campaignTypes.map((type) => <option key={type}>{type}</option>)}</select>{errorMessage("campaignType")}</label>
    <label className="text-sm text-[#C7CCD6]">Estimated timeline <span className="text-[#2AFF7D]">Required</span><input {...fieldProps("timeline")} required name="timeline" placeholder="Example: Fall 2026" className={inputClass} />{errorMessage("timeline")}</label>
    <label className="text-sm text-[#C7CCD6]">Budget range <span className="text-[#7F8795]">Optional</span><input {...fieldProps("budget")} name="budget" placeholder="Optional" className={inputClass} /></label>
    <label className="text-sm text-[#C7CCD6]">Campaign description <span className="text-[#2AFF7D]">Required</span><textarea {...fieldProps("description")} required minLength={20} maxLength={1000} name="description" rows={5} className={inputClass} />{errorMessage("description")}</label>
    <label className="flex gap-3 text-sm text-[#C7CCD6]"><input {...fieldProps("consent")} required type="checkbox" name="consent" className="mt-1 accent-[#1F6AE1]" />I understand this request does not guarantee athlete availability or acceptance. <span className="text-[#2AFF7D]">Required</span></label>
    {errorMessage("consent")}
    {errorMessage("athleteSlug")}
    <button type="submit" className="w-fit rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2E7BFF]">Send partnership request</button>
    <p id="partnership-form-status" role="status" aria-live="polite" className={error ? "text-sm text-red-300" : "text-sm text-[#2AFF7D]"}>{status}</p>
  </form>;
}
