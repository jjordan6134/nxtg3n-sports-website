import Link from "next/link";
import { NewsDirectory } from "@/components/news-directory";
import { SectionHeading } from "@/components/ui";
import { newsItems } from "@/data/news";
import { JsonLd } from "@/components/json-ld";
import { brand } from "@/data/site";
import { AdSlot } from "@/components/ad-slot";

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ search?: string; category?: string }> }) {
  const params = await searchParams;
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "NXTG3N News", url: `${brand.siteUrl}/news`, mainEntity: { "@type": "ItemList", itemListElement: newsItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, url: `${brand.siteUrl}/news/${item.slug}`, name: item.title })) } }} />
      <SectionHeading
        eyebrow="News"
        title="NXTG3N editorial updates"
        intro="Stories, athlete movement, and the broader strategy behind the Neural Athlete model."
        as="h1"
      />

      <div className="mt-10"><NewsDirectory items={newsItems} initialQuery={params.search} initialCategory={params.category} /></div>
      <AdSlot />

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
