import { SectionHeading } from "@/components/ui";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Privacy"
        title="Privacy information"
        intro="This page is a general informational starter for website visitors and is not a legal or attorney-approved privacy policy."
        as="h1"
      />

      <div className="mt-10 space-y-6 rounded-[2rem] border border-white/10 bg-[#101722] p-8 text-base leading-7 text-[#C7CCD6]">
        <p>
          NXTG3N Sports Talent Agency L.L.C. may collect general contact information submitted through forms or direct email communication for the purpose of responding to inquiries, evaluating athlete interest, and supporting shared business communications.
        </p>
        <p>
          We are committed to using submitted information responsibly and only for relevant agency communications, outreach, or administrative needs related to our services.
        </p>
        <p>
          Contact information should only be shared with trusted and necessary parties involved in the communication or review process. This website may evolve and may later include more formal privacy practices as our digital systems expand.
        </p>
        <p>
          If you have a privacy question, reach out directly at <a href="mailto:nxtgnsportstalentagencyllc@gmail.com" className="text-[#2AFF7D] hover:text-white">nxtgnsportstalentagencyllc@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
