"use client";

import { useMemo, useState } from "react";

type Blueprint = {
  athlete: string;
  sportLevel: string;
  markets: string;
  values: string;
  strengths: string;
  partnerTypes: string;
  weeklyHours: string;
};

const initialBlueprint: Blueprint = {
  athlete: "",
  sportLevel: "",
  markets: "",
  values: "",
  strengths: "",
  partnerTypes: "",
  weeklyHours: "",
};

function clean(value: string, fallback: string) {
  return value.trim() || fallback;
}

export function AthleteBrandBlueprint() {
  const [blueprint, setBlueprint] = useState<Blueprint>(initialBlueprint);
  const [generated, setGenerated] = useState(false);

  const plan = useMemo(() => {
    const athlete = clean(blueprint.athlete, "The athlete");
    const market = clean(blueprint.markets, "the athlete’s home, school, and sport communities");
    const values = clean(blueprint.values, "discipline, growth, and community");
    const strengths = clean(blueprint.strengths, "short-form video, interviews, and community storytelling");
    const partners = clean(blueprint.partnerTypes, "local businesses, youth programs, wellness brands, and sport-related organizations");
    const hours = clean(blueprint.weeklyHours, "2–3");

    return {
      statement: `${athlete} is building a credible athlete brand around ${values}, with authentic connections to ${market}.`,
      audience: `Document the real people reached across ${market}. Record location, age range, interests, and dated platform insights without estimating or inflating audience size.`,
      content: `Build a repeatable weekly system around ${strengths}. Reserve approximately ${hours} hours for planning, production, engagement, and recordkeeping.`,
      outreach: `Prioritize ${partners}. Lead with audience fit and a small, measurable collaboration idea—not a promise of sales or reach.`,
      proof: "Save the campaign brief, signed terms, content approvals, live links, screenshots, platform analytics, invoice, payment record, and a short partner follow-up.",
    };
  }, [blueprint]);

  function update(field: keyof Blueprint, value: string) {
    setBlueprint((current) => ({ ...current, [field]: value }));
    setGenerated(false);
  }

  function downloadPlan() {
    const planText = [
      "NXTG3N ATHLETE BRAND BLUEPRINT",
      `Generated: ${new Date().toLocaleDateString()}`,
      "",
      `ATHLETE: ${clean(blueprint.athlete, "Not provided")}`,
      `SPORT / LEVEL: ${clean(blueprint.sportLevel, "Not provided")}`,
      "",
      `POSITIONING\n${plan.statement}`,
      `\nAUDIENCE PROOF\n${plan.audience}`,
      `\nCONTENT SYSTEM\n${plan.content}`,
      `\nPARTNER OUTREACH\n${plan.outreach}`,
      `\nCAMPAIGN RECORDS\n${plan.proof}`,
      "",
      "NEXT 30 DAYS",
      "[ ] Confirm biography, headshot, contact method, and current athlete information",
      "[ ] Capture dated audience insights for every active platform",
      "[ ] Publish three content examples that reflect the athlete’s stated values",
      "[ ] Identify ten realistic partner prospects in the athlete’s markets",
      "[ ] Prepare one specific introductory collaboration concept",
      "[ ] Review school, team, association, disclosure, and legal requirements",
      "",
      "Educational planning aid only. Results do not predict earnings, eligibility, or partnership approval and are not legal, tax, financial, or compliance advice.",
    ].join("\n");
    const blob = new Blob([planText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "NXTG3N-athlete-brand-blueprint.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const fields: { key: keyof Blueprint; label: string; placeholder: string }[] = [
    { key: "athlete", label: "Athlete name", placeholder: "Example: Jordan Smith" },
    { key: "sportLevel", label: "Sport and current level", placeholder: "Example: Basketball — NCAA Division II" },
    { key: "markets", label: "Home, school, and community markets", placeholder: "Example: Chandler, Arizona and Worcester, Massachusetts" },
    { key: "values", label: "Three values the athlete demonstrates", placeholder: "Example: resilience, education, family" },
    { key: "strengths", label: "Strongest authentic content formats", placeholder: "Example: training clips, interviews, youth clinics" },
    { key: "partnerTypes", label: "Best-fit partner categories", placeholder: "Example: restaurants, fitness, education, apparel" },
    { key: "weeklyHours", label: "Hours available each week", placeholder: "Example: 3" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <form className="rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8" onSubmit={(event) => { event.preventDefault(); setGenerated(true); }}>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">Interactive worksheet</p>
        <h2 className="mt-3 text-3xl font-black text-white">Build the athlete foundation</h2>
        <p className="mt-3 text-sm leading-6 text-[#C7CCD6]">Use accurate information. This worksheet stays in your browser unless you choose to download the plan.</p>
        <div className="mt-7 space-y-4">{fields.map((field) => <label key={field.key} className="block"><span className="mb-2 block text-sm font-bold text-white">{field.label}</span><input value={blueprint[field.key]} onChange={(event) => update(field.key, event.target.value)} placeholder={field.placeholder} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-[#697384] focus:border-[#2AFF7D]" /></label>)}</div>
        <button type="submit" className="mt-6 w-full rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-black text-white transition hover:bg-[#2E7BFF]">Generate my blueprint</button>
      </form>

      <section className="rounded-[2rem] border border-[#2AFF7D]/30 bg-[radial-gradient(circle_at_85%_10%,rgba(42,255,125,0.12),transparent_32%),#101722] p-6 sm:p-8" aria-live="polite">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">Personalized action plan</p>
        {!generated ? <div className="mt-10 rounded-2xl border border-dashed border-white/15 p-8 text-center"><p className="text-xl font-black text-white">Your plan will appear here.</p><p className="mt-3 text-sm leading-6 text-[#9AA3B2]">Complete the worksheet and generate a practical positioning, content, outreach, and documentation plan.</p></div> : <div className="mt-6 space-y-5">{Object.entries({ "Positioning statement": plan.statement, "Audience proof": plan.audience, "Content system": plan.content, "Partner outreach": plan.outreach, "Campaign records": plan.proof }).map(([title, copy]) => <article key={title} className="border-l-2 border-[#1F6AE1] pl-4"><h3 className="font-black text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-[#C7CCD6]">{copy}</p></article>)}<button type="button" onClick={downloadPlan} className="mt-2 rounded-full bg-[#2AFF7D] px-5 py-3 text-sm font-black text-[#07120B] transition hover:bg-white">Download 30-day plan</button></div>}
      </section>
    </div>
  );
}
