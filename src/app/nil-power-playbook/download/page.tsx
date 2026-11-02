import type { Metadata } from "next";
import { BookDownload } from "@/components/playbook-actions";
export const metadata: Metadata = { title: "Your private download", robots: { index: false, follow: false }, referrer: "no-referrer" };
export default function DownloadPage() { return <div className="mx-auto max-w-2xl px-6 py-24"><p className="text-sm uppercase tracking-widest text-[#e5c58b]">NXTG3N Digital Library</p><h1 className="mt-4 text-4xl font-black">Your NIL Power Playbook</h1><BookDownload /></div>; }
