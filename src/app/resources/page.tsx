import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import { DealReviewChecklist, NilReadinessAssessment } from "@/components/nil-resource-tools";
import { brand } from "@/data/site";

export const metadata: Metadata = {
  title: "NIL Resource Center for Athletes and Families",
  description: "Use original NIL readiness and deal-review tools, practical guidance, official references, and action plans built for athletes, families, and local business partners.",
  alternates: { canonical: "/resources" },
  openGraph: { title: "NXTG3N NIL Resource Center", description: "Practical NIL education and original tools for athletes, families, and business partners.", url: "/resources", images: [{ url: "/images/editorial/nil-education.png", alt: "NXTG3N NIL education resource center" }] },
  twitter: { card: "summary_large_image", title: "NXTG3N NIL Resource Center", description: "Practical NIL education and original athlete tools.", images: ["/images/editorial/nil-education.png"] },
};

const faqs = [
  { question: "Does completing the readiness assessment guarantee an NIL deal?", answer: "No. It identifies preparation areas only. Opportunities depend on fit, audience, conduct, performance context, availability, compliance requirements, and a brand’s independent decisions." },
  { question: "Can NXTG3N approve my eligibility or contract?", answer: "No. Athletes should use the appropriate school, team, association, attorney, tax professional, parent, or guardian for decisions within those parties’ responsibilities." },
  { question: "Should an athlete accept free products without an agreement?", answer: "The athlete should first clarify what the brand expects, what content or identity rights are requested, how the relationship must be disclosed, and what rules apply. Product compensation can still create obligations." },
  { question: "How often should an athlete update a media kit?", answer: "Review it whenever the athlete’s school, team, statistics, biography, contact information, audience metrics, market, or partnership availability changes. Label metrics with the date measured." },
];

const pathway = [
  ["01", "Define the athlete", "Write a clear biography, identify values, select appropriate industries, and document the communities the athlete can authentically reach."],
  ["02", "Prepare the proof", "Maintain current photos, verified performance sources, dated audience insights, media examples, and an accurate one-sheet or media kit."],
  ["03", "Review the opportunity", "Confirm deliverables, compensation, rights, exclusivity, disclosures, approvals, timelines, and the people responsible for each step."],
  ["04", "Deliver and document", "Publish on time, capture links and analytics, invoice correctly, save records, and conduct a post-campaign review with the partner."],
] as const;

const sources = [
  { name: "NCAA NIL Assist", type: "Education and reporting resources", href: "https://nilassist.ncaa.org/" },
  { name: "FTC Disclosures 101", type: "Advertising disclosure guidance", href: "https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers" },
  { name: "IRS Gig Economy Tax Center", type: "Federal tax and recordkeeping information", href: "https://www.irs.gov/businesses/gig-economy-tax-center" },
] as const;

export default function ResourcesPage() {
  return <main>
    <BreadcrumbJsonLd items={[{ name: "Home", item: brand.siteUrl }, { name: "NIL Resource Center", item: `${brand.siteUrl}/resources` }]} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: "NXTG3N NIL Resource Center", description: metadata.description, url: `${brand.siteUrl}/resources`, dateModified: "2026-09-19", publisher: { "@type": "Organization", name: brand.name } }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />

    <section className="border-b border-white/10 bg-[radial-gradient(circle_at_18%_25%,rgba(31,106,225,0.32),transparent_33%),radial-gradient(circle_at_82%_70%,rgba(42,255,125,0.14),transparent_32%),#0B0E11]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]"><span className="rounded-full border border-[#2AFF7D]/30 bg-[#2AFF7D]/10 px-3 py-1 text-[#2AFF7D]">Free athlete tools</span><span className="text-[#9AA3B2]">Reviewed September 19, 2026</span></div>
        <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">Build an NIL foundation before chasing the deal.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#C7CCD6]">The NXTG3N NIL Resource Center gives athletes and families a practical preparation system: assess readiness, review opportunity terms, organize proof, and know when qualified help is needed.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="#readiness-assessment" className="rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-bold text-white hover:bg-[#2E7BFF]">Check NIL readiness</Link><Link href="#deal-checklist" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">Review a deal</Link><Link href="/resources/athlete-brand-blueprint" className="rounded-full border border-[#2AFF7D]/40 bg-[#2AFF7D]/10 px-5 py-3 text-sm font-bold text-white hover:bg-[#2AFF7D]/20">Build a brand blueprint</Link></div>
        <p className="mt-8 max-w-3xl border-l-2 border-[#2AFF7D] pl-4 text-sm leading-6 text-[#9AA3B2]">Educational information only. This center does not provide legal, tax, financial, compliance, eligibility, or contractual advice. Requirements vary by athlete, location, school, team, association, immigration status, and opportunity.</p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{pathway.map(([number, title, copy]) => <article key={number} className="rounded-3xl border border-white/10 bg-[#101722] p-6"><p className="text-sm font-black text-[#2AFF7D]">{number}</p><h2 className="mt-4 text-xl font-black text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{copy}</p></article>)}</div></section>

    <section className="mx-auto max-w-7xl space-y-8 px-4 pb-16 sm:px-6 lg:px-8"><div className="rounded-[2rem] border border-[#2AFF7D]/30 bg-gradient-to-br from-[#13233E] to-[#101722] p-6 sm:p-8"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">New original tool</p><div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><h2 className="text-3xl font-black text-white">Athlete Brand Blueprint</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-[#C7CCD6]">Turn an athlete’s markets, values, content strengths, and partner fit into a downloadable 30-day preparation plan—without fake valuations or earnings promises.</p></div><Link href="/resources/athlete-brand-blueprint" className="shrink-0 rounded-full bg-[#2AFF7D] px-5 py-3 text-center text-sm font-black text-[#07120B] hover:bg-white">Build the blueprint</Link></div></div><NilReadinessAssessment /><DealReviewChecklist /></section>

    <section className="border-y border-white/10 bg-[#0F151B]"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2AFF7D]">Deal anatomy</p><h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Questions every opportunity should answer.</h2><p className="mt-4 text-sm leading-7 text-[#C7CCD6]">A message saying “post this for us” is not a complete campaign. Clear agreements protect the athlete, the business, and the relationship.</p></div><div className="grid gap-4 sm:grid-cols-2">{[["What is being exchanged?", "List every payment, product, expense, appearance, post, revision, and deadline."], ["Who may use the content?", "Define channels, geography, duration, paid advertising, editing rights, and reuse."], ["What limits the athlete?", "Identify exclusivity, conflicts, category restrictions, conduct clauses, and termination rights."], ["Who must approve it?", "Determine athlete, guardian, school, team, agent, legal, brand, and compliance responsibilities."]].map(([title, copy]) => <article key={title} className="rounded-2xl border border-white/10 bg-[#101722] p-5"><h3 className="font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#C7CCD6]">{copy}</p></article>)}</div></div></div></section>

    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2AFF7D]">Official starting points</p><h2 className="mt-3 text-3xl font-black text-white">Verify before acting.</h2><p className="mt-4 text-sm leading-7 text-[#C7CCD6]">Rules and guidance change. These external sources provide starting points, but athletes should also confirm the requirements that apply to their own circumstances.</p><div className="mt-6 space-y-3">{sources.map((source) => <a key={source.name} href={source.href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#101722] p-4 transition hover:border-[#1F6AE1]"><span><span className="block font-bold text-white">{source.name}</span><span className="mt-1 block text-xs text-[#9AA3B2]">{source.type}</span></span><span aria-hidden="true" className="text-[#2AFF7D]">↗</span></a>)}</div></div><div className="rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2AFF7D]">Resource FAQ</p><div className="mt-4 divide-y divide-white/10">{faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer list-none font-bold text-white">{faq.question}<span className="float-right text-[#2AFF7D] group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{faq.answer}</p></details>)}</div></div></section>

    <section className="px-4 pb-20 sm:px-6"><div className="mx-auto max-w-5xl rounded-[2rem] border border-[#1F6AE1]/40 bg-gradient-to-br from-[#13233E] to-[#101722] p-8 text-center sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2AFF7D]">Need a human review?</p><h2 className="mt-3 text-3xl font-black text-white">Turn preparation into a responsible plan.</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#C7CCD6]">NXTG3N can discuss athlete representation, brand preparation, educational workshops, and potential partnership fit. An inquiry does not guarantee representation or an opportunity.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/apply" className="rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-bold text-white">Athlete application</Link><Link href="/partners" className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">Business partnerships</Link></div></div></section>
  </main>;
}
