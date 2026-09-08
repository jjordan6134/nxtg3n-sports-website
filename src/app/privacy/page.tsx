import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy Policy | NXTG3N Sports" };

const sections = [
  ["Information we collect", "We may collect information you submit through inquiry, application, partnership, newsletter, or contact forms, including names, contact details, organization information, athlete information, campaign interests, and messages. We may also receive basic technical information such as device, browser, referral source, pages viewed, and approximate location through hosting, security, and analytics services."],
  ["How we use information", "We use information to respond to inquiries, evaluate representation and partnership opportunities, deliver requested communications, operate and improve the website, measure engagement, protect our services, maintain records, and comply with applicable obligations."],
  ["Cookies and analytics", "The website and its service providers may use cookies or similar technologies for essential functionality, security, analytics, attribution, and preference management. Browser controls may allow you to limit cookies, although doing so can affect site functionality."],
  ["How information is shared", "We may share information with service providers that support hosting, analytics, email, forms, scheduling, media, and business operations; with professional advisers; when required by law; or in connection with a business transaction. We do not sell personal information for money."],
  ["Athletes, families, and minors", "Our general website is not directed to children under 13. A parent or legal guardian should submit information for a minor unless applicable law and the relevant program permit otherwise. We encourage families to contact us before sending sensitive athlete information."],
  ["Data retention and security", "We retain information only as reasonably needed for the purposes described here, legitimate business records, dispute resolution, security, and legal obligations. We use reasonable administrative and technical safeguards, but no internet transmission or storage system can be guaranteed completely secure."],
  ["Your choices and rights", "You may unsubscribe from marketing messages using the link provided, adjust browser controls, or contact us to request access, correction, or deletion of information. Available rights and exceptions depend on applicable law and the nature of the record."],
  ["Third-party services", "Links, embedded media, social networks, stores, and other third-party services operate under their own terms and privacy practices. Review those policies before providing information to those services."],
  ["Changes and contact", "We may update this policy as our services and legal obligations change. Material updates will be reflected by the date below. Questions or privacy requests may be sent to nxtgnsportstalentagencyllc@gmail.com."],
] as const;

export default function PrivacyPage() {
  return <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
    <SectionHeading eyebrow="Privacy" title="Privacy Policy" intro="How NXTG3N Sports Talent Agency L.L.C. collects, uses, protects, and manages information." as="h1" />
    <p className="mt-6 text-sm text-[#7F8795]">Effective and last updated: September 8, 2026</p>
    <div className="mt-8 space-y-8 rounded-[2rem] border border-white/10 bg-[#101722] p-8 text-base leading-7 text-[#C7CCD6]">
      {sections.map(([title, content]) => <section key={title}><h2 className="text-xl font-bold text-white">{title}</h2><p className="mt-3">{content}</p></section>)}
    </div>
  </div>;
}
