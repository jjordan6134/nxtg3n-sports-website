import { athletes } from "@/data/athletes";
import { newsItems } from "@/data/news";

export type MediaType = "photo" | "highlight" | "interview" | "music" | "social" | "article";
export type MediaPlatform = "youtube" | "vimeo" | "rumble" | "direct" | "instagram" | "tiktok" | "x" | "external";
export type SocialPostType = "post" | "reel" | "short" | "video" | "story";
export type EmbedStatus = "embedded" | "fallback";

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
  actionLabel?: string;
  videoId?: string;
  publisherId?: string;
  thumbnailUrl?: string;
  playerTitle?: string;
  category?: MediaType;
  embedStatus?: EmbedStatus;
  fallbackUrl?: string;
};

const allowedHosts: Record<MediaPlatform, string[]> = {
  youtube: ["youtube.com", "www.youtube.com", "youtu.be", "www.youtube-nocookie.com"],
  vimeo: ["vimeo.com", "www.vimeo.com", "player.vimeo.com"],
  rumble: ["rumble.com", "www.rumble.com"],
  direct: [],
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
    if (platform === "rumble") {
      const videoId = url.pathname.match(/\/(v[\w-]+)(?:-|\/|$)/)?.[1];
      return videoId ? { originalUrl: url.toString() } : null;
    }
    if (platform === "direct") return url.pathname.match(/\.(mp4|webm)$/i) ? { originalUrl: url.toString(), embedUrl: url.toString() } : null;
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

const danielWondieMediaItems: MediaItem[] = [
  {
    id: "daniel-wondie-worcester-state-film",
    athleteSlug: "daniel-wondie",
    type: "highlight",
    platform: "youtube",
    title: "Daniel Wondie — Worcester State 2025–2026 Film",
    mediaUrl: "https://www.youtube.com/watch?v=HN3XhRxwrLQ",
    originalUrl: "https://www.youtube.com/watch?v=HN3XhRxwrLQ",
    thumbnail: "https://i.ytimg.com/vi/HN3XhRxwrLQ/hqdefault.jpg",
    embedUrl: "https://www.youtube-nocookie.com/embed/HN3XhRxwrLQ",
    sourceName: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=HN3XhRxwrLQ",
    sponsorSafe: true,
  },
  {
    id: "daniel-wondie-green-light",
    athleteSlug: "daniel-wondie",
    type: "music",
    platform: "youtube",
    title: "Daniel Wondie — Green Light",
    description: "Athlete lifestyle and creative content.",
    mediaUrl: "https://www.youtube.com/watch?v=ZHNBhRdcIi0&list=OLAK5uy_kki3h_LxQmhNm2yb8S6zb9WaEOOSxJFzU",
    originalUrl: "https://www.youtube.com/watch?v=ZHNBhRdcIi0&list=OLAK5uy_kki3h_LxQmhNm2yb8S6zb9WaEOOSxJFzU",
    thumbnail: "https://i.ytimg.com/vi/ZHNBhRdcIi0/hqdefault.jpg",
    embedUrl: "https://www.youtube-nocookie.com/embed/ZHNBhRdcIi0",
    sourceName: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=ZHNBhRdcIi0&list=OLAK5uy_kki3h_LxQmhNm2yb8S6zb9WaEOOSxJFzU",
    sponsorSafe: true,
  },
  {
    id: "daniel-wondie-60-seconds",
    athleteSlug: "daniel-wondie",
    type: "interview",
    platform: "youtube",
    title: "60 Seconds With Daniel Wondie",
    mediaUrl: "https://www.youtube.com/shorts/PZf3ToLgMhw",
    originalUrl: "https://www.youtube.com/shorts/PZf3ToLgMhw",
    thumbnail: "https://i.ytimg.com/vi/PZf3ToLgMhw/hqdefault.jpg",
    embedUrl: "https://www.youtube-nocookie.com/embed/PZf3ToLgMhw",
    sourceName: "YouTube",
    sourceUrl: "https://www.youtube.com/shorts/PZf3ToLgMhw",
    socialPostType: "short",
    sponsorSafe: true,
  },
  {
    id: "daniel-wondie-youtube-channel",
    athleteSlug: "daniel-wondie",
    type: "social",
    platform: "youtube",
    title: "Daniel Wondie Hoops",
    mediaUrl: "https://www.youtube.com/@DanielWondieHoops",
    originalUrl: "https://www.youtube.com/@DanielWondieHoops",
    sourceName: "YouTube",
    sourceUrl: "https://www.youtube.com/@DanielWondieHoops",
    sponsorSafe: true,
  },
  {
    id: "daniel-wondie-instagram-post",
    athleteSlug: "daniel-wondie",
    type: "social",
    platform: "instagram",
    title: "Daniel Wondie on Instagram",
    mediaUrl: "https://www.instagram.com/p/DTChGgvgJtD/",
    originalUrl: "https://www.instagram.com/p/DTChGgvgJtD/",
    sourceName: "Instagram",
    sourceUrl: "https://www.instagram.com/p/DTChGgvgJtD/",
    socialPostType: "post",
    sponsorSafe: true,
  },
];

const demarcusBarrMediaItems: MediaItem[] = [
  {
    id: "demarcus-barr-rumble-steal-slam",
    athleteSlug: "demarcus-barr",
    type: "highlight",
    platform: "rumble",
    title: "De’Marcus Barr Incredible Steal & Breakaway Slam",
    description: "De’Marcus Barr creates the turnover and finishes the play with an explosive breakaway slam.",
    mediaUrl: "https://rumble.com/v7esk7i-demarcus-barr-incredible-steal-and-breakaway-slam-semo-basketball-commit.html",
    originalUrl: "https://rumble.com/v7esk7i-demarcus-barr-incredible-steal-and-breakaway-slam-semo-basketball-commit.html",
    sourceName: "Rumble",
    sourceUrl: "https://rumble.com/v7esk7i-demarcus-barr-incredible-steal-and-breakaway-slam-semo-basketball-commit.html",
    videoId: "v7cm7a0",
    thumbnailUrl: "https://hugh.cdn.rumble.cloud/video/fwe2/4b/s8/1/o/9/z/T/o9zTA.qR4e-small-DeMarcus-Barr-Incredible-St..jpg",
    thumbnail: "https://hugh.cdn.rumble.cloud/video/fwe2/4b/s8/1/o/9/z/T/o9zTA.qR4e-small-DeMarcus-Barr-Incredible-St..jpg",
    embedUrl: "https://rumble.com/embed/v7cm7a0/",
    embedStatus: "embedded",
    fallbackUrl: "https://rumble.com/v7esk7i-demarcus-barr-incredible-steal-and-breakaway-slam-semo-basketball-commit.html",
    actionLabel: "Watch on Rumble",
    sponsorSafe: true,
  },
  {
    id: "demarcus-barr-wane-interview",
    athleteSlug: "demarcus-barr",
    type: "interview",
    platform: "external",
    title: "De’Marcus Barr Full Interview at South Side Archers Boys Basketball Practice",
    description: "De’Marcus Barr discusses basketball during an interview at South Side Archers boys basketball practice.",
    mediaUrl: "https://www.wane.com/video/demarcus-barr-full-interview-at-south-side-archers-boys-basketball-practice-on-3425/10509144/",
    originalUrl: "https://www.wane.com/video/demarcus-barr-full-interview-at-south-side-archers-boys-basketball-practice-on-3425/10509144/",
    sourceName: "WANE 15",
    sourceUrl: "https://www.wane.com/video/demarcus-barr-full-interview-at-south-side-archers-boys-basketball-practice-on-3425/10509144/",
    embedStatus: "fallback",
    fallbackUrl: "https://www.wane.com/video/demarcus-barr-full-interview-at-south-side-archers-boys-basketball-practice-on-3425/10509144/",
    publishedDate: "2025-03-04",
    actionLabel: "Watch Full Interview",
    sponsorSafe: true,
  },
  {
    id: "demarcus-barr-instagram-profile",
    athleteSlug: "demarcus-barr",
    type: "social",
    platform: "instagram",
    title: "Follow De’Marcus Barr on Instagram",
    mediaUrl: "https://www.instagram.com/5star_jackson/",
    originalUrl: "https://www.instagram.com/5star_jackson/",
    sourceName: "Instagram",
    sourceUrl: "https://www.instagram.com/5star_jackson/",
    actionLabel: "Open Instagram",
    sponsorSafe: true,
  },
  {
    id: "demarcus-barr-x-2021343694960591154",
    athleteSlug: "demarcus-barr",
    type: "social",
    platform: "x",
    title: "View De’Marcus Barr’s post on X",
    mediaUrl: "https://x.com/D_Barr13/status/2021343694960591154",
    originalUrl: "https://x.com/D_Barr13/status/2021343694960591154",
    sourceName: "X @D_Barr13",
    sourceUrl: "https://x.com/D_Barr13/status/2021343694960591154",
    actionLabel: "View post on X",
    sponsorSafe: true,
  },
  {
    id: "demarcus-barr-x-2016576771731120561",
    athleteSlug: "demarcus-barr",
    type: "social",
    platform: "x",
    title: "View De’Marcus Barr’s post on X",
    mediaUrl: "https://x.com/D_Barr13/status/2016576771731120561",
    originalUrl: "https://x.com/D_Barr13/status/2016576771731120561",
    sourceName: "X @D_Barr13",
    sourceUrl: "https://x.com/D_Barr13/status/2016576771731120561",
    actionLabel: "View post on X",
    sponsorSafe: true,
  },
  {
    id: "demarcus-barr-x-1996982271182569614",
    athleteSlug: "demarcus-barr",
    type: "social",
    platform: "x",
    title: "View De’Marcus Barr’s post on X",
    mediaUrl: "https://x.com/D_Barr13/status/1996982271182569614",
    originalUrl: "https://x.com/D_Barr13/status/1996982271182569614",
    sourceName: "X @D_Barr13",
    sourceUrl: "https://x.com/D_Barr13/status/1996982271182569614",
    actionLabel: "View post on X",
    sponsorSafe: true,
  },
  {
    id: "demarcus-barr-x-1986206650089230494",
    athleteSlug: "demarcus-barr",
    type: "social",
    platform: "x",
    title: "View De’Marcus Barr’s post on X",
    mediaUrl: "https://x.com/D_Barr13/status/1986206650089230494",
    originalUrl: "https://x.com/D_Barr13/status/1986206650089230494",
    sourceName: "X @D_Barr13",
    sourceUrl: "https://x.com/D_Barr13/status/1986206650089230494",
    actionLabel: "View post on X",
    sponsorSafe: true,
  },
];

const darrionBrooksMediaItems: MediaItem[] = [
  {
    id: "darrion-brooks-rumble-jam",
    athleteSlug: "darrion-brooks",
    type: "highlight",
    platform: "rumble",
    title: "Darrion Brooks With the Jam! | Explosive Basketball Highlight",
    description: "Darrion Brooks rises and throws it down with authority for an explosive finish at the rim. The Allegany College of Maryland wing displays his athleticism, energy and finishing ability in this powerful basketball highlight.",
    mediaUrl: "https://rumble.com/v7esmr0-darrion-brooks-with-the-jam-explosive-basketball-highlight.html",
    originalUrl: "https://rumble.com/v7esmr0-darrion-brooks-with-the-jam-explosive-basketball-highlight.html",
    sourceName: "Rumble",
    sourceUrl: "https://rumble.com/v7esmr0-darrion-brooks-with-the-jam-explosive-basketball-highlight.html",
    publisherId: "u4o7brs",
    videoId: "v7cm9ti",
    playerTitle: "Darrion Brooks with the jam — Rumble basketball highlight",
    embedUrl: "https://rumble.com/embed/v7cm9ti/?pub=u4o7brs",
    embedStatus: "embedded",
    fallbackUrl: "https://rumble.com/v7esmr0-darrion-brooks-with-the-jam-explosive-basketball-highlight.html",
    actionLabel: "Watch on Rumble",
    sponsorSafe: true,
  },
  {
    id: "darrion-brooks-instagram-profile",
    athleteSlug: "darrion-brooks",
    type: "social",
    platform: "instagram",
    title: "Follow Darrion Brooks on Instagram",
    mediaUrl: "https://www.instagram.com/dlb.xxiii/",
    originalUrl: "https://www.instagram.com/dlb.xxiii/",
    sourceName: "Instagram @dlb.xxiii",
    sourceUrl: "https://www.instagram.com/dlb.xxiii/",
    actionLabel: "Open Instagram",
    sponsorSafe: true,
  },
  {
    id: "darrion-brooks-x-profile",
    athleteSlug: "darrion-brooks",
    type: "social",
    platform: "x",
    title: "Follow Darrion Brooks on X",
    mediaUrl: "https://x.com/dlb_xxiii",
    originalUrl: "https://x.com/dlb_xxiii",
    sourceName: "X @dlb_xxiii",
    sourceUrl: "https://x.com/dlb_xxiii",
    actionLabel: "Open X",
    sponsorSafe: true,
  },
];

export const mediaItems: MediaItem[] = [...athletePhotoItems, ...articleMediaItems, ...danielWondieMediaItems, ...demarcusBarrMediaItems, ...darrionBrooksMediaItems];

const trustedEmbedHosts = new Set(["www.youtube-nocookie.com", "www.youtube.com", "rumble.com", "player.vimeo.com"]);

export function validateMediaItems(items: MediaItem[]) {
  const sourceUrls = new Set<string>();
  for (const item of items) {
    if (!item.athleteSlug) continue;
    const sourceKey = `${item.athleteSlug}:${item.sourceUrl}`;
    if (sourceUrls.has(sourceKey)) throw new Error(`Duplicate media source URL for ${item.athleteSlug}`);
    sourceUrls.add(sourceKey);
    if (!item.embedUrl) {
      if (item.embedStatus === "fallback" && !item.fallbackUrl) throw new Error(`Fallback media requires a fallback URL: ${item.id}`);
      continue;
    }
    const embed = new URL(item.embedUrl);
    if (item.platform === "direct") {
      if (embed.protocol !== "https:" || !/\.(mp4|webm)$/i.test(embed.pathname)) throw new Error(`Invalid direct media URL: ${item.id}`);
      continue;
    }
    if (embed.protocol !== "https:" || !trustedEmbedHosts.has(embed.hostname)) throw new Error(`Untrusted media embed URL: ${item.id}`);
    if (item.platform === "rumble" && !/^\/embed\/v[\w-]+\/$/.test(embed.pathname)) throw new Error(`Invalid Rumble embed URL: ${item.id}`);
    if (item.platform === "youtube" && !/^\/embed\/[\w-]{11}$/.test(embed.pathname)) throw new Error(`Invalid YouTube embed URL: ${item.id}`);
    if (item.embedUrl === item.sourceUrl) throw new Error(`Media embed URL cannot be a webpage URL: ${item.id}`);
  }
}

if (process.env.NODE_ENV !== "production") validateMediaItems(mediaItems);

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
