import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | { name: "article_share"; properties: { platform: "facebook" | "x" | "linkedin" | "email" | "copy_link"; slug: string } };

type ConversionEvent =
  | { name: "cta_click"; properties: { cta_name: string; cta_location: string; destination: string } }
  | { name: "newsletter_signup"; properties: { signup_location: string; interest: string } }
  | { name: "athlete_application_start"; properties: Record<string, never> }
  | { name: "athlete_application_submit"; properties: Record<string, never> }
  | { name: "partnership_inquiry_start"; properties: { athlete_slug: string; form_location: string } }
  | { name: "partnership_inquiry_submit"; properties: { athlete_slug: string; form_location: string; campaign_type: string } }
  | { name: "athlete_profile_view"; properties: { athlete_slug: string } }
  | { name: "news_article_view"; properties: { article_slug: string; related_athlete: string } }
  | { name: "partners_page_view"; properties: { page_name: string } }
  | { name: "athlete_match_filter"; properties: { filter_type: string; filter_value: string } }
  | { name: "athlete_shortlist_add"; properties: { athlete_slug: string; shortlist_size: string } }
  | { name: "athlete_shortlist_remove"; properties: { athlete_slug: string; shortlist_size: string } }
  | { name: "athlete_shortlist_compare"; properties: { athlete_slugs: string; shortlist_size: string } }
  | { name: "athlete_shortlist_submit"; properties: { athlete_slugs: string; shortlist_size: string } }
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
  | { name: "athlete_video_preview"; properties: { athlete_slug: string; platform: string; media_title: string; category: string; location: string } }
  | { name: "athlete_video_play"; properties: { athlete_slug: string; platform: string; media_title: string; category: string; location: string } }
  | { name: "athlete_video_complete"; properties: { athlete_slug: string; platform: string; media_title: string; category: string; location: string } }
  | { name: "athlete_video_external_fallback"; properties: { athlete_slug: string; platform: string; media_title: string; category: string; location: string } }
  | { name: "athlete_social_open"; properties: { athlete_slug: string; platform: string; media_title: string; category: string; location: string } }
  | { name: "athlete_source_open"; properties: { athlete_slug: string; publisher: string; media_title: string; category: string; location: string } }
  | { name: "athlete_media_select"; properties: { athlete_slug: string; platform: string; media_title: string; category: string; featured: string; location: string } }
  | { name: "rumble_media_open"; properties: { media_id: string; athlete_slug: string; location: string } }
  | { name: "wane_interview_open"; properties: { media_id: string; athlete_slug: string; location: string } }
  | { name: "instagram_profile_open"; properties: { media_id: string; athlete_slug: string; location: string } }
  | { name: "x_post_open"; properties: { media_id: string; athlete_slug: string; location: string } }
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
    track(event.name, event.properties);
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.name, event.properties);
    }
  } catch {
  }
}

export function trackMediaEvent(event: MediaEvent | V4CMediaEvent) {
  try {
    track(event.name, event.properties);
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.name, event.properties);
    }
  } catch {
  }
}
