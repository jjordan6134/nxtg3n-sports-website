"use client";

import { useEffect, useRef, useState } from "react";
import { campaignDeliverables, campaignExclusivityOptions, campaignObjectives, campaignPlatforms, campaignUsageRights, validatePartnershipForm } from "@/lib/form-validation";
import { trackConversion } from "@/lib/analytics";
import { getLeadAttribution } from "@/lib/attribution";

const campaignTypes = ["NIL Campaign", "Brand Ambassador", "Social Content", "Appearance", "Media Interview", "Merchandise Collaboration", "Community Event", "Other"];
const inputClass = "mt-2 w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white";

export function AthletePartnershipForm({ athlete, athleteSlug, location = "athlete_profile", shortlistedAthletes = "" }: { athlete: string; athleteSlug: string; location?: string; shortlistedAthletes?: string }) {
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const firstInvalidRef = useRef<HTMLElement | null>(null);
  const partnershipStarted = useRef(false);

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
    const attribution = getLeadAttribution();
    const payload = {
      athleteSlug,
      athlete: String(formData.get("athlete") ?? ""),
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      campaignType: String(formData.get("campaignType") ?? ""),
      objective: String(formData.get("objective") ?? ""),
      deliverables: formData.getAll("deliverables").map(String).join(", "),
      platforms: formData.getAll("platforms").map(String).join(", "),
      timeline: String(formData.get("timeline") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      campaignLocation: String(formData.get("campaignLocation") ?? ""),
      usageRights: String(formData.get("usageRights") ?? ""),
      exclusivity: String(formData.get("exclusivity") ?? ""),
      description: String(formData.get("description") ?? ""),
      consent: formData.get("consent") === "on",
      honeypot: String(formData.get("website") ?? ""),
      formLocation: location,
      shortlistedAthletes,
      ...attribution,
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
      trackConversion({ name: "partnership_inquiry_submit", properties: { athlete_slug: athleteSlug, form_location: location, campaign_type: validation.values.campaignType } });
      trackConversion({ name: "campaign_brief_submit", properties: { athlete_slug: athleteSlug, objective: validation.values.objective, deliverable_count: String(validation.values.deliverables.split(", ").length), platform_count: String(validation.values.platforms.split(", ").length), reference_id: String(data.referenceId ?? "unavailable") } });
      form.reset();
    } catch {
      setError(true);
      setStatus("The request could not be submitted. Please email nxtgnsportstalentagencyllc@gmail.com.");
    }
  }

  function handleFormFocus() {
    if (partnershipStarted.current) return;
    partnershipStarted.current = true;
    trackConversion({ name: "partnership_inquiry_start", properties: { athlete_slug: athleteSlug, form_location: location } });
  }

  function fieldProps(name: string) {
    return { id: `partnership-${name}`, "aria-invalid": fieldErrors[name] ? true : undefined, "aria-describedby": fieldErrors[name] ? `partnership-${name}-error` : undefined };
  }
  function errorMessage(name: string) {
    return fieldErrors[name] ? <span id={`partnership-${name}-error`} className="mt-1 block text-xs text-red-300">{fieldErrors[name]}</span> : null;
  }

  return <form onSubmit={submit} onFocus={handleFormFocus} className="mt-5 grid gap-4" noValidate aria-describedby="partnership-form-status">
    <input type="hidden" name="athlete" value={athlete} />
    <input type="hidden" name="athleteSlug" value={athleteSlug} />
    <input type="hidden" name="shortlistedAthletes" value={shortlistedAthletes} />
    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />
    <div className="rounded-2xl border border-[#1F6AE1]/30 bg-[#1F6AE1]/10 p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2AFF7D]">Sponsor campaign brief</p><p className="mt-2 text-sm leading-6 text-[#C7CCD6]">Give our team the information needed to evaluate fit, availability, deliverables, and campaign scope.</p></div>
    <p className="text-xs text-[#C7CCD6]">Fields marked Required must be completed. Campaign description: 20-1,000 characters.</p>
    <fieldset className="grid gap-4 rounded-2xl border border-white/10 p-4 sm:grid-cols-2"><legend className="px-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2AFF7D]">1 · Contact</legend>
    <label className="text-sm text-[#C7CCD6]">Name <span className="text-[#2AFF7D]">Required</span><input {...fieldProps("name")} required name="name" className={inputClass} />{errorMessage("name")}</label>
    <label className="text-sm text-[#C7CCD6]">Company / organization <span className="text-[#2AFF7D]">Required</span><input {...fieldProps("company")} required name="company" className={inputClass} />{errorMessage("company")}</label>
    <label className="text-sm text-[#C7CCD6]">Email <span className="text-[#2AFF7D]">Required</span><input {...fieldProps("email")} required type="email" name="email" className={inputClass} />{errorMessage("email")}</label>
    <label className="text-sm text-[#C7CCD6]">Phone <span className="text-[#7F8795]">Optional</span><input {...fieldProps("phone")} name="phone" type="tel" className={inputClass} /></label>
    </fieldset>
    <fieldset className="grid gap-4 rounded-2xl border border-white/10 p-4 sm:grid-cols-2"><legend className="px-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2AFF7D]">2 · Campaign strategy</legend>
    <label className="text-sm text-[#C7CCD6]">Campaign type <span className="text-[#2AFF7D]">Required</span><select {...fieldProps("campaignType")} required name="campaignType" defaultValue="" className={inputClass}><option value="" disabled>Select a campaign type</option>{campaignTypes.map((type) => <option key={type}>{type}</option>)}</select>{errorMessage("campaignType")}</label>
    <label className="text-sm text-[#C7CCD6]">Primary objective <span className="text-[#2AFF7D]">Required</span><select {...fieldProps("objective")} required name="objective" defaultValue="" className={inputClass}><option value="" disabled>Select an objective</option>{campaignObjectives.map((value) => <option key={value}>{value}</option>)}</select>{errorMessage("objective")}</label>
    <div className="sm:col-span-2"><p className="text-sm text-[#C7CCD6]">Requested deliverables <span className="text-[#2AFF7D]">Required</span></p><div className="mt-2 grid gap-2 sm:grid-cols-2">{campaignDeliverables.map((value) => <label key={value} className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B0E11] px-3 py-2 text-sm text-white"><input type="checkbox" name="deliverables" value={value} className="accent-[#1F6AE1]" />{value}</label>)}</div>{errorMessage("deliverables")}</div>
    <div className="sm:col-span-2"><p className="text-sm text-[#C7CCD6]">Platforms and channels <span className="text-[#2AFF7D]">Required</span></p><div className="mt-2 grid gap-2 sm:grid-cols-2">{campaignPlatforms.map((value) => <label key={value} className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B0E11] px-3 py-2 text-sm text-white"><input type="checkbox" name="platforms" value={value} className="accent-[#1F6AE1]" />{value}</label>)}</div>{errorMessage("platforms")}</div>
    </fieldset>
    <fieldset className="grid gap-4 rounded-2xl border border-white/10 p-4 sm:grid-cols-2"><legend className="px-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2AFF7D]">3 · Scope and terms</legend>
    <label className="text-sm text-[#C7CCD6]">Estimated timeline <span className="text-[#2AFF7D]">Required</span><input {...fieldProps("timeline")} required name="timeline" placeholder="Example: Fall 2026" className={inputClass} />{errorMessage("timeline")}</label>
    <label className="text-sm text-[#C7CCD6]">Budget range <span className="text-[#7F8795]">Optional</span><input {...fieldProps("budget")} name="budget" placeholder="Optional" className={inputClass} /></label>
    <label className="text-sm text-[#C7CCD6]">Location <span className="text-[#7F8795]">Optional</span><input {...fieldProps("campaignLocation")} name="campaignLocation" placeholder="City, state, remote, or multiple markets" className={inputClass} /></label>
    <label className="text-sm text-[#C7CCD6]">Content usage <span className="text-[#2AFF7D]">Required</span><select {...fieldProps("usageRights")} required name="usageRights" defaultValue="" className={inputClass}><option value="" disabled>Select usage rights</option>{campaignUsageRights.map((value) => <option key={value}>{value}</option>)}</select>{errorMessage("usageRights")}</label>
    <label className="text-sm text-[#C7CCD6] sm:col-span-2">Exclusivity <span className="text-[#7F8795]">Optional</span><select {...fieldProps("exclusivity")} name="exclusivity" defaultValue="" className={inputClass}><option value="">Select an exclusivity preference</option>{campaignExclusivityOptions.map((value) => <option key={value}>{value}</option>)}</select>{errorMessage("exclusivity")}</label>
    <label className="text-sm text-[#C7CCD6]">Campaign description <span className="text-[#2AFF7D]">Required</span><textarea {...fieldProps("description")} required minLength={20} maxLength={1000} name="description" rows={5} className={inputClass} />{errorMessage("description")}</label>
    </fieldset>
    <label className="flex gap-3 text-sm text-[#C7CCD6]"><input {...fieldProps("consent")} required type="checkbox" name="consent" className="mt-1 accent-[#1F6AE1]" />I understand this request does not guarantee athlete availability or acceptance. <span className="text-[#2AFF7D]">Required</span></label>
    {errorMessage("consent")}
    {errorMessage("athleteSlug")}
    <button type="submit" className="w-fit rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2E7BFF]">Send partnership request</button>
    <p id="partnership-form-status" role="status" aria-live="polite" className={error ? "text-sm text-red-300" : "text-sm text-[#2AFF7D]"}>{status}</p>
  </form>;
}

export function AthletePartnershipDialog({ athlete, athleteSlug, location = "athlete_profile", shortlistedAthletes = "", triggerLabel = "Start a partnership request", onOpen }: { athlete: string; athleteSlug: string; location?: string; shortlistedAthletes?: string; triggerLabel?: string; onOpen?: () => void }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return <><button ref={triggerRef} type="button" onClick={() => { onOpen?.(); setOpen(true); }} className="shrink-0 rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2E7BFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">{triggerLabel}</button>{open ? <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/75 p-4 sm:items-center" role="presentation"><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="partnership-dialog-heading" tabIndex={-1} className="my-4 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#101722] p-5 shadow-2xl sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Partnership request</p><h2 id="partnership-dialog-heading" className="mt-2 text-2xl font-black text-white">Partner With {athlete}</h2>{shortlistedAthletes ? <p className="mt-2 text-sm text-[#C7CCD6]">Shortlist: {shortlistedAthletes}</p> : null}</div><button type="button" onClick={close} className="shrink-0 border border-white/15 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" aria-label="Close partnership request">Close</button></div><AthletePartnershipForm athlete={athlete} athleteSlug={athleteSlug} location={location} shortlistedAthletes={shortlistedAthletes} /></div></div> : null}</>;
}
