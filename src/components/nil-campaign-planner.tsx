"use client";

import { useMemo, useState } from "react";

type DeliverableKey = "shortVideo" | "feedPost" | "storySet" | "appearance" | "photoSet" | "interview";

const deliverableLabels: Record<DeliverableKey, string> = {
  shortVideo: "Short-form videos",
  feedPost: "Feed posts",
  storySet: "Story sets",
  appearance: "In-person appearances",
  photoSet: "Branded photo sets",
  interview: "Interviews or features",
};

const initialDeliverables: Record<DeliverableKey, number> = {
  shortVideo: 1,
  feedPost: 1,
  storySet: 1,
  appearance: 0,
  photoSet: 0,
  interview: 0,
};

function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
}

export function NilCampaignPlanner() {
  const [brandName, setBrandName] = useState("");
  const [objective, setObjective] = useState("Awareness and local visibility");
  const [market, setMarket] = useState("");
  const [budget, setBudget] = useState(2500);
  const [athleteCount, setAthleteCount] = useState(1);
  const [timeline, setTimeline] = useState("30 days");
  const [usage, setUsage] = useState("Organic brand and athlete channels");
  const [usageTerm, setUsageTerm] = useState("3 months");
  const [deliverables, setDeliverables] = useState(initialDeliverables);
  const [allocations, setAllocations] = useState({ athlete: 55, production: 20, amplification: 15, contingency: 10 });
  const [generated, setGenerated] = useState(false);

  const totalDeliverables = Object.values(deliverables).reduce((sum, value) => sum + value, 0);
  const allocationTotal = Object.values(allocations).reduce((sum, value) => sum + value, 0);
  const allocationRows = useMemo(() => [
    ["Athlete compensation", allocations.athlete, "Compensation should reflect the negotiated scope, athlete fit, time, rights, exclusivity, and responsibilities."],
    ["Production and operations", allocations.production, "Photography, video, editing, travel, products, location, staffing, accessibility, and campaign administration."],
    ["Distribution and amplification", allocations.amplification, "Optional paid media, boosting, local promotion, event support, or other approved distribution."],
    ["Contingency", allocations.contingency, "Schedule changes, reshoots, added logistics, or other approved costs that were not reasonably predicted."],
  ] as const, [allocations]);

  function updateDeliverable(key: DeliverableKey, value: number) {
    setDeliverables((current) => ({ ...current, [key]: Math.max(0, Math.min(20, value || 0)) }));
    setGenerated(false);
  }

  function updateAllocation(key: keyof typeof allocations, value: number) {
    setAllocations((current) => ({ ...current, [key]: Math.max(0, Math.min(100, value || 0)) }));
    setGenerated(false);
  }

  function downloadBrief() {
    const deliverableText = (Object.entries(deliverables) as [DeliverableKey, number][]).filter(([, count]) => count > 0).map(([key, count]) => `- ${deliverableLabels[key]}: ${count}`).join("\n") || "- No deliverables selected";
    const allocationText = allocationRows.map(([label, percent]) => `- ${label}: ${percent}% (${currency(budget * percent / 100)})`).join("\n");
    const text = [
      "NXTG3N NIL CAMPAIGN PLANNING BRIEF",
      `Generated: ${new Date().toLocaleDateString()}`,
      "",
      `BRAND / ORGANIZATION: ${brandName.trim() || "Not provided"}`,
      `PRIMARY OBJECTIVE: ${objective}`,
      `MARKET: ${market.trim() || "Not provided"}`,
      `WORKING BUDGET: ${currency(budget)}`,
      `ATHLETE COUNT: ${athleteCount}`,
      `CAMPAIGN TIMELINE: ${timeline}`,
      `PLANNED USAGE: ${usage}`,
      `USAGE TERM: ${usageTerm}`,
      "",
      "DELIVERABLES",
      deliverableText,
      "",
      "WORKING BUDGET ALLOCATION",
      allocationText,
      "",
      "REQUIRED BEFORE ACTIVATION",
      "[ ] Confirm athlete availability, fit, conflicts, and required approvals",
      "[ ] Define content specifications, deadlines, revisions, and acceptance criteria",
      "[ ] Define identity/content usage, editing, paid media, geography, and term",
      "[ ] Confirm exclusivity category, competitors, location, and duration",
      "[ ] Confirm compensation, expenses, invoicing, payment timing, and cancellation",
      "[ ] Approve disclosure language and compliance responsibilities",
      "[ ] Identify measurement method and post-campaign reporting date",
      "",
      "Planning estimate only. This brief is not an offer, contract, athlete valuation, guarantee of availability, guarantee of performance, or legal, tax, financial, eligibility, or compliance advice.",
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "NXTG3N-NIL-campaign-planning-brief.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  const valid = budget > 0 && totalDeliverables > 0 && allocationTotal === 100;

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <form className="rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8" onSubmit={(event) => { event.preventDefault(); if (valid) setGenerated(true); }}>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">Campaign inputs</p>
        <h2 className="mt-3 text-3xl font-black text-white">Define the working scope</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2"><span className="mb-2 block text-sm font-bold text-white">Brand or organization</span><input value={brandName} onChange={(event) => { setBrandName(event.target.value); setGenerated(false); }} placeholder="Example: Main Street Fitness" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-[#697384]" /></label>
          <label className="block"><span className="mb-2 block text-sm font-bold text-white">Primary objective</span><select value={objective} onChange={(event) => { setObjective(event.target.value); setGenerated(false); }} className="w-full rounded-xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-sm text-white"><option>Awareness and local visibility</option><option>Event attendance</option><option>Content creation</option><option>Community engagement</option><option>Product education</option><option>Lead generation</option></select></label>
          <label className="block"><span className="mb-2 block text-sm font-bold text-white">Target market</span><input value={market} onChange={(event) => { setMarket(event.target.value); setGenerated(false); }} placeholder="City, campus, or audience" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-[#697384]" /></label>
          <label className="block"><span className="mb-2 block text-sm font-bold text-white">Total working budget</span><input type="number" min="1" step="1" value={budget} onChange={(event) => { setBudget(Math.max(0, Number(event.target.value))); setGenerated(false); }} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white" /></label>
          <label className="block"><span className="mb-2 block text-sm font-bold text-white">Number of athletes</span><input type="number" min="1" max="10" value={athleteCount} onChange={(event) => { setAthleteCount(Math.max(1, Math.min(10, Number(event.target.value) || 1))); setGenerated(false); }} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white" /></label>
          <label className="block"><span className="mb-2 block text-sm font-bold text-white">Campaign timeline</span><select value={timeline} onChange={(event) => { setTimeline(event.target.value); setGenerated(false); }} className="w-full rounded-xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-sm text-white"><option>One day</option><option>One week</option><option>30 days</option><option>60 days</option><option>90 days</option><option>Custom</option></select></label>
          <label className="block"><span className="mb-2 block text-sm font-bold text-white">Content usage</span><select value={usage} onChange={(event) => { setUsage(event.target.value); setGenerated(false); }} className="w-full rounded-xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-sm text-white"><option>Organic brand and athlete channels</option><option>Organic brand channels only</option><option>Organic plus paid media</option><option>Website, email, and in-store use</option><option>To be negotiated</option></select></label>
          <label className="block sm:col-span-2"><span className="mb-2 block text-sm font-bold text-white">Requested usage term</span><select value={usageTerm} onChange={(event) => { setUsageTerm(event.target.value); setGenerated(false); }} className="w-full rounded-xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-sm text-white"><option>30 days</option><option>3 months</option><option>6 months</option><option>12 months</option><option>To be negotiated</option></select></label>
        </div>

        <fieldset className="mt-8"><legend className="text-lg font-black text-white">Deliverable mix</legend><p className="mt-1 text-xs text-[#9AA3B2]">Counts define scope only; they do not calculate an athlete’s price.</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{(Object.entries(deliverableLabels) as [DeliverableKey, string][]).map(([key, label]) => <label key={key} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/15 p-3"><span className="text-sm text-white">{label}</span><input aria-label={`${label} quantity`} type="number" min="0" max="20" value={deliverables[key]} onChange={(event) => updateDeliverable(key, Number(event.target.value))} className="w-16 rounded-lg border border-white/10 bg-[#0B0E11] px-2 py-2 text-center text-sm text-white" /></label>)}</div></fieldset>

        <fieldset className="mt-8"><legend className="text-lg font-black text-white">Budget allocation</legend><p className="mt-1 text-xs text-[#9AA3B2]">Adjust all four percentages so the total equals 100%.</p><div className="mt-4 space-y-3">{allocationRows.map(([label, percent], index) => { const key = (["athlete", "production", "amplification", "contingency"] as const)[index]; return <label key={label} className="grid grid-cols-[1fr_80px] items-center gap-3"><span className="text-sm text-white">{label}</span><span className="flex items-center rounded-lg border border-white/10 bg-black/20"><input aria-label={`${label} percentage`} type="number" min="0" max="100" value={percent} onChange={(event) => updateAllocation(key, Number(event.target.value))} className="w-full bg-transparent px-2 py-2 text-right text-sm text-white" /><span className="pr-2 text-xs text-[#9AA3B2]">%</span></span></label>; })}</div><p className={`mt-3 text-sm font-bold ${allocationTotal === 100 ? "text-[#2AFF7D]" : "text-amber-300"}`}>Allocation total: {allocationTotal}%</p></fieldset>

        {!valid && <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">Enter a positive budget, select at least one deliverable, and make the allocation total exactly 100%.</p>}
        <button type="submit" disabled={!valid} className="mt-6 w-full rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-black text-white transition hover:bg-[#2E7BFF] disabled:cursor-not-allowed disabled:opacity-40">Generate campaign brief</button>
      </form>

      <section className="rounded-[2rem] border border-[#2AFF7D]/30 bg-[radial-gradient(circle_at_85%_10%,rgba(42,255,125,0.12),transparent_32%),#101722] p-6 sm:p-8" aria-live="polite">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">Working campaign plan</p>
        {!generated ? <div className="mt-10 rounded-2xl border border-dashed border-white/15 p-8 text-center"><p className="text-xl font-black text-white">Your budget brief will appear here.</p><p className="mt-3 text-sm leading-6 text-[#9AA3B2]">The planner allocates only the budget you provide. It does not set athlete rates or guarantee campaign performance.</p></div> : <div className="mt-6"><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-xs uppercase tracking-wider text-[#9AA3B2]">Budget</p><p className="mt-2 text-2xl font-black text-white">{currency(budget)}</p></div><div className="rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-xs uppercase tracking-wider text-[#9AA3B2]">Athletes</p><p className="mt-2 text-2xl font-black text-white">{athleteCount}</p></div><div className="rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-xs uppercase tracking-wider text-[#9AA3B2]">Deliverables</p><p className="mt-2 text-2xl font-black text-white">{totalDeliverables}</p></div></div><div className="mt-6 space-y-4">{allocationRows.map(([label, percent, note]) => <article key={label} className="rounded-xl border border-white/10 bg-black/15 p-4"><div className="flex items-center justify-between gap-3"><h3 className="font-black text-white">{label}</h3><p className="font-black text-[#2AFF7D]">{currency(budget * percent / 100)}</p></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-[#1F6AE1]" style={{ width: `${percent}%` }} /></div><p className="mt-3 text-xs leading-5 text-[#9AA3B2]">{percent}% · {note}</p></article>)}</div><div className="mt-6 rounded-xl border border-white/10 p-4"><h3 className="font-black text-white">Selected scope</h3><ul className="mt-3 grid gap-2 text-sm text-[#C7CCD6] sm:grid-cols-2">{(Object.entries(deliverables) as [DeliverableKey, number][]).filter(([, count]) => count > 0).map(([key, count]) => <li key={key}>• {count} × {deliverableLabels[key]}</li>)}</ul><p className="mt-4 text-xs leading-5 text-[#9AA3B2]">{objective} · {timeline} · {usage} · {usageTerm}</p></div><button type="button" onClick={downloadBrief} className="mt-6 rounded-full bg-[#2AFF7D] px-5 py-3 text-sm font-black text-[#07120B] transition hover:bg-white">Download planning brief</button></div>}
      </section>
    </div>
  );
}
