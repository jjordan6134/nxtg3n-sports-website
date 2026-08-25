import { SectionHeading } from "@/components/ui";

const staffMembers = [
  { title: "Founder / Chief Executive Officer", note: "Official bio coming soon" },
  { title: "Director of Athlete Development", note: "Official bio coming soon" },
  { title: "Director of NIL & Brand Strategy", note: "Official bio coming soon" },
  { title: "Media & Content Director", note: "Official bio coming soon" },
];

export default function StaffPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Staff"
        title="Leadership and support behind the athlete experience"
        intro="The NXTG3N leadership team will be introduced here as roles are officially confirmed and published."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {staffMembers.map((member) => (
          <article key={member.title} className="rounded-[2rem] border border-white/10 bg-[#101722] p-6">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#1F6AE1]/40 bg-[#1F6AE1]/10 text-2xl font-black text-[#2AFF7D]">
              N
            </div>
            <h3 className="text-xl font-bold text-white">{member.title}</h3>
            <p className="mt-4 text-sm text-[#C7CCD6]">{member.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
