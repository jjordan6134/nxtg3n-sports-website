import { PrimaryButton } from "@/components/ui";

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2AFF7D]">Application</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Athlete interest form</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#C7CCD6]">
          Share your information and goals. Secure processing is being connected, and direct email remains the current preferred contact method until that system is live.
        </p>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8">
        <form className="grid gap-5 md:grid-cols-2" aria-label="Athlete interest form">
          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Athlete name</span>
            <input type="text" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" placeholder="Full name" />
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Email</span>
            <input type="email" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" placeholder="Email address" />
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Phone</span>
            <input type="tel" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" placeholder="Phone number" />
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Sport</span>
            <input type="text" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" placeholder="Basketball" />
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Current school/team</span>
            <input type="text" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" placeholder="School or team" />
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Graduation year</span>
            <input type="text" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" placeholder="2027" />
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Position</span>
            <input type="text" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" placeholder="Guard / Forward" />
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Social/highlight link</span>
            <input type="url" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" placeholder="https://..." />
          </label>

          <label className="block text-sm text-[#C7CCD6] md:col-span-2">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Goals</span>
            <textarea rows={6} className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AFF7D]" placeholder="Tell us about your goals and what support you are looking for." />
          </label>

          <label className="flex items-start gap-3 text-sm text-[#C7CCD6] md:col-span-2">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/10 bg-[#0B0E11] accent-[#1F6AE1]" />
            <span>I confirm that this information is accurate and I understand that secure processing is still being connected.</span>
          </label>

          <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button type="button" className="rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white opacity-70" disabled>
              Submit application
            </button>
            <p className="text-sm text-[#C7CCD6]">
              Secure application processing is being connected. Email <a href="mailto:nxtgnsportstalentagencyllc@gmail.com" className="text-[#2AFF7D] hover:text-white">nxtgnsportstalentagencyllc@gmail.com</a> as an alternative.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
