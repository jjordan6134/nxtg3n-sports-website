import { TalentDirectory } from "@/components/talent-directory";
import { JsonLd } from "@/components/json-ld";
import { athletes } from "@/data/athletes";
import { brand } from "@/data/site";
import { SectionHeading } from "@/components/ui";
import { AthleteCard } from "@/components/athlete-card";

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
        <section className="mb-12"><SectionHeading eyebrow="Featured talent" title="College and professional pathways" intro="Explore the roster by current status and position. Every profile preserves its stated verification context." /><div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{athletes.filter((athlete) => athlete.status.toLowerCase().includes("professional") || athlete.status.toLowerCase().includes("college") || athlete.status.toLowerCase().includes("truman")).slice(0, 4).map((athlete) => <AthleteCard key={athlete.slug} athlete={athlete} />)}</div></section>
        <TalentDirectory />
      </div>
    </div>
  );
}
