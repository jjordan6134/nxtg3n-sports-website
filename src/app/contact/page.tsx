import { contactChannels } from "@/data/site";
import { SectionHeading } from "@/components/ui";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Choose the right pathway"
        intro="Reach out directly for athlete representation, brand partnerships, media work, education, or general inquiries."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {contactChannels.map((channel) => (
          <article key={channel.title} className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <h3 className="text-xl font-bold text-white">{channel.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#C7CCD6]">{channel.description}</p>
            <a href={channel.href} className="mt-5 inline-flex text-sm font-semibold text-[#2AFF7D] hover:text-white">
              Email now
            </a>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border border-[#1F6AE1]/30 bg-[#101722] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2AFF7D]">Direct email</p>
        <a href="mailto:nxtgnsportstalentagencyllc@gmail.com" className="mt-4 inline-block text-2xl font-black text-white hover:text-[#2AFF7D]">
          nxtgnsportstalentagencyllc@gmail.com
        </a>
      </div>
    </div>
  );
}
