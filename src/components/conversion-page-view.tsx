"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";

type ViewEvent =
  | { name: "athlete_profile_view"; properties: { athlete_slug: string } }
  | { name: "news_article_view"; properties: { article_slug: string; related_athlete: string } }
  | { name: "partners_page_view"; properties: { page_name: string } };

export function ConversionPageView({ event }: { event: ViewEvent }) {
  useEffect(() => {
    trackConversion(event);
  }, [event]);
  return null;
}
