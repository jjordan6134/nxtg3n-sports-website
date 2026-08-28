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

type MediaEvent =
  | { name: "media_filter_use"; properties: { filter_type: string; filter_value: string } }
  | { name: "media_open"; properties: { media_type: string; media_id: string; athlete_slug: string; location: string } }
  | { name: "media_source_click"; properties: { media_type: string; media_id: string; source_name: string } }
  | { name: "athlete_share"; properties: { athlete_slug: string; share_method: string } }
  | { name: "partnership_cta_click"; properties: { athlete_slug: string; cta_location: string } };

type V4CMediaEvent =
  | { name: "video_preview_click"; properties: { media_id: string; athlete_slug: string; platform: string; location: string } }
  | { name: "video_play"; properties: { media_id: string; athlete_slug: string; platform: string; location: string } }
  | { name: "social_media_open"; properties: { media_id: string; athlete_slug: string; platform: string; location: string } }
  | { name: "interview_open"; properties: { media_id: string; athlete_slug: string; interview_type: string } }
  | { name: "media_kit_view"; properties: { athlete_slug: string } }
  | { name: "media_kit_print"; properties: { athlete_slug: string } }
  | { name: "media_kit_share"; properties: { athlete_slug: string; share_method: string } };

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

export function trackMediaEvent(event: MediaEvent | V4CMediaEvent) {
  try {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.name, event.properties);
    }
  } catch {
  }
}
