import type { Metadata } from "next";
import Link from "next/link";
import { AthleteBrandBlueprint } from "@/components/athlete-brand-blueprint";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { brand } from "@/data/site";

export const metadata: Metadata = {
  title: "Athlete Brand Blueprint and NIL Action Plan",
  description: "Create a practical athlete positioning, audience, content, outreach, and campaign-record plan with the free NXTG3N Athlete Brand Blueprint.",
  alternates: { canonical: "/resources/athlete-brand-blueprint" },
  openGraph: { title: "Free Athlete Brand Blueprint", description: "Turn an athlete’s identity, market, values, and content strengths into a responsible 30-day NIL preparation plan.", url: "/resources/athlete-brand-blueprint", images: [{ url: "/images/editorial/athlete-branding.png", alt: "Athlete brand planning with NXTG3N Sports" }] },
  twitter: { card: "summary_large_image", title: "Free Athlete Brand Blueprint", description: "Build a responsible athlete-brand action plan.", images: ["/images/editorial/athlete-branding.png"] },
};

const faq = [
  { question: "Does the blueprint calculate an athlete’s NIL value?", answer: "No. A responsible valuation requires verified, dated evidence and the details of a specific opportunity. The blueprint organizes preparation without promising earnings or inventing a dollar value." },
  { question: "Is follower count the most important factor?", answer: "No. Audience relevance, location, trust, content quality, reliability, rights requested, deliverables, and campaign fit can all matter. Metrics should always be dated and represented accurately." },
  { question: "Can a high school athlete use the worksheet?", answer: "The planning questions can be useful, but a minor should involve a parent or legal guardian and verify all applicable school, association, state, contract, and disclosure requirements before accepting an opportunity." },
];

export default function AthleteBrandBlueprintPage() {
  return <main>
    <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "NIL Resource Center", item: `${brand.siteUrl}/resources` }, { name: "Athlete Brand Blueprint", item: `${brand.siteUrl}/resources/athlete-brand-blueprint` }]} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "NXTG3N Athlete Brand Blueprint", applicationCategory: "BusinessApplication", operatingSystem: "Web", isAccessibleForFree: true, url: `${brand.siteUrl}/resources/athlete-brand-blueprint`, description: metadata.description, dateModified: "2026-09-19", publisher: { "@type": "Organization", name: brand.name } }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />

    <section className="border-b border-white/10 bg-[radial-gradient(circle_at_15%_20%,rgba(31,106,225,0.3),transparent_34%),radial-gradient(circle_at_88%_75%,rgba(42,255,125,0.12),transparent_30%),#0B0E11]"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"><Link href="/resources" className="text-xs font-black uppercase tracking-[0.2em] text-[#2AFF7D] hover:text-white">← NIL Resource Center</Link><h1 className="mt-6 max-w-5xl text-4xl font-black tracking-tight text-white sm:text-6xl">Athlete Brand Blueprint</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-[#C7CCD6]">A brand is not a logo or a follower count. It is the consistent relationship between what an athlete demonstrates, who pays attention, and which partnerships make sense.</p><p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#8F99A8]">Original NXTG3N tool · Reviewed September 19, 2026</p></div></section>

    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><AthleteBrandBlueprint /></section>

    <section className="border-y border-white/10 bg-[#0F151B]"><div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">How to use the plan</p><h2 className="mt-3 text-3xl font-black text-white">Evidence before outreach.</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{[["Be specific", "Replace broad claims with current facts: real locations, actual content formats, dated metrics, and demonstrated interests."], ["Start appropriately", "A first collaboration should be small enough to deliver well and clear enough for both sides to measure honestly."], ["Close the loop", "After delivery, organize proof, ask the partner what worked, and use the answer to improve the next campaign."]].map(([title, copy]) => <article key={title} className="rounded-2xl border border-white/10 bg-[#101722] p-5"><h3 className="font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#C7CCD6]">{copy}</p></article>)}</div><p className="mt-8 border-l-2 border-[#2AFF7D] pl-4 text-sm leading-6 text-[#9AA3B2]">This worksheet provides general educational planning information. It is not legal, tax, financial, compliance, eligibility, valuation, or contractual advice. Requirements differ by athlete and opportunity.</p></div></section>

    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">Blueprint FAQ</p><div className="mt-5 divide-y divide-white/10">{faq.map((item) => <details key={item.question} className="group py-5"><summary className="cursor-pointer list-none font-black text-white">{item.question}<span className="float-right text-[#2AFF7D] group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-[#C7CCD6]">{item.answer}</p></details>)}</div><div className="mt-8 flex flex-wrap gap-3"><Link href="/resources#readiness-assessment" className="rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-black text-white">Take the readiness assessment</Link><Link href="/partners" className="rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white hover:bg-white/10">Explore partnerships</Link></div></section>
  </main>;
}
