export const brand = {
  name: "NXTG3N Sports",
  legalName: "NXTG3N Sports Talent Agency L.L.C.",
  tagline: "The Neural Athlete",
  email: "nxtgnsportstalentagencyllc@gmail.com",
  logoPath: "/nxtg3n-logo.png",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://nxtgnsports.com",
  colors: {
    midnight: "#0B0E11",
    blue: "#1F6AE1",
    silver: "#C7CCD6",
    green: "#2AFF7D",
    white: "#FFFFFF",
  },
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Talent", href: "/talent" },
  { label: "Services", href: "/services" },
  { label: "Partners", href: "/partners" },
  { label: "Media", href: "/media" },
  { label: "About", href: "/about" },
];

export const revenueServices = [
  { id: "athlete-partnerships", audience: "Brands & sponsors", title: "Athlete Partnerships", description: "Build sponsored content, appearances, product integrations, community activations, and multi-athlete campaigns around a qualified roster fit.", outcomes: ["Athlete matching", "Campaign brief development", "Deliverable and usage planning"], href: "/partners", cta: "Build a campaign" },
  { id: "athlete-representation", audience: "Athletes & families", title: "Athlete Representation", description: "Create a coordinated roadmap across development, identity, media, NIL readiness, education, and career planning.", outcomes: ["Representation review", "Personal brand direction", "Long-term athlete strategy"], href: "/apply", cta: "Apply for representation" },
  { id: "media-production", audience: "Athletes, teams & brands", title: "Content & Media Production", description: "Develop athlete-centered interviews, features, campaign assets, highlight positioning, and short-form storytelling for modern platforms.", outcomes: ["Content concepts", "Athlete storytelling", "Platform-ready media"], href: "/contact?service=Content%20%26%20Media%20Production", cta: "Request a media scope" },
  { id: "nil-strategy", audience: "Schools, teams & families", title: "NIL Education & Strategy", description: "Deliver practical education around athlete rights, partnership preparation, responsible decision-making, and sustainable brand growth.", outcomes: ["NIL workshops", "Family education", "Opportunity preparation"], href: "/contact?service=NIL%20Education%20%26%20Strategy", cta: "Plan an NIL session" },
  { id: "ai-training", audience: "Organizations & teams", title: "AI Training & Automation", description: "Introduce practical AI workflows for content planning, athlete productivity, research, communication, and responsible decision support.", outcomes: ["Team workshops", "Workflow design", "Responsible AI education"], href: "/contact?service=AI%20Training%20%26%20Automation", cta: "Request AI training" },
  { id: "financial-literacy", audience: "Teams, schools & communities", title: "Financial Literacy Workshops", description: "Give athletes and families a clearer foundation in budgeting, ownership, financial habits, and long-term thinking beyond competition.", outcomes: ["Athlete workshops", "Family sessions", "Financial foundations"], href: "/contact?service=Financial%20Literacy%20Workshops", cta: "Plan a workshop" },
] as const;

export const breakingNews = [
  "Athlete education and NIL strategy remain central to every roster roadmap.",
  "Neural Athlete philosophy expands across development, branding, and financial literacy.",
  "Media, education, and athlete storytelling continue to build the next era of sports representation.",
];

export const trustPillars = [
  "NIL Strategy",
  "Athlete Branding",
  "AI Education",
  "Financial Literacy",
  "Career Development",
];

export const serviceItems = [
  {
    title: "NIL Education & Strategy",
    description:
      "Clear guidance around rights, decision-making, partnerships, and sustainable brand growth.",
  },
  {
    title: "Personal Branding",
    description:
      "Identity, content direction, and reputation strategy built for long-term credibility.",
  },
  {
    title: "AI Training & Automation",
    description:
      "Practical workflows for content, performance, and personal productivity using emerging tools.",
  },
  {
    title: "Financial Literacy",
    description:
      "Budgeting, ownership education, and money habits designed for athletes and families.",
  },
  {
    title: "Athlete Development",
    description:
      "Performance planning, discipline systems, and competitive growth beyond just the stat sheet.",
  },
  {
    title: "Career & Legacy Planning",
    description:
      "A roadmap for what comes after sports, including education, transitions, and long-term value.",
  },
];

export const mediaLinks = [
  { label: "Linktree", href: "https://linktr.ee/nxtgnsports" },
  { label: "TikTok", href: "https://tiktok.com/@nxtgnsports" },
  { label: "YouTube", href: "https://www.youtube.com/@NXTG3NSportsTalentAgencyL.L.C" },
  { label: "X", href: "https://x.com/Nxtg3nC2879" },
  { label: "Twitch", href: "https://www.twitch.tv/nxtgnsports" },
  { label: "Spotify", href: "https://open.spotify.com/user/31wcttdrcstixtulw674hc4ryiii" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/nxtgnsports/" },
  { label: "X", href: "https://x.com/Nxtg3nC2879" },
  { label: "YouTube", href: "https://www.youtube.com/@NXTG3NSportsTalentAgencyL.L.C" },
  { label: "TikTok", href: "https://tiktok.com/@nxtgnsports" },
];

export const valuePillars = [
  "Development",
  "Ownership",
  "Innovation",
  "Integrity",
  "Legacy",
];

export const storeCategories = [
  "Athlete Collections",
  "NXTG3N Performance",
  "The Neural Athlete",
  "Limited Releases",
];

export const mediaCategories = [
  "NXTG3N Originals",
  "60 Seconds With...",
  "Athlete Highlights",
  "NIL & Wealth Education",
  "Podcasts and Interviews",
  "Live Streams",
];

export const contactChannels = [
  {
    title: "Athlete representation",
    description: "For athlete inquiries, recruitment, and representation conversations.",
    href: "mailto:nxtgnsportstalentagencyllc@gmail.com?subject=Athlete%20Representation",
  },
  {
    title: "Brand and NIL partnerships",
    description: "For sponsor, partnership, and brand collaboration opportunities.",
    href: "mailto:nxtgnsportstalentagencyllc@gmail.com?subject=Brand%20and%20NIL%20Partnerships",
  },
  {
    title: "Media requests",
    description: "For interviews, media features, and content requests.",
    href: "mailto:nxtgnsportstalentagencyllc@gmail.com?subject=Media%20Request",
  },
  {
    title: "Training and education",
    description: "For workshops, training, and education program inquiries.",
    href: "mailto:nxtgnsportstalentagencyllc@gmail.com?subject=Training%20and%20Education",
  },
  {
    title: "General inquiries",
    description: "For general questions, collaborations, and agency support.",
    href: "mailto:nxtgnsportstalentagencyllc@gmail.com?subject=General%20Inquiry",
  },
];

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Talent", href: "/talent" },
  { label: "Services", href: "/services" },
  { label: "Partners", href: "/partners" },
  { label: "Apply", href: "/apply" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Editorial Standards", href: "/editorial-standards" },
];
