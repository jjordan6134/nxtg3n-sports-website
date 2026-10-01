import Link from "next/link";
import type { Author } from "@/data/authors";

export function AuthorCard({ author }: { author: Author }) {
  return <aside className="rounded-[2rem] border border-[#1F6AE1]/35 bg-[#101722] p-6" aria-label="About the author">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#2AFF7D]/30 bg-gradient-to-br from-[#1F6AE1]/40 to-[#2AFF7D]/10 text-2xl font-black text-white" aria-hidden="true">JJ</div>
      <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#2AFF7D]">About the author</p><h2 className="mt-2 text-2xl font-black text-white">{author.name}</h2><p className="mt-1 text-sm font-bold text-[#AFC7F5]">{author.role}, {author.organization}</p><p className="mt-3 text-sm leading-6 text-[#C7CCD6]">{author.shortBio}</p><Link href={`/authors/${author.slug}`} className="mt-4 inline-flex text-sm font-black text-[#2AFF7D] hover:text-white">Read full author profile →</Link></div>
    </div>
  </aside>;
}
