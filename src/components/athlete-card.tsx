import Link from "next/link";
import type { Athlete } from "@/data/athletes";

function buildInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function AthleteCard({ athlete }: { athlete: Athlete }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-[#101722] transition hover:-translate-y-1 hover:border-[#1F6AE1]/70">
      <div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(31,106,225,0.35),_transparent_55%),linear-gradient(135deg,_#121A24,_#0B0E11)]">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px]" aria-hidden="true" />
        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#2AFF7D]/40 bg-[#0B0E11] text-2xl font-black text-white shadow-[0_0_35px_rgba(42,255,125,0.2)]">
          {buildInitials(athlete.name)}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-white">{athlete.name}</h3>
          <span className="rounded-full border border-[#2AFF7D]/30 bg-[#2AFF7D]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2AFF7D]">
            {athlete.position}
          </span>
        </div>

        <div className="space-y-1 text-sm text-[#C7CCD6]">
          <p>{athlete.height}</p>
          <p>{athlete.status}</p>
          <p>{athlete.hometown}</p>
        </div>

        <p className="text-sm leading-6 text-[#E8ECF3]">{athlete.profile}</p>

        {athlete.featuredStat ? (
          <p className="text-sm font-medium text-[#2AFF7D]">{athlete.featuredStat}</p>
        ) : null}

        <Link
          href={`/talent/${athlete.slug}`}
          className="mt-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101722]"
        >
          View profile
        </Link>
      </div>
    </article>
  );
}
