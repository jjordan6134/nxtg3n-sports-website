import Link from "next/link";
import Image from "next/image";
import { playbook } from "@/data/digital-products";
export function PlaybookCard() {
  return <aside className="mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col items-start gap-7 rounded-[2rem] border border-[#e5c58b]/25 bg-gradient-to-br from-[#182434] to-[#101722] p-7 sm:flex-row sm:items-center sm:p-9"><Image src={playbook.cover} alt="The NIL Power Playbook book cover" width={100} height={150} className="h-auto w-24 shrink-0 shadow-xl" /><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e5c58b]">NXTG3N Digital Library · Premium Digital Edition</p><h2 className="mt-3 text-2xl font-black">Ready to go deeper? Explore The NIL Power Playbook.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#c7ccd6]">A practical guide to athlete branding, NIL opportunities and building a future beyond the game.</p><Link href="/nil-power-playbook" className="mt-5 inline-flex rounded-full border border-[#e5c58b]/60 px-5 py-3 text-sm font-bold text-[#e5c58b] hover:bg-white/5">Explore the playbook →</Link></div></div></aside>;
}
