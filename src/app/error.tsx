"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2AFF7D]">Error</p>
      <h1 className="mt-6 text-4xl font-black text-white">Something went wrong.</h1>
      <p className="mt-4 text-base leading-7 text-[#C7CCD6]">
        We could not load this part of the site. Please refresh or try again in a moment.
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 inline-flex rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2E7BFF]"
      >
        Try again
      </button>
    </div>
  );
}
