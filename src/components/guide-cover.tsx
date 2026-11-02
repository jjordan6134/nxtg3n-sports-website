const coverStyles: Record<string, { accent: string; glow: string; label: string }> = {
  "NIL Foundations": { accent: "#2AFF7D", glow: "rgba(42,255,125,0.24)", label: "FOUNDATION" },
  "Business Partnerships": { accent: "#55A2FF", glow: "rgba(31,106,225,0.34)", label: "PARTNERSHIP" },
  "Deal Review": { accent: "#C4A7FF", glow: "rgba(124,74,255,0.28)", label: "PROTECTION" },
  "Athlete Branding": { accent: "#FFB45A", glow: "rgba(255,145,45,0.25)", label: "BRAND" },
  "Financial Literacy": { accent: "#2AFF7D", glow: "rgba(42,255,125,0.2)", label: "MONEY" },
};

export function GuideCover({ title, category, compact = false }: { title: string; category: string; compact?: boolean }) {
  const style = coverStyles[category] ?? coverStyles["NIL Foundations"];
  return <div className={`relative isolate overflow-hidden bg-[#0B0E11] ${compact ? "min-h-44 rounded-2xl" : "min-h-64 rounded-[2rem] sm:min-h-96"}`} style={{ backgroundImage: `radial-gradient(circle at 82% 20%, ${style.glow}, transparent 34%), linear-gradient(135deg, #101722 0%, #0B0E11 62%)` }}>
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(${style.accent} 1px, transparent 1px), linear-gradient(90deg, ${style.accent} 1px, transparent 1px)`, backgroundSize: compact ? "32px 32px" : "46px 46px", maskImage: "linear-gradient(to bottom right, black, transparent 70%)" }} />
    <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full border-[24px] opacity-40" style={{ borderColor: style.accent }} />
    <div className={`relative flex min-h-[inherit] flex-col justify-between gap-6 ${compact ? "p-5" : "p-7 sm:p-10"}`}>
      <div className="flex items-center justify-between gap-4"><span className="text-xs font-black tracking-[0.22em] text-white">NXTG3N</span><span className="rounded-full border px-3 py-1 text-[10px] font-black tracking-[0.18em]" style={{ borderColor: style.accent, color: style.accent }}>{style.label}</span></div>
      <div><p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: style.accent }}>NIL Learning Center</p><p className={`${compact ? "mt-2 line-clamp-3 text-xl" : "mt-3 max-w-3xl text-3xl sm:text-5xl"} font-black leading-tight text-white`}>{title}</p></div>
    </div>
  </div>;
}
