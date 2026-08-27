"use client";

import Link from "next/link";
import { trackConversion } from "@/lib/analytics";

const paths = [
  { label: "Apply for Representation", description: "Start a conversation about athlete branding, development, NIL strategy, and long-term planning.", href: "/apply", location: "homepage", tone: "border-[#1F6AE1]/50 bg-[#1F6AE1]/10" },
  { label: "Partner With an Athlete", description: "Explore credible athlete media, storytelling, NIL campaigns, and brand partnerships.", href: "/talent", location: "homepage", tone: "border-[#2AFF7D]/30 bg-[#2AFF7D]/5" },
  { label: "Join the NXTG3N Newsletter", description: "Get thoughtful athlete news, education, development, and agency updates in your inbox.", href: "#newsletter-signup", location: "homepage", tone: "border-white/15 bg-white/5" },
];

export function ConversionLink({ label, href, location, className }: { label: string; href: string; location: string; className?: string }) {
  return <Link href={href} onClick={() => trackConversion({ name: "cta_click", properties: { cta_name: label, cta_location: location, destination: href } })} className={className}>{label}</Link>;
}

export function ConversionPaths() {
  return <section className="border-y border-white/10 bg-[#0F151B]" aria-labelledby="conversion-paths-heading">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2AFF7D]">Choose your next step</p>
        <h2 id="conversion-paths-heading" className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">A clear path for every part of the NXTG3N community.</h2>
        <p className="mt-4 text-base leading-7 text-[#C7CCD6]">Whether you are building an athlete future, a partnership, or a better connection to the game, start with the route that fits.</p>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {paths.map((path) => <div key={path.label} className={`rounded-[2rem] border p-6 ${path.tone}`}><h3 className="text-xl font-black text-white">{path.label}</h3><p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{path.description}</p><ConversionLink label={path.label} href={path.href} location={path.location} className="mt-6 inline-flex rounded-full border border-white/15 bg-[#0B0E11] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#2AFF7D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" /></div>)}
      </div>
      <div className="sticky bottom-3 z-20 mt-6 flex gap-2 rounded-2xl border border-white/10 bg-[#0B0E11]/95 p-2 shadow-xl backdrop-blur md:hidden">
        <ConversionLink label="Apply for Representation" href="/apply" location="mobile_cta" className="flex-1 rounded-xl bg-[#1F6AE1] px-3 py-2.5 text-center text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" />
        <ConversionLink label="Partner With an Athlete" href="/talent" location="mobile_cta" className="flex-1 rounded-xl border border-[#2AFF7D]/40 px-3 py-2.5 text-center text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" />
      </div>
    </div>
  </section>;
}