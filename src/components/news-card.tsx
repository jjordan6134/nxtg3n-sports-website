import Link from "next/link";
import Image from "next/image";
import { getNewsImage, type NewsItem } from "@/data/news";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group rounded-3xl border border-white/10 bg-[#101722] p-5 transition hover:-translate-y-1 hover:border-[#1F6AE1]/70">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C7CCD6]">
          {item.category}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#2AFF7D]">{item.label}</span>
      </div>
      <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0E11]">
        <Image
          src={getNewsImage(item)}
          alt={`${item.title} editorial illustration`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`${item.imageFit === "contain" ? "object-contain" : "object-cover"} transition duration-500 group-hover:scale-[1.03]`}
          style={{ objectPosition: item.imagePosition ?? "50% 50%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E11]/55 via-transparent to-transparent" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{item.summary}</p>
      {item.relatedAthlete ? <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#2AFF7D]">{item.relatedAthlete}</p> : null}
      <Link href={`/news/${item.slug}`} className="mt-5 inline-flex text-sm font-semibold text-white transition hover:text-[#2AFF7D]">
        Read update
      </Link>
    </article>
  );
}
