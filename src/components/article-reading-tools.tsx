"use client";

import { useEffect, useState } from "react";

export function ArticleReadingTools({ headings }: { headings: string[] }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <><div className="fixed left-0 top-0 z-50 h-1 bg-[#2AFF7D] transition-[width]" style={{ width: `${progress}%` }} aria-hidden="true" /><nav className="hidden lg:block lg:sticky lg:top-24 lg:float-left lg:-ml-64 lg:w-52" aria-label="Article contents"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Contents</p><ol className="mt-4 space-y-3 text-sm text-[#C7CCD6]">{headings.map((heading, index) => <li key={heading}><a href={`#section-${index + 1}`} className="hover:text-white">{heading}</a></li>)}</ol></nav><details className="mb-6 rounded-2xl border border-white/10 bg-[#0B0E11] p-4 lg:hidden"><summary className="cursor-pointer text-sm font-semibold text-white">Article contents</summary><ol className="mt-4 space-y-3 text-sm text-[#C7CCD6]">{headings.map((heading, index) => <li key={heading}><a href={`#section-${index + 1}`} className="hover:text-white">{heading}</a></li>)}</ol></details></>;
}

export function BackToTop() {
  return <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="mt-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Back to top</button>;
}
