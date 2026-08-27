import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | { name: "article_share"; properties: { platform: "facebook" | "x" | "linkedin" | "email" | "copy_link"; slug: string } };

type ConversionEvent =
  | { name: "cta_click"; properties: { cta_name: string; cta_location: string; destination: string } }
  | { name: "newsletter_signup"; properties: { signup_location: string; interest: string } }
  | { name: "athlete_application_start"; properties: Record<string, never> }
  | { name: "athlete_application_submit"; properties: Record<string, never> }
  | { name: "partnership_inquiry_start"; properties: Record<string, never> }
  | { name: "partnership_inquiry_submit"; properties: Record<string, never> }
  | { name: "contact_form_submit"; properties: Record<string, never> };

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, parameters: Record<string, string>) => void;
  }
}

export function trackEvent(event: AnalyticsEvent) {
  return track(event.name, event.properties);
}

export function trackConversion(event: ConversionEvent) {
  try {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.name, event.properties);
    }
  } catch {
  }
}
