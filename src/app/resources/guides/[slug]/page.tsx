import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/author-card";
import { ArticleSharing } from "@/components/article-sharing";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { getAuthor } from "@/data/authors";
import { getNilGuide, nilGuides } from "@/data/nil-guides";
import { brand } from "@/data/site";

export function generateStaticParams() {
  return nilGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getNilGuide(slug);
  if (!guide) return { title: "NIL Guide" };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/resources/guides/${guide.slug}` },
    openGraph: { type: "article", title: guide.title, description: guide.description, url: `/resources/guides/${guide.slug}`, publishedTime: guide.publishedAt, modifiedTime: guide.reviewedAt, images: [{ url: guide.image, alt: guide.title }] },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.description, images: [guide.image] },
  };
}

export default async function NilGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getNilGuide(slug);
  if (!guide) notFound();
  const author = getAuthor(guide.authorSlug);
  if (!author) notFound();
  const related = nilGuides.filter((item) => item.slug !== guide.slug).slice(0, 3);
  const url = `${brand.siteUrl}/resources/guides/${guide.slug}`;

  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, image: `${brand.siteUrl}${guide.image}`, url, datePublished: guide.publishedAt, dateModified: guide.reviewedAt, author: { "@type": "Person", name: author.name, url: `${brand.siteUrl}/authors/${author.slug}` }, publisher: { "@type": "Organization", name: brand.name, url: brand.siteUrl } }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
    <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "NIL Resource Center", item: `${brand.siteUrl}/resources` }, { name: guide.title, item: url }]} />

    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/resources" className="text-xs font-black uppercase tracking-[0.2em] text-[#2AFF7D] hover:text-white">← NIL Resource Center</Link>
      <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.16em]"><span className="rounded-full border border-[#1F6AE1]/50 bg-[#1F6AE1]/10 px-3 py-1 text-[#AFC7F5]">{guide.category}</span><span className="rounded-full border border-white/10 px-3 py-1 text-[#C7CCD6]">{guide.audience}</span></div>
      <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">{guide.title}</h1>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-[#C7CCD6]">{guide.description}</p>
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#9AA3B2]"><Link href={`/authors/${author.slug}`} className="font-bold text-white hover:text-[#2AFF7D]">By {author.name}</Link><span>Published {new Date(`${guide.publishedAt}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span><span>Reviewed {new Date(`${guide.reviewedAt}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span><span>{guide.readMinutes} min read</span></div>
      <div className="relative mt-10 h-64 overflow-hidden rounded-[2rem] border border-white/10 bg-[#101722] sm:h-96"><Image src={guide.image} alt={`${guide.title} editorial illustration`} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#0B0E11]/55 via-transparent to-transparent" /></div>

      <section className="mt-8 rounded-[2rem] border border-[#2AFF7D]/25 bg-[#101722] p-6 sm:p-8"><p className="text-xs font-black uppercase tracking-[0.2em] text-[#2AFF7D]">Key takeaways</p><ul className="mt-5 grid gap-3 md:grid-cols-2">{guide.keyTakeaways.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[#D7DBE4]"><span className="font-black text-[#2AFF7D]">✓</span>{item}</li>)}</ul></section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="space-y-12">{guide.sections.map((section, index) => <section key={section.heading} id={`section-${index + 1}`}><p className="text-xs font-black uppercase tracking-[0.18em] text-[#1F8BFF]">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-2 text-3xl font-black text-white">{section.heading}</h2><div className="mt-5 space-y-5 text-base leading-8 text-[#D7DBE4]">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{section.bullets ? <ul className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-[#101722] p-5">{section.bullets.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[#D7DBE4]"><span className="text-[#2AFF7D]">•</span>{item}</li>)}</ul> : null}</section>)}</div>
        <aside className="h-fit rounded-2xl border border-white/10 bg-[#101722] p-5 lg:sticky lg:top-28"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#2AFF7D]">In this guide</p><nav className="mt-4 space-y-3" aria-label="Guide sections">{guide.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`} className="block text-sm leading-5 text-[#C7CCD6] hover:text-white">{index + 1}. {section.heading}</a>)}</nav></aside>
      </div>

      <section className="mt-14 rounded-[2rem] border border-[#1F6AE1]/40 bg-gradient-to-br from-[#142B50] to-[#101722] p-6 sm:p-8"><p className="text-xs font-black uppercase tracking-[0.2em] text-[#2AFF7D]">Action plan</p><h2 className="mt-3 text-3xl font-black text-white">Put the guide into practice</h2><ol className="mt-6 grid gap-3 md:grid-cols-2">{guide.actionPlan.map((item, index) => <li key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-black/15 p-4 text-sm leading-6 text-[#D7DBE4]"><span className="font-black text-[#2AFF7D]">{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>
      <section className="mt-12"><h2 className="text-3xl font-black text-white">Frequently asked questions</h2><div className="mt-5 divide-y divide-white/10">{guide.faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer list-none font-black text-white">{faq.question}<span className="float-right text-[#2AFF7D] group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7CCD6]">{faq.answer}</p></details>)}</div></section>
      <section className="mt-12 rounded-[2rem] border border-white/10 bg-[#101722] p-6"><h2 className="text-2xl font-black text-white">Official sources and further reading</h2><p className="mt-3 text-sm leading-6 text-[#9AA3B2]">Rules and guidance change. Review the current source and obtain qualified advice for the athlete’s circumstances.</p><ul className="mt-5 space-y-3">{guide.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 rounded-xl border border-white/10 p-4 text-sm text-white hover:border-[#1F6AE1]"><span><strong className="block">{source.name}</strong><span className="mt-1 block text-xs text-[#9AA3B2]">{source.organization}</span></span><span className="text-[#2AFF7D]">↗</span></a></li>)}</ul></section>
      <p className="mt-8 border-l-2 border-[#2AFF7D] pl-4 text-sm leading-6 text-[#9AA3B2]">Educational information only. This guide is not legal, tax, financial, eligibility, compliance, or contractual advice and does not guarantee an NIL opportunity, compensation, audience growth, or campaign result.</p>
      <div className="mt-10"><AuthorCard author={author} /></div>
      <ArticleSharing url={url} title={guide.title} slug={guide.slug} />
      <section className="mt-14"><h2 className="text-2xl font-black text-white">Continue learning</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={`/resources/guides/${item.slug}`} className="rounded-2xl border border-white/10 bg-[#101722] p-5 transition hover:border-[#1F6AE1]"><p className="text-xs font-black uppercase tracking-[0.16em] text-[#2AFF7D]">{item.category}</p><h3 className="mt-3 font-black text-white">{item.title}</h3><p className="mt-2 text-xs leading-5 text-[#9AA3B2]">{item.description}</p></Link>)}</div></section>
    </article>
  </main>;
}
