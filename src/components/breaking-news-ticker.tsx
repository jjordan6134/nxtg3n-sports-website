import { breakingNews } from "@/data/site";

export function BreakingNewsTicker() {
  return (
    <div className="ticker-shell overflow-hidden border-y border-white/10 bg-[#111720] text-[#C7CCD6]" aria-label="Breaking news ticker">
      <div className="ticker-track">
        {[...breakingNews, ...breakingNews].map((item, index) => (
          <span key={`${item}-${index}`} className="ticker-item">
            <span className="mr-3 inline-flex h-2 w-2 rounded-full bg-[#2AFF7D]" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
