import { TalentDirectory } from "@/components/talent-directory";
import { SectionHeading } from "@/components/ui";

export default function TalentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Talent"
        title="Current roster and emerging athlete profiles"
        intro="Explore athletes by status, position, and development stage in a searchable, mobile-friendly directory."
      />

      <div className="mt-10">
        <TalentDirectory />
      </div>
    </div>
  );
}
