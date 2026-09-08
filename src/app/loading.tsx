export default function Loading() {
  return (
    <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="rounded-full border border-white/10 bg-[#101722] px-5 py-3 text-sm font-medium text-[#C7CCD6]" role="status" aria-label="Page loading">
        <span aria-hidden="true" className="block h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#2AFF7D] motion-reduce:animate-none" />
      </div>
    </div>
  );
}
