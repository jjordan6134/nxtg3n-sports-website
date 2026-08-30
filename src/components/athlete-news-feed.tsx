"use client";

import { useEffect, useState } from "react";

type FeedStory = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  athleteName: string;
  athleteSlug: string;
};

export function AthleteNewsFeed({ athleteSlug }: { athleteSlug?: string }) {
  const [stories, setStories] = useState<FeedStory[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "unavailable">("loading");

  useEffect(() => {
    const controller = new AbortController();
    const endpoint = athleteSlug ? `/api/athlete-news?slug=${encodeURIComponent(athleteSlug)}` : "/api/athlete-news";
    fetch(endpoint, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("News request failed")))
      .then((data: { stories?: FeedStory[]; unavailable?: boolean }) => {
        const nextStories = data.stories ?? [];
        setStories(nextStories);
        setStatus(data.unavailable ? "unavailable" : nextStories.length ? "ready" : "empty");
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") setStatus("unavailable");
      });
    return () => controller.abort();
  }, [athleteSlug]);

  return <section className="rounded-[2rem] border border-white/10 bg-[#101722] p-5 sm:p-6" aria-labelledby={athleteSlug ? "athlete-live-news" : "roster-live-news"}>
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Automatically monitored</p><h2 id={athleteSlug ? "athlete-live-news" : "roster-live-news"} className="mt-2 text-2xl font-black text-white">{athleteSlug ? "Latest basketball coverage" : "Client basketball news feed"}</h2></div>
      <p className="text-xs text-[#C7CCD6]">Refreshes every 30 minutes</p>
    </div>
    {status === "loading" ? <div className="mt-5 grid gap-3 md:grid-cols-2" aria-label="Loading athlete news"><div className="h-28 animate-pulse rounded-2xl bg-white/5" /><div className="h-28 animate-pulse rounded-2xl bg-white/5" /></div> : null}
    {status === "ready" ? <div className="mt-5 grid gap-3 md:grid-cols-2">{stories.map((story) => <article key={story.id} className="border-l-2 border-[#1F6AE1] bg-[#0B0E11] p-4"><div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2AFF7D]"><span>{story.athleteName}</span><span aria-hidden="true">•</span><span className="text-[#C7CCD6]">{story.source}</span></div><h3 className="mt-2 text-base font-bold leading-6 text-white">{story.title}</h3>{story.publishedAt ? <time dateTime={story.publishedAt} className="mt-2 block text-xs text-[#C7CCD6]">{new Date(story.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time> : null}<a href={story.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-semibold text-[#2AFF7D] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Read original coverage</a></article>)}</div> : null}
    {status === "empty" ? <p className="mt-5 rounded-2xl border border-dashed border-white/15 bg-[#0B0E11] p-5 text-sm text-[#C7CCD6]">No matching basketball coverage was published in the last 30 days. The feed will keep checking automatically.</p> : null}
    {status === "unavailable" ? <p className="mt-5 rounded-2xl border border-dashed border-white/15 bg-[#0B0E11] p-5 text-sm text-[#C7CCD6]">Live coverage is temporarily unavailable. Verified NXTG3N editorial stories and athlete media remain available.</p> : null}
    <p className="mt-4 text-xs leading-5 text-[#C7CCD6]">External headlines are automatically collected and linked to their original publishers. Inclusion does not imply NXTG3N endorsement.</p>
  </section>;
}
