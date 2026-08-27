"use client";

import { useState } from "react";
import { contactChannels } from "@/data/site";
import { SectionHeading } from "@/components/ui";
import { validateContactForm } from "@/lib/form-validation";
import { JsonLd } from "@/components/json-ld";
import { brand } from "@/data/site";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      honeypot: String(formData.get("website") ?? ""),
    };

    const validation = validateContactForm(payload);
    if (!validation.ok) {
      setFieldErrors(validation.errors);
      setStatus("error");
      setMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setFieldErrors({});
    setStatus("idle");
    setMessage("Sending your note...");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.values),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(data.error || "Something went wrong while sending your note.");
      return;
    }

    setStatus("success");
    setMessage(data.message || "Thanks for reaching out. We will follow up soon.");
    event.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", name: "Contact NXTG3N Sports", url: `${brand.siteUrl}/contact`, mainEntity: { "@type": "Organization", name: brand.name, email: brand.email } }} />
      <SectionHeading
        eyebrow="Contact"
        title="Choose the right pathway"
        intro="Reach out directly for athlete representation, brand partnerships, media work, education, or general inquiries."
        as="h1"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {contactChannels.map((channel) => (
          <article key={channel.title} className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <h3 className="text-xl font-bold text-white">{channel.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#C7CCD6]">{channel.description}</p>
            <a href={channel.href} className="mt-5 inline-flex text-sm font-semibold text-[#2AFF7D] hover:text-white">
              Email now
            </a>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#101722] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-white">Send a message</h2>
        <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm text-[#C7CCD6]">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Name</span>
              <input name="name" type="text" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="Full name" />
              {fieldErrors.name ? <span className="mt-2 block text-xs text-red-300">{fieldErrors.name}</span> : null}
            </label>

            <label className="block text-sm text-[#C7CCD6]">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Email</span>
              <input name="email" type="email" className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="Email address" />
              {fieldErrors.email ? <span className="mt-2 block text-xs text-red-300">{fieldErrors.email}</span> : null}
            </label>
          </div>

          <label className="block text-sm text-[#C7CCD6]">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#2AFF7D]">Message</span>
            <textarea name="message" rows={6} className="w-full rounded-2xl border border-white/10 bg-[#0B0E11] px-4 py-3 text-white placeholder:text-[#C7CCD6]" placeholder="Tell us how we can help." />
            {fieldErrors.message ? <span className="mt-2 block text-xs text-red-300">{fieldErrors.message}</span> : null}
          </label>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />

          <button type="submit" className="inline-flex w-fit rounded-full border border-[#1F6AE1] bg-[#1F6AE1] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2E7BFF]">
            Send message
          </button>

          {message ? (
            <p className={status === "success" ? "text-sm text-[#2AFF7D]" : status === "error" ? "text-sm text-red-300" : "text-sm text-[#C7CCD6]"}>
              {message}
            </p>
          ) : null}
        </form>
      </div>

      <div className="mt-12 rounded-[2rem] border border-[#1F6AE1]/30 bg-[#101722] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2AFF7D]">Direct email</p>
        <a href="mailto:nxtgnsportstalentagencyllc@gmail.com" className="mt-4 inline-block text-2xl font-black text-white hover:text-[#2AFF7D]">
          nxtgnsportstalentagencyllc@gmail.com
        </a>
      </div>
    </div>
  );
}
