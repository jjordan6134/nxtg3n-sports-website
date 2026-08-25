import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | { name: "article_share"; properties: { platform: "facebook" | "x" | "linkedin" | "email" | "copy_link"; slug: string } };

export function trackEvent(event: AnalyticsEvent) {
  return track(event.name, event.properties);
}
