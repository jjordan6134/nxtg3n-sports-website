import Link from "next/link";
import { notFound } from "next/navigation";
import { athletes } from "@/data/athletes";
import { newsItems } from "@/data/news";
import { brand } from "@/data/site";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { AthletePartnershipForm } from "@/components/athlete-partnership-form";
import { ConversionLink } from "@/components/conversion-paths";

export async function generateStaticParams() {
  return athletes.map((athlete) => ({ slug: athlete.slug }));
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

  const relatedNews = newsItems.filter((item) =>
    athlete.relatedNews?.includes(item.slug) || item.relatedAthlete === athlete.name,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: athlete.name, url: `${brand.siteUrl}/talent/${athlete.slug}`, jobTitle: athlete.position, description: athlete.bio, affiliation: { "@type": "SportsTeam", name: athlete.status } }} />
      <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "Talent", item: `${brand.siteUrl}/talent` }, { name: athlete.name, item: `${brand.siteUrl}/talent/${athlete.slug}` }]} />
      <div className="rounded-[2.5rem] border border-white/10 bg-[#101722] p-6 sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#2AFF7D]/40 bg-[#0B0E11] text-3xl font-black text-white">
              {athlete.name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() ?? "")
                .join("")}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">{athlete.status}</p>
              <h1 className="mt-2 text-3xl font-black text-white sm:text-5xl">{athlete.name}</h1>
              <p className="mt-2 text-[#C7CCD6]">{athlete.position} · {athlete.height} · {athlete.hometown}</p>
            </div>
          </div>

          <Link href="/talent" className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
            Back to roster
          </Link>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3"><ConversionLink label="Apply for Representation" href="/apply" location="athlete_profile" className="rounded-full bg-[#1F6AE1] px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" /><ConversionLink label="Partner With an Athlete" href="#partnership-form" location="athlete_profile" className="rounded-full border border-[#2AFF7D]/40 px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" /></div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <section className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <h2 className="text-2xl font-black text-white">Profile</h2>
            <p className="mt-4 text-base leading-7 text-[#C7CCD6]">{athlete.bio}</p>
            {athlete.note ? <p className="mt-4 text-sm text-[#2AFF7D]">{athlete.note}</p> : null}
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <h2 className="text-2xl font-black text-white">Verified highlights</h2>
            <ul className="mt-4 space-y-3 text-base text-[#C7CCD6]">
              {athlete.identity.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#2AFF7D]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {athlete.highlights ? <p className="mt-5 text-sm leading-7 text-[#C7CCD6]">Highlights: {athlete.highlights}</p> : null}
            {athlete.previousNote ? <p className="mt-3 text-sm leading-7 text-[#C7CCD6]">Previous note: {athlete.previousNote}</p> : null}
            {athlete.previousPrograms ? <p className="mt-3 text-sm leading-7 text-[#C7CCD6]">Previous programs: {athlete.previousPrograms}</p> : null}
            {athlete.previousTeams ? <p className="mt-3 text-sm leading-7 text-[#C7CCD6]">Previous teams/events: {athlete.previousTeams}</p> : null}
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <h2 className="text-2xl font-black text-white">Career timeline</h2>
            <div className="mt-5 space-y-4">
              {athlete.timeline.map((item) => (
                <div key={item.year} className="flex gap-4">
                  <div className="flex w-16 flex-col items-center">
                    <span className="h-3 w-3 rounded-full bg-[#2AFF7D]" aria-hidden="true" />
                    <span className="mt-2 text-xs uppercase tracking-[0.16em] text-[#C7CCD6]">{item.year}</span>
                  </div>
                  <p className="flex-1 text-sm leading-7 text-[#C7CCD6]">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <h2 className="text-xl font-black text-white">Quick facts</h2>
            <div className="mt-5 grid gap-4">
              {athlete.keyStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#0B0E11] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#C7CCD6]">{stat.label}</p>
                  <p className="mt-2 text-lg font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <h2 className="text-xl font-black text-white">NIL brand categories</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {athlete.brandCategories.map((category) => (
                <span key={category} className="rounded-full border border-[#1F6AE1]/40 bg-[#1F6AE1]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#DDEAFE]">
                  {category}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <h2 className="text-xl font-black text-white">Media placeholder</h2>
            <div className="mt-4 h-52 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(31,106,225,0.25),_transparent_50%),linear-gradient(135deg,_#101722,_#070B0F)]" />
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <h2 className="text-xl font-black text-white">Related news</h2>
            <div className="mt-4 space-y-3">
              {relatedNews.length > 0 ? (
                relatedNews.map((item) => (
                  <Link key={item.slug} href={`/news/${item.slug}`} className="block rounded-2xl border border-white/10 bg-[#0B0E11] p-3 text-sm text-[#C7CCD6] hover:text-white">
                    {item.title}
                  </Link>
                ))
              ) : (
                <p className="text-sm text-[#C7CCD6]">No related news yet.</p>
              )}
            </div>
          </section>

          <section id="partnership-form" className="rounded-[2rem] border border-[#1F6AE1]/30 bg-[#0F151B] p-6">
            <h2 className="text-xl font-black text-white">Partner With This Athlete</h2>
            <p className="mt-3 text-sm leading-7 text-[#C7CCD6]">
              Connect with NXTG3N to discuss campaigns, athlete storytelling, education, and long-term partnerships.
            </p>
            <AthletePartnershipForm athlete={athlete.name} athleteSlug={athlete.slug} />
          </section>
        </aside>
      </div>
    </div>
  );
}
