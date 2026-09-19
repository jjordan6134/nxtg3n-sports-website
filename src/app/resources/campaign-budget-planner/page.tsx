import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { NilCampaignPlanner } from "@/components/nil-campaign-planner";
import { brand } from "@/data/site";

export const metadata: Metadata = {
  title: "NIL Campaign Budget and Deliverables Planner",
  description: "Build a responsible NIL campaign scope, allocate a working budget, select deliverables and usage, and download a sponsor planning brief.",
  alternates: { canonical: "/resources/campaign-budget-planner" },
  openGraph: { title: "NIL Campaign Budget & Deliverables Planner", description: "A free planning tool for businesses building responsible athlete campaigns.", url: "/resources/campaign-budget-planner", images: [{ url: "/images/editorial/athlete-branding.png", alt: "NIL campaign planning with NXTG3N Sports" }] },
  twitter: { card: "summary_large_image", title: "NIL Campaign Budget & Deliverables Planner", description: "Plan an athlete campaign scope and working budget.", images: ["/images/editorial/athlete-branding.png"] },
};

const faqs = [
  { question: "Does this planner determine what an athlete should be paid?", answer: "No. It allocates a budget entered by the user. Athlete compensation must be negotiated using the specific scope, time, deliverables, identity and content rights, exclusivity, market fit, expenses, and applicable requirements." },
  { question: "Why separate production from athlete compensation?", answer: "Campaigns can require photography, video, editing, travel, products, locations, staffing, accessibility, and administration. Separating these costs makes the working scope more transparent." },
  { question: "Does a larger budget guarantee results?", answer: "No. Outcomes depend on audience fit, creative quality, offer, timing, distribution, execution, measurement, and external conditions. The parties should agree on measurable activities without guaranteeing sales or reach." },
];

export default function CampaignBudgetPlannerPage() {
  return <main>
    <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "NIL Resource Center", item: `${brand.siteUrl}/resources` }, { name: "Campaign Budget Planner", item: `${brand.siteUrl}/resources/campaign-budget-planner` }]} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "NXTG3N NIL Campaign Budget and Deliverables Planner", applicationCategory: "BusinessApplication", operatingSystem: "Web", isAccessibleForFree: true, url: `${brand.siteUrl}/resources/campaign-budget-planner`, description: metadata.description, dateModified: "2026-09-19", publisher: { "@type": "Organization", name: brand.name } }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />

    <section className="border-b border-white/10 bg-[radial-gradient(circle_at_18%_20%,rgba(31,106,225,0.32),transparent_34%),radial-gradient(circle_at_85%_72%,rgba(42,255,125,0.14),transparent_32%),#0B0E11]"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"><Link href="/resources" className="text-xs font-black uppercase tracking-[0.2em] text-[#2AFF7D] hover:text-white">← NIL Resource Center</Link><h1 className="mt-6 max-w-5xl text-4xl font-black tracking-tight text-white sm:text-6xl">NIL Campaign Budget &amp; Deliverables Planner</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-[#C7CCD6]">Start with the business objective and the complete campaign—not a guessed athlete price. Build a transparent working budget, scope the deliverables, define usage, and download a brief for review.</p><p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#8F99A8]">Original NXTG3N tool · Reviewed September 19, 2026</p></div></section>

    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><NilCampaignPlanner /></section>

    <section className="border-y border-white/10 bg-[#0F151B]"><div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">Budget clarity</p><h2 className="mt-3 text-3xl font-black text-white">The athlete fee is not the entire campaign.</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{[["Scope drives negotiation", "Deliverables, time, revisions, travel, usage, exclusivity, category conflicts, and campaign responsibilities should be defined before final terms."], ["Rights carry value", "Organic posting is different from paid advertising, long-term website use, geographic expansion, editing, sublicensing, or perpetual use."], ["Measurement needs a plan", "Choose the activity and outcome signals before launch, record a baseline, and schedule a post-campaign review without promising results."]].map(([title, copy]) => <article key={title} className="rounded-2xl border border-white/10 bg-[#101722] p-5"><h3 className="font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#C7CCD6]">{copy}</p></article>)}</div><p className="mt-8 border-l-2 border-[#2AFF7D] pl-4 text-sm leading-6 text-[#9AA3B2]">This planner is an educational scoping tool. It is not an offer, contract, valuation, rate card, guarantee, or legal, tax, financial, eligibility, or compliance advice. Athlete participation and final terms require independent review and written agreement.</p></div></section>

    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">Planner FAQ</p><div className="mt-5 divide-y divide-white/10">{faqs.map((item) => <details key={item.question} className="group py-5"><summary className="cursor-pointer list-none font-black text-white">{item.question}<span className="float-right text-[#2AFF7D] group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-[#C7CCD6]">{item.answer}</p></details>)}</div><div className="mt-8 flex flex-wrap gap-3"><Link href="/partners" className="rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-black text-white">Explore athlete partnerships</Link><Link href="/resources/athlete-brand-blueprint" className="rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white hover:bg-white/10">Athlete Brand Blueprint</Link></div></section>
  </main>;
}
