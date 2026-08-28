import { athletes } from "@/data/athletes";
import { newsItems } from "@/data/news";

export type MediaType = "photo" | "video" | "interview" | "article";

export type MediaItem = {
  id: string;
  athleteSlug?: string;
  type: MediaType;
  title: string;
  description?: string;
  thumbnail?: string;
  mediaUrl?: string;
  embedUrl?: string;
  sourceName: string;
  sourceUrl: string;
  credit?: string;
  publishedDate?: string;
  altText?: string;
  featured?: boolean;
};

const athletePhotoItems: MediaItem[] = athletes.map((athlete, index) => ({
  id: `photo-${athlete.slug}`,
  athleteSlug: athlete.slug,
  type: "photo",
  title: `${athlete.name} athlete photo`,
  description: "Verified client photo from the NXTG3N athlete archive.",
  thumbnail: athlete.imagePath,
  mediaUrl: athlete.imagePath,
  sourceName: "NXTG3N Sports",
  sourceUrl: `/talent/${athlete.slug}`,
  altText: athlete.slug === "marquis-carver-smith" ? `${athlete.name} action photo` : `${athlete.name} athlete photo`,
  featured: index < 3,
}));

const articleMediaItems = athletes.flatMap((athlete) => athlete.relatedNews.map((slug) => {
  const article = newsItems.find((item) => item.slug === slug);
  if (!article) return null;
  return {
    id: `article-${athlete.slug}-${article.slug}`,
    athleteSlug: athlete.slug,
    type: "article" as const,
    title: article.title,
    description: article.summary,
    mediaUrl: `/news/${article.slug}`,
    sourceName: "NXTG3N Sports",
    sourceUrl: `/news/${article.slug}`,
    credit: article.author,
    publishedDate: article.publishedAt || undefined,
    altText: article.title,
  };
}).filter((item): item is NonNullable<typeof item> => item !== null));

export const mediaItems: MediaItem[] = [...athletePhotoItems, ...articleMediaItems];

export function getMediaForAthlete(athleteSlug: string) {
  return mediaItems.filter((item) => item.athleteSlug === athleteSlug);
}

export function getAthleteName(athleteSlug?: string) {
  return athletes.find((athlete) => athlete.slug === athleteSlug)?.name;
}
