import { TalentDirectory } from "@/components/talent-directory";
import { JsonLd } from "@/components/json-ld";
import { athletes } from "@/data/athletes";
import { brand } from "@/data/site";
import { SectionHeading } from "@/components/ui";

export default function TalentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "NXTG3N Talent", url: `${brand.siteUrl}/talent`, mainEntity: { "@type": "ItemList", itemListElement: athletes.map((athlete, index) => ({ "@type": "ListItem", position: index + 1, url: `${brand.siteUrl}/talent/${athlete.slug}`, name: athlete.name })) } }} />
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
