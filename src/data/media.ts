import { athletes } from "@/data/athletes";
import { newsItems } from "@/data/news";

export type MediaType = "photo" | "video" | "interview" | "article";
export type MediaPlatform = "youtube" | "vimeo" | "instagram" | "tiktok" | "x" | "external";
export type SocialPostType = "post" | "reel" | "short" | "video" | "story";

export type MediaItem = {
  id: string;
  athleteSlug?: string;
  type: MediaType;
  platform?: MediaPlatform;
  title: string;
  description?: string;
  thumbnail?: string;
  mediaUrl?: string;
  originalUrl?: string;
  embedUrl?: string;
  sourceName: string;
  sourceUrl: string;
  credit?: string;
  publishedDate?: string;
  altText?: string;
  featured?: boolean;
  featuredPriority?: number;
  duration?: string;
  interviewGuest?: string;
  interviewer?: string;
  transcript?: string;
  socialPostType?: SocialPostType;
  sponsorSafe?: boolean;
};

const allowedHosts: Record<MediaPlatform, string[]> = {
  youtube: ["youtube.com", "www.youtube.com", "youtu.be", "www.youtube-nocookie.com"],
  vimeo: ["vimeo.com", "www.vimeo.com", "player.vimeo.com"],
  instagram: ["instagram.com", "www.instagram.com"],
  tiktok: ["tiktok.com", "www.tiktok.com"],
  x: ["x.com", "www.x.com", "twitter.com", "www.twitter.com"],
  external: [],
};

export function parseMediaUrl(value: string, platform: MediaPlatform, externalHostAllowlist: string[] = []): { originalUrl: string; embedUrl?: string } | null {
  try {
    const url = new URL(value);
    const hostAllowlist = platform === "external" ? externalHostAllowlist : allowedHosts[platform];
    if (url.protocol !== "https:" || !hostAllowlist.includes(url.hostname.toLowerCase())) return null;
    if (platform === "youtube") {
      const videoId = url.hostname.includes("youtu.be") ? url.pathname.slice(1) : url.searchParams.get("v") ?? url.pathname.match(/\/shorts\/([^/]+)/)?.[1];
      return videoId && /^[\w-]{11}$/.test(videoId) ? { originalUrl: url.toString(), embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}` } : null;
    }
    if (platform === "vimeo") {
      const videoId = url.pathname.match(/\/(\d+)(?:$|\/)/)?.[1];
      return videoId ? { originalUrl: url.toString(), embedUrl: `https://player.vimeo.com/video/${videoId}?dnt=1` } : null;
    }
    return { originalUrl: url.toString() };
  } catch {
    return null;
  }
}

const athletePhotoItems: MediaItem[] = athletes.map((athlete, index) => ({
  id: `photo-${athlete.slug}`,
  athleteSlug: athlete.slug,
  type: "photo",
  title: `${athlete.name} athlete photo`,
  description: "Verified client photo from the NXTG3N athlete archive.",
  thumbnail: athlete.imagePath,
  mediaUrl: athlete.imagePath,
  originalUrl: athlete.imagePath,
  sourceName: "NXTG3N Sports",
  sourceUrl: `/talent/${athlete.slug}`,
  altText: athlete.slug === "marquis-carver-smith" ? `${athlete.name} action photo` : `${athlete.name} athlete photo`,
  featured: index < 3,
  featuredPriority: index + 1,
  sponsorSafe: true,
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
    originalUrl: `/news/${article.slug}`,
    sourceName: "NXTG3N Sports",
    sourceUrl: `/news/${article.slug}`,
    credit: article.author,
    publishedDate: article.publishedAt || undefined,
    altText: article.title,
    sponsorSafe: true,
  };
}).filter((item): item is NonNullable<typeof item> => item !== null));

export const mediaItems: MediaItem[] = [...athletePhotoItems, ...articleMediaItems];

export function getMediaForAthlete(athleteSlug: string) {
  return mediaItems.filter((item) => item.athleteSlug === athleteSlug);
}

export function getAthleteName(athleteSlug?: string) {
  return athletes.find((athlete) => athlete.slug === athleteSlug)?.name;
}

export function getLatestMediaDate(athleteSlug: string) {
  return mediaItems
    .filter((item) => item.athleteSlug === athleteSlug && item.publishedDate)
    .map((item) => item.publishedDate as string)
    .sort()
    .at(-1);
}
