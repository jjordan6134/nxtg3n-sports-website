export type Author = {
  slug: string;
  name: string;
  role: string;
  organization: string;
  shortBio: string;
  bio: string[];
  focusAreas: string[];
};

export const authors: Author[] = [
  {
    slug: "jerome-jordan",
    name: "Jerome Jordan",
    role: "Founder & CEO",
    organization: "NXTG3N Sports",
    shortBio: "Jerome Jordan leads NXTG3N Sports and develops practical education around athlete branding, NIL preparation, media, financial literacy, AI workflows, and long-term ownership.",
    bio: [
      "Jerome Jordan is the Founder and CEO of NXTG3N Sports. He leads the organization’s athlete-first work across brand preparation, media development, NIL education, financial literacy, emerging technology, and career planning beyond competition.",
      "His approach is built around the Neural Athlete philosophy: performance matters, but informed decisions, disciplined systems, ownership, and preparation for life after sports matter too. Through NXTG3N, Jerome helps translate complicated partnership questions into practical steps athletes, families, and businesses can understand.",
      "Jerome’s broader professional background includes enterprise information technology, Microsoft cloud and endpoint support, web application development, automation, digital products, and AI-assisted workflows. That combination informs NXTG3N’s focus on helping athletes build credible, organized, and durable platforms instead of chasing short-term attention.",
    ],
    focusAreas: ["Athlete brand strategy", "NIL education", "Financial literacy", "Media development", "AI and automation education", "Career and ownership planning"],
  },
];

export function getAuthor(slug: string) {
  return authors.find((author) => author.slug === slug);
}

export const primaryAuthor = authors[0];
