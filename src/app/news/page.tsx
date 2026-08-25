import Link from "next/link";
import { NewsCard } from "@/components/news-card";
import { SectionHeading } from "@/components/ui";
import { newsItems } from "@/data/news";

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="News"
        title="NXTG3N editorial updates"
        intro="Stories, athlete movement, and the broader strategy behind the Neural Athlete model."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {newsItems.map((item) => (
          <NewsCard key={item.slug} item={item} />
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#101722] p-8">
        <h3 className="text-2xl font-black text-white">Editorial note</h3>
        <p className="mt-3 text-base leading-7 text-[#C7CCD6]">
          NXTG3N publishes concise updates and future-focused features designed to inform athletes, families, brands, and partners without inventing unsupported claims.
        </p>
        <Link href="/" className="mt-5 inline-flex text-sm font-semibold text-[#2AFF7D] hover:text-white">
          Return home
        </Link>
      </div>
    </div>
  );
}
