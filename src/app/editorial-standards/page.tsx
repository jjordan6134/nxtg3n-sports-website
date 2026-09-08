import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Editorial Standards", description: "How NXTG3N Sports creates, verifies, updates, and corrects athlete news and educational content." };

const standards = [
  ["Original purpose", "NXTG3N publishes original athlete updates and practical educational guides for athletes, families, brands, and local partners. Content is created to answer real questions, document athlete development, and make complex decisions easier to understand."],
  ["Verification and sourcing", "Time-sensitive claims—including schools, teams, commitments, roster status, statistics, awards, and professional opportunities—are reviewed against official program records, recognized statistics providers, direct athlete or agency documentation, or clearly identified third-party reporting. Athlete pages display source links when public documentation is available."],
  ["Dates and changing information", "Profiles display a last-reviewed date. Because rosters and athlete circumstances change, a review date indicates when the page was assessed; it does not guarantee that an outside organization has not changed information afterward. Visitors should confirm current details before making business, recruiting, or media decisions."],
  ["Educational boundaries", "NIL, financial, technology, career, and media articles provide general education. They do not replace individualized legal, tax, investment, eligibility, medical, or compliance advice. We identify uncertainty and avoid promises about deals, income, reach, selection, or athletic outcomes."],
  ["Artificial intelligence", "AI tools may assist with organization, drafting, accessibility, or production workflows. A person remains responsible for reviewing published copy, athlete identity, claims, permissions, and corrections. We do not intentionally publish invented quotations, statistics, credentials, or experiences."],
  ["Images and media", "We aim to use agency-owned, athlete-provided, licensed, official, or appropriately attributed visual material. Third-party trademarks and media remain the property of their owners. Embedded platforms operate under their own policies."],
  ["Corrections", "When a material error is identified, we review the underlying record and update the page as promptly as practical. Correction requests should identify the page, disputed statement, and supporting documentation so the issue can be evaluated accurately."],
  ["Commercial independence", "Sponsored work, partnerships, or affiliate relationships should be identified when applicable. Commercial relationships do not permit fabricated athletic claims or guaranteed editorial treatment."],
] as const;

export default function EditorialStandardsPage() {
  return <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
    <SectionHeading eyebrow="Trust and transparency" title="Editorial Standards" intro="How NXTG3N creates, reviews, sources, updates, and corrects its published work." as="h1" />
    <p className="mt-6 text-sm text-[#7F8795]">Last updated: September 8, 2026</p>
    <div className="mt-8 space-y-8 rounded-[2rem] border border-white/10 bg-[#101722] p-8">{standards.map(([title, copy]) => <section key={title}><h2 className="text-xl font-black text-white">{title}</h2><p className="mt-3 leading-7 text-[#C7CCD6]">{copy}</p></section>)}</div>
    <div className="mt-8 rounded-[2rem] border border-[#1F6AE1]/30 bg-[#101722] p-6"><h2 className="text-xl font-black text-white">Request a correction</h2><p className="mt-3 leading-7 text-[#C7CCD6]">Send the page URL, the information requiring review, and a reliable supporting source.</p><Link href="mailto:nxtgnsportstalentagencyllc@gmail.com?subject=Editorial%20Correction%20Request" className="mt-4 inline-flex font-semibold text-[#2AFF7D]">Email the editorial team</Link></div>
  </div>;
}
