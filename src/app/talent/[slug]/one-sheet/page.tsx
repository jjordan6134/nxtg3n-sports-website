import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AthleteOneSheetControls } from "@/components/athlete-one-sheet-controls";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { athletes } from "@/data/athletes";
import { getMediaForAthlete } from "@/data/media";
import { brand } from "@/data/site";

export async function generateStaticParams() {
  return athletes.map((athlete) => ({ slug: athlete.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const athlete = athletes.find((item) => item.slug === slug);
  if (!athlete) return { title: "Athlete Sponsor One-Sheet", robots: { index: false, follow: true } };
  const title = `${athlete.name} Sponsor One-Sheet`;
  const description = `Sponsor-ready athlete overview, verified details, brand categories, and partnership information for ${athlete.name}.`;
  return { title, description, alternates: { canonical: `/talent/${slug}/one-sheet` }, openGraph: { title, description, url: `/talent/${slug}/one-sheet`, type: "profile", images: [{ url: athlete.imagePath, alt: `${athlete.name} sponsor one-sheet` }] }, twitter: { card: "summary_large_image", title, description, images: [athlete.imagePath] } };
}

export default async function AthleteOneSheetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const athlete = athletes.find((item) => item.slug === slug);
  if (!athlete) notFound();
  const media = getMediaForAthlete(athlete.slug);
  const featuredMedia = media.find((item) => item.featured && item.type !== "photo") ?? media.find((item) => ["highlight", "interview", "music"].includes(item.type));
  const canonicalUrl = `${brand.siteUrl}/talent/${athlete.slug}/one-sheet`;

  return <main className="one-sheet-shell mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", url: canonicalUrl, mainEntity: { "@type": "Person", name: athlete.name, image: `${brand.siteUrl}${athlete.imagePath}`, jobTitle: athlete.position, affiliation: { "@type": "SportsTeam", name: athlete.status }, description: athlete.bio } }} />
    <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "Talent", item: `${brand.siteUrl}/talent` }, { name: athlete.name, item: `${brand.siteUrl}/talent/${athlete.slug}` }, { name: "Sponsor One-Sheet", item: canonicalUrl }]} />
    <div className="one-sheet-controls mb-6 flex flex-wrap items-center justify-between gap-4"><Link href={`/talent/${athlete.slug}`} className="text-sm font-semibold text-[#C7CCD6] hover:text-white">← Back to athlete profile</Link><AthleteOneSheetControls athleteSlug={athlete.slug} athleteName={athlete.name} canonicalUrl={canonicalUrl} /></div>

    <article className="one-sheet-page overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0E11] shadow-2xl">
      <div className="h-2 bg-gradient-to-r from-[#1F6AE1] via-[#2AFF7D] to-[#1F6AE1]" />
      <div className="grid min-h-[61rem] grid-rows-[auto_1fr_auto] p-7 sm:p-9">
        <section className="flex items-center justify-between gap-5 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4"><Image src={brand.logoPath} alt="NXTG3N Sports" width={72} height={72} className="h-16 w-16 rounded-xl object-contain" /><div><p className="text-xl font-black tracking-[0.18em] text-white">NXTG3N</p><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C7CCD6]">Sports Talent Agency</p></div></div>
          <div className="text-right"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2AFF7D]">Sponsor-ready athlete profile</p><p className="mt-1 text-xs text-[#7F8795]">{brand.tagline}</p></div>
        </section>

        <section className="grid gap-7 py-7 md:grid-cols-[17rem_1fr]">
          <div>
            <div className="relative h-[23rem] overflow-hidden rounded-2xl border border-white/10 bg-[#101722]"><Image src={athlete.imagePath} alt={`${athlete.name} athlete photo`} fill sizes="17rem" className={athlete.imageFit === "contain" ? "object-contain" : "object-cover"} style={{ objectPosition: athlete.imagePosition ?? "50% 50%" }} priority /></div>
            <div className="mt-4 rounded-2xl border border-[#1F6AE1]/30 bg-[#1F6AE1]/10 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2AFF7D]">Partnership contact</p><p className="mt-2 text-sm font-bold text-white">{brand.legalName}</p><a href={`mailto:${brand.email}`} className="mt-1 block break-all text-xs text-[#C7CCD6]">{brand.email}</a></div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2AFF7D]">{athlete.status}</p><h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">{athlete.name}</h1><p className="mt-3 text-lg font-semibold text-[#C7CCD6]">{athlete.position} · {athlete.height}</p><p className="mt-1 text-sm text-[#7F8795]">{athlete.hometown}</p>
            <div className="mt-5 border-l-2 border-[#2AFF7D] pl-4"><p className="text-lg font-bold leading-7 text-white">{athlete.profile}</p></div>
            <p className="mt-5 text-sm leading-6 text-[#C7CCD6]">{athlete.bio}</p>

            <div className="mt-6 grid grid-cols-3 gap-2">{athlete.keyStats.slice(0, 3).map((stat) => <div key={stat.label} className="rounded-xl border border-white/10 bg-[#101722] p-3"><p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#7F8795]">{stat.label}</p><p className="mt-1 text-sm font-black text-white">{stat.value}</p></div>)}</div>

            <div className="mt-6"><h2 className="text-xs font-black uppercase tracking-[0.18em] text-white">Brand and campaign fit</h2><div className="mt-3 flex flex-wrap gap-2">{athlete.brandCategories.map((category) => <span key={category} className="rounded-full border border-[#2AFF7D]/25 bg-[#2AFF7D]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2AFF7D]">{category}</span>)}</div></div>
            <div className="mt-5"><h2 className="text-xs font-black uppercase tracking-[0.18em] text-white">Athlete identity</h2><p className="mt-2 text-sm leading-6 text-[#C7CCD6]">{athlete.identity.join(" · ")}</p></div>
            {athlete.officialSources?.length ? <div className="mt-4"><h2 className="text-[10px] font-black uppercase tracking-[0.16em] text-[#7F8795]">Verification sources</h2><p className="mt-1 text-xs leading-5 text-[#C7CCD6]">{athlete.officialSources.slice(0, 2).map((source, index) => <span key={source.url}>{index ? " · " : ""}<a href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-2">{source.publisher}</a></span>)}</p></div> : null}

            <div className="mt-6 grid gap-3 sm:grid-cols-2"><Link href={`/talent/${athlete.slug}`} className="rounded-xl border border-white/10 bg-[#101722] p-3"><span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#2AFF7D]">Live athlete profile</span><span className="mt-1 block text-xs font-semibold text-white">View verified profile →</span></Link>{featuredMedia ? <a href={featuredMedia.originalUrl ?? featuredMedia.sourceUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-[#101722] p-3"><span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#2AFF7D]">Featured media</span><span className="mt-1 block line-clamp-2 text-xs font-semibold text-white">{featuredMedia.title} →</span></a> : <Link href={`/talent/${athlete.slug}/media-kit`} className="rounded-xl border border-white/10 bg-[#101722] p-3"><span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#2AFF7D]">Media kit</span><span className="mt-1 block text-xs font-semibold text-white">Review verified media →</span></Link>}</div>
          </div>
        </section>

        <section className="flex items-end justify-between gap-5 border-t border-white/10 pt-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2AFF7D]">Campaign opportunities</p><p className="mt-1 max-w-2xl text-xs leading-5 text-[#C7CCD6]">Sponsored content · appearances · interviews · community activations · athlete storytelling · product and merchandise collaborations</p></div><div className="text-right"><p className="text-[10px] font-semibold text-[#7F8795]">nxtgnsports.com</p><p className="mt-1 text-[9px] text-[#596170]">Availability and acceptance are not guaranteed.</p></div></section>
      </div>
    </article>
  </main>;
}
