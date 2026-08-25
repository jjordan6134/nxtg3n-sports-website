import Image from "next/image";
import Link from "next/link";
import { AthleteCard } from "@/components/athlete-card";
import { NewsCard } from "@/components/news-card";
import { PrimaryButton, SecondaryButton, SectionHeading } from "@/components/ui";
import { featuredAthletes } from "@/data/athletes";
import { newsItems } from "@/data/news";
import { brand, serviceItems, storeCategories, trustPillars, valuePillars } from "@/data/site";

export default function HomePage() {
  return (
    <div className="bg-[#0B0E11] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(31,106,225,0.35),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(42,255,125,0.18),_transparent_25%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#1F6AE1]/60 bg-[#1F6AE1]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#DDEAFE]">
              <span className="h-2 w-2 rounded-full bg-[#2AFF7D]" aria-hidden="true" />
              Athlete-first representation
            </div>

            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
              Built for the Next Generation of Athletes
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#C7CCD6]">
              NXTG3N helps athletes transform their performance, personal brand, and future through NIL strategy, AI education, financial literacy, and long-term career planning beyond the game.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton href="/talent">Explore Our Talent</PrimaryButton>
              <SecondaryButton href="/apply">Join NXTG3N</SecondaryButton>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#C7CCD6]">
              <span>Identity coaching</span>
              <span>Brand acceleration</span>
              <span>Career pathways</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#101722] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <Image src={brand.logoPath} alt="NXTG3N logo" width={40} height={40} priority />
                  </div>
                  <div>
                    <div className="text-lg font-black tracking-[0.18em] text-white">NXTG3N</div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#C7CCD6]">The Neural Athlete</div>
                  </div>
                </div>
                <span className="rounded-full border border-[#2AFF7D]/30 bg-[#2AFF7D]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">
                  Global reach
                </span>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {featuredAthletes.map((athlete) => (
                  <div key={athlete.slug} className="rounded-2xl border border-white/10 bg-[#0B0E11] p-4">
                    <div className="mb-4 flex h-20 items-center justify-center rounded-xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(31,106,225,0.25),_transparent_60%),linear-gradient(135deg,_#101722,_#070B0F)] text-2xl font-black text-white">
                      {athlete.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0]?.toUpperCase() ?? "")
                        .join("")}
                    </div>
                    <p className="text-base font-semibold text-white">{athlete.name}</p>
                    <p className="mt-1 text-sm text-[#C7CCD6]">{athlete.position}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#2AFF7D]">{athlete.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0F141A]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          {trustPillars.map((item) => (
            <div key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-[#C7CCD6]">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured talent"
          title="Athletes building a sharper future"
          intro="From rising college performers to pro-track prospects, our roster is built around discipline, development, and long-term value."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredAthletes.map((athlete) => (
            <AthleteCard key={athlete.slug} athlete={athlete} />
          ))}
        </div>
      </section>

      <section className="bg-[#0F151B]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <SectionHeading eyebrow="Our philosophy" title="The Neural Athlete" intro="A performance model that blends athletic development, education, and ownership into a smarter path for the athlete lifecycle." />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {valuePillars.map((value) => (
              <div key={value} className="rounded-2xl border border-white/10 bg-[#0B0E11] p-5">
                <div className="text-2xl font-black text-white">0{valuePillars.indexOf(value) + 1}</div>
                <div className="mt-4 text-lg font-semibold text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><SectionHeading eyebrow="Educational insights" title="Build knowledge that travels with you" intro="Practical guides for athletes, families, and brands covering NIL, identity, financial literacy, technology, and career planning." /><div className="mt-8 grid gap-6 md:grid-cols-3">{newsItems.filter((item) => item.evergreen).slice(0, 3).map((item) => <NewsCard key={item.slug} item={item} />)}</div><Link href="/news?category=NIL%20Education" className="mt-6 inline-flex text-sm font-semibold text-[#2AFF7D]">Explore all guides</Link></section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Strategy built around the athlete lifecycle"
          intro="We combine skill development, brand clarity, education, and future planning so athletes can make stronger decisions before and after competition."
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceItems.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-[#101722] p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F6AE1]/10 text-lg font-black text-[#2AFF7D]">
                {item.title.slice(0, 1)}
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0F151B]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Latest news" title="NXTG3N editorial updates" intro="Fresh storylines, athlete movement, and the principles shaping the brand experience." />
            <Link href="/news" className="hidden text-sm font-semibold text-[#2AFF7D] hover:text-white md:inline-flex">
              View all news
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {newsItems.slice(0, 3).map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Media spotlight" title="Content built for athletes, brands, and audiences" intro="NXTG3N media keeps the message authentic, polished, and rooted in the athlete journey." />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            { title: "NXTG3N Originals", copy: "Short-form athlete stories and agency updates." },
            { title: "60 Seconds With...", copy: "Fast, human-first conversations with athletes and partners." },
            { title: "Athlete Highlights", copy: "Performance clips, milestones, and standout moments." },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-[#101722] p-6">
              <div className="mb-5 h-40 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(31,106,225,0.3),_transparent_55%),linear-gradient(135deg,_#101722,_#070B0F)]" />
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111823]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <SectionHeading eyebrow="Store" title="A premium launch experience is coming soon" intro="The NXTG3N store will spotlight athlete collections, performance gear, and future releases designed around the Neural Athlete identity." />
            <div className="mt-8 flex flex-wrap gap-3">
              {storeCategories.map((category) => (
                <span key={category} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C7CCD6]">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[#0B0E11] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">Merch partnerships</p>
            <h3 className="mt-4 text-3xl font-black text-white">Contact for merchandise and partnerships</h3>
            <a href="mailto:nxtgnsportstalentagencyllc@gmail.com?subject=Store%20and%20Merchandise%20Inquiry" className="mt-6 inline-flex text-sm font-semibold text-[#2AFF7D] hover:text-white">
              nxtgnsportstalentagencyllc@gmail.com
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-[#101722] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">For athletes</p>
            <h3 className="mt-4 text-3xl font-black text-white">Athletes and families</h3>
            <p className="mt-4 text-base leading-7 text-[#C7CCD6]">
              Build a stronger roadmap around development, brand identity, educational growth, and financial confidence from day one.
            </p>
            <div className="mt-6">
              <PrimaryButton href="/apply">Apply now</PrimaryButton>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#1F6AE1]/30 bg-[#0F151B] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">For partners</p>
            <h3 className="mt-4 text-3xl font-black text-white">Brands and sponsors</h3>
            <p className="mt-4 text-base leading-7 text-[#C7CCD6]">
              Connect with athlete-first partnerships, authentic campaigns, and values-driven storytelling across sport and culture.
            </p>
            <div className="mt-6">
              <SecondaryButton href="/contact">Start a conversation</SecondaryButton>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#101722] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">For parents</p>
            <h3 className="mt-4 text-3xl font-black text-white">A clearer support system</h3>
            <p className="mt-4 text-base leading-7 text-[#C7CCD6]">Understand NIL conversations, planning questions, and the guardrails that help young athletes make informed decisions.</p>
            <div className="mt-6"><SecondaryButton href="/news/parents-guide-to-nil">Read the parent guide</SecondaryButton></div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0F151B]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2AFF7D]">Newsletter</p>
          <h3 className="mt-4 text-3xl font-black text-white sm:text-4xl">The signal, not the noise.</h3>
          <p className="mt-4 text-base leading-7 text-[#C7CCD6]">
            Weekly athlete updates, education, and brand insights are coming soon. For now, connect directly by email for next steps.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <input
              aria-label="Email address"
              type="email"
              placeholder="Email address"
              className="w-full max-w-md rounded-full border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]"
              disabled
            />
            <button type="button" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white opacity-70" disabled>
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-[#1F6AE1]/40 bg-[linear-gradient(135deg,_rgba(31,106,225,0.16),_rgba(11,14,17,0.96))] p-8 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2AFF7D]">Ready to build</p>
              <h3 className="mt-4 text-3xl font-black text-white sm:text-4xl">Build the next chapter with NXTG3N.</h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/apply">Join the network</PrimaryButton>
              <SecondaryButton href="/contact">Contact us</SecondaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
