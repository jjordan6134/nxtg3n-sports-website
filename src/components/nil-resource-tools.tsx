"use client";

import { useMemo, useState } from "react";

const readinessQuestions = [
  "I can explain what makes my story, audience, or community connection distinctive.",
  "My social profiles use a consistent name, photo, biography, and contact method.",
  "I post useful, appropriate content on a repeatable schedule.",
  "I know which products, causes, and industries fit my values.",
  "I can share current audience insights without exaggerating them.",
  "I have a process for reviewing deliverables, usage rights, exclusivity, and payment terms.",
  "I know who at my school, team, or organization must be notified before I accept an opportunity.",
  "I save agreements, invoices, receipts, content files, and payment records in one place.",
] as const;

const dealChecks = [
  ["Parties", "The legal names and contact details of every party are correct."],
  ["Deliverables", "The number, format, platform, due date, revisions, and approval process are written down."],
  ["Compensation", "Cash, products, expenses, payment timing, invoicing, and late-payment terms are clear."],
  ["Usage rights", "The agreement states where, how, and for how long the brand may use the athlete’s identity and content."],
  ["Exclusivity", "Restricted competitors, product categories, locations, and time periods are specific and reasonable."],
  ["Disclosure", "The content plan includes clear sponsorship disclosures appropriate for the platform."],
  ["Compliance", "School, team, league, association, state, and international-student requirements have been checked."],
  ["Cancellation", "The agreement explains what happens if an appearance, game, campaign, or post is delayed or canceled."],
  ["Conduct clauses", "Morality, reputation, termination, and repayment language has been reviewed for fairness and clarity."],
  ["Taxes and records", "The athlete understands that compensation may create tax and recordkeeping responsibilities."],
  ["Minor approval", "A parent or legal guardian is involved when the athlete is under the age of legal majority."],
  ["Independent review", "A qualified attorney, tax professional, or compliance contact has reviewed issues outside the athlete’s expertise."],
] as const;

function scoreMessage(score: number) {
  if (score >= 7) return { label: "Campaign-ready foundation", copy: "Your foundation appears organized. Keep every claim current, review each opportunity individually, and document the full campaign." };
  if (score >= 4) return { label: "Developing foundation", copy: "You have useful pieces in place. Prioritize the unchecked areas before increasing outreach or accepting complex campaigns." };
  return { label: "Build the foundation first", copy: "Focus on identity, compliance, recordkeeping, and a repeatable content process before treating NIL as a dependable revenue channel." };
}

export function NilReadinessAssessment() {
  const [answers, setAnswers] = useState<boolean[]>(() => readinessQuestions.map(() => false));
  const score = answers.filter(Boolean).length;
  const result = scoreMessage(score);

  return (
    <section id="readiness-assessment" className="scroll-mt-28 rounded-[2rem] border border-[#1F6AE1]/40 bg-[#101722] p-6 shadow-2xl shadow-blue-950/20 sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">Interactive tool 01</p>
      <h2 className="mt-3 text-3xl font-black text-white">NIL Readiness Assessment</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#C7CCD6]">Check each statement that is consistently true today. This is a preparation tool—not a prediction of earnings, eligibility, or deal approval.</p>
      <fieldset className="mt-7 space-y-3">
        <legend className="sr-only">NIL readiness statements</legend>
        {readinessQuestions.map((question, index) => (
          <label key={question} className="flex cursor-pointer gap-4 rounded-2xl border border-white/10 bg-black/15 p-4 transition hover:border-[#2AFF7D]/40">
            <input type="checkbox" checked={answers[index]} onChange={() => setAnswers((current) => current.map((answer, answerIndex) => answerIndex === index ? !answer : answer))} className="mt-1 h-5 w-5 accent-[#2AFF7D]" />
            <span className="text-sm leading-6 text-white">{question}</span>
          </label>
        ))}
      </fieldset>
      <div className="mt-6 rounded-2xl border border-[#2AFF7D]/30 bg-[#2AFF7D]/5 p-5" aria-live="polite">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2AFF7D]">Current result</p><p className="mt-2 text-2xl font-black text-white">{result.label}</p></div><p className="text-4xl font-black text-white">{score}<span className="text-lg text-[#7F8795]">/8</span></p></div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#1F6AE1] to-[#2AFF7D] transition-all" style={{ width: `${(score / 8) * 100}%` }} /></div>
        <p className="mt-4 text-sm leading-6 text-[#C7CCD6]">{result.copy}</p>
      </div>
    </section>
  );
}

export function DealReviewChecklist() {
  const [checks, setChecks] = useState<boolean[]>(() => dealChecks.map(() => false));
  const completed = checks.filter(Boolean).length;
  const report = useMemo(() => dealChecks.map(([title, copy], index) => `${checks[index] ? "[x]" : "[ ]"} ${title}: ${copy}`).join("\n"), [checks]);

  function downloadChecklist() {
    const heading = `NXTG3N NIL Deal Review Checklist\nCompleted ${completed} of ${dealChecks.length}\nGenerated ${new Date().toLocaleDateString()}\n\n`;
    const note = "Educational planning aid only. This is not legal, tax, compliance, financial, or eligibility advice.\n\n";
    const blob = new Blob([heading, note, report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "NXTG3N-NIL-deal-review-checklist.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section id="deal-checklist" className="scroll-mt-28 rounded-[2rem] border border-[#2AFF7D]/30 bg-[#101722] p-6 sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2AFF7D]">Interactive tool 02</p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-3xl font-black text-white">NIL Deal Review Checklist</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-[#C7CCD6]">Use this before signing or publishing. A checked box means the item was reviewed—not that the agreement is automatically safe or compliant.</p></div><p className="shrink-0 text-2xl font-black text-white">{completed}/{dealChecks.length}</p></div>
      <fieldset className="mt-7 grid gap-3 md:grid-cols-2">
        <legend className="sr-only">NIL deal review items</legend>
        {dealChecks.map(([title, copy], index) => (
          <label key={title} className="flex cursor-pointer gap-4 rounded-2xl border border-white/10 bg-black/15 p-4 transition hover:border-[#2AFF7D]/40">
            <input type="checkbox" checked={checks[index]} onChange={() => setChecks((current) => current.map((check, checkIndex) => checkIndex === index ? !check : check))} className="mt-1 h-5 w-5 shrink-0 accent-[#2AFF7D]" />
            <span><span className="block font-bold text-white">{title}</span><span className="mt-1 block text-sm leading-6 text-[#C7CCD6]">{copy}</span></span>
          </label>
        ))}
      </fieldset>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={downloadChecklist} className="rounded-full bg-[#1F6AE1] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2E7BFF]">Download my checklist</button>
        <button type="button" onClick={() => setChecks(dealChecks.map(() => false))} className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Reset</button>
      </div>
    </section>
  );
}
