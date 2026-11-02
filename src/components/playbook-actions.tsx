"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
function event(name: string) { try { track(name, { product_id: "nil-power-playbook" }); } catch {} }
export function PlaybookActions({ available, className = "" }: { available: boolean; className?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function checkout() {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/commerce/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId: "nil-power-playbook" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      event("book_checkout_start"); window.location.assign(data.url);
    } catch (e) { setError(e instanceof Error ? e.message : "Checkout is unavailable."); setBusy(false); }
  }
  return <div className={className}><div className="flex flex-wrap gap-3">{available ? <button type="button" disabled={busy} onClick={checkout} className="rounded-full bg-[#e5c58b] px-6 py-3 text-sm font-bold text-[#101722] disabled:opacity-60">{busy ? "Opening secure checkout…" : "Get The NIL Power Playbook"}</button> : <a href="#checklist" className="rounded-full bg-[#e5c58b] px-6 py-3 text-sm font-bold text-[#101722]">Get the free readiness checklist</a>}<a href="#preview" onClick={() => event("book_preview_click")} className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold">Preview the Book <span aria-hidden="true">↗</span></a></div>{!available && <p className="mt-3 text-xs text-[#c7ccd6]">Coming soon · Sales open after publication approval.</p>}{error && <p role="alert" className="mt-3 text-sm text-red-200">{error}</p>}</div>;
}
export function PlaybookView() { useEffect(() => { event("book_product_view"); }, []); return null; }
export function BookResourceLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} onClick={() => event("book_resource_click")} className="text-[#e5c58b] underline decoration-[#e5c58b]/40 underline-offset-4">{children}</Link>; }

export function BookDownload() {
  const token = useRef<HTMLInputElement>(null);
  useEffect(() => { const value = window.location.hash.slice(1); window.history.replaceState(null, "", window.location.pathname); if (token.current) token.current.value = value; }, []);
  return <><form method="POST" action="/api/commerce/download"><input ref={token} type="hidden" name="token" /><button className="mt-6 rounded-full bg-[#e5c58b] px-6 py-3 font-bold text-[#101722]">Download your PDF</button><p className="mt-4 text-sm text-[#c7ccd6]">Your purchase will be verified when you download. Open this page using the private link in your confirmation email.</p></form><p className="mt-6">For link recovery, contact <a className="underline" href="mailto:nxtgnsportstalentagencyllc@gmail.com">NXTG3N support</a>.</p></>;
}
