import Link from "next/link";
import { NewsDirectory } from "@/components/news-directory";
import { SectionHeading } from "@/components/ui";
import { newsItems } from "@/data/news";
import { JsonLd } from "@/components/json-ld";
import { brand } from "@/data/site";
import { AdSlot } from "@/components/ad-slot";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ConversionLink } from "@/components/conversion-paths";

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

      <section className="mt-12 rounded-[2rem] border border-[#1F6AE1]/30 bg-[#101722] p-6 sm:p-8" aria-labelledby="news-next-step">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Keep building</p>
        <h2 id="news-next-step" className="mt-3 text-2xl font-black text-white">Bring the next chapter into focus.</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#C7CCD6]">Athletes and families can explore representation, while brands can connect around thoughtful NIL campaigns and athlete storytelling.</p>
        <div className="mt-5 flex flex-wrap gap-3"><ConversionLink label="Apply for Representation" href="/apply" location="news" className="rounded-full bg-[#1F6AE1] px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" /><ConversionLink label="Partner With an Athlete" href="/talent" location="news" className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" /></div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8" aria-labelledby="news-newsletter-heading">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Newsletter</p>
        <h2 id="news-newsletter-heading" className="mt-3 text-2xl font-black text-white">Stay close to the work.</h2>
        <p className="mt-3 text-base leading-7 text-[#C7CCD6]">Receive the clearest NXTG3N stories and updates without the noise.</p>
        <div className="mt-6"><NewsletterSignup location="news" /></div>
      </section>

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
