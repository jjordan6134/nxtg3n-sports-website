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
