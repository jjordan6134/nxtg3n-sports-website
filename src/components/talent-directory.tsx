"use client";

import { useMemo, useState } from "react";
import { athletes } from "@/data/athletes";
import { AthleteCard } from "@/components/athlete-card";

export function TalentDirectory() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");

  const uniqueStatuses = ["all", ...Array.from(new Set(athletes.map((athlete) => athlete.status)))];
  const uniquePositions = ["all", ...Array.from(new Set(athletes.map((athlete) => athlete.position)))];

  const filteredAthletes = useMemo(() => {
    const search = query.trim().toLowerCase();

    return athletes.filter((athlete) => {
      const matchesQuery =
        search.length === 0 ||
        athlete.name.toLowerCase().includes(search) ||
        athlete.profile.toLowerCase().includes(search) ||
        athlete.status.toLowerCase().includes(search) ||
        athlete.hometown.toLowerCase().includes(search) || athlete.height.toLowerCase().includes(search);

      const matchesStatus = statusFilter === "all" || athlete.status === statusFilter;
      const matchesPosition = positionFilter === "all" || athlete.position === positionFilter;

      return matchesQuery && matchesStatus && matchesPosition;
    });
  }, [query, statusFilter, positionFilter]);

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-[2rem] border border-white/10 bg-[#101722] p-5 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <label className="block text-sm text-[#C7CCD6]">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, school, or hometown"
            className="w-full rounded-full border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]"
            aria-label="Search athletes"
          />
        </label>

        <label className="block text-sm text-[#C7CCD6]">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Status</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full rounded-full border border-white/10 bg-[#0B0E11] px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]"
            aria-label="Filter by athlete status"
          >
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status === "all" ? "All statuses" : status}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-[#C7CCD6]">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Position</span>
          <select
            value={positionFilter}
            onChange={(event) => setPositionFilter(event.target.value)}
            className="w-full rounded-full border border-white/10 bg-[#0B0E11] px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]"
            aria-label="Filter by athlete position"
          >
            {uniquePositions.map((position) => (
              <option key={position} value={position}>
                {position === "all" ? "All positions" : position}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-6 text-sm text-[#C7CCD6]" aria-live="polite">Showing {filteredAthletes.length} athlete{filteredAthletes.length === 1 ? "" : "s"}</div>

      {filteredAthletes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filteredAthletes.map((athlete) => (
            <AthleteCard key={athlete.slug} athlete={athlete} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/15 bg-[#101722] p-10 text-center text-[#C7CCD6]">
          No athletes match that search or filter yet.
        </div>
      )}
    </div>
  );
}
