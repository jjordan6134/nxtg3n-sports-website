import Link from "next/link";
import { mediaLinks } from "@/data/site";
import { SectionHeading } from "@/components/ui";
import { MediaHub } from "@/components/media-hub";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ConversionLink } from "@/components/conversion-paths";

export default function MediaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Media"
        title="Original content, athlete stories, and live conversation"
        intro="NXTG3N distributes athlete storytelling, education, and digital culture across key platforms and community channels."
        as="h1"
      />

      <div className="mt-10"><MediaHub /></div>

      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#101722] p-8">
        <h3 className="text-2xl font-black text-white">Official channels</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {mediaLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-sm font-medium text-[#C7CCD6] transition hover:border-[#1F6AE1] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <section className="mt-12 rounded-[2rem] border border-[#1F6AE1]/30 bg-[#101722] p-6 sm:p-8" aria-labelledby="media-next-step">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Work with the roster</p>
        <h2 id="media-next-step" className="mt-3 text-2xl font-black text-white">Build a partnership around the story.</h2>
        <p className="mt-3 text-[#C7CCD6]">Connect with NXTG3N about athlete storytelling, NIL education, campaigns, and long-term brand partnerships.</p>
        <ConversionLink label="Partner With an Athlete" href="/talent" location="media" className="mt-5 inline-flex rounded-full bg-[#1F6AE1] px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" />
      </section>

      <section className="mt-12 rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8" aria-labelledby="media-newsletter-heading">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Newsletter</p>
        <h2 id="media-newsletter-heading" className="mt-3 text-2xl font-black text-white">Stay connected to the work.</h2>
        <div className="mt-6"><NewsletterSignup location="media" /></div>
      </section>

      <div className="mt-12 text-center">
        <Link href="/" className="inline-flex text-sm font-semibold text-[#2AFF7D] hover:text-white">
          Back to home
        </Link>
      </div>
    </div>
  );
}
