import Link from "next/link";
import { mediaCategories, mediaLinks } from "@/data/site";
import { SectionHeading } from "@/components/ui";

export default function MediaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Media"
        title="Original content, athlete stories, and live conversation"
        intro="NXTG3N distributes athlete storytelling, education, and digital culture across key platforms and community channels."
        as="h1"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mediaCategories.map((category) => (
          <article key={category} className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <div className="mb-5 h-36 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_left,_rgba(31,106,225,0.25),_transparent_50%),linear-gradient(135deg,_#101722,_#070B0F)]" />
            <h3 className="text-xl font-bold text-white">{category}</h3>
            <p className="mt-3 text-sm leading-6 text-[#C7CCD6]">
              Premium athlete storytelling and culture-forward media designed to inform and inspire.
            </p>
          </article>
        ))}
      </div>

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

      <div className="mt-12 text-center">
        <Link href="/" className="inline-flex text-sm font-semibold text-[#2AFF7D] hover:text-white">
          Back to home
        </Link>
      </div>
    </div>
  );
}
