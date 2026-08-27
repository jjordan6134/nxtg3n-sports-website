import { SectionHeading } from "@/components/ui";
import { storeCategories } from "@/data/site";

export default function StorePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Store"
        title="Store launch in progress"
        intro="The brand experience is being prepared for future drops, athlete collaborations, and performance collections."
        as="h1"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {storeCategories.map((category) => (
          <article key={category} className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <div className="mb-5 h-36 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(31,106,225,0.25),_transparent_60%),linear-gradient(135deg,_#101722,_#070B0F)]" />
            <h3 className="text-xl font-bold text-white">{category}</h3>
            <p className="mt-3 text-sm leading-6 text-[#C7CCD6]">
              Coming soon to the NXTG3N storefront with athlete-first and culture-led design.
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border border-[#1F6AE1]/30 bg-[#101722] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Partnerships</p>
        <h3 className="mt-4 text-2xl font-black text-white">For merchandise or partnership inquiries</h3>
        <a href="mailto:nxtgnsportstalentagencyllc@gmail.com?subject=Store%20and%20Merchandise%20Inquiry" className="mt-5 inline-flex text-sm font-semibold text-[#2AFF7D] hover:text-white">
          nxtgnsportstalentagencyllc@gmail.com
        </a>
      </div>
    </div>
  );
}
