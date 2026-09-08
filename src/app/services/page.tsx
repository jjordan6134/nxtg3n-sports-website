import type { Metadata } from "next";
import Link from "next/link";
import { ConversionLink } from "@/components/conversion-paths";
import { ConversionPageView } from "@/components/conversion-page-view";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { brand, revenueServices } from "@/data/site";

export const metadata: Metadata = {
  title: "Athlete, Brand and Education Services",
  description: "Explore athlete representation, brand partnerships, media production, NIL education, AI training, and financial-literacy services from NXTG3N Sports.",
  alternates: { canonical: "/services" },
  openGraph: { title: "NXTG3N Sports Services", description: "Revenue-ready services for athletes, brands, teams, schools, and communities.", url: "/services", images: [{ url: "/images/editorial/athlete-branding.png", alt: "NXTG3N Sports services" }] },
  twitter: { card: "summary_large_image", title: "NXTG3N Sports Services", description: "Athlete, brand, media, NIL, AI, and financial-literacy services.", images: ["/images/editorial/athlete-branding.png"] },
};

const faqs = [
  { question: "Does NXTG3N publish fixed service prices?", answer: "No. Scope depends on the audience, format, deliverables, location, timing, usage, and level of support. NXTG3N reviews the request before providing terms." },
  { question: "Can services be combined?", answer: "Yes. A project can combine athlete partnerships, media production, workshops, or strategic support when the goals and responsibilities are clearly defined." },
  { question: "Are athlete partnerships guaranteed?", answer: "No. Athlete participation remains subject to fit, availability, conflicts, applicable requirements, written terms, and athlete approval." },
  { question: "Can NXTG3N work with schools, teams, or community organizations?", answer: "Organizations can request education, AI training, financial-literacy programming, media support, or a custom engagement for review." },
];

export default function ServicesPage() {
  return <main>
    <ConversionPageView event={{ name: "services_page_view", properties: { page_name: "services" } }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "NXTG3N Sports Services", itemListElement: revenueServices.map((service, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name: service.title, description: service.description, provider: { "@type": "Organization", name: brand.legalName }, url: `${brand.siteUrl}${service.href.split("?")[0]}` } })) }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
    <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "Services", item: `${brand.siteUrl}/services` }]} />

    <section className="border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(31,106,225,0.28),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(42,255,125,0.12),transparent_30%),#0B0E11]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2AFF7D]">NXTG3N Revenue Services</p><h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">Build value around athletes, brands, and the future of sport.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[#C7CCD6]">Choose a focused pathway for representation, campaigns, media, education, or organizational training. Every engagement begins with fit, scope, and clear responsibilities.</p><div className="mt-8 flex flex-wrap gap-3"><ConversionLink label="Explore athlete partnerships" href="/partners" location="services_hero" className="rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2E7BFF]" /><ConversionLink label="Discuss a custom engagement" href="/contact?service=Custom%20Engagement" location="services_hero" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10" /></div></div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2AFF7D]">Six revenue pathways</p><h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Choose the service that fits.</h2></div><p className="max-w-xl text-sm leading-6 text-[#C7CCD6]">No automated promise or generic package replaces a real scope review. Select a pathway and tell us what success should look like.</p></div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{revenueServices.map((service, index) => <article key={service.id} className="flex flex-col rounded-[2rem] border border-white/10 bg-[#101722] p-6"><div className="flex items-center justify-between gap-4"><span className="text-sm font-black text-[#2AFF7D]">0{index + 1}</span><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7F8795]">{service.audience}</span></div><h3 className="mt-5 text-2xl font-black text-white">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{service.description}</p><ul className="mt-5 space-y-2 text-sm text-white">{service.outcomes.map((outcome) => <li key={outcome} className="flex gap-2"><span className="text-[#2AFF7D]">✓</span>{outcome}</li>)}</ul><div className="mt-auto pt-7"><ConversionLink label={service.cta} href={service.href} location={`services_${service.id}`} className="inline-flex rounded-full border border-[#1F6AE1]/60 bg-[#1F6AE1]/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1F6AE1]" /></div></article>)}</div>
    </section>

    <section className="border-y border-white/10 bg-[#0F151B]"><div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">{[{ label: "Discover", copy: "Choose a revenue pathway aligned with the audience and objective." }, { label: "Define", copy: "Share timing, location, deliverables, budget context, and desired outcomes." }, { label: "Scope", copy: "NXTG3N reviews fit and responds with the appropriate next step or written terms." }].map((step, index) => <div key={step.label} className="border-l-2 border-[#1F6AE1] p-5"><p className="text-xs font-black text-[#2AFF7D]">0{index + 1}</p><h3 className="mt-3 text-xl font-black text-white">{step.label}</h3><p className="mt-2 text-sm leading-6 text-[#C7CCD6]">{step.copy}</p></div>)}</div></section>

    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><div className="rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2AFF7D]">Service FAQ</p><h2 className="mt-3 text-3xl font-black text-white">Start with clarity.</h2><div className="mt-6 divide-y divide-white/10">{faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer list-none font-bold text-white">{faq.question}<span className="float-right text-[#2AFF7D] group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-[#C7CCD6]">{faq.answer}</p></details>)}</div><div className="mt-7 flex flex-wrap gap-3"><ConversionLink label="Start a service inquiry" href="/contact?service=Custom%20Engagement" location="services_faq" className="rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white" /><Link href="/talent" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Explore the roster</Link></div></div></section>
  </main>;
}
