import Link from "next/link";
import { brand, footerQuickLinks, legalLinks, mediaLinks, socialLinks } from "@/data/site";
import { NewsletterSignup } from "@/components/newsletter-signup";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070B0F]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="text-lg font-black tracking-[0.2em] text-white">NXTG3N</div>
            <p className="mt-3 max-w-md text-sm text-[#C7CCD6]">{brand.legalName}</p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-[#2AFF7D]">{brand.tagline}</p>
            <a href={`mailto:${brand.email}`} className="mt-5 inline-block text-sm text-[#C7CCD6] transition hover:text-white">
              {brand.email}
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Quick links</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#C7CCD6]">
              {footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Social</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#C7CCD6]">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#C7CCD6]">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">{item.label}</Link>
                </li>
              ))}
              {mediaLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#C7CCD6] md:flex-row md:items-center md:justify-between">
          <p>© 2026 {brand.legalName}. All rights reserved.</p>
          <div className="flex gap-4">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-10 max-w-2xl border-t border-white/10 pt-8" aria-labelledby="footer-newsletter-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2AFF7D]">NXTG3N newsletter</p>
          <h2 id="footer-newsletter-heading" className="mt-3 text-2xl font-black text-white">Useful updates for the road ahead.</h2>
          <div className="mt-5"><NewsletterSignup location="footer" /></div>
        </div>
      </div>
    </footer>
  );
}
