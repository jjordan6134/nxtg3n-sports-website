import { athletes } from "@/data/athletes";

export const runtime = "nodejs";

type FeedStory = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  athleteName: string;
  athleteSlug: string;
};

function decodeXml(value: string) {
  return value
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function readTag(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1].trim()) : "";
}

function safeNewsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function athleteAliases(name: string) {
  return Array.from(new Set([
    name,
    name.replace("J. ", ""),
    name.replace(/[’']/g, ""),
    name.replace("’", "'"),
  ].map((alias) => alias.trim()).filter(Boolean)));
}

function parseFeed(xml: string, roster: typeof athletes): FeedStory[] {
  return Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)).flatMap((match, index) => {
    const item = match[1];
    const title = readTag(item, "title").replace(/\s+-\s+[^-]+$/, "").trim();
    const combined = `${title} ${readTag(item, "description")}`.toLowerCase();
    const athlete = roster.find((candidate) => athleteAliases(candidate.name).some((alias) => combined.includes(alias.toLowerCase())));
    const url = safeNewsUrl(readTag(item, "link"));
    if (!athlete || !url || !/basketball|nba|ncaa|juco|hoops|guard|forward/i.test(combined)) return [];
    const publishedAt = readTag(item, "pubDate");
    return [{
      id: `${athlete.slug}-${publishedAt || index}-${title}`,
      title,
      url,
      source: readTag(item, "source") || "Google News",
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : "",
      athleteName: athlete.name,
      athleteSlug: athlete.slug,
    }];
  });
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  const roster = slug ? athletes.filter((athlete) => athlete.slug === slug) : athletes;
  if (!roster.length) return Response.json({ stories: [], error: "Athlete not found" }, { status: 404 });

  const nameQuery = roster.flatMap((athlete) => athleteAliases(athlete.name)).map((name) => `\"${name}\"`).join(" OR ");
  const query = encodeURIComponent(`(${nameQuery}) basketball when:30d`);
  const feedUrl = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 1800 },
      headers: { "User-Agent": "NXTG3N-Sports-News/1.0" },
    });
    if (!response.ok) throw new Error(`News feed returned ${response.status}`);
    const stories = parseFeed(await response.text(), roster)
      .filter((story, index, all) => all.findIndex((candidate) => candidate.url === story.url) === index)
      .sort((a, b) => Date.parse(b.publishedAt || "0") - Date.parse(a.publishedAt || "0"))
      .slice(0, slug ? 6 : 12);
    return Response.json({ stories, updatedAt: new Date().toISOString() }, {
      headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400" },
    });
  } catch {
    return Response.json({ stories: [], updatedAt: new Date().toISOString(), unavailable: true }, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  }
}
