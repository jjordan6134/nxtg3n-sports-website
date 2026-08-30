import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { estimateReadingTime, getNewsImage, newsItems } from "@/data/news";
import { ArticleSharing } from "@/components/article-sharing";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { brand } from "@/data/site";
import { ArticleReadingTools, BackToTop } from "@/components/article-reading-tools";
import { PrimaryButton, SecondaryButton } from "@/components/ui";
import { athletes } from "@/data/athletes";
import { AdSlot } from "@/components/ad-slot";
import { ConversionLink } from "@/components/conversion-paths";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = newsItems.find((item) => item.slug === slug);
  const metadataTitles: Record<string, string> = {
    "athlete-content-strategy": "Build an Athlete Content Strategy with Focus",
    "financial-literacy-for-athletes": "Financial Literacy for Athletes: Start Early",
    "preparing-for-the-transfer-portal": "Preparing Your Brand for the Transfer Portal",
    "langston-wilson-joins-new-york-knicks-for-2026-nba-summer-league": "Langston Wilson Joins Knicks for 2026 Summer League",
  };
  return {
    title: metadataTitles[slug] ?? article?.title ?? "News Story",
    description: article?.summary ?? "NXTG3N editorial story and athlete update.",
    alternates: { canonical: `/news/${slug}` },
  };
}

export default async function NewsStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = newsItems.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const related = newsItems.filter((item) => item.slug !== article.slug).slice(0, 2);
  const index = newsItems.findIndex((item) => item.slug === article.slug);
  const headings = article.content.map((_, paragraphIndex) => paragraphIndex === 0 ? "The starting point" : paragraphIndex === article.content.length - 1 ? "A careful next step" : `What to consider ${paragraphIndex}`);
  const readingTime = estimateReadingTime(article.content);
  const relatedAthlete = article.relatedAthlete ? athletes.find((item) => item.name === article.relatedAthlete) : undefined;

  return (
    <article className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "NewsArticle", headline: article.title, description: article.summary, image: `${brand.siteUrl}${getNewsImage(article)}`, url: `${brand.siteUrl}/news/${article.slug}`, ...(article.publishedAt ? { datePublished: article.publishedAt } : {}), author: { "@type": "Organization", name: article.author }, publisher: { "@type": "Organization", name: brand.name, url: brand.siteUrl } }} />
      <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "News", item: `${brand.siteUrl}/news` }, { name: article.title, item: `${brand.siteUrl}/news/${article.slug}` }]} />
      <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">
        <span>{article.category}</span>
        <span className="text-[#C7CCD6]">•</span>
        <span>{article.label}</span>
      </div>

      <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{article.title}</h1>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#C7CCD6]"><span>{article.author}</span><span>•</span>{article.publishedAt ? <><time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time><span>•</span></> : <span>NXTG3N Guide</span>}<span>{readingTime}</span></div>

      <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8">
        <ArticleReadingTools headings={headings} />
        <div className="relative h-64 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0B0E11] sm:h-80">
          <Image src={getNewsImage(article)} alt={`${article.title} editorial illustration`} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E11]/45 via-transparent to-transparent" aria-hidden="true" />
        </div>

        <div className="mt-8 space-y-6 text-base leading-8 text-[#D7DBE4]">
          {article.content.map((paragraph, paragraphIndex) => (
            <section key={paragraph} id={`section-${paragraphIndex + 1}`}><h2 className="text-xl font-black text-white">{headings[paragraphIndex]}</h2><p className="mt-2">{paragraph}</p></section>
          ))}
        </div>
        <ArticleSharing url={`${brand.siteUrl}/news/${article.slug}`} title={article.title} slug={article.slug} />
      </div>
      <AdSlot />

      <section className="mt-10 rounded-[2rem] border border-[#1F6AE1]/30 bg-[#101722] p-6" aria-labelledby="story-next-step">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Take the next step</p>
        <h2 id="story-next-step" className="mt-3 text-2xl font-black text-white">Turn insight into a clearer plan.</h2>
        <p className="mt-3 text-base leading-7 text-[#C7CCD6]">Explore athlete representation or connect with the NXTG3N roster for a thoughtful brand partnership.</p>
        <div className="mt-5 flex flex-wrap gap-3"><ConversionLink label="Apply for Representation" href="/apply" location="news_story" className="rounded-full bg-[#1F6AE1] px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" /><ConversionLink label="Partner With an Athlete" href="/talent" location="news_story" className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" /></div>
      </section>

      {relatedAthlete ? <section className="mt-8 rounded-[2rem] border border-[#2AFF7D]/20 bg-[#101722] p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Related athlete</p><h2 className="mt-2 text-2xl font-black text-white">{relatedAthlete.name}</h2><p className="mt-2 text-[#C7CCD6]">{relatedAthlete.profile}</p><a href={`/talent/${relatedAthlete.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[#2AFF7D]">View athlete profile</a></section> : null}
      <div className="mt-10 flex flex-wrap justify-between gap-4 border-y border-white/10 py-6">{index > 0 ? <a href={`/news/${newsItems[index - 1].slug}`} className="text-sm font-semibold text-[#C7CCD6] hover:text-white">Previous article</a> : <span />}{index < newsItems.length - 1 ? <a href={`/news/${newsItems[index + 1].slug}`} className="text-sm font-semibold text-[#C7CCD6] hover:text-white">Next article</a> : null}</div>
      <section className="mt-10 rounded-[2rem] border border-[#1F6AE1]/30 bg-[#101722] p-6"><h2 className="text-2xl font-black text-white">Build what comes next</h2><p className="mt-2 text-[#C7CCD6]">NXTG3N helps athletes and brands approach development, storytelling, and partnerships with clarity.</p><div className="mt-5 flex flex-wrap gap-3"><PrimaryButton href="/apply">Join NXTG3N</PrimaryButton><SecondaryButton href="/contact">Partner with NXTG3N</SecondaryButton></div></section>
      <BackToTop />

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/news" className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
          Back to news
        </Link>
        <Link href="/" className="inline-flex rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2E7BFF]">
          Explore NXTG3N
        </Link>
      </div>

      <aside className="mt-14 rounded-[2rem] border border-white/10 bg-[#101722] p-6">
        <h2 className="text-xl font-black text-white">More stories</h2>
        <div className="mt-5 space-y-3">
          {related.map((item) => (
            <Link key={item.slug} href={`/news/${item.slug}`} className="block rounded-2xl border border-white/10 bg-[#0B0E11] p-4 text-sm text-[#C7CCD6] transition hover:text-white">
              {item.title}
            </Link>
          ))}
        </div>
      </aside>
    </article>
  );
}
