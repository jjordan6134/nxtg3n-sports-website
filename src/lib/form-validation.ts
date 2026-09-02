export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
};

export type ApplicationFormValues = {
  name: string;
  email: string;
  phone?: string;
  sport?: string;
  school?: string;
  graduationYear?: string;
  position?: string;
  socialLink?: string;
  goals?: string;
  consent?: boolean;
  honeypot?: string;
};

export const campaignObjectives = ["Brand awareness", "Audience growth", "Product launch", "Community impact", "Event promotion", "Content creation", "Sales or conversions", "Other"];
export const campaignDeliverables = ["Social post", "Short-form video", "Story content", "Event appearance", "Interview", "Photo shoot", "Product integration", "Merchandise collaboration"];
export const campaignPlatforms = ["Instagram", "TikTok", "YouTube", "Rumble", "X", "Facebook", "In person", "Brand channels"];
export const campaignUsageRights = ["Athlete channels only", "Organic brand reposting", "Paid digital advertising", "Website and email", "Not sure — please advise"];
export const campaignExclusivityOptions = ["No exclusivity requested", "Category exclusivity", "Competitor exclusivity", "Not sure — please advise"];

export type PartnershipFormValues = {
  athleteSlug: string;
  athlete: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  campaignType: string;
  objective: string;
  deliverables: string;
  platforms: string;
  timeline: string;
  budget?: string;
  campaignLocation?: string;
  usageRights: string;
  exclusivity?: string;
  description: string;
  consent?: boolean;
  honeypot?: string;
  formLocation?: string;
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  shortlistedAthletes?: string;
};

export type NewsletterFormValues = {
  email: string;
  firstName?: string;
  interest?: string;
  honeypot?: string;
};

export type FormValidationResult =
  | {
      ok: true;
      values: ContactFormValues | ApplicationFormValues;
      errors?: undefined;
    }
  | {
      ok: false;
      errors: Record<string, string>;
      values?: Partial<ContactFormValues | ApplicationFormValues>;
    };

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function isHoneypotTriggered(value: unknown) {
  return normalizeText(value).length > 0;
}

export function validateContactForm(form: Partial<ContactFormValues>): FormValidationResult {
  const name = normalizeText(form.name);
  const email = normalizeText(form.email);
  const message = normalizeText(form.message);
  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please provide a valid email address.";
  }

  if (message.length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
      values: { name, email, message, honeypot: normalizeText(form.honeypot) },
    };
  }

  return {
    ok: true,
    values: { name, email, message, honeypot: normalizeText(form.honeypot) },
  };
}

export function validateApplicationForm(form: Partial<ApplicationFormValues>): FormValidationResult {
  const fields = {
    name: normalizeText(form.name),
    email: normalizeText(form.email),
    phone: normalizeText(form.phone),
    sport: normalizeText(form.sport),
    school: normalizeText(form.school),
    graduationYear: normalizeText(form.graduationYear),
    position: normalizeText(form.position),
    socialLink: normalizeText(form.socialLink),
    goals: normalizeText(form.goals),
    consent: Boolean(form.consent),
    honeypot: normalizeText(form.honeypot),
  };

  const errors: Record<string, string> = {};

  if (!fields.name) {
    errors.name = "Athlete name is required.";
  }

  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please provide a valid email address.";
  }

  if (!fields.sport) {
    errors.sport = "Sport is required.";
  }

  if (!fields.school) {
    errors.school = "Current school or team is required.";
  }

  if (!fields.graduationYear) {
    errors.graduationYear = "Graduation year is required.";
  }

  if (!fields.position) {
    errors.position = "Position is required.";
  }

  if (!fields.goals || fields.goals.length < 20) {
    errors.goals = "Goals must be at least 20 characters.";
  }

  if (!fields.consent) {
    errors.consent = "You must confirm the information is accurate.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
      values: fields,
    };
  }

  return {
    ok: true,
    values: fields,
  };
}

export function validatePartnershipForm(form: Partial<PartnershipFormValues>) {
  const values = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])) as Partial<PartnershipFormValues>;
  values.consent = form.consent === true || (typeof form.consent === "string" && ["on", "true"].includes(form.consent));
  for (const key of ["formLocation", "landingPage", "referrer", "utmSource", "utmMedium", "utmCampaign", "utmContent", "shortlistedAthletes"] as const) {
    if (typeof values[key] === "string") values[key] = values[key]!.slice(0, 500);
  }
  const errors: Record<string, string> = {};
  if (!values.athleteSlug) errors.athleteSlug = "Please select an athlete before sending a request.";
  if (!values.athlete) errors.athlete = "Selected athlete is required.";
  if (!values.name) errors.name = "Name is required.";
  if (!values.company) errors.company = "Company or organization is required.";
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Please provide a valid email address.";
  if (!values.campaignType) errors.campaignType = "Campaign type is required.";
  if (!values.objective) errors.objective = "Campaign objective is required.";
  if (!values.deliverables) errors.deliverables = "Select at least one deliverable.";
  if (!values.platforms) errors.platforms = "Select at least one platform or channel.";
  if (!values.usageRights) errors.usageRights = "Please select a content usage plan.";
  if (values.objective && !campaignObjectives.includes(values.objective)) errors.objective = "Please select a valid campaign objective.";
  if (values.deliverables && values.deliverables.split(", ").some((value) => !campaignDeliverables.includes(value))) errors.deliverables = "Please select valid campaign deliverables.";
  if (values.platforms && values.platforms.split(", ").some((value) => !campaignPlatforms.includes(value))) errors.platforms = "Please select valid platforms or channels.";
  if (values.usageRights && !campaignUsageRights.includes(values.usageRights)) errors.usageRights = "Please select a valid content usage plan.";
  if (values.exclusivity && !campaignExclusivityOptions.includes(values.exclusivity)) errors.exclusivity = "Please select a valid exclusivity preference.";
  if (!values.timeline) errors.timeline = "Estimated timeline is required.";
  if (!values.description || values.description.length < 20) errors.description = "Campaign description must be at least 20 characters.";
  if (values.description && values.description.length > 1000) errors.description = "Campaign description must be 1,000 characters or fewer.";
  if (!values.consent) errors.consent = "Consent is required.";
  return Object.keys(errors).length ? { ok: false as const, errors, values } : { ok: true as const, values: values as PartnershipFormValues };
}

export function validateNewsletterForm(form: Partial<NewsletterFormValues>) {
  const values = {
    email: normalizeText(form.email).toLowerCase(),
    firstName: normalizeText(form.firstName),
    interest: normalizeText(form.interest),
    honeypot: normalizeText(form.honeypot),
  };
  const errors: Record<string, string> = {};
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please provide a valid email address.";
  }
  if (values.firstName.length > 80) errors.firstName = "First name must be 80 characters or fewer.";
  if (values.interest.length > 80) errors.interest = "Please select a valid interest.";
  return Object.keys(errors).length ? { ok: false as const, errors, values } : { ok: true as const, values: values as NewsletterFormValues };
}
