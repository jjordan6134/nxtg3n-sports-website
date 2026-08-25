import { SectionHeading } from "@/components/ui";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Terms"
        title="Website terms and general use"
        intro="This page is a general informational starter for website usage and is not an attorney-approved legal contract."
      />

      <div className="mt-10 space-y-6 rounded-[2rem] border border-white/10 bg-[#101722] p-8 text-base leading-7 text-[#C7CCD6]">
        <p>
          By using this website, visitors agree to use the information and materials provided in a lawful and respectful manner. The content on this site is intended for informational and promotional purposes related to the services of NXTG3N Sports Talent Agency L.L.C.
        </p>
        <p>
          We reserve the right to update, change, or remove website content at any time without prior notice as part of ongoing site development and brand refinement.
        </p>
        <p>
          This website may include general references to athlete profiles, achievements, and services that are subject to official roster verification, external program information, or future changes.
        </p>
        <p>
          Contact <a href="mailto:nxtgnsportstalentagencyllc@gmail.com" className="text-[#2AFF7D] hover:text-white">nxtgnsportstalentagencyllc@gmail.com</a> for questions or clarification regarding website information.
        </p>
      </div>
    </div>
  );
}
