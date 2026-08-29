"use client";

import type { Athlete } from "@/data/athletes";
import { AthletePartnershipDialog } from "@/components/athlete-partnership-form";
import { trackMediaEvent } from "@/lib/analytics";

export function AthleteSnapshot({ athlete }: { athlete: Athlete }) {
  const additionalInformation = [
    athlete.highlights && `Highlights: ${athlete.highlights}`,
    athlete.previousNote && `Previous note: ${athlete.previousNote}`,
    athlete.previousPrograms && `Previous programs: ${athlete.previousPrograms}`,
    athlete.previousTeams && `Previous teams/events: ${athlete.previousTeams}`,
    athlete.note,
  ].filter(Boolean);

  return <section className="grid gap-6 rounded-2xl border border-white/10 bg-[#101722] p-5 md:grid-cols-2 md:p-6" aria-labelledby="athlete-snapshot-heading">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Athlete snapshot</p>
      <h2 id="athlete-snapshot-heading" className="mt-2 text-2xl font-black text-white">Profile and verified details</h2>
      <p className="mt-3 text-sm leading-7 text-[#C7CCD6]">{athlete.bio}</p>
      <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-white">Verified highlights</h3>
      <ul className="mt-3 grid gap-2 text-sm text-[#C7CCD6] sm:grid-cols-2">
        {athlete.identity.map((item) => <li key={item} className="flex items-start gap-2"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2AFF7D]" aria-hidden="true" />{item}</li>)}
      </ul>
    </div>
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Important statistics</h3>
      <dl className="mt-3 grid grid-cols-2 gap-3">
        {athlete.keyStats.map((stat) => <div key={stat.label} className="border-l-2 border-[#1F6AE1] bg-[#0B0E11] px-3 py-2"><dt className="text-xs uppercase tracking-[0.12em] text-[#C7CCD6]">{stat.label}</dt><dd className="mt-1 text-sm font-bold text-white">{stat.value}</dd></div>)}
      </dl>
      <details className="mt-5 border-t border-white/10 pt-4"><summary className="cursor-pointer text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Career timeline</summary><ol className="mt-3 space-y-3 text-sm text-[#C7CCD6]">{athlete.timeline.map((item) => <li key={item.year}><span className="font-bold text-[#2AFF7D]">{item.year}</span><span className="ml-3">{item.text}</span></li>)}</ol></details>
      <details className="mt-3 border-t border-white/10 pt-4"><summary className="cursor-pointer text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">NIL brand categories</summary><div className="mt-3 flex flex-wrap gap-2">{athlete.brandCategories.map((category) => <span key={category} className="border border-[#1F6AE1]/40 bg-[#1F6AE1]/10 px-2 py-1 text-xs font-semibold text-[#DDEAFE]">{category}</span>)}</div></details>
      {additionalInformation.length ? <details className="mt-3 border-t border-white/10 pt-4"><summary className="cursor-pointer text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Additional verified information</summary><ul className="mt-3 space-y-2 text-sm text-[#C7CCD6]">{additionalInformation.map((item) => <li key={item}>{item}</li>)}</ul></details> : null}
      <OfficialProfileSources athlete={athlete} />
    </div>
  </section>;
}

export function AthletePartnershipCta({ athlete }: { athlete: Athlete }) {
  return <section id="partnership-form" className="flex flex-col gap-4 rounded-2xl border border-[#1F6AE1]/30 bg-[#0F151B] p-5 sm:flex-row sm:items-center sm:justify-between" aria-labelledby="partnership-heading"><div><h2 id="partnership-heading" className="text-xl font-black text-white">Partner With {athlete.name}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#C7CCD6]">Discuss a campaign, appearance, social content, or athlete story with NXTG3N.</p></div><AthletePartnershipDialog athlete={athlete.name} athleteSlug={athlete.slug} /></section>;
}

export function OfficialProfileSources({ athlete, location = "athlete_profile" }: { athlete: Athlete; location?: string }) {
  if (!athlete.officialSources?.length) return null;
  return <div className="mt-5 border-t border-white/10 pt-4"><h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Verified profile sources</h3><div className="mt-3 grid gap-3">{athlete.officialSources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" onClick={() => trackMediaEvent({ name: "athlete_source_open", properties: { athlete_slug: athlete.slug, publisher: source.publisher, media_title: source.label, category: "official_profile", location } })} className="border-l-2 border-[#1F6AE1] bg-[#0B0E11] px-3 py-2 text-sm text-[#C7CCD6] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]"><span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#2AFF7D]">{source.publisher}</span><span className="mt-1 block font-semibold">{source.label}</span></a>)}</div></div>;
}