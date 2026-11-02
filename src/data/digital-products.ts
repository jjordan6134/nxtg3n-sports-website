export type DigitalProduct = {
  id: string; slug: string; title: string; subtitle: string; publisher: string;
  description: string; cover: string; format: string; priceCents: number; currency: "usd";
  status: "draft" | "coming-soon" | "active" | "archived"; fileVersion: string;
  fulfillment: { accessHours: number; maxDownloads: number }; relatedResources: string[];
  seo: { title: string; description: string }; bundleIds: string[];
};

export const playbook: DigitalProduct = {
  id: "nil-power-playbook", slug: "nil-power-playbook",
  title: "The NIL Power Playbook — Premium Digital Edition",
  subtitle: "Athlete Empowerment in the Modern Era",
  publisher: "NXTG3N Sports Talent Agency",
  description: "The athlete’s practical guide to understanding NIL opportunities, building a powerful personal brand, navigating the evolving college sports business landscape, and creating value beyond the game.",
  cover: "/images/books/nil-power-playbook.jpg", format: "PDF digital edition",
  priceCents: 1499, currency: "usd", status: "coming-soon", fileVersion: "working-november-2026",
  fulfillment: { accessHours: 72, maxDownloads: 10 },
  relatedResources: ["/resources#readiness-assessment", "/resources/athlete-brand-blueprint", "/resources#deal-checklist"],
  seo: { title: "The NIL Power Playbook | Athlete NIL Guide | NXTG3N", description: "Discover The NIL Power Playbook, a practical NIL guide for athletes and parents covering sponsorships, personal branding, financial literacy, and life beyond sports." },
  bundleIds: [],
};
export function formatPrice(cents: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100); }
