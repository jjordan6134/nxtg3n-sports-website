import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AthletePartnershipDialog } from "@/components/athlete-partnership-form";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { athletes } from "@/data/athletes";
import { brand } from "@/data/site";
import { ConversionPageView } from "@/components/conversion-page-view";
import { AthleteMatchmaker } from "@/components/athlete-matchmaker";

export const metadata: Metadata = {
  title: "Athlete Partnerships and NIL Campaigns",
  description: "Explore athlete partnerships, appearances, sponsored content, storytelling, and NIL campaign opportunities with the NXTG3N Sports roster.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partner With NXTG3N Athletes",
    description: "Build a credible athlete partnership around content, appearances, community, and long-term brand fit.",
    url: "/partners",
    images: [{ url: "/images/editorial/athlete-branding.png", alt: "NXTG3N athlete partnerships" }],
  },
  twitter: { card: "summary_large_image", title: "Partner With NXTG3N Athletes", description: "Build a credible athlete partnership around content, appearances, community, and long-term brand fit.", images: ["/images/editorial/athlete-branding.png"] },
};

const campaignOptions = [
  { title: "Sponsored Content", copy: "Athlete-led social content shaped around an approved brief, platform, timeline, and usage plan." },
  { title: "Appearances & Events", copy: "Community events, brand activations, interviews, and other scheduled appearances based on athlete availability." },
  { title: "Athlete Storytelling", copy: "Short-form features, interviews, and campaign narratives that connect performance, identity, and brand values." },
  { title: "Product & Merch", copy: "Product integrations, athlete collections, and merchandise concepts reviewed for audience and brand fit." },
];

const processSteps = [
  { number: "01", title: "Share the brief", copy: "Tell us the objective, audience, deliverables, dates, budget range, and any category requirements." },
  { number: "02", title: "Review the fit", copy: "NXTG3N reviews athlete availability, audience alignment, conflicts, responsibilities, and campaign scope." },
  { number: "03", title: "Confirm the plan", copy: "Approved work moves forward with written deliverables, timing, compensation, usage, and review expectations." },
  { number: "04", title: "Launch responsibly", copy: "Content or appearances are completed with communication, disclosure, and final approvals built into the workflow." },
];

const faqs = [
  { question: "Can a brand ask NXTG3N to recommend an athlete?", answer: "Yes. Share the campaign objective, audience, location, timeline, and budget range. NXTG3N can review the roster for a potential fit without guaranteeing athlete availability or acceptance." },
  { question: "What information should a partnership brief include?", answer: "Include the brand, campaign goal, requested deliverables, platforms, dates, location, compensation or budget range, content usage, exclusivity, and approval process." },
  { question: "Are all partnership requests accepted?", answer: "No. Every request is reviewed for athlete fit, availability, existing commitments, applicable requirements, and alignment with the athlete and agency." },
  { question: "Can NXTG3N support a multi-athlete campaign?", answer: "Multi-athlete concepts can be reviewed. The final roster, scope, timing, and terms depend on the campaign and each athlete's availability." },
];

export default function PartnersPage() {
  return (
    <main>
      <ConversionPageView event={{ name: "partners_page_view", properties: { page_name: "partners" } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "NXTG3N Athlete Partnerships", provider: { "@type": "Organization", name: brand.legalName, url: brand.siteUrl }, areaServed: "United States", serviceType: ["Athlete partnerships", "NIL campaigns", "Sponsored content", "Athlete appearances"], url: `${brand.siteUrl}/partners` }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
      <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "Partners", item: `${brand.siteUrl}/partners` }]} />

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_80%_20%,rgba(31,106,225,0.22),transparent_34%),radial-gradient(circle_at_15%_85%,rgba(42,255,125,0.12),transparent_28%),#0B0E11]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2AFF7D]">Brands · Sponsors · Organizations</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">Build an athlete partnership with purpose.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#C7CCD6]">Connect your campaign with credible athlete stories, clear deliverables, and a process designed around fit—not forced promotion.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AthletePartnershipDialog athlete="the NXTG3N roster" athleteSlug="roster" location="partners_hero" />
              <Link href="#roster-match" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">Explore roster fit</Link>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#7F8795]">All opportunities are subject to review, athlete availability, written terms, and applicable school, conference, state, or governing-body requirements.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[2rem] border border-white/10 bg-[#101722]/90 p-4 sm:p-5">
            {athletes.slice(0, 4).map((athlete) => (
              <Link key={athlete.slug} href={`/talent/${athlete.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0B0E11] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]">
                <div className="relative h-32 bg-[#0F151B]">
                  <Image src={athlete.imagePath} alt={`${athlete.name} athlete profile`} fill sizes="(max-width: 768px) 50vw, 16rem" className={athlete.imageFit === "contain" ? "object-contain" : "object-cover"} style={{ objectPosition: athlete.imagePosition ?? "50% 50%" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E11] via-transparent to-transparent" aria-hidden="true" />
                </div>
                <div className="p-3"><p className="font-bold text-white group-hover:text-[#2AFF7D]">{athlete.name}</p><p className="mt-1 text-xs text-[#C7CCD6]">{athlete.position} · {athlete.status}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2AFF7D]">Campaign possibilities</p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Start with the right format.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{campaignOptions.map((option) => <article key={option.title} className="rounded-3xl border border-white/10 bg-[#101722] p-6"><div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#1F6AE1] to-[#2AFF7D]" /><h3 className="mt-5 text-xl font-black text-white">{option.title}</h3><p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{option.copy}</p></article>)}</div>
      </section>

      <section className="border-y border-white/10 bg-[#0F141A]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2AFF7D]">A clearer workflow</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">From brief to activation.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{processSteps.map((step) => <article key={step.number} className="border-l-2 border-[#1F6AE1] bg-[#0B0E11] p-5"><p className="text-sm font-black text-[#2AFF7D]">{step.number}</p><h3 className="mt-3 text-lg font-black text-white">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#C7CCD6]">{step.copy}</p></article>)}</div>
        </div>
      </section>

      <section id="roster-match" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2AFF7D]">Roster matching</p><h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Find a potential campaign fit.</h2></div><Link href="/talent" className="text-sm font-semibold text-[#2AFF7D] hover:text-white">View complete athlete profiles</Link></div>
        <AthleteMatchmaker athletes={athletes} />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#1F6AE1]/30 bg-[#101722] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2AFF7D]">Partner FAQ</p>
          <h2 className="mt-3 text-3xl font-black text-white">Before you send the brief.</h2>
          <div className="mt-6 divide-y divide-white/10">{faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-bold text-white marker:content-none">{faq.question}<span className="float-right text-[#2AFF7D] group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-[#C7CCD6]">{faq.answer}</p></details>)}</div>
          <div className="mt-7 flex flex-wrap items-center gap-4"><AthletePartnershipDialog athlete="the NXTG3N roster" athleteSlug="roster" location="partners_faq" /><Link href="/contact" className="text-sm font-semibold text-[#2AFF7D] hover:text-white">Contact the agency</Link></div>
        </div>
      </section>
    </main>
  );
}
