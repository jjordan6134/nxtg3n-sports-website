const attributionKey = "nxtg3n_lead_attribution";

export type LeadAttribution = {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
};

function clean(value: string | null) {
  return (value ?? "").trim().slice(0, 500);
}

export function getLeadAttribution(): LeadAttribution {
  const empty = { landingPage: "", referrer: "", utmSource: "", utmMedium: "", utmCampaign: "", utmContent: "" };
  if (typeof window === "undefined") return empty;
  try {
    const stored = window.sessionStorage.getItem(attributionKey);
    if (stored) return { ...empty, ...JSON.parse(stored) } as LeadAttribution;
    const params = new URLSearchParams(window.location.search);
    const attribution = {
      landingPage: clean(`${window.location.pathname}${window.location.search}`),
      referrer: clean(document.referrer),
      utmSource: clean(params.get("utm_source")),
      utmMedium: clean(params.get("utm_medium")),
      utmCampaign: clean(params.get("utm_campaign")),
      utmContent: clean(params.get("utm_content")),
    };
    window.sessionStorage.setItem(attributionKey, JSON.stringify(attribution));
    return attribution;
  } catch {
    return empty;
  }
}
