import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { newsItems } from "@/data/news";
import { ArticleSharing } from "@/components/article-sharing";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { brand } from "@/data/site";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = newsItems.find((item) => item.slug === slug);
  return {
    title: article?.title ?? "News Story",
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

  return (
    <article className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "NewsArticle", headline: article.title, description: article.summary, url: `${brand.siteUrl}/news/${article.slug}`, datePublished: article.publishedAt, author: { "@type": "Organization", name: article.author }, publisher: { "@type": "Organization", name: brand.name, url: brand.siteUrl } }} />
      <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "News", item: `${brand.siteUrl}/news` }, { name: article.title, item: `${brand.siteUrl}/news/${article.slug}` }]} />
      <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">
        <span>{article.category}</span>
        <span className="text-[#C7CCD6]">•</span>
        <span>{article.label}</span>
      </div>

      <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{article.title}</h1>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#C7CCD6]">
        <span>{article.author}</span>
        <span>•</span>
        <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
        <span>•</span>
        <span>{article.readTime}</span>
      </div>

      <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8">
        <div className="h-64 rounded-[1.5rem] border border-white/10" style={{ background: `linear-gradient(135deg, ${article.accent}55, rgba(11,14,17,0.95))` }} />

        <div className="mt-8 space-y-6 text-base leading-8 text-[#D7DBE4]">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ArticleSharing url={`${brand.siteUrl}/news/${article.slug}`} title={article.title} slug={article.slug} />
      </div>

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
