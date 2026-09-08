import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Terms of Use | NXTG3N Sports" };

const sections = [
  ["Acceptance and eligibility", "By accessing or using this website, you agree to these Terms of Use. If you do not agree, do not use the site. If you are using the site for an organization, you represent that you have authority to act for it. A parent or legal guardian should supervise use by a minor."],
  ["Informational content", "Website content is provided for general informational, promotional, and educational purposes. Athlete schools, teams, statistics, achievements, availability, and roster status can change and should be confirmed through displayed sources or directly with NXTG3N before making a decision."],
  ["Partnership and representation inquiries", "Submitting a form or contacting NXTG3N does not create an agency, employment, endorsement, sponsorship, or other contractual relationship. Campaign terms, deliverables, compensation, usage rights, exclusivity, approvals, and performance expectations must be documented in a separate written agreement."],
  ["No guaranteed outcomes", "NXTG3N does not guarantee selection, representation, athletic opportunities, media reach, engagement, revenue, sponsorship results, admissions, eligibility, roster placement, or professional outcomes."],
  ["Intellectual property", "The website design, copy, branding, graphics, and original materials are owned by or licensed to NXTG3N and may not be copied, republished, sold, or commercially exploited without permission. Third-party names, marks, photos, and media remain the property of their respective owners."],
  ["User submissions and acceptable use", "You are responsible for information you submit and must have the right to provide it. Do not submit unlawful, misleading, infringing, harmful, confidential, or malicious content; attempt unauthorized access; interfere with site operation; scrape the site in violation of law; or impersonate another person."],
  ["Third-party links and services", "The site may link to or embed services operated by third parties. NXTG3N does not control those services and is not responsible for their availability, content, transactions, security, or privacy practices."],
  ["Disclaimers and liability", "The site is provided on an “as available” basis to the extent permitted by law. NXTG3N does not warrant uninterrupted or error-free operation. To the extent permitted by law, NXTG3N will not be liable for indirect, incidental, special, consequential, or punitive damages arising from website use."],
  ["Changes, applicable law, and contact", "We may revise these terms and website content as our services evolve. Continued use after an update means you accept the revised terms. These terms are governed by applicable law. Questions may be sent to nxtgnsportstalentagencyllc@gmail.com."],
] as const;

export default function TermsPage() {
  return <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
    <SectionHeading eyebrow="Terms" title="Terms of Use" intro="The rules and expectations that apply when using the NXTG3N Sports website." as="h1" />
    <p className="mt-6 text-sm text-[#7F8795]">Effective and last updated: September 8, 2026</p>
    <div className="mt-8 space-y-8 rounded-[2rem] border border-white/10 bg-[#101722] p-8 text-base leading-7 text-[#C7CCD6]">
      {sections.map(([title, content]) => <section key={title}><h2 className="text-xl font-bold text-white">{title}</h2><p className="mt-3">{content}</p></section>)}
    </div>
  </div>;
}
