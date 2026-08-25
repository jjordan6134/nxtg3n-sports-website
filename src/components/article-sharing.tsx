"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function ArticleSharing({ url, title, slug }: { url: string; title: string; slug: string }) {
  const [confirmation, setConfirmation] = useState("");
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, platform: "facebook" as const },
    { label: "X", href: `https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`, platform: "x" as const },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, platform: "linkedin" as const },
    { label: "Email", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`, platform: "email" as const },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setConfirmation("Link copied");
      trackEvent({ name: "article_share", properties: { platform: "copy_link", slug } });
    } catch {
      setConfirmation("Copy failed. Use the article URL in your browser bar.");
    }
  }

  return (
    <div className="mt-8 border-y border-white/10 py-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="mr-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Share story</span>
        {links.map((link) => (
          <a
            key={link.platform}
            href={link.href}
            target={link.platform === "email" ? undefined : "_blank"}
            rel={link.platform === "email" ? undefined : "noopener noreferrer"}
            aria-label={`Share ${title} on ${link.label}`}
            onClick={() => trackEvent({ name: "article_share", properties: { platform: link.platform, slug } })}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            {link.label}
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          aria-label={`Copy link to ${title}`}
          className="rounded-full border border-[#1F6AE1]/60 bg-[#1F6AE1]/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#1F6AE1]/20"
        >
          Copy link
        </button>
      </div>
      <p aria-live="polite" className="mt-3 min-h-5 text-xs text-[#2AFF7D]">{confirmation}</p>
    </div>
  );
}
