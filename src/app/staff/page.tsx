import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { primaryAuthor } from "@/data/authors";
import { brand } from "@/data/site";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet Jerome Jordan, Founder and CEO of NXTG3N Sports, and learn about the athlete-first leadership philosophy behind the organization.",
  alternates: { canonical: "/staff" },
  openGraph: { title: "NXTG3N Sports Leadership", description: primaryAuthor.shortBio, url: "/staff", type: "website", images: ["/images/editorial/athlete-branding.png"] },
  twitter: { card: "summary_large_image", title: "NXTG3N Sports Leadership", description: primaryAuthor.shortBio, images: ["/images/editorial/athlete-branding.png"] },
};

export default function StaffPage() {
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", name: "NXTG3N Sports Leadership", url: `${brand.siteUrl}/staff`, mainEntity: { "@type": "Person", name: primaryAuthor.name, jobTitle: primaryAuthor.role, worksFor: { "@type": "Organization", name: brand.name }, url: `${brand.siteUrl}/authors/${primaryAuthor.slug}`, description: primaryAuthor.shortBio } }} />
    <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "Leadership", item: `${brand.siteUrl}/staff` }]} />
    <section className="border-b border-white/10 bg-[radial-gradient(circle_at_18%_25%,rgba(31,106,225,0.32),transparent_33%),radial-gradient(circle_at_82%_70%,rgba(42,255,125,0.14),transparent_32%),#0B0E11]"><div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">Leadership</p><h1 className="mt-4 max-w-4xl text-4xl font-black text-white sm:text-6xl">Athlete-first leadership built around preparation and ownership.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-[#C7CCD6]">NXTG3N connects sports, storytelling, financial education, technology, and long-term planning so athletes can build beyond a single season.</p></div></section>
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"><article className="rounded-[2.5rem] border border-white/10 bg-[#101722] p-7 sm:p-10"><div className="grid gap-8 md:grid-cols-[150px_1fr]"><div className="flex h-36 w-36 items-center justify-center rounded-[2rem] border border-[#2AFF7D]/30 bg-gradient-to-br from-[#1F6AE1]/35 to-[#2AFF7D]/10 text-4xl font-black text-white" aria-label="Jerome Jordan initials">JJ</div><div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#2AFF7D]">Founder &amp; CEO</p><h2 className="mt-3 text-4xl font-black text-white">Jerome Jordan</h2><div className="mt-5 space-y-4 text-base leading-8 text-[#D7DBE4]">{primaryAuthor.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-6 flex flex-wrap gap-2">{primaryAuthor.focusAreas.map((area) => <span key={area} className="rounded-full border border-white/10 bg-black/15 px-3 py-2 text-xs font-bold text-[#C7CCD6]">{area}</span>)}</div><div className="mt-7 flex flex-wrap gap-3"><Link href={`/authors/${primaryAuthor.slug}`} className="rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-black text-white">Author profile and guides</Link><Link href="/contact" className="rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white hover:bg-white/10">Leadership inquiry</Link></div></div></div></article>
      <section className="mt-12 grid gap-5 md:grid-cols-3">{[["Mission", "Help athletes build clear, credible systems around identity, opportunity, education, and life beyond competition."], ["Leadership standard", "Communicate honestly, verify public information, protect athlete decision-making, and avoid unsupported promises."], ["The Neural Athlete", "Combine performance with intelligence, discipline, ownership, technology, financial preparation, and legacy planning."]].map(([title, copy]) => <article key={title} className="rounded-2xl border border-white/10 bg-[#101722] p-6"><h2 className="text-xl font-black text-white">{title}</h2><p className="mt-3 text-sm leading-7 text-[#C7CCD6]">{copy}</p></article>)}</section>
    </section>
  </main>;
}
