"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GuideCover } from "@/components/guide-cover";
import type { NilGuide } from "@/data/nil-guides";
import { trackConversion } from "@/lib/analytics";

const allCategory = "All guides";

export function ResourceGuideDirectory({ guides }: { guides: NilGuide[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(allCategory);
  const categories = [allCategory, ...Array.from(new Set(guides.map((guide) => guide.category)))];
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return guides.filter((guide) => (category === allCategory || guide.category === category) && (!normalized || [guide.title, guide.description, guide.audience, guide.category].join(" ").toLowerCase().includes(normalized)));
  }, [category, guides, query]);

  function recordSearch() {
    if (query.trim()) trackConversion({ name: "resource_search", properties: { query: query.trim().toLowerCase(), result_count: String(results.length), category } });
  }

  function updateCategory(value: string) {
    setCategory(value);
    trackConversion({ name: "resource_filter", properties: { category: value } });
  }

  return <section id="learning-center" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">NIL Learning Center</p><h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Five original guides for better decisions.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7CCD6]">Written by NXTG3N founder Jerome Jordan, reviewed October 1, 2026, and grounded in official NCAA, FTC, IRS, and U.S. Copyright Office resources.</p></div><Link href="/editorial-standards" onClick={() => trackConversion({ name: "resource_cta_click", properties: { action: "editorial_standards", location: "resource_directory" } })} className="text-sm font-bold text-[#2AFF7D] hover:text-white">How we research and review →</Link></div>
    <div className="mt-7 grid gap-4 rounded-3xl border border-white/10 bg-[#101722] p-5 md:grid-cols-[1fr_auto]">
      <label className="text-sm font-semibold text-white">Search the Learning Center<input value={query} onChange={(event) => setQuery(event.target.value)} onBlur={recordSearch} type="search" placeholder="Search contracts, taxes, branding..." className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#7F8795] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" /></label>
      <label className="text-sm font-semibold text-white">Filter by topic<select value={category} onChange={(event) => updateCategory(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D] md:min-w-56">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    <p className="mt-4 text-sm text-[#9AA3B2]" role="status">{results.length} {results.length === 1 ? "guide" : "guides"} found</p>
    <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{results.map((guide) => <article key={guide.slug} className="flex flex-col rounded-[2rem] border border-white/10 bg-[#101722] p-4 transition hover:-translate-y-1 hover:border-[#1F6AE1]/70"><GuideCover title={guide.title} category={guide.category} compact /><div className="flex flex-1 flex-col p-2 pt-5"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#2AFF7D]">{guide.category}</p><h3 className="mt-3 text-xl font-black text-white">{guide.title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-[#C7CCD6]">{guide.description}</p><p className="mt-4 text-xs text-[#8F99A8]">By Jerome Jordan · {guide.readMinutes} min read</p><Link href={`/resources/guides/${guide.slug}`} onClick={() => trackConversion({ name: "resource_cta_click", properties: { action: "open_guide", location: guide.slug } })} className="mt-5 inline-flex text-sm font-black text-[#2AFF7D] hover:text-white">Read guide and get checklist →</Link></div></article>)}</div>
    {!results.length ? <div className="mt-5 rounded-3xl border border-white/10 bg-[#101722] p-8 text-center"><p className="font-bold text-white">No guides match that search.</p><button type="button" onClick={() => { setQuery(""); setCategory(allCategory); }} className="mt-3 text-sm font-bold text-[#2AFF7D]">Clear filters</button></div> : null}
  </section>;
}
