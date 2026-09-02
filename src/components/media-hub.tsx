"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { mediaItems, type MediaItem, type MediaType, getAthleteName } from "@/data/media";
import { trackMediaEvent } from "@/lib/analytics";
import { EmbeddedMediaPlayer, MediaDevelopmentState, SocialMediaCard } from "@/components/media-experience";

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
      {item.type === "photo" && item.thumbnail ? <Image src={item.thumbnail} alt={item.altText ?? item.title} width={640} height={360} sizes="(max-width: 768px) 100vw, 24rem" className="mb-5 max-h-64 w-auto max-w-[24rem] self-center rounded-2xl object-contain" style={{ objectPosition: item.thumbnailPosition ?? "50% 50%" }} /> : <div className="mb-5 flex aspect-video items-center justify-center rounded-2xl border border-[#1F6AE1]/30 bg-[radial-gradient(circle_at_top,_rgba(31,106,225,0.3),_transparent_60%),linear-gradient(135deg,_#101722,_#070B0F)] text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">{mediaTypeLabel(item.type)}</div>}
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
    <section className="mt-12" aria-labelledby="media-video-heading"><h2 id="media-video-heading" className="text-2xl font-black text-white">Featured video</h2><div className="mt-5 grid gap-6 md:grid-cols-2">{videoItems.length ? videoItems.map((item) => <EmbeddedMediaPlayer key={item.id} item={item} athleteSlug={item.athleteSlug ?? ""} location="media_hub" />) : <MediaDevelopmentState title="Video highlights in development" description="No verified YouTube, Rumble, or Vimeo athlete videos are currently in the repository." />}</div></section>
    <section className="mt-12" aria-labelledby="media-interviews-heading"><h2 id="media-interviews-heading" className="text-2xl font-black text-white">Interviews & Athlete Stories</h2><div className="mt-5 grid gap-6 md:grid-cols-2">{mediaItems.filter((item) => item.type === "interview").length ? mediaItems.filter((item) => item.type === "interview").map((item) => <MediaCard key={item.id} item={item} />) : <MediaDevelopmentState />}</div></section>
    <section className="mt-12" aria-labelledby="media-social-heading"><h2 id="media-social-heading" className="text-2xl font-black text-white">Social media</h2><div className="mt-5 grid gap-6 md:grid-cols-2">{socialItems.length ? socialItems.map((item) => <SocialMediaCard key={item.id} item={item} athleteSlug={item.athleteSlug ?? ""} location="media_hub" />) : <MediaDevelopmentState title="Social media features in development" description="No verified athlete social posts are currently available in the repository." />}</div></section>
  </div>;
}

export function AthleteMediaSection({ athleteSlug }: { athleteSlug: string }) {
  const items = mediaItems.filter((item) => item.athleteSlug === athleteSlug);
  const tabs = [
    { type: "highlight" as const, label: "Highlights" },
    { type: "interview" as const, label: "Interviews" },
    { type: "music" as const, label: "Music" },
    { type: "social" as const, label: "Social" },
  ].filter((tab) => items.some((item) => item.type === tab.type));
  const [activeType, setActiveType] = useState<MediaType>(tabs[0]?.type ?? "highlight");
  const activeTab = tabs.find((tab) => tab.type === activeType) ?? tabs[0];
  const activeItems = activeTab ? items.filter((item) => item.type === activeTab.type).sort((first, second) => (first.featuredPriority ?? Number.MAX_SAFE_INTEGER) - (second.featuredPriority ?? Number.MAX_SAFE_INTEGER)) : [];
  const [activeItemId, setActiveItemId] = useState(activeItems[0]?.id ?? "");
  const activeItem = activeItems.find((item) => item.id === activeItemId) ?? activeItems[0];

  function selectTab(type: MediaType) {
    const nextItems = items.filter((item) => item.type === type).sort((first, second) => (first.featuredPriority ?? Number.MAX_SAFE_INTEGER) - (second.featuredPriority ?? Number.MAX_SAFE_INTEGER));
    setActiveType(type);
    setActiveItemId(nextItems[0]?.id ?? "");
  }

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!tabs.length || !["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];
    selectTab(nextTab.type);
    document.getElementById(`athlete-media-tab-${nextTab.type}`)?.focus();
  }

  if (!tabs.length) return null;
  return <section className="rounded-2xl border border-white/10 bg-[#101722] p-5 sm:p-6" aria-labelledby="athlete-media-heading"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Athlete media</p><h2 id="athlete-media-heading" className="mt-2 text-2xl font-black text-white">Verified media</h2></div><span className="text-sm text-[#C7CCD6]">{tabs.length} {tabs.length === 1 ? "category" : "categories"}</span></div><div role="tablist" aria-label="Athlete media categories" className="mt-5 flex gap-2 overflow-x-auto border-b border-white/10 pb-3">{tabs.map((tab, index) => <button key={tab.type} id={`athlete-media-tab-${tab.type}`} type="button" role="tab" aria-selected={activeTab?.type === tab.type} aria-controls="athlete-media-panel" tabIndex={activeTab?.type === tab.type ? 0 : -1} onClick={() => selectTab(tab.type)} onKeyDown={(event) => handleTabKeyDown(event, index)} className={activeTab?.type === tab.type ? "shrink-0 border-b-2 border-[#2AFF7D] px-2 pb-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" : "shrink-0 px-2 pb-2 text-sm font-semibold text-[#C7CCD6] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]"}>{tab.label}</button>)}</div><div id="athlete-media-panel" role="tabpanel" aria-labelledby={`athlete-media-tab-${activeTab?.type}`} className="mt-5">{activeItem?.embedUrl ? <EmbeddedMediaPlayer key={activeItem.id} item={activeItem} athleteSlug={athleteSlug} location="athlete_profile" /> : activeItem ? <SocialMediaCard item={activeItem} athleteSlug={athleteSlug} location="athlete_profile" /> : <MediaDevelopmentState title="Media in development" description="No verified media is currently listed in this category." />}</div>{activeItems.length > 1 ? <div className="mt-4 flex flex-wrap gap-2" aria-label={`${activeTab?.label} media items`}>{activeItems.map((item) => <button key={item.id} type="button" onClick={() => { setActiveItemId(item.id); trackMediaEvent({ name: "athlete_media_select", properties: { athlete_slug: athleteSlug, platform: item.platform ?? "external", media_title: item.title, category: item.category ?? item.type, featured: item.featured ? "true" : "false", location: "athlete_profile" } }); }} aria-pressed={activeItem?.id === item.id} className={activeItem?.id === item.id ? "border border-[#2AFF7D] bg-[#2AFF7D]/10 px-3 py-2 text-left text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" : "border border-white/15 px-3 py-2 text-left text-sm font-semibold text-[#C7CCD6] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]"}>{item.title}</button>)}</div> : null}</section>;
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
