"use client";

import { useEffect, useState } from "react";
import { trackMediaEvent } from "@/lib/analytics";

export function AthleteOneSheetControls({ athleteSlug, athleteName, canonicalUrl }: { athleteSlug: string; athleteName: string; canonicalUrl: string }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    trackMediaEvent({ name: "one_sheet_view", properties: { athlete_slug: athleteSlug } });
  }, [athleteSlug]);

  function download() {
    trackMediaEvent({ name: "one_sheet_download", properties: { athlete_slug: athleteSlug } });
    window.print();
  }

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: `${athleteName} — NXTG3N Sponsor One-Sheet`, url: canonicalUrl });
        trackMediaEvent({ name: "one_sheet_share", properties: { athlete_slug: athleteSlug, share_method: "native" } });
      } else {
        await navigator.clipboard.writeText(canonicalUrl);
        setStatus("One-sheet link copied");
        trackMediaEvent({ name: "one_sheet_share", properties: { athlete_slug: athleteSlug, share_method: "copy_link" } });
      }
    } catch {
      setStatus("Sharing cancelled");
    }
  }

  return <div className="one-sheet-controls flex flex-wrap items-center gap-3"><button type="button" onClick={download} className="rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2E7BFF]">Download / Save PDF</button><button type="button" onClick={share} className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Share one-sheet</button>{status ? <span role="status" className="text-sm text-[#2AFF7D]">{status}</span> : null}</div>;
}
