import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Leadership | NXTG3N Sports",
  robots: { index: false, follow: false },
};

export default function StaffPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Staff"
        title="Leadership and support behind the athlete experience"
        intro="Verified leadership biographies are being finalized for publication."
        as="h1"
      />

      <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#101722] p-8">
        <h2 className="text-2xl font-black text-white">Leadership information is being prepared</h2>
        <p className="mt-4 max-w-2xl leading-7 text-[#C7CCD6]">We are confirming biographies, roles, and professional details before publishing them. For leadership, media, or partnership inquiries, contact the agency directly.</p>
        <Link href="/contact" className="mt-6 inline-flex rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-bold text-white hover:bg-[#2E7BFF]">Contact NXTG3N</Link>
      </div>
    </div>
  );
}
