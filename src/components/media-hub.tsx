"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { mediaItems, type MediaItem, type MediaType, getAthleteName } from "@/data/media";
import { trackMediaEvent } from "@/lib/analytics";
import { MediaDevelopmentState, SocialMediaCard, VideoHighlight } from "@/components/media-experience";

const mediaTypes: { value: MediaType | "all"; label: string }[] = [
  { value: "all", label: "All media" },
  { value: "article", label: "Articles" },
  { value: "photo", label: "Photos" },
  { value: "highlight", label: "Highlights" },
  { value: "interview", label: "Interviews" },
  { value: "music", label: "Music" },
  { value: "social", label: "Social" },
];

function mediaTypeLabel(type: MediaType) {
  return mediaTypes.find((item) => item.value === type)?.label.replace(/s$/, "") ?? type;
}

export function MediaCard({ item, location = "media_hub" }: { item: MediaItem; location?: string }) {
  const athleteName = getAthleteName(item.athleteSlug);
  return (
    <article className="flex min-h-[18rem] flex-col rounded-[2rem] border border-white/10 bg-[#101722] p-6">
      {item.type === "photo" && item.thumbnail ? <Image src={item.thumbnail} alt={item.altText ?? item.title} width={640} height={360} sizes="(max-width: 768px) 100vw, 24rem" className="mb-5 max-h-64 w-auto max-w-[24rem] self-center rounded-2xl object-contain" /> : <div className="mb-5 flex aspect-video items-center justify-center rounded-2xl border border-[#1F6AE1]/30 bg-[radial-gradient(circle_at_top,_rgba(31,106,225,0.3),_transparent_60%),linear-gradient(135deg,_#101722,_#070B0F)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">{mediaTypeLabel(item.type)}</div>}
      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#2AFF7D]"><span>{mediaTypeLabel(item.type)}</span>{item.featured ? <span className="text-[#C7CCD6]">Featured</span> : null}</div>
      <h3 className="mt-3 text-xl font-black text-white">{item.title}</h3>
      {item.description ? <p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{item.description}</p> : null}
      <div className="mt-auto pt-5 text-xs text-[#C7CCD6]">
        <p>Source: {item.sourceName}{item.credit ? ` · Credit: ${item.credit}` : ""}</p>
        {athleteName ? <Link href={`/talent/${item.athleteSlug}`} onClick={() => trackMediaEvent({ name: "media_open", properties: { media_type: item.type, media_id: item.id, athlete_slug: item.athleteSlug ?? "", location } })} className="mt-3 inline-flex text-sm font-semibold text-[#2AFF7D] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">View {athleteName}</Link> : null}
        <Link href={item.mediaUrl ?? item.sourceUrl} onClick={() => { trackMediaEvent({ name: "media_open", properties: { media_type: item.type, media_id: item.id, athlete_slug: item.athleteSlug ?? "", location } }); if (item.type === "interview") trackMediaEvent({ name: "interview_open", properties: { media_id: item.id, athlete_slug: item.athleteSlug ?? "", interview_type: item.platform ?? "article" } }); }} className="ml-4 inline-flex text-sm font-semibold text-white hover:text-[#2AFF7D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Open media</Link>
        {item.sourceUrl ? <a href={item.sourceUrl} target={item.sourceUrl.startsWith("http") ? "_blank" : undefined} rel={item.sourceUrl.startsWith("http") ? "noreferrer" : undefined} onClick={() => trackMediaEvent({ name: "media_source_click", properties: { media_type: item.type, media_id: item.id, source_name: item.sourceName } })} className="mt-3 block text-[#C7CCD6] underline hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">View source</a> : null}
      </div>
    </article>
  );
}

export function MediaHub() {
  const [athlete, setAthlete] = useState("all");
  const [type, setType] = useState<MediaType | "all">("all");
  const [query, setQuery] = useState("");
  const athleteOptions = Array.from(new Set(mediaItems.map((item) => item.athleteSlug).filter(Boolean))) as string[];
  const filtered = mediaItems.filter((item) => {
    const athleteMatch = athlete === "all" || item.athleteSlug === athlete;
    const typeMatch = type === "all" || item.type === type;
    const queryMatch = !query.trim() || `${item.title} ${getAthleteName(item.athleteSlug) ?? ""}`.toLowerCase().includes(query.trim().toLowerCase());
    return athleteMatch && typeMatch && queryMatch;
  });
  const videoItems = mediaItems.filter((item) => item.embedUrl && ["highlight", "interview", "music"].includes(item.type));
  const socialItems = mediaItems.filter((item) => item.type === "social");

  function changeFilter(filterType: "athlete" | "type", value: string) {
    if (filterType === "athlete") setAthlete(value);
    else setType(value as MediaType | "all");
    trackMediaEvent({ name: "media_filter_use", properties: { filter_type: filterType, filter_value: value } });
  }

  return <div>
    <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-[#101722] p-5 md:grid-cols-[1fr_1fr_1.4fr]">
      <label className="text-sm text-[#C7CCD6]">Filter by athlete<select value={athlete} onChange={(event) => changeFilter("athlete", event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]"><option value="all">All athletes</option>{athleteOptions.map((slug) => <option key={slug} value={slug}>{getAthleteName(slug)}</option>)}</select></label>
      <label className="text-sm text-[#C7CCD6]">Filter by type<select value={type} onChange={(event) => changeFilter("type", event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">{mediaTypes.map((mediaType) => <option key={mediaType.value} value={mediaType.value}>{mediaType.label}</option>)}</select></label>
      <label className="text-sm text-[#C7CCD6]">Search media<input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search titles or athletes" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" /></label>
    </div>
    <p className="mt-5 text-sm text-[#C7CCD6]" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "media item" : "media items"}</p>
    {filtered.length > 0 ? <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <MediaCard key={item.id} item={item} />)}</div> : <div className="mt-5 rounded-[2rem] border border-dashed border-white/15 bg-[#101722] px-6 py-12 text-center"><h2 className="text-2xl font-black text-white">No verified media matches those filters.</h2><p className="mt-3 text-[#C7CCD6]">Try another athlete, media type, or search term.</p></div>}
    <section className="mt-12" aria-labelledby="media-video-heading"><h2 id="media-video-heading" className="text-2xl font-black text-white">Featured video</h2><div className="mt-5 grid gap-6 md:grid-cols-2">{videoItems.length ? videoItems.map((item) => <VideoHighlight key={item.id} item={item} athleteSlug={item.athleteSlug ?? ""} location="media_hub" />) : <MediaDevelopmentState title="Video highlights in development" description="No verified YouTube or Vimeo athlete videos are currently in the repository." />}</div></section>
    <section className="mt-12" aria-labelledby="media-interviews-heading"><h2 id="media-interviews-heading" className="text-2xl font-black text-white">Interviews & Athlete Stories</h2><div className="mt-5 grid gap-6 md:grid-cols-2">{mediaItems.filter((item) => item.type === "interview").length ? mediaItems.filter((item) => item.type === "interview").map((item) => <MediaCard key={item.id} item={item} />) : <MediaDevelopmentState />}</div></section>
    <section className="mt-12" aria-labelledby="media-social-heading"><h2 id="media-social-heading" className="text-2xl font-black text-white">Social media</h2><div className="mt-5 grid gap-6 md:grid-cols-2">{socialItems.length ? socialItems.map((item) => <SocialMediaCard key={item.id} item={item} athleteSlug={item.athleteSlug ?? ""} location="media_hub" />) : <MediaDevelopmentState title="Social media features in development" description="No verified athlete social posts are currently available in the repository." />}</div></section>
  </div>;
}

export function AthleteMediaSection({ athleteSlug }: { athleteSlug: string }) {
  const items = mediaItems.filter((item) => item.athleteSlug === athleteSlug);
  const videoItems = items.filter((item) => item.embedUrl && ["highlight", "interview", "music"].includes(item.type));
  const interviewItems = items.filter((item) => item.type === "interview");
  const storyItems = items.filter((item) => item.type === "article");
  const socialItems = items.filter((item) => item.type === "social");
  if (!items.length) return <section className="rounded-[2rem] border border-dashed border-white/15 bg-[#101722] p-6" aria-labelledby="media-development-heading"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Athlete media</p><h2 id="media-development-heading" className="mt-3 text-2xl font-black text-white">Media profile in development</h2><p className="mt-3 text-[#C7CCD6]">Verified photos, interviews, and video will appear here as they are added to the NXTG3N archive.</p></section>;
  return <section className="rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8" aria-labelledby="athlete-media-heading"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Athlete media</p><h2 id="athlete-media-heading" className="mt-3 text-2xl font-black text-white">Stories connected to this athlete</h2></div><span className="text-sm text-[#C7CCD6]">{items.length} verified {items.length === 1 ? "item" : "items"}</span></div><div className="mt-6 grid gap-6 md:grid-cols-2">{items.map((item) => <MediaCard key={item.id} item={item} location="athlete_profile" />)}</div><div className="mt-8"><h3 className="text-xl font-black text-white">Featured video</h3><div className="mt-4 grid gap-6 md:grid-cols-2">{videoItems.length ? videoItems.map((item) => <VideoHighlight key={item.id} item={item} athleteSlug={athleteSlug} location="athlete_profile" />) : <MediaDevelopmentState title="Video highlights in development" description="No verified athlete video is currently listed for this profile." />}</div></div><div className="mt-8"><h3 className="text-xl font-black text-white">Interviews & Athlete Stories</h3><div className="mt-4 grid gap-6 md:grid-cols-2">{interviewItems.length ? interviewItems.map((item) => <MediaCard key={item.id} item={item} location="athlete_profile" />) : storyItems.length ? storyItems.map((item) => <MediaCard key={item.id} item={item} location="athlete_profile" />) : <MediaDevelopmentState />}</div></div>{socialItems.length ? <div className="mt-8"><h3 className="text-xl font-black text-white">Social media</h3><div className="mt-4 grid gap-6 md:grid-cols-2">{socialItems.map((item) => <SocialMediaCard key={item.id} item={item} athleteSlug={athleteSlug} location="athlete_profile" />)}</div></div> : null}</section>;
}

export function AthleteShare({ athleteSlug, athleteName }: { athleteSlug: string; athleteName: string }) {
  const [status, setStatus] = useState("");
  const url = `https://nxtgnsports.com/talent/${athleteSlug}`;
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: athleteName, url });
        trackMediaEvent({ name: "athlete_share", properties: { athlete_slug: athleteSlug, share_method: "native" } });
      } else {
        await navigator.clipboard.writeText(url);
        setStatus("Profile link copied");
        trackMediaEvent({ name: "athlete_share", properties: { athlete_slug: athleteSlug, share_method: "copy_link" } });
      }
    } catch {
      setStatus("Sharing was cancelled");
    }
  }
  return <button type="button" onClick={share} className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Share Athlete Profile{status ? <span className="ml-2 text-[#2AFF7D]">{status}</span> : null}</button>;
}
