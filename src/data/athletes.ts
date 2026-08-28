export type Athlete = {
  slug: string;
  name: string;
  status: string;
  position: string;
  height: string;
  hometown: string;
  profile: string;
  featuredStat?: string;
  featuredStats?: string;
  previousNote?: string;
  previousPrograms?: string;
  previousTeams?: string;
  highlights?: string;
  bio: string;
  identity: string[];
  brandCategories: string[];
  keyStats: { label: string; value: string }[];
  timeline: { year: string; text: string }[];
  relatedNews: string[];
  note?: string;
  imagePath: string;
};

export const athletes: Athlete[] = [
  {
    slug: "daniel-wondie",
    name: "Daniel Wondie",
    status: "Worcester State",
    position: "Guard",
    height: "6'3\"",
    hometown: "Seattle, Washington",
    profile: "Three-level scorer and perimeter threat",
    featuredStat: "8.3 PPG in 2025–26",
    bio: "Daniel Wondie is a scoring-minded guard with a premium handle and a natural feel for creating in transition and in the half court. His game blends calm decision-making with aggressive perimeter creation, making him a continued point of focus for modern offensive systems.",
    identity: ["Scorer", "Perimeter creator", "Creative ball handler"],
    brandCategories: ["Basketball", "Athlete Storytelling", "Performance Culture"],
    keyStats: [
      { label: "Season", value: "2025–26" },
      { label: "Scoring", value: "8.3 PPG" },
      { label: "Role", value: "Guard" },
    ],
    timeline: [
      { year: "2025", text: "Developing a polished scoring profile while competing at Worcester State." },
      { year: "2026", text: "Continues to sharpen his perimeter game and create efficient offense." },
    ],
    relatedNews: ["inside-the-neural-athlete-philosophy"],
    imagePath: "/images/athletes/daniel-wondie.png",
  },
  {
    slug: "vynce-overshown",
    name: "Vynce Overshown",
    status: "King University Commit",
    position: "Guard",
    height: "6'0\"",
    hometown: "Hammond, Indiana",
    profile: "Defensive playmaker and emerging floor general",
    previousNote: "Third Team All-Northern Conference at Mid Michigan",
    bio: "Vynce Overshown brings an aggressive defensive mindset and a strong command of tempo. His ability to control the flow of the game, create defensive pressure, and steer his team through difficult possessions makes him a valuable lead-guard profile.",
    identity: ["Floor general", "Defensive playmaker", "Lead guard"],
    brandCategories: ["Leadership", "Defense", "Team Commerce"],
    keyStats: [
      { label: "Status", value: "King University Commit" },
      { label: "Role", value: "Guard" },
      { label: "Profile", value: "Lead guard" },
    ],
    timeline: [
      { year: "2025", text: "Built momentum as a confident lead guard with a strong defensive edge." },
      { year: "2026", text: "Preparing to begin the next phase of his college career with a focused approach." },
    ],
    relatedNews: ["vynce-overshown-announces-king-university-commitment", "building-athlete-brands-beyond-the-game"],
    note: "Information subject to official roster verification.",
    imagePath: "/images/athletes/vynce-overshown.jpg",
  },
  {
    slug: "demarcus-barr",
    name: "Demarcus Barr",
    status: "Southeast Missouri State Commit",
    position: "Point Guard",
    height: "6'1\"",
    hometown: "Fort Wayne, Indiana",
    profile: "Dynamic lead guard with speed and competitive toughness",
    bio: "Demarcus Barr plays with a high motor and a downhill attacking mindset. His game emphasizes pace, pressure, and competitive toughness, creating value as a lead guard who can spark transition offense and set the tone defensively.",
    identity: ["Lead guard", "Speed-first scorer", "Competitive tone-setter"],
    brandCategories: ["Athlete Leadership", "Fast Break Offense", "Performance Branding"],
    keyStats: [
      { label: "Status", value: "SEMO Commit" },
      { label: "Role", value: "Point Guard" },
      { label: "Skill", value: "Tempo control" },
    ],
    timeline: [
      { year: "2025", text: "Establishing himself as a dynamic lead guard with strong pace and toughness." },
      { year: "2026", text: "Set to continue his development with a clear focus on execution and leadership." },
    ],
    relatedNews: ["inside-the-neural-athlete-philosophy", "building-athlete-brands-beyond-the-game"],
    note: "Information subject to official roster verification.",
    imagePath: "/images/athletes/demarcus-barr.jpg",
  },
  {
    slug: "darrion-brooks",
    name: "Darrion Brooks",
    status: "Allegany College of Maryland",
    position: "Wing",
    height: "6'4\"",
    hometown: "Fort Wayne, Indiana",
    profile: "Versatile two-way wing",
    featuredStats: "5.4 PPG, 47.5% FG in 2025–26",
    bio: "Darrion Brooks is a wing prospect with length, range, and a balanced two-way skill set. He projects as a versatile scoring option and defensive presence who can impact multiple phases of the game with his movement and finishing ability.",
    identity: ["Two-way wing", "Finisher", "Defensive mismatch"],
    brandCategories: ["Two-Way Play", "Athlete Identity", "Basketball Development"],
    keyStats: [
      { label: "School", value: "Allegany College of Maryland" },
      { label: "Scoring", value: "5.4 PPG" },
      { label: "FG%", value: "47.5%" },
    ],
    timeline: [
      { year: "2025", text: "Produced efficient scoring with a strong feel for spacing and movement." },
      { year: "2026", text: "Focused on continuing his two-way development and adding versatility." },
    ],
    relatedNews: ["langston-wilson-joins-new-york-knicks-for-2026-nba-summer-league", "inside-the-neural-athlete-philosophy"],
    imagePath: "/images/athletes/darrion-brooks.webp",
  },
  {
    slug: "caleb-coleman",
    name: "Caleb Coleman",
    status: "Professional / Free Agent",
    position: "Guard / Forward",
    height: "6'7\"",
    hometown: "Hammond, Indiana",
    profile: "Versatile professional scorer and multi-position defender",
    previousTeams: "Prairie View A&M, Vancouver Volcanoes, 2026 Denard Bros Pro Runs",
    bio: "Caleb Coleman is a long, adaptable athlete whose game translates across multiple positions. He has a strong scoring profile, a multi-positional defensive presence, and the flexibility to contribute in a variety of professional environments.",
    identity: ["Professional scorer", "Defensive versatility", "Length and skill"],
    brandCategories: ["Professional Development", "Brand Positioning", "Multi-Position Defense"],
    keyStats: [
      { label: "Status", value: "Free Agent" },
      { label: "Position", value: "Guard / Forward" },
      { label: "Profile", value: "Versatile scorer" },
    ],
    timeline: [
      { year: "2025", text: "Competed across different pro-level settings and continued refining his two-way game." },
      { year: "2026", text: "Looking for the next opportunity to expand his professional impact." },
    ],
    relatedNews: ["building-athlete-brands-beyond-the-game", "roy-henderson-iii-takes-his-scoring-to-truman-state"],
    imagePath: "/images/athletes/caleb-coleman.png",
  },
  {
    slug: "marquis-carver-smith",
    name: "Marquis Carver-Smith",
    status: "Truman State",
    position: "Guard / Forward",
    height: "6'6\"",
    hometown: "Hammond, Indiana",
    profile: "Long, versatile connector with two-way upside",
    featuredStats: "6.3 PPG, 3.0 RPG in 2025–26",
    bio: "Marquis Carver-Smith is a high-ceiling connector whose length and versatility give him a strong two-way projection. He brings a strong blend of floor spacing, defensive awareness, and playmaking utility to the wing and forward spots.",
    identity: ["Connector", "Two-way forward", "Long wing"],
    brandCategories: ["Versatility", "Two-Way Upside", "Athlete Brand"],
    keyStats: [
      { label: "School", value: "Truman State" },
      { label: "Scoring", value: "6.3 PPG" },
      { label: "Rebounds", value: "3.0 RPG" },
    ],
    timeline: [
      { year: "2025", text: "Showed flashes of versatility with an active defensive and transitional profile." },
      { year: "2026", text: "Continues to build a smoother all-around game and expand his value." },
    ],
    relatedNews: ["roy-henderson-iii-takes-his-scoring-to-truman-state", "inside-the-neural-athlete-philosophy"],
    imagePath: "/images/athletes/marquis-carver-smith.webp",
  },
  {
    slug: "langston-wilson",
    name: "Langston J. Wilson",
    status: "New York Knicks 2026 NBA Summer League",
    position: "Forward",
    height: "6'9\"",
    hometown: "Upper Darby, Pennsylvania",
    profile: "Elite athlete, rim finisher, rebounder, and shot blocker",
    previousPrograms: "Georgia Highlands, Washington, Milwaukee",
    highlights: "Former No. 2-ranked JUCO prospect; 2024 College Slam Dunk Championship participant",
    bio: "Langston J. Wilson is a physically dominant forward with explosive finishing ability, strong rebounding instincts, and a relentless defensive presence. His game is defined by athleticism, verticality, and the ability to impact games around the rim.",
    identity: ["Rim finisher", "Rebounder", "Shot blocker"],
    brandCategories: ["Athleticism", "Rim Pressure", "Defensive Identity"],
    keyStats: [
      { label: "Status", value: "2026 NBA Summer League" },
      { label: "Role", value: "Forward" },
      { label: "Highlights", value: "JUCO No. 2 prospect" },
    ],
    timeline: [
      { year: "2024", text: "Competed in the College Slam Dunk Championship and gained national visibility." },
      { year: "2026", text: "Participated in the New York Knicks Summer League opportunity as a development showcase." },
    ],
    relatedNews: ["langston-wilson-joins-new-york-knicks-for-2026-nba-summer-league", "building-athlete-brands-beyond-the-game"],
    note: "Information subject to official roster verification.",
    imagePath: "/images/athletes/langston-wilson.webp",
  },
  {
    slug: "roy-henderson-iii",
    name: "Roy Henderson III",
    status: "Truman State",
    position: "Guard",
    height: "6'1\"",
    hometown: "Oklahoma City, Oklahoma",
    profile: "High-scoring guard and confident perimeter creator",
    previousPrograms: "Eastern Oklahoma State",
    featuredStats: "18.0 PPG, 35.9% 3PT, 80.2% FT in 2025–26",
    bio: "Roy Henderson III is a confident scoring guard who attacks the rim, creates his own shot, and steadily stretches the floor. His profile combines energy, self-belief, and perimeter creation in a way that continues to translate into production.",
    identity: ["Scoring guard", "Perimeter creator", "Late-clock threat"],
    brandCategories: ["Scoring Identity", "Athlete Confidence", "Performance Storytelling"],
    keyStats: [
      { label: "School", value: "Truman State" },
      { label: "Scoring", value: "18.0 PPG" },
      { label: "FT%", value: "80.2%" },
    ],
    timeline: [
      { year: "2025", text: "Delivered strong scoring numbers and a confident perimeter profile at Truman State." },
      { year: "2026", text: "Keeps developing into a strong lead-guard scoring option with room to expand." },
    ],
    relatedNews: ["roy-henderson-iii-takes-his-scoring-to-truman-state", "inside-the-neural-athlete-philosophy"],
    imagePath: "/images/athletes/roy-henderson.jpg",
  },
];

export const featuredAthletes = athletes.slice(0, 4);
