"use client";

import { useState } from "react";
import { trackMediaEvent } from "@/lib/analytics";
import type { MediaItem } from "@/data/media";

export function VideoHighlight({ item, athleteSlug, location }: { item: MediaItem; athleteSlug: string; location: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  if (!item.embedUrl || !item.platform || !["youtube", "vimeo"].includes(item.platform)) return <MediaDevelopmentState title="Video highlights in development" description="Verified video highlights will appear here when an eligible source is added." />;
  const platform = item.platform;
  const embedUrl = platform === "youtube" ? `${item.embedUrl}${item.embedUrl.includes("?") ? "&" : "?"}autoplay=1&playsinline=1` : item.embedUrl;
  return <article className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">{item.type} video</p>
    <h3 className="mt-3 text-xl font-black text-white">{item.title}</h3>
    <div className="mt-5 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#0B0E11]">
      {loaded && !failed ? <iframe src={embedUrl} title={item.title} className="h-full w-full" loading="lazy" sandbox="allow-scripts allow-same-origin allow-presentation" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen onError={() => setFailed(true)} /> : <button type="button" onClick={() => { setLoaded(true); trackMediaEvent({ name: "video_preview_click", properties: { media_id: item.id, athlete_slug: athleteSlug, platform, location } }); trackMediaEvent({ name: "video_play", properties: { media_id: item.id, athlete_slug: athleteSlug, platform, location } }); }} aria-label={`Play ${item.title}`} className="group relative flex h-full w-full items-end justify-end overflow-hidden bg-cover bg-center text-left text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2AFF7D]" style={item.thumbnail ? { backgroundImage: `url(${item.thumbnail})` } : undefined}><span className="absolute inset-0 bg-[#0B0E11]/70 transition group-hover:bg-[#0B0E11]/55" /><span className="relative z-10 m-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#2AFF7D] bg-[#0B0E11]/80 text-2xl text-white" aria-hidden="true">▶</span></button>}
    </div>
    {failed ? <p role="status" className="mt-3 text-sm text-[#C7CCD6]">This video could not be embedded. Watch it at the source instead.</p> : null}
    <a href={item.originalUrl ?? item.mediaUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-[#2AFF7D] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Watch on YouTube</a>
  </article>;
}

export function SocialMediaCard({ item, athleteSlug, location }: { item: MediaItem; athleteSlug: string; location: string }) {
  return <article className="rounded-[2rem] border border-white/10 bg-[#101722] p-6"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">{item.platform ?? "Social"} {item.socialPostType ?? "post"}</p><h3 className="mt-3 text-xl font-black text-white">{item.title}</h3>{item.description ? <p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{item.description}</p> : null}<p className="mt-4 text-sm text-[#C7CCD6]">{athleteSlug ? `Athlete: ${athleteSlug}` : "Verified social source"}</p><a href={item.originalUrl} target="_blank" rel="noreferrer" onClick={() => trackMediaEvent({ name: "social_media_open", properties: { media_id: item.id, athlete_slug: athleteSlug, platform: item.platform ?? "external", location } })} className="mt-5 inline-flex text-sm font-semibold text-[#2AFF7D] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">View on platform</a></article>;
}

export function MediaDevelopmentState({ title = "Interviews & Athlete Stories in development", description = "Verified interviews, video, and audio sources will appear here when added to the NXTG3N archive." }: { title?: string; description?: string }) {
  return <div className="rounded-[2rem] border border-dashed border-white/15 bg-[#101722] p-6"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Media archive</p><h2 className="mt-3 text-2xl font-black text-white">{title}</h2><p className="mt-3 text-[#C7CCD6]">{description}</p></div>;
}

export function MediaKitControls({ athleteSlug, canonicalUrl }: { athleteSlug: string; canonicalUrl: string }) {
  const [status, setStatus] = useState("");
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: "NXTG3N Sports athlete media kit", url: canonicalUrl });
        trackMediaEvent({ name: "media_kit_share", properties: { athlete_slug: athleteSlug, share_method: "native" } });
      } else {
        await navigator.clipboard.writeText(canonicalUrl);
        setStatus("Link copied");
        trackMediaEvent({ name: "media_kit_share", properties: { athlete_slug: athleteSlug, share_method: "copy_link" } });
      }
    } catch {
      setStatus("Sharing cancelled");
    }
  }
  function printKit() {
    trackMediaEvent({ name: "media_kit_print", properties: { athlete_slug: athleteSlug } });
    window.print();
  }
  return <div className="media-kit-controls flex flex-wrap gap-3"><button type="button" onClick={printKit} className="rounded-full bg-[#1F6AE1] px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Print or Save as PDF</button><button type="button" onClick={share} className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Share media kit</button>{status ? <span role="status" className="self-center text-sm text-[#2AFF7D]">{status}</span> : null}</div>;
}
