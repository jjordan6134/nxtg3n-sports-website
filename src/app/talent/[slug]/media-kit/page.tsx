import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { athletes } from "@/data/athletes";
import { getLatestMediaDate, getMediaForAthlete } from "@/data/media";
import { brand, serviceItems } from "@/data/site";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { MediaCard } from "@/components/media-hub";
import { EmbeddedMediaPlayer, MediaDevelopmentState, SocialMediaCard } from "@/components/media-experience";
import { MediaKitControls } from "@/components/media-kit";
import { PartnershipLink } from "@/components/conversion-paths";
import { OfficialProfileSources } from "@/components/athlete-profile-sections";

export async function generateStaticParams() {
  return athletes.map((athlete) => ({ slug: athlete.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const athlete = athletes.find((item) => item.slug === slug);
  return { title: athlete ? `${athlete.name} Media Kit` : "Athlete Media Kit", robots: { index: false, follow: true }, alternates: { canonical: `/talent/${slug}/media-kit` } };
}

export default async function AthleteMediaKitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const athlete = athletes.find((item) => item.slug === slug);
  if (!athlete) notFound();
  const items = getMediaForAthlete(athlete.slug);
  const photoItems = items.filter((item) => item.type === "photo");
  const articleItems = items.filter((item) => item.type === "article");
  const videoItems = items.filter((item) => item.embedUrl && ["highlight", "interview", "music"].includes(item.type));
  const featuredVideoItems = videoItems.filter((item) => item.featured);
  const supportingVideoItems = videoItems.filter((item) => !item.featured);
  const supportingEmbeddedItems = supportingVideoItems.filter((item) => item.platform === "spotify");
  const supportingLinkItems = supportingVideoItems.filter((item) => item.platform !== "spotify");
  const linkedItems = items.filter((item) => ["highlight", "interview", "music", "social"].includes(item.type) && !item.embedUrl);
  const latestDate = getLatestMediaDate(athlete.slug);
  const canonicalUrl = `https://nxtgnsports.com/talent/${athlete.slug}/media-kit`;

  return <main className="media-kit-page mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", url: canonicalUrl, mainEntity: { "@type": "Person", name: athlete.name, image: { "@type": "ImageObject", url: `https://nxtgnsports.com${athlete.imagePath}`, caption: `${athlete.name} athlete photo` }, jobTitle: athlete.position, description: athlete.bio, url: `https://nxtgnsports.com/talent/${athlete.slug}` } }} />
    <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "Talent", item: `${brand.siteUrl}/talent` }, { name: athlete.name, item: `${brand.siteUrl}/talent/${athlete.slug}` }, { name: "Media Kit", item: canonicalUrl }]} />
    <div className="media-kit-controls mb-8 flex items-center justify-between gap-4"><Link href={`/talent/${athlete.slug}`} className="text-sm font-semibold text-[#C7CCD6] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Back to athlete profile</Link><MediaKitControls athleteSlug={athlete.slug} canonicalUrl={canonicalUrl} /></div>
    <header className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-[minmax(0,1fr)_18rem] md:items-center">
      <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2AFF7D]">NXTG3N Sports athlete media kit</p><h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">{athlete.name}</h1><p className="mt-4 text-lg text-[#C7CCD6]">{athlete.position} · {athlete.status}</p><p className="mt-2 text-sm text-[#C7CCD6]">{athlete.height} · {athlete.hometown}</p></div>
      <div className="flex justify-center rounded-2xl border border-white/10 bg-[#101722] p-3"><Image src={athlete.imagePath} alt={athlete.slug === "marquis-carver-smith" ? `${athlete.name} action photo` : `${athlete.name} athlete photo`} width={320} height={400} sizes="(max-width: 768px) 60vw, 18rem" className="max-h-72 w-auto object-contain" style={{ objectPosition: athlete.imagePosition ?? "50% 50%" }} priority={athlete.slug !== "langston-wilson"} /></div>
    </header>
    <section className="grid gap-6 py-10 md:grid-cols-[1.2fr_0.8fr]" aria-labelledby="kit-overview"><div><h2 id="kit-overview" className="text-2xl font-black text-white">Athlete overview</h2><p className="mt-4 text-base leading-7 text-[#C7CCD6]">{athlete.bio}</p>{athlete.highlights ? <p className="mt-4 text-sm leading-7 text-[#C7CCD6]">Verified highlights: {athlete.highlights}</p> : null}<div className="mt-6 flex flex-wrap gap-2">{athlete.brandCategories.map((category) => <span key={category} className="rounded-full border border-[#1F6AE1]/40 bg-[#1F6AE1]/10 px-3 py-2 text-xs font-semibold text-[#DDEAFE]">{category}</span>)}</div></div><div className="rounded-2xl border border-white/10 bg-[#101722] p-6"><h2 className="text-xl font-black text-white">Verified details</h2><dl className="mt-4 space-y-3 text-sm text-[#C7CCD6]">{athlete.keyStats.map((stat) => <div key={stat.label} className="flex justify-between gap-4 border-b border-white/10 pb-3"><dt>{stat.label}</dt><dd className="font-semibold text-white">{stat.value}</dd></div>)}</dl></div></section>
    <section className="border-t border-white/10 py-10" aria-labelledby="kit-media"><h2 id="kit-media" className="text-2xl font-black text-white">Available media</h2><div className="mt-6 grid gap-6 md:grid-cols-2">{photoItems.map((item) => <MediaCard key={item.id} item={item} location="media_kit" />)}</div>{!photoItems.length ? <MediaDevelopmentState /> : null}<OfficialProfileSources athlete={athlete} location="media_kit" /><p className="mt-5 text-sm text-[#C7CCD6]">Available categories: {Array.from(new Set(items.map((item) => item.type))).join(", ") || "None currently listed"}. {latestDate ? `Latest dated item: ${latestDate}.` : "No publication date is currently listed."}</p></section>
    <section className="border-t border-white/10 py-10" aria-labelledby="kit-stories"><h2 id="kit-stories" className="text-2xl font-black text-white">Interviews & Athlete Stories</h2><div className="mt-6">{articleItems.length ? <div className="grid gap-6 md:grid-cols-2">{articleItems.map((item) => <MediaCard key={item.id} item={item} location="media_kit" />)}</div> : <MediaDevelopmentState />}</div></section>
    <section className="border-t border-white/10 py-10" aria-labelledby="kit-video-social"><h2 id="kit-video-social" className="text-2xl font-black text-white">Verified video and social links</h2>{featuredVideoItems.length ? <div className="mt-6">{featuredVideoItems.map((item) => <EmbeddedMediaPlayer key={item.id} item={item} athleteSlug={athlete.slug} location="media_kit" />)}</div> : videoItems.length ? <div className="mt-6 grid gap-6 md:grid-cols-2">{videoItems.map((item) => <EmbeddedMediaPlayer key={item.id} item={item} athleteSlug={athlete.slug} location="media_kit" />)}</div> : null}{supportingEmbeddedItems.length ? <div className="mt-4">{supportingEmbeddedItems.map((item) => <EmbeddedMediaPlayer key={item.id} item={item} athleteSlug={athlete.slug} location="media_kit" />)}</div> : null}{supportingLinkItems.length ? <div className="mt-4 grid gap-4 md:grid-cols-2">{supportingLinkItems.map((item) => <SocialMediaCard key={item.id} item={item} athleteSlug={athlete.slug} location="media_kit" />)}</div> : null}{linkedItems.length ? <div className="mt-6 grid gap-4 md:grid-cols-2">{linkedItems.map((item) => <SocialMediaCard key={item.id} item={item} athleteSlug={athlete.slug} location="media_kit" />)}</div> : null}{!videoItems.length && !linkedItems.length ? <p className="mt-3 text-[#C7CCD6]">No verified athlete video or social links are currently listed.</p> : null}</section>
    <section className="border-t border-white/10 py-10" aria-labelledby="kit-services"><h2 id="kit-services" className="text-2xl font-black text-white">NXTG3N partnership categories</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{serviceItems.map((service) => <div key={service.title} className="rounded-2xl border border-white/10 bg-[#101722] p-5"><h3 className="font-bold text-white">{service.title}</h3><p className="mt-2 text-sm leading-6 text-[#C7CCD6]">{service.description}</p></div>)}</div></section>
    <section className="border-t border-white/10 py-10"><div className="flex flex-wrap items-center gap-4"><PartnershipLink athleteSlug={athlete.slug} location="media_kit" href={`/talent/${athlete.slug}#partnership-form`} className="rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" /><Link href="/contact" className="text-sm font-semibold text-[#2AFF7D] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Contact NXTG3N</Link></div></section>
  </main>;
}
