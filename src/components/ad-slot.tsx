export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return <aside className="my-8 flex min-h-24 items-center justify-center border-y border-white/10 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7F8795]" aria-label={label}>{label} · reserved</aside>;
}
