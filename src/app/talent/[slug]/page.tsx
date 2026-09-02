import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { athletes } from "@/data/athletes";
import { newsItems } from "@/data/news";
import { brand } from "@/data/site";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { AthletePartnershipCta, AthleteSnapshot } from "@/components/athlete-profile-sections";
import { AthleteMediaSection, AthleteShare } from "@/components/media-hub";
import Image from "next/image";
import { AthleteNewsFeed } from "@/components/athlete-news-feed";
import { ConversionPageView } from "@/components/conversion-page-view";

export async function generateStaticParams() {
  return athletes.map((athlete) => ({ slug: athlete.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const athlete = athletes.find((item) => item.slug === slug);
  if (!athlete) return { title: "Athlete Profile" };
  const title = `${athlete.name} — ${athlete.position} at ${athlete.status}`;
  const description = `${athlete.name} is a ${athlete.height} ${athlete.position} from ${athlete.hometown}. Explore verified athlete details, media, highlights, and partnership opportunities with NXTG3N Sports.`;
  return {
    title,
    description,
    keywords: [athlete.name, athlete.status, athlete.position, "NXTG3N Sports", "athlete profile", "NIL athlete"],
    alternates: { canonical: `/talent/${athlete.slug}` },
    openGraph: { title, description, url: `/talent/${athlete.slug}`, type: "profile", images: [{ url: athlete.imagePath, alt: `${athlete.name} athlete profile` }] },
    twitter: { card: "summary_large_image", title, description, images: [athlete.imagePath] },
  };
}

export default function AthleteProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  return <AthleteProfileContent slug={(async () => (await params).slug)()} />;
}

async function AthleteProfileContent({ slug }: { slug: Promise<string> }) {
  const resolvedSlug = await slug;
  const athlete = athletes.find((item) => item.slug === resolvedSlug);

  if (!athlete) {
    notFound();
  }

  const relatedNews = newsItems.filter((item) => item.relatedAthlete === athlete.name);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ConversionPageView event={{ name: "athlete_profile_view", properties: { athlete_slug: athlete.slug } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: athlete.name, url: `${brand.siteUrl}/talent/${athlete.slug}`, image: `${brand.siteUrl}${athlete.imagePath}`, jobTitle: athlete.position, description: athlete.bio, affiliation: { "@type": "SportsTeam", name: athlete.status } }} />
      <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "Talent", item: `${brand.siteUrl}/talent` }, { name: athlete.name, item: `${brand.siteUrl}/talent/${athlete.slug}` }]} />
      <div className="rounded-2xl border border-white/10 bg-[#101722] p-4 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#2AFF7D]/40 bg-[#0B0E11] sm:h-32 sm:w-28">
              <Image src={athlete.imagePath} alt={athlete.slug === "marquis-carver-smith" ? `${athlete.name} action photo` : `${athlete.name} athlete photo`} width={320} height={400} sizes="(max-width: 640px) 112px, 144px" className="max-h-full max-w-full object-contain" style={{ objectPosition: athlete.imagePosition ?? "50% 50%" }} priority={athlete.slug !== "langston-wilson"} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">{athlete.status}</p>
              <h1 className="mt-1 text-3xl font-black text-white sm:text-4xl">{athlete.name}</h1>
              <p className="mt-2 text-[#C7CCD6]">{athlete.position} · {athlete.height} · {athlete.hometown}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2"><AthleteShare athleteSlug={athlete.slug} athleteName={athlete.name} /><Link href={`/talent/${athlete.slug}/one-sheet`} className="inline-flex rounded-full bg-[#2AFF7D] px-4 py-2.5 text-sm font-semibold text-[#07110B] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Sponsor one-sheet</Link><Link href={`/talent/${athlete.slug}/media-kit`} className="inline-flex rounded-full border border-[#2AFF7D]/40 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Media kit</Link><Link href="/talent" className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Back to roster</Link></div>
        </div>
      </div>
      <div className="mt-6"><AthleteSnapshot athlete={athlete} /></div>
      <div className="mt-6"><AthletePartnershipCta athlete={athlete} /></div>
      <div className="mt-6"><AthleteMediaSection athleteSlug={athlete.slug} /></div>
      <div className="mt-6"><AthleteNewsFeed athleteSlug={athlete.slug} /></div>
      {relatedNews.length ? <section className="mt-6 rounded-2xl border border-white/10 bg-[#101722] p-5" aria-labelledby="related-news-heading"><h2 id="related-news-heading" className="text-xl font-black text-white">Related news</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{relatedNews.map((item) => <Link key={item.slug} href={`/news/${item.slug}`} className="border-l-2 border-[#1F6AE1] bg-[#0B0E11] px-4 py-3 text-sm text-[#C7CCD6] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">{item.title}</Link>)}</div></section> : null}
    </div>
  );
}
