import type { MetadataRoute } from "next";
import { newsItems } from "@/data/news";
import { athletes } from "@/data/athletes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nxtgnsports.com";
  const staticRoutes = ["", "/news", "/resources", "/talent", "/services", "/partners", "/media", "/about", "/apply", "/contact", "/privacy", "/terms", "/editorial-standards"];

  const articleRoutes = newsItems.map((item) => `/news/${item.slug}`);
  const athleteRoutes = athletes.map((athlete) => `/talent/${athlete.slug}`);
  const oneSheetRoutes = athletes.map((athlete) => `/talent/${athlete.slug}/one-sheet`);

  return [...staticRoutes, ...articleRoutes, ...athleteRoutes, ...oneSheetRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
