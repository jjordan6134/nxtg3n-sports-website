"use client";

import { useEffect, useState } from "react";
import { trackMediaEvent } from "@/lib/analytics";

export function MediaKitControls({ athleteSlug, canonicalUrl }: { athleteSlug: string; canonicalUrl: string }) {
  const [status, setStatus] = useState("");
  useEffect(() => {
    trackMediaEvent({ name: "media_kit_view", properties: { athlete_slug: athleteSlug } });
  }, [athleteSlug]);
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
  function printKit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    window.print();
    trackMediaEvent({ name: "media_kit_print", properties: { athlete_slug: athleteSlug } });
  }
  return <div className="media-kit-controls flex flex-wrap gap-3"><button type="button" onClick={printKit} className="rounded-full bg-[#1F6AE1] px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Print or Save as PDF</button><button type="button" onClick={share} className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Share media kit</button>{status ? <span role="status" className="self-center text-sm text-[#2AFF7D]">{status}</span> : null}</div>;
}
