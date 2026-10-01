import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { authors, getAuthor } from "@/data/authors";
import { nilGuides } from "@/data/nil-guides";
import { brand } from "@/data/site";

export function generateStaticParams() { return authors.map((author) => ({ slug: author.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return { title: "Author" };
  return { title: `${author.name} | ${author.role}`, description: author.shortBio, alternates: { canonical: `/authors/${author.slug}` }, openGraph: { title: `${author.name} — ${author.role}`, description: author.shortBio, url: `/authors/${author.slug}`, type: "profile", images: ["/images/editorial/athlete-branding.png"] }, twitter: { card: "summary_large_image", title: author.name, description: author.shortBio, images: ["/images/editorial/athlete-branding.png"] } };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const guides = nilGuides.filter((guide) => guide.authorSlug === author.slug);
  return <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: author.name, jobTitle: author.role, worksFor: { "@type": "Organization", name: brand.name }, description: author.shortBio, url: `${brand.siteUrl}/authors/${author.slug}`, knowsAbout: author.focusAreas }} />
    <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "Leadership", item: `${brand.siteUrl}/staff` }, { name: author.name, item: `${brand.siteUrl}/authors/${author.slug}` }]} />
    <div className="rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_85%_15%,rgba(42,255,125,0.13),transparent_30%),radial-gradient(circle_at_15%_20%,rgba(31,106,225,0.28),transparent_35%),#101722] p-7 sm:p-12"><div className="grid gap-8 md:grid-cols-[160px_1fr] md:items-center"><div className="flex h-40 w-40 items-center justify-center rounded-[2rem] border border-[#2AFF7D]/30 bg-black/20 text-5xl font-black text-white" aria-label={`${author.name} initials`}>JJ</div><div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#2AFF7D]">NXTG3N leadership and author</p><h1 className="mt-3 text-4xl font-black text-white sm:text-6xl">{author.name}</h1><p className="mt-3 text-lg font-bold text-[#AFC7F5]">{author.role}, {author.organization}</p></div></div></div>
    <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]"><div className="space-y-5 text-base leading-8 text-[#D7DBE4]">{author.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><aside className="rounded-[2rem] border border-white/10 bg-[#101722] p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-[#2AFF7D]">Focus areas</p><ul className="mt-5 space-y-3">{author.focusAreas.map((area) => <li key={area} className="rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white">{area}</li>)}</ul></aside></section>
    <section className="mt-16"><p className="text-xs font-black uppercase tracking-[0.2em] text-[#2AFF7D]">Published guidance</p><h2 className="mt-3 text-3xl font-black text-white">NIL Learning Center guides</h2><div className="mt-6 grid gap-5 md:grid-cols-2">{guides.map((guide) => <Link key={guide.slug} href={`/resources/guides/${guide.slug}`} className="rounded-2xl border border-white/10 bg-[#101722] p-6 hover:border-[#1F6AE1]"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#AFC7F5]">{guide.category} · {guide.readMinutes} min</p><h3 className="mt-3 text-xl font-black text-white">{guide.title}</h3><p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{guide.description}</p></Link>)}</div></section>
    <div className="mt-12 flex flex-wrap gap-3"><Link href="/staff" className="rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white hover:bg-white/10">Leadership page</Link><Link href="/contact" className="rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-black text-white">Contact NXTG3N</Link></div>
  </main>;
}
