import { SectionHeading } from "@/components/ui";
import { valuePillars } from "@/data/site";
import { JsonLd } from "@/components/json-ld";
import { brand } from "@/data/site";

const pillars = [
  { title: "Mission", copy: "Represent athletes with clarity, purpose, and a future-first lens that values both winning and preparation." },
  { title: "The Neural Athlete philosophy", copy: "A blend of performance, intelligence, identity, discipline, and long-term ownership that prepares athletes beyond the game." },
  { title: "Athlete education", copy: "We help athletes understand the systems around their careers, from NIL decision-making to personal brand structure and life planning." },
  { title: "NIL strategy", copy: "Support is rooted in thoughtful guidance, foundational education, and an honest understanding of opportunity." },
  { title: "AI and automation education", copy: "We teach athletes how to use emerging tools in a practical, efficient, and ethical way to improve business readiness." },
  { title: "Financial literacy and ownership", copy: "Strong habits and long-term thinking matter as much as performance, especially in a rapidly changing sports landscape." },
  { title: "Life and career beyond sports", copy: "The athlete journey extends beyond competition, and planning for the future is central to sustainable growth." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", name: "About NXTG3N Sports", url: `${brand.siteUrl}/about`, about: { "@type": "Organization", name: brand.name } }} />
      <SectionHeading
        eyebrow="About"
        title="NXTG3N is built for a more intelligent athlete future"
        intro="We support the athlete ecosystem with strategy, education, and values rooted in development, ownership, innovation, integrity, and legacy."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#C7CCD6]">{pillar.copy}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#101722] p-8">
        <h3 className="text-2xl font-black text-white">Core values</h3>
        <div className="mt-6 flex flex-wrap gap-3">
          {valuePillars.map((item) => (
            <span key={item} className="rounded-full border border-[#1F6AE1]/40 bg-[#1F6AE1]/10 px-4 py-2 text-sm font-semibold text-[#DDEAFE]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
