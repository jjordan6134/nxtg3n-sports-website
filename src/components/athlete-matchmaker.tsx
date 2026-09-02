"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Athlete } from "@/data/athletes";
import { AthletePartnershipDialog } from "@/components/athlete-partnership-form";
import { trackConversion } from "@/lib/analytics";

const all = "All";

export function AthleteMatchmaker({ athletes }: { athletes: Athlete[] }) {
  const positions = useMemo(() => [all, ...new Set(athletes.map((athlete) => athlete.position))], [athletes]);
  const categories = useMemo(() => [all, ...new Set(athletes.flatMap((athlete) => athlete.brandCategories))], [athletes]);
  const [position, setPosition] = useState(all);
  const [category, setCategory] = useState(all);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const matches = athletes.filter((athlete) => (position === all || athlete.position === position) && (category === all || athlete.brandCategories.includes(category)));
  const selected = athletes.filter((athlete) => shortlist.includes(athlete.slug));

  function updateFilter(type: "position" | "category", value: string) {
    if (type === "position") setPosition(value); else setCategory(value);
    trackConversion({ name: "athlete_match_filter", properties: { filter_type: type, filter_value: value } });
  }

  function toggle(athlete: Athlete) {
    const removing = shortlist.includes(athlete.slug);
    const next = removing ? shortlist.filter((slug) => slug !== athlete.slug) : shortlist.length < 4 ? [...shortlist, athlete.slug] : shortlist;
    if (next === shortlist) return;
    setShortlist(next);
    trackConversion({ name: removing ? "athlete_shortlist_remove" : "athlete_shortlist_add", properties: { athlete_slug: athlete.slug, shortlist_size: String(next.length) } });
  }

  const names = selected.map((athlete) => athlete.name).join(", ");

  return <div className="mt-8">
    <div className="grid gap-4 rounded-3xl border border-white/10 bg-[#101722] p-5 md:grid-cols-2">
      <label className="text-sm font-semibold text-white">Position
        <select value={position} onChange={(event) => updateFilter("position", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white">
          {positions.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold text-white">Brand category
        <select value={category} onChange={(event) => updateFilter("category", event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white">
          {categories.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
    </div>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm"><p className="text-[#C7CCD6]"><span className="font-bold text-white">{matches.length}</span> potential match{matches.length === 1 ? "" : "es"} · Select up to four athletes</p>{position !== all || category !== all ? <button type="button" onClick={() => { setPosition(all); setCategory(all); }} className="font-semibold text-[#2AFF7D] hover:text-white">Clear filters</button> : null}</div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{matches.map((athlete) => {
      const active = shortlist.includes(athlete.slug);
      return <article key={athlete.slug} className={`overflow-hidden rounded-2xl border bg-[#101722] ${active ? "border-[#2AFF7D]" : "border-white/10"}`}>
        <div className="relative h-44 bg-[#0B0E11]"><Image src={athlete.imagePath} alt={`${athlete.name} athlete profile`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className={athlete.imageFit === "contain" ? "object-contain" : "object-cover"} style={{ objectPosition: athlete.imagePosition ?? "50% 50%" }} /></div>
        <div className="p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2AFF7D]">{athlete.position} · {athlete.height}</p><h3 className="mt-2 text-xl font-black text-white">{athlete.name}</h3><p className="mt-2 text-sm text-[#C7CCD6]">{athlete.profile}</p><div className="mt-4 flex flex-wrap gap-2">{athlete.brandCategories.slice(0, 2).map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#C7CCD6]">{item}</span>)}</div><div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" aria-pressed={active} disabled={!active && shortlist.length >= 4} onClick={() => toggle(athlete)} className={`rounded-full px-4 py-2 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D] disabled:cursor-not-allowed disabled:opacity-40 ${active ? "bg-[#2AFF7D] text-[#07110B]" : "border border-white/15 text-white hover:bg-white/10"}`}>{active ? "✓ Shortlisted" : "Add to shortlist"}</button><Link href={`/talent/${athlete.slug}`} className="text-xs font-semibold text-white hover:text-[#2AFF7D]">View profile</Link></div></div>
      </article>;
    })}</div>
    {selected.length ? <aside className="sticky bottom-4 z-20 mt-6 rounded-2xl border border-[#2AFF7D]/50 bg-[#0B0E11]/95 p-4 shadow-2xl backdrop-blur" aria-label="Athlete shortlist"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Campaign shortlist · {selected.length}/4</p><p className="mt-1 font-bold text-white">{names}</p></div><AthletePartnershipDialog athlete="the NXTG3N roster" athleteSlug="roster" location="partners_matchmaker" shortlistedAthletes={names} triggerLabel="Request this lineup" onOpen={() => trackConversion({ name: "athlete_shortlist_submit", properties: { athlete_slugs: shortlist.join("|"), shortlist_size: String(shortlist.length) } })} /></div></aside> : null}
  </div>;
}
