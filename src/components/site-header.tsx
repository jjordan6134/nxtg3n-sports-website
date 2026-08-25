"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { brand, navItems } from "@/data/site";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0E11]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Go to the NXTG3N home page">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <Image src={brand.logoPath} alt="NXTG3N Sports logo" width={44} height={44} priority />
          </div>
          <div className="leading-none">
            <div className="text-lg font-black tracking-[0.18em] text-white">NXTG3N</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.26em] text-[#C7CCD6]">Sports</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-[#C7CCD6] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E11]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/apply"
            className="rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#2E7BFF] hover:bg-[#2E7BFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E11]"
          >
            Join NXTG3N
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[#0B0E11] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-base font-medium text-white/90 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E11]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/apply"
              className="mt-3 rounded-full bg-[#1F6AE1] px-4 py-3 text-center font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E11]"
              onClick={() => setMobileOpen(false)}
            >
              Join NXTG3N
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
