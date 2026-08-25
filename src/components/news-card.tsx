import Link from "next/link";
import type { NewsItem } from "@/data/news";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#101722] p-5 transition hover:border-[#1F6AE1]/70 hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C7CCD6]">
          {item.category}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#2AFF7D]">{item.label}</span>
      </div>
      <div className="h-40 rounded-2xl border border-white/10" style={{ background: `linear-gradient(135deg, ${item.accent}55, rgba(11,14,17,0.95))` }} />
      <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{item.summary}</p>
      {item.relatedAthlete ? <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#2AFF7D]">{item.relatedAthlete}</p> : null}
      <Link href={`/news/${item.slug}`} className="mt-5 inline-flex text-sm font-semibold text-white transition hover:text-[#2AFF7D]">
        Read update
      </Link>
    </article>
  );
}
