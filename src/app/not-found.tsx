import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2AFF7D]">404</p>
      <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl">This page is not in the roster.</h1>
      <p className="mt-4 text-base leading-7 text-[#C7CCD6]">
        The content you are looking for may have moved, or it may not exist yet. Return to the homepage to continue exploring NXTG3N.
      </p>
      <div className="mt-8 flex justify-center">
        <Link href="/" className="inline-flex rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2E7BFF]">
          Return home
        </Link>
      </div>
    </div>
  );
}
