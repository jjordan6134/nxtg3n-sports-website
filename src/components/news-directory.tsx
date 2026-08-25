"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "@/components/news-card";
import type { NewsItem } from "@/data/news";

const categories = ["all", "Athlete News", "NIL Education", "Athlete Branding", "Financial Literacy", "AI & Technology", "Career Development", "Media Training"];

export function NewsDirectory({ items, initialQuery = "", initialCategory = "all" }: { items: NewsItem[]; initialQuery?: string; initialCategory?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesTerm = !term || `${item.title} ${item.summary} ${item.topic ?? ""} ${item.label}`.toLowerCase().includes(term);
      return matchesTerm && (category === "all" || item.category === category);
    });
  }, [items, query, category]);
  const featured = items[0];
  const recent = filtered.filter((item) => item.slug !== featured.slug);
  function updateQuery(value: string) { setQuery(value); window.history.replaceState(null, "", `/news?search=${encodeURIComponent(value)}&category=${encodeURIComponent(category)}`); }
  function updateCategory(value: string) { setCategory(value); window.history.replaceState(null, "", `/news?search=${encodeURIComponent(query)}&category=${encodeURIComponent(value)}`); }

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-[2rem] border border-white/10 bg-[#101722] p-5 md:grid-cols-[1.4fr_0.8fr]">
        <label className="block text-sm text-[#C7CCD6]"><span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Search articles</span><input type="search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Title, topic, or keyword" className="w-full rounded-full border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" /></label>
        <label className="block text-sm text-[#C7CCD6]"><span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Category</span><select value={category} onChange={(event) => updateCategory(event.target.value)} className="w-full rounded-full border border-white/10 bg-[#0B0E11] px-4 py-3 text-white" aria-label="Filter articles by category">{categories.map((option) => <option key={option} value={option}>{option === "all" ? "All categories" : option}</option>)}</select></label>
      </div>
      <p className="mb-6 text-sm text-[#C7CCD6]" aria-live="polite">Showing {filtered.length} of {items.length} articles</p>
      {filtered.length === 0 ? <div className="rounded-3xl border border-dashed border-white/15 bg-[#101722] p-10 text-center text-[#C7CCD6]">No articles match those filters. Try a broader search.</div> : <>
        {filtered.includes(featured) && !query && category === "all" ? <section className="mb-10 rounded-[2rem] border border-[#1F6AE1]/40 bg-[#101722] p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Featured article</p><h2 className="mt-3 max-w-3xl text-3xl font-black text-white">{featured.title}</h2><p className="mt-3 max-w-2xl text-[#C7CCD6]">{featured.summary}</p><a href={`/news/${featured.slug}`} className="mt-5 inline-flex rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2E7BFF]">Read featured article</a></section> : null}
        <h2 className="mb-5 text-xl font-black text-white">Recent articles</h2><div className="grid gap-6 lg:grid-cols-3">{recent.map((item) => <NewsCard key={item.slug} item={item} />)}</div>
      </>}
    </div>
  );
}
