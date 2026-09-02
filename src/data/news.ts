export type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  label: string;
  accent: string;
  relatedAthlete?: string;
  author: string;
  publishedAt: string;
  readTime: string;
  content: string[];
  topic?: string;
  relatedArticles?: string[];
  evergreen?: boolean;
  imagePath?: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
};

const editorialImages: Record<string, string> = {
  "NIL Education": "/images/editorial/nil-education.png",
  "Athlete Branding": "/images/editorial/athlete-branding.png",
  "Financial Literacy": "/images/editorial/financial-literacy.png",
  "AI & Technology": "/images/editorial/ai-technology.png",
  "Career Development": "/images/editorial/career-development.png",
  "Athlete News": "/images/editorial/athlete-news.png",
  Editorial: "/images/editorial/athlete-branding.png",
};

export function getNewsImage(item: Pick<NewsItem, "category" | "imagePath">) {
  return item.imagePath ?? editorialImages[item.category] ?? "/images/editorial/athlete-news.png";
}

export function estimateReadingTime(content: string[]) {
  const words = content.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export const newsItems: NewsItem[] = [
  {
    slug: "langston-wilson-joins-new-york-knicks-for-2026-nba-summer-league",
    title: "Langston Wilson Joins New York Knicks for 2026 NBA Summer League",
    summary:
      "The athletic forward continues to build momentum with a summer-league opportunity designed to showcase development, movement, and finishing ability.",
    category: "Athlete News",
    label: "Talent",
    accent: "#1F6AE1",
    relatedAthlete: "Langston J. Wilson",
    imagePath: "/images/editorial/langston-wilson-summer-league.jpg",
    imagePosition: "50% 24%",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "2026-05-14",
    readTime: "4 min read",
    content: [
      "The opportunity reflects the kind of measured momentum that matters in modern athlete development: the work is still being done in the background, but the platform is expanding in a way that creates visibility without forcing an athlete to chase attention instead of growth.",
      "For Langston J. Wilson, this moment is about sharpening the fundamentals behind the explosiveness. The attention around a summer-league role can open doors, but the bigger value is in what he does with the environment around him: discipline, film study, communication, and consistent habits.",
      "At NXTG3N, the objective is to help athletes turn attention into long-term advantage. That means pairing performance opportunity with brand clarity, financial education, and a plan for what comes next after the spotlight.",
    ],
  },
  {
    slug: "vynce-overshown-announces-king-university-commitment",
    title: "Vynce Overshown Announces King University Commitment",
    summary:
      "The floor-general profile adds another chapter to his development story, with a focus on leadership, tempo, and defensive pressure.",
    category: "Athlete News",
    label: "Commitment",
    accent: "#C7CCD6",
    relatedAthlete: "Vynce Overshown",
    imagePath: "/images/editorial/vynce-overshown-commitment.jpg",
    imagePosition: "50% 28%",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "2026-05-02",
    readTime: "4 min read",
    content: [
      "A college commitment is more than a headline; it is the product of trust, growth, and realistic planning. For Vynce Overshown, a decision like this represents a larger process of matching his identity as a lead guard with the right developmental path.",
      "The most important part of the next chapter is not only the roster fit, but the daily structure that supports growth. Leadership, leadership habits, defensive detail, and pace control all matter more over the long arc than a single moment in the spotlight.",
      "At NXTG3N, the commitment conversation always circles back to long-term value: where the athlete can evolve, how the program aligns with their identity, and what kind of future they are building beyond the court.",
    ],
  },
  {
    slug: "inside-the-neural-athlete-philosophy",
    title: "Inside the Neural Athlete Philosophy",
    summary:
      "The brand framework connects athlete performance, ownership, AI education, and decision-making in a modern sports environment.",
    category: "Editorial",
    label: "Philosophy",
    accent: "#1F6AE1",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "2026-04-26",
    readTime: "5 min read",
    content: [
      "The Neural Athlete philosophy starts from a simple idea: the most successful athletes are not only the ones who perform best, but the ones who understand their own ecosystem. That includes film, performance, identity, brand, and decision-making.",
      "Modern sports require more than talent. Athletes have to learn how to create a system around themselves: one that includes routines, education, honest feedback, and long-term preparation outside of the game.",
      "The real advantage is not just being faster or stronger. It is being better positioned to make decisions that protect the athlete's future while still maximizing their present potential.",
    ],
  },
  {
    slug: "building-athlete-brands-beyond-the-game",
    title: "Building Athlete Brands Beyond the Game",
    summary:
      "Long-term value requires identity, financial literacy, storytelling, and disciplined content systems built for future opportunity.",
    category: "Editorial",
    label: "Branding",
    accent: "#2AFF7D",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "2026-04-18",
    readTime: "5 min read",
    content: [
      "Athlete brands are built slowly, and the most effective ones start with clarity. A name, voice, visual identity, and consistent message matter far more than chasing every trend or platform at once.",
      "The best athlete brands are rooted in truth. They connect the athlete's on-court skill with the story they want to tell about who they are, what they stand for, and what they want to become beyond competition.",
      "That balance is where NXTG3N operates best: helping athletes build confidence, share content with intention, and protect their long-term reputation while their careers expand.",
    ],
  },
  {
    slug: "nil-guide-for-student-athletes",
    title: "The Student-Athlete’s Guide to NIL",
    summary: "A practical starting point for understanding NIL conversations, preparation, and responsible decision-making.",
    category: "NIL Education",
    label: "NXTG3N Guide",
    accent: "#1F6AE1",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "7 min read",
    evergreen: true,
    topic: "NIL",
    content: [
      "Name, image, and likeness opportunities can take many forms, from a local appearance to digital content or a brand collaboration. The first step is understanding what an opportunity asks you to do, what it provides, and which rules may apply before agreeing to anything.",
      "Start with an athlete inventory. Write down your sport, audience, interests, strengths, schedule, and the kinds of organizations that fit your values. This gives conversations a useful starting point without promising that any particular deal will be available.",
      "Before signing or publishing, ask for the scope, timeline, deliverables, payment terms, usage rights, cancellation language, and approval process in writing. Keep copies of every message and document, and involve a parent, school resource, agent, or qualified professional when appropriate.",
      "Rules and policies can change across schools, conferences, states, and governing bodies. This article is general education, not legal, tax, eligibility, recruiting, or compliance advice. Verify current requirements with qualified professionals and your school or conference before acting.",
    ],
  },
  {
    slug: "how-athletes-build-personal-brands",
    title: "How Athletes Build Personal Brands That Last",
    summary: "Build a durable athlete identity through consistency, clarity, and a message that remains true beyond a single season.",
    category: "Athlete Branding",
    label: "NXTG3N Guide",
    accent: "#2AFF7D",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "6 min read",
    evergreen: true,
    topic: "Branding",
    content: [
      "A lasting personal brand is the expectation people form after seeing repeated evidence of who you are. It is not a logo alone. It is the connection between your performance, behavior, interests, communication, and the opportunities you choose.",
      "Choose three brand anchors: what you are known for as an athlete, what you care about away from competition, and how you want people to feel when they interact with your work. Use those anchors to decide which stories belong on your channels.",
      "Create a repeatable publishing rhythm that fits your training and school responsibilities. A short practice reflection, a thoughtful community post, or a well-edited highlight can be more valuable than a high-volume schedule you cannot sustain.",
      "Review your public profiles regularly. Remove confusing old information, check links, protect private details, and make sure partnerships or claims are represented honestly. A brand grows through trust, not through guaranteed reach or guaranteed deals.",
    ],
  },
  {
    slug: "nil-mistakes-athletes-should-avoid",
    title: "NIL Mistakes Student-Athletes Should Avoid",
    summary: "Common planning errors can make a promising NIL conversation harder to manage. Use this checklist before moving forward.",
    category: "NIL Education",
    label: "NXTG3N Guide",
    accent: "#C7CCD6",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "6 min read",
    evergreen: true,
    topic: "NIL",
    content: [
      "One mistake is treating every offer as urgent. Pressure to respond immediately can hide missing details about deliverables, exclusivity, content usage, or payment. A clear request for time to review is a professional step, not a missed opportunity.",
      "Another is agreeing to work before checking conflicts. Review existing partnerships, school policies, team obligations, and category restrictions. When anything is unclear, pause and ask a qualified advisor for current guidance.",
      "Avoid vague records. Save the final agreement, invoices, content approvals, receipts, and correspondence in one organized place. Keep personal and business communication separated where practical, and never publish confidential information.",
      "Finally, do not confuse attention with value. A partnership should fit your identity, schedule, audience, and responsibilities. No checklist can guarantee eligibility, income, acceptance, or a future deal; verify the details for your own situation.",
    ],
  },
  {
    slug: "financial-literacy-for-athletes",
    title: "Financial Literacy for Athletes: Start Before the First Deal",
    summary: "Simple financial habits help athletes make clearer decisions before income, expenses, and opportunities become complicated.",
    category: "Financial Literacy",
    label: "NXTG3N Guide",
    accent: "#2AFF7D",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "7 min read",
    evergreen: true,
    topic: "Finance",
    content: [
      "Financial readiness starts before money arrives. Know what comes in, what must go out, and which commitments are fixed. A simple monthly view can reveal whether an opportunity fits your actual schedule and resources.",
      "Create separate categories for taxes, essentials, savings, education, and discretionary spending. The right percentages depend on your circumstances, and this overview is not tax or investment advice, but separating purposes makes decisions easier to review.",
      "Ask basic questions about every payment: Who is paying, when is it due, what work is required, and what records should be kept? Use written agreements and keep documentation. Consider qualified tax and financial professionals before making decisions with legal or financial consequences.",
      "Build habits before building a lifestyle. Income can be irregular, opportunities can change, and no return or level of earnings is guaranteed. Current tax rules and financial obligations should be verified with qualified professionals.",
    ],
  },
  {
    slug: "ai-tools-for-athletes-and-creators",
    title: "Practical AI Tools for Athletes and Content Creators",
    summary: "Use AI as a planning assistant for routine creative work while protecting accuracy, privacy, and your authentic voice.",
    category: "AI & Technology",
    label: "NXTG3N Guide",
    accent: "#1F6AE1",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "7 min read",
    evergreen: true,
    topic: "Technology",
    content: [
      "AI can help turn a rough idea into a content outline, organize a week of topics, or suggest alternate headlines. The athlete remains responsible for the final voice, facts, permissions, and decisions.",
      "A useful workflow is brief, draft, review, and publish. Give the tool a clear audience and purpose, then check every claim against a reliable source. Do not present generated text as a personal experience if it is not one.",
      "Protect information by keeping private contracts, medical details, account credentials, and identifying information out of tools unless you understand the provider's terms and have a legitimate reason to use them. Check current platform policies before using generated media.",
      "The best use of AI is often removing repetitive work so you can focus on training, school, relationships, and better creative judgment. Tools change quickly, so test them carefully and avoid promises about performance, reach, or income.",
    ],
  },
  {
    slug: "athlete-content-strategy",
    title: "Building an Athlete Content Strategy Without Losing Focus",
    summary: "A focused content system keeps storytelling consistent without letting social media consume the athlete experience.",
    category: "Athlete Branding",
    label: "NXTG3N Guide",
    accent: "#2AFF7D",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "6 min read",
    evergreen: true,
    topic: "Content",
    content: [
      "Start with an outcome, not a platform. Decide whether a piece should document progress, introduce your personality, educate your audience, support a partner, or direct people to a longer story.",
      "Use a small set of content pillars and rotate them across the month. Training, competition, community, education, and interests can work together when each post has a clear reason to exist.",
      "Batch low-friction work such as selecting clips, writing captions, or collecting questions. Protect training, class, recovery, and family time by setting boundaries around filming and publishing.",
      "Review what feels authentic and useful rather than chasing every metric. Do not imply that a posting schedule guarantees followers, partnerships, recruiting outcomes, or income. Adjust the system when your real priorities change.",
    ],
  },
  {
    slug: "what-brands-look-for-in-athletes",
    title: "What Brands Look for in Athlete Partnerships",
    summary: "Brands often value reliability, audience fit, communication, and a credible connection more than a single highlight moment.",
    category: "Athlete Branding",
    label: "NXTG3N Guide",
    accent: "#C7CCD6",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "6 min read",
    evergreen: true,
    topic: "Partnerships",
    content: [
      "A useful partnership begins with fit. Brands need to understand the athlete's audience, values, communication style, schedule, and relationship to the product or service being discussed.",
      "Professional habits matter. Respond clearly, meet agreed deadlines, disclose required relationships, follow content instructions, and ask questions before a small misunderstanding becomes a larger problem.",
      "Bring a concise partnership profile: audience context, content strengths, availability, examples of work, and the kinds of campaigns that feel credible. Avoid inflating metrics or promising outcomes you cannot control.",
      "Every campaign still needs review for scope, rights, category conflicts, payment, and approvals. A good fit is not a guarantee of acceptance, availability, reach, or future work, and applicable rules should be checked with qualified professionals.",
    ],
  },
  {
    slug: "parents-guide-to-nil",
    title: "A Parent’s Guide to NIL Opportunities and Risks",
    summary: "Parents can help student-athletes slow down, ask better questions, and keep opportunity aligned with education and wellbeing.",
    category: "NIL Education",
    label: "NXTG3N Guide",
    accent: "#1F6AE1",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "7 min read",
    evergreen: true,
    topic: "NIL",
    content: [
      "The parent's first job is creating space for careful review. Ask what the athlete is being asked to do, who benefits, which deadlines apply, and whether the opportunity fits school, training, rest, and family commitments.",
      "Look for clear written terms. Scope, content usage, exclusivity, payment timing, cancellation, travel, expenses, and approval rights should be understandable before anyone agrees. Be cautious around pressure, secrecy, upfront fees, or requests for sensitive information.",
      "Rules are not static. School, conference, state, and governing-body requirements may differ and can change. Keep the school's appropriate resource involved and consult qualified legal or tax professionals for individualized questions.",
      "The goal is a healthy decision process, not a promise of a deal. This educational guide cannot determine eligibility, taxes, legal rights, income, or acceptance for a specific athlete.",
    ],
  },
  {
    slug: "preparing-for-the-transfer-portal",
    title: "Preparing Your Brand Before Entering the Transfer Portal",
    summary: "A clear public profile and organized personal information can make a transition less reactive and more intentional.",
    category: "Career Development",
    label: "NXTG3N Guide",
    accent: "#2AFF7D",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "7 min read",
    evergreen: true,
    topic: "Career",
    content: [
      "Before making a public move, audit your profile. Confirm that your name, position, school information, contact path, highlights, and recent accomplishments are accurate and presented without exaggeration.",
      "Prepare a private transition folder with film links, academic information, references, contact details, and questions for programs. Share personal records only through appropriate channels and with people who have a legitimate need to see them.",
      "Keep your message respectful and forward-looking. Avoid disclosing confidential conversations, criticizing people for attention, or making promises about where you will land. Your next step should support both your goals and your responsibilities.",
      "Transfer and eligibility rules can change and are fact-specific. This is not recruiting, eligibility, legal, or compliance advice. Confirm current requirements with qualified professionals and the relevant school or governing resources.",
    ],
  },
  {
    slug: "beyond-sports-career-planning",
    title: "Career Planning Beyond Sports",
    summary: "Build a future-facing career plan by exploring interests, skills, relationships, and practical next steps before transition arrives.",
    category: "Career Development",
    label: "NXTG3N Guide",
    accent: "#C7CCD6",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "6 min read",
    evergreen: true,
    topic: "Career",
    content: [
      "Career planning does not require abandoning sport. Begin by listing the parts of the athlete experience you enjoy: teaching, analysis, leadership, communication, design, business, health, or community work.",
      "Turn interests into experiments. Take a class, interview someone in the field, volunteer, build a small project, or document a skill. Small evidence is more useful than waiting for a perfect five-year answer.",
      "Keep a living portfolio of work, learning, relationships, and reflections. Ask mentors for specific feedback and build a network through genuine curiosity rather than only asking for opportunities.",
      "A plan should evolve with your education and circumstances. No career path, income level, or outcome is guaranteed; use qualified education, legal, tax, and financial professionals for individualized decisions.",
    ],
  },
  {
    slug: "athlete-media-training",
    title: "Media Training for the Modern Athlete",
    summary: "Prepare for interviews with clear messages, active listening, and a calm approach to difficult or unexpected questions.",
    category: "Media Training",
    label: "NXTG3N Guide",
    accent: "#1F6AE1",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "6 min read",
    evergreen: true,
    topic: "Media",
    content: [
      "Prepare three messages you want an audience to remember: one about your work, one about your team or community, and one about your values. Practice saying each in a sentence without sounding memorized.",
      "Listen to the full question before answering. A short pause is useful. If a question is unclear, ask for clarification; if you cannot discuss something, say so respectfully and redirect to what you can share.",
      "Review names, facts, pronunciation, and boundaries before an interview. Never share private medical, academic, contractual, or team information simply because a question is asked.",
      "Media skills improve through repetition and honest review. This guide is educational and cannot predict how any interviewer, platform, audience, or future opportunity will respond.",
    ],
  },
  {
    slug: "building-wealth-beyond-the-game",
    title: "Building Wealth Beyond the Game",
    summary: "A long-term wealth mindset begins with education, prudent habits, and decisions that match your actual circumstances.",
    category: "Financial Literacy",
    label: "NXTG3N Guide",
    accent: "#2AFF7D",
    author: "NXTG3N Sports Editorial Team",
    publishedAt: "",
    readTime: "7 min read",
    evergreen: true,
    topic: "Finance",
    content: [
      "Wealth is built through a pattern of choices, not one exciting moment. Start by understanding cash flow, reducing avoidable confusion, protecting emergency reserves, and learning the difference between a need, a goal, and a risk.",
      "Ask qualified professionals to explain fees, taxes, ownership, liquidity, conflicts, and downside risk in plain language. Never invest because of pressure, a guarantee, or a social-media claim you have not independently reviewed.",
      "Diversify your future skills as well as your finances. Education, relationships, health, reputation, and a career beyond sport can all increase resilience when competition or income changes.",
      "This article is general education, not investment, tax, legal, or individualized financial advice. Rules, products, and circumstances vary. No return, income, contract, or wealth outcome is guaranteed.",
    ],
  },
];
