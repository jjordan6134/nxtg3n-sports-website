export type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  label: string;
  accent: string;
  relatedAthlete?: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "langston-wilson-joins-new-york-knicks-for-2026-nba-summer-league",
    title: "Langston Wilson Joins New York Knicks for 2026 NBA Summer League",
    summary:
      "The athletic forward continues to build momentum with a summer-league opportunity designed to showcase development, movement, and finishing ability.",
    category: "NXTG3N Update",
    label: "Talent",
    accent: "#1F6AE1",
    relatedAthlete: "Langston J. Wilson",
  },
  {
    slug: "roy-henderson-iii-takes-his-scoring-to-truman-state",
    title: "Roy Henderson III Takes His Scoring to Truman State",
    summary:
      "A confident scoring guard profile continues to evolve as he builds his game around creation, rhythm, and perimeter confidence.",
    category: "NXTG3N Update",
    label: "Performance",
    accent: "#2AFF7D",
    relatedAthlete: "Roy Henderson III",
  },
  {
    slug: "vynce-overshown-announces-king-university-commitment",
    title: "Vynce Overshown Announces King University Commitment",
    summary:
      "The floor-general profile adds another chapter to his development story, with a focus on leadership, tempo, and defensive pressure.",
    category: "NXTG3N Update",
    label: "Commitment",
    accent: "#C7CCD6",
    relatedAthlete: "Vynce Overshown",
  },
  {
    slug: "inside-the-neural-athlete-philosophy",
    title: "Inside the Neural Athlete Philosophy",
    summary:
      "The brand framework connects athlete performance, ownership, AI education, and decision-making in a modern sports environment.",
    category: "Editorial",
    label: "Philosophy",
    accent: "#1F6AE1",
  },
  {
    slug: "building-athlete-brands-beyond-the-game",
    title: "Building Athlete Brands Beyond the Game",
    summary:
      "Long-term value requires identity, financial literacy, storytelling, and disciplined content systems built for future opportunity.",
    category: "Editorial",
    label: "Branding",
    accent: "#2AFF7D",
  },
];
