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
  imagePosition?: string;
  imageFit?: "cover" | "contain";
  officialSources?: { publisher: string; label: string; url: string }[];
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
    imagePosition: "50% 22%",
  },
  {
    slug: "vynce-overshown",
    name: "Vynce Overshown",
    status: "King University",
    position: "Guard / Two-Way Guard",
    height: "6'0\"",
    hometown: "Hammond, Indiana",
    profile: "Defensive playmaker and emerging floor general",
    previousNote: "Former Mid Michigan College standout; Third Team All-Northern Conference.",
    bio: "Vynce Overshown brings an aggressive defensive mindset and a strong command of tempo. His ability to control the flow of the game, create defensive pressure, and steer his team through difficult possessions makes him a valuable lead-guard profile.",
    identity: ["Floor general", "Defensive playmaker", "Lead guard", "JUCO Defensive Player of the Year", "First Team All-Conference"],
    brandCategories: ["Leadership", "Defense", "Team Commerce"],
    keyStats: [
      { label: "School", value: "King University" },
      { label: "Position", value: "Guard / Two-Way Guard" },
      { label: "Jersey", value: "#8" },
    ],
    timeline: [
      { year: "2025", text: "Built momentum as a confident lead guard with a strong defensive edge at Mid Michigan College." },
      { year: "2026", text: "Continues his college career at King University in Tennessee." },
    ],
    relatedNews: ["vynce-overshown-announces-king-university-commitment", "building-athlete-brands-beyond-the-game"],
    note: "Information subject to official roster verification.",
    imagePath: "/images/athletes/vynce-overshown.jpg",
    imagePosition: "50% 20%",
  },
  {
    slug: "demarcus-barr",
    name: "De’Marcus Barr",
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
    imagePosition: "50% 20%",
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
    imagePosition: "50% 22%",
    officialSources: [
      { publisher: "Allegany College of Maryland Athletics", label: "Darrion Brooks — Allegany College of Maryland Men’s Basketball", url: "https://acmtrojans.com/sports/mens-basketball/roster/darrion-brooks/624" },
      { publisher: "NJCAA Region 20", label: "Darrion Brooks — NJCAA Region 20 Player Profile", url: "https://www.njcaaregion20.org/sports/mbkb/2025-26/players/darrionbrooksrsqp" },
    ],
  },
  {
    slug: "caleb-coleman",
    name: "Caleb Coleman",
    status: "Professional / International Basketball",
    position: "Forward",
    height: "6'7\"",
    hometown: "Hammond, Indiana",
    profile: "Professional forward with international basketball experience",
    previousTeams: "Prairie View A&M; BF Majestics, The Basketball League, 2025; Rwanda Basketball League Division 1, 2026",
    bio: "Caleb Coleman is a professional forward with international basketball experience. His profile emphasizes length, athleticism, versatility, and finishing ability across professional competition.",
    identity: ["Professional forward", "International basketball", "Defensive versatility", "Length and skill"],
    brandCategories: ["Professional Development", "Brand Positioning", "Multi-Position Defense"],
    keyStats: [
      { label: "Status", value: "Professional / International Basketball" },
      { label: "Position", value: "Forward" },
      { label: "Experience", value: "International basketball" },
    ],
    timeline: [
      { year: "2025", text: "Competed professionally with the BF Majestics in The Basketball League." },
      { year: "2026", text: "Competes in Rwanda Basketball League Division 1 international basketball." },
    ],
    relatedNews: ["building-athlete-brands-beyond-the-game", "inside-the-neural-athlete-philosophy"],
    imagePath: "/images/athletes/caleb-coleman.png",
    imagePosition: "50% 30%",
    officialSources: [
      { publisher: "ESPN", label: "Caleb Coleman — ESPN Player Profile", url: "https://www.espn.com/mens-college-basketball/player/_/id/4594101/caleb-coleman" },
    ],
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
    relatedNews: ["inside-the-neural-athlete-philosophy", "building-athlete-brands-beyond-the-game"],
    imagePath: "/images/athletes/marquis-carver-smith.webp",
    imagePosition: "50% 24%",
    officialSources: [
      { publisher: "Truman State Athletics", label: "Marquis Carver-Smith — Truman State Men’s Basketball", url: "https://trumanbulldogs.com/sports/mens-basketball/roster/marquis-carver-smith/8228" },
      { publisher: "Northeastern State Athletics", label: "Balanced Attack Lifts Northeastern State Past Truman State", url: "https://goriverhawksgo.com/news/2025/12/14/mens-basketball-balanced-attack-lifts-northeastern-state-past-truman-state-90-81.aspx" },
    ],
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
    imagePosition: "50% 24%",
    officialSources: [
      { publisher: "Milwaukee Athletics", label: "Langston Wilson — Milwaukee Men’s Basketball", url: "https://mkepanthers.com/sports/mens-basketball/roster/langston-wilson/15292" },
      { publisher: "Eurobasket", label: "Langston Wilson Basketball Profile", url: "https://basketball.eurobasket.com/player/Langston-Wilson/545419" },
      { publisher: "Washington Athletics", label: "Langston Wilson — Washington Men’s Basketball", url: "https://gohuskies.com/sports/mens-basketball/roster/langston-wilson/14480" },
      { publisher: "FIBA", label: "Langston Jake Wilson — KK Pelister", url: "https://www.fiba.basketball/en/events/fiba-europe-cup-25-26/teams/kk-pelister/374856-langston-jake-wilson" },
    ],
  },
];

export const featuredAthletes = athletes.slice(0, 4);
