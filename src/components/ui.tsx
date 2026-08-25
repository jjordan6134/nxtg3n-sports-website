import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2AFF7D]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-4 text-base leading-7 text-[#C7CCD6]">{intro}</p> : null}
    </div>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#2E7BFF] hover:bg-[#2E7BFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E11]"
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E11]"
    >
      {children}
    </Link>
  );
}

export function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-3xl font-black text-white">{value}</div>
      <div className="mt-2 text-sm uppercase tracking-[0.18em] text-[#C7CCD6]">{label}</div>
    </div>
  );
}
