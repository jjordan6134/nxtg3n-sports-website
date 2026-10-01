export type GuideSection = { heading: string; paragraphs: string[]; bullets?: string[] };
export type GuideSource = { name: string; organization: string; href: string };
export type NilGuide = {
  slug: string; title: string; description: string; audience: string; category: string; image: string;
  authorSlug: string; publishedAt: string; reviewedAt: string; readMinutes: number;
  keyTakeaways: string[]; sections: GuideSection[]; actionPlan: string[];
  faqs: { question: string; answer: string }[]; sources: GuideSource[];
};

const ncaaNil = { name: "Name, Image and Likeness", organization: "NCAA", href: "https://www.ncaa.org/student-athletes/name-image-likeness/" };
const nilAssist = { name: "Student-Athlete NIL Resources", organization: "NCAA NIL Assist", href: "https://nilassist.ncaa.org/student-athletes/" };
const ftcDisclosure = { name: "Disclosures 101 for Social Media Influencers", organization: "Federal Trade Commission", href: "https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers" };
const ftcEndorsement = { name: "FTC Endorsement Guides: What People Are Asking", organization: "Federal Trade Commission", href: "https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking" };
const irsNil = { name: "Name, Image and Likeness Income", organization: "Internal Revenue Service", href: "https://www.irs.gov/businesses/small-businesses-self-employed/name-image-and-likeness-income" };
const irsGig = { name: "Gig Economy Tax Center", organization: "Internal Revenue Service", href: "https://www.irs.gov/businesses/gig-economy-tax-center" };
const copyright = { name: "What Is Copyright?", organization: "U.S. Copyright Office", href: "https://www.copyright.gov/what-is-copyright/" };

export const nilGuides: NilGuide[] = [
  {
    slug: "nil-fundamentals-for-student-athletes",
    title: "NIL Fundamentals for Student-Athletes",
    description: "A practical foundation for understanding NIL opportunities, responsibilities, disclosures, approvals, records, and the questions to answer before accepting a deal.",
    audience: "Student-athletes and families", category: "NIL Foundations", image: "/images/editorial/nil-education.png", authorSlug: "jerome-jordan", publishedAt: "2026-10-01", reviewedAt: "2026-10-01", readMinutes: 12,
    keyTakeaways: ["NIL is a commercial relationship involving an athlete’s identity—not automatic payment for athletic performance.", "Products, services, discounts, meals, or travel benefits can carry obligations just like cash.", "Athletes should verify school, association, tax, contract, and disclosure requirements before activation.", "Every opportunity should be documented from the first message through final payment and reporting."],
    sections: [
      { heading: "Understand what NIL actually means", paragraphs: [
        "Name, image, and likeness describe parts of a person’s identity that may have commercial value. A business might compensate an athlete for a social post, appearance, autograph session, camp, interview, product collaboration, licensed image, or other promotional service. Compensation may be money, products, services, travel, discounts, or another benefit.",
        "A responsible opportunity connects real compensation to a defined business purpose, a clear scope of work, and permitted use of the athlete’s identity or content. It should not be a disguised promise of payment simply because an athlete competes, attends a particular school, transfers, or reaches a performance milestone.",
        "That distinction protects everyone. The athlete understands what must be delivered. The business understands what it may use. The school or governing body can evaluate required disclosures. Families can see the scheduling and financial effect before the athlete commits."
      ]},
      { heading: "Identify every party and responsibility", paragraphs: [
        "A deal may involve more people than the athlete and brand. A parent or guardian may need to participate when the athlete is a minor. A school compliance office, team, conference, association, agent, attorney, accountant, photographer, platform, or collective may also have a role.",
        "The agreement should identify who supplies products, produces content, communicates approvals, reviews drafts, pays expenses, issues tax forms, receives final files, and reports the activity. Athletes should also know who represents whom, how each advisor is paid, and whether any person can bind the athlete to terms.",
        "Verify the legal name and contact information of the paying party. Ask whether a third party is involved, identify who has final creative approval, and determine whether a guardian, school contact, attorney, or tax professional should review the opportunity."
      ]},
      { heading: "Define the exchange before saying yes", paragraphs: [
        "A complete scope lists every deliverable: platform, format, quantity, duration, deadline, caption requirements, tags, links, appearance times, location, wardrobe, product handling, revisions, raw files, and reporting. It should also state what happens if a game, injury, travel delay, class, weather event, or platform problem changes the schedule.",
        "Compensation terms should explain the amount, payment method, invoice requirements, due date, reimbursable expenses, cancellation treatment, and any conditions before payment. Free products should be described accurately, including stated value and whether anything must be returned.",
        "Do not leave usage rights inside broad phrases such as ‘marketing purposes.’ Ask where the business can use the athlete’s identity and content, whether paid advertising is allowed, how long rights last, which geography applies, whether content may be edited, and whether rights can be transferred."
      ]},
      { heading: "Handle disclosure, eligibility, and records", paragraphs: [
        "The Federal Trade Commission explains that a material connection should be disclosed clearly and conspicuously. A connection can include payment, free or discounted products, employment, or personal and family relationships. Put the disclosure with the endorsement—not hidden in a profile, buried after ‘more,’ or lost inside unrelated hashtags.",
        "Rules can differ by division, school, conference, association, location, and athlete status. Before accepting an opportunity, ask the appropriate school or association contact what must be reported, what information is required, and when disclosure must occur. International athletes need advice specific to immigration and tax status.",
        "Create folders for agreements, invoices, payment confirmations, receipts, product values, platform statements, approvals, disclosures, live links, and analytics. Good records protect eligibility reviews, tax preparation, partner relationships, and the athlete’s ability to learn from each campaign."
      ]},
      { heading: "Treat NIL as long-term reputation work", paragraphs: [
        "The IRS states that NIL gains may include cash, property, or services, and taxable income generally must be reported even when no information form is received. Depending on the relationship, an athlete may have federal, state, local, estimated-tax, or self-employment obligations. A qualified professional should address the athlete’s facts.",
        "The first deal is less important than the system built around it. Reliable communication, accurate claims, on-time delivery, thoughtful brand fit, organized records, and honest follow-through create proof for stronger opportunities later.",
        "After each activation, save final assets and results, update the media kit with dated information, and record what the athlete would negotiate differently next time. The goal is not to accept every deal; it is to protect time, identity, eligibility, relationships, and credibility while delivering value to the right partner."
      ]}
    ],
    actionPlan: ["Write a verified athlete biography and three non-negotiable values.", "Identify school, guardian, legal, and tax review contacts.", "Create folders for agreements, payments, expenses, disclosures, and results.", "Use a written scope, compensation, rights, exclusivity, and cancellation checklist.", "Update the media kit whenever facts or audience metrics change."],
    faqs: [
      { question: "Is free merchandise considered an NIL benefit?", answer: "It can be. Products, services, discounts, travel, meals, and other things of value may create contractual, disclosure, reporting, and tax considerations even when no cash changes hands." },
      { question: "Can an athlete accept a deal in a direct message?", answer: "A message can create confusion or obligations. Move complete terms into a written agreement and obtain appropriate review before accepting or performing." },
      { question: "Does an NIL deal guarantee continued eligibility?", answer: "No. Eligibility and reporting depend on the rules that apply to the athlete. Confirm requirements with the appropriate school, association, and qualified advisors." }
    ], sources: [ncaaNil, nilAssist, ftcDisclosure, irsNil]
  },
  {
    slug: "local-business-nil-campaign-guide",
    title: "How Local Businesses Can Structure an NIL Campaign",
    description: "A step-by-step framework for local businesses to define objectives, select an athlete, build deliverables, budget responsibly, activate locally, and measure an NIL collaboration.",
    audience: "Local businesses and community partners", category: "Business Partnerships", image: "/images/editorial/athlete-branding.png", authorSlug: "jerome-jordan", publishedAt: "2026-10-01", reviewedAt: "2026-10-01", readMinutes: 13,
    keyTakeaways: ["Begin with a measurable business objective and audience—not follower count alone.", "Budget for athlete compensation, production, distribution, logistics, and contingency.", "Local relevance and execution can matter more than raw audience size.", "Define usage, approvals, disclosures, and measurement before production."],
    sections: [
      { heading: "Choose one business problem to solve", paragraphs: [
        "A useful NIL campaign starts with a specific business need. A restaurant may want attendance during a slow weekday. A fitness studio may want trial registrations. A retailer may need locally relevant content. A nonprofit may want event awareness. ‘Get exposure’ is too broad to guide athlete selection or measurement.",
        "Write one primary objective, one supporting objective, and the action a customer should take: visit, reserve, register, use a code, scan a QR code, join an email list, attend an event, or request information. A defined action makes the collaboration easier to design and review.",
        "Record a baseline before launch. Note typical traffic, leads, registrations, or sales during a comparable period. A baseline does not guarantee lift; it creates an honest point of comparison."
      ]},
      { heading: "Match the athlete to the market", paragraphs: [
        "Audience size is one signal, not the complete decision. Strong local fit may come from school community, hometown, sport, interests, values, content style, schedule, or a credible connection to the product. A smaller, relevant audience can be more useful than a larger audience that rarely engages with the market.",
        "Review public content for tone, consistency, audience interaction, and conflicts. Ask for dated audience information and location-market details without demanding private account access or unsupported guarantees. Confirm competing category agreements and school obligations.",
        "The business must evaluate its own fit too. An athlete should not market something the athlete cannot honestly endorse. Products involving health, finance, alcohol, gambling, supplements, minors, or regulated claims require especially careful professional review."
      ]},
      { heading: "Scope the work and complete budget", paragraphs: [
        "Build a small set of deliverables that work together: perhaps a short video, story set, appearance, photo set, and recap. Give each deliverable a format, platform, due date, concept, required information, approval process, and revision limit.",
        "Separate athlete services from production. Decide who provides the camera operator, editor, location, music, captions, releases, products, wardrobe, transportation, and accessibility. If the business expects raw files or additional formats, include them in scope and budget.",
        "The athlete fee is not the full campaign cost. Budget for production, travel, products, locations, paid distribution, printing, staffing, events, measurement, and contingency. Compensation should reflect time, scope, rights, exclusivity, market fit, and cancellation risk—not a universal rate chart."
      ]},
      { heading: "Limit rights and publish honestly", paragraphs: [
        "Posting on an athlete’s channel is different from licensing content to a business. Organic reposting differs from paid advertising, packaging, billboards, email, in-store displays, or permanent archives. Define channels, geography, term, editing, paid-media rights, sublicensing, and takedown.",
        "Confirm who owns photos and video. The athlete, business, photographer, videographer, and platform may hold different rights. Obtain written permission for music, locations, logos, other people, and third-party material. Paying for production does not automatically resolve ownership.",
        "Make the material connection easy to notice and understand. Give the athlete accurate product information, avoid unsupported claims, and approve facts, tags, links, offer dates, and disclosure language before publication."
      ]},
      { heading: "Measure and improve the relationship", paragraphs: [
        "Select measures tied to the objective: views, completion, clicks, code uses, registrations, foot traffic, attendance, qualified inquiries, email signups, or assets produced. Define the measurement window, data owner, privacy limits, and reporting date before launch.",
        "Interpret results carefully. Weather, inventory, pricing, creative quality, timing, platform distribution, competition, and the offer affect outcomes. Do not guarantee revenue, reach, followers, or sales.",
        "Hold a post-campaign review. Record what customers mentioned, which content felt authentic, what caused delays, and whether another campaign makes sense. Strong local partnerships often grow through reliable execution and mutual learning rather than one oversized activation."
      ]}
    ],
    actionPlan: ["Write one primary objective and customer action.", "Document the target market and athlete-fit criteria.", "Define deliverables, owners, deadlines, revisions, and backup dates.", "Allocate the complete campaign budget.", "Put usage, disclosure, payment, cancellation, and measurement in writing.", "Schedule the post-campaign review before launch."],
    faqs: [
      { question: "Does a business need a celebrity athlete?", answer: "No. Local relevance, credible fit, content quality, community connection, and reliable execution can be more important than broad name recognition." },
      { question: "Can a business reuse athlete content forever?", answer: "Only if the rights are lawfully obtained and clearly defined. Duration, channels, geography, editing, paid advertising, and sublicensing should be negotiated." },
      { question: "What belongs in a complimentary introductory collaboration?", answer: "Even a no-cash collaboration should define value, deliverables, rights, disclosures, expenses, timing, cancellation, and what is not guaranteed." }
    ], sources: [ftcDisclosure, ftcEndorsement, copyright, ncaaNil]
  },
  {
    slug: "nil-contract-and-usage-rights-checklist",
    title: "NIL Contract and Usage-Rights Checklist",
    description: "A plain-language educational checklist for reviewing scope, compensation, content ownership, identity rights, paid media, exclusivity, cancellation, compliance, and records.",
    audience: "Athletes, families, and business partners", category: "Deal Review", image: "/images/editorial/career-development.png", authorSlug: "jerome-jordan", publishedAt: "2026-10-01", reviewedAt: "2026-10-01", readMinutes: 14,
    keyTakeaways: ["Read the entire agreement and every incorporated link or exhibit.", "Separate athlete services from permission to use identity and content.", "Broad rights, exclusivity, and cancellation terms affect future opportunities.", "Clarify ambiguity in writing before signing or performing."],
    sections: [
      { heading: "Use a checklist, then obtain qualified review", paragraphs: [
        "An NIL agreement can combine services, endorsement rules, intellectual-property permissions, exclusivity, confidentiality, conduct standards, payment conditions, and disputes. A ‘simple release,’ email, platform checkbox, statement of work, or direct-message acceptance can contain meaningful obligations.",
        "This guide organizes questions; it cannot determine whether a contract is enforceable, fair, or appropriate. Laws, school rules, association requirements, age, immigration status, location, and deal structure can change the analysis.",
        "Read the full document, every link, exhibit, addendum, policy, and schedule. Save the version presented for signature and compare it with the signed copy. Never rely only on a verbal summary."
      ]},
      { heading: "Verify parties, term, services, and payment", paragraphs: [
        "Confirm legal names, addresses, notice emails, authorized signers, effective date, service period, usage period, renewal, and termination. Calendar every notice and option deadline. When an athlete is a minor, determine required guardian consent and protections.",
        "List every post, video, story, appearance, interview, shoot, autograph session, draft, report, link, code, trip, rehearsal, and meeting. Add platforms, quantities, length, creative direction, deadlines, locations, approval time, revisions, and a process for schedule disruptions.",
        "State compensation, product value, deposits, milestones, invoice rules, due dates, fees, reimbursements, cancellation treatment, and bonuses. Identify who pays travel, lodging, meals, parking, mileage, production, shipping, wardrobe, and accessibility costs."
      ]},
      { heading: "Separate identity rights from content ownership", paragraphs: [
        "Permission to use an athlete’s name, image, likeness, voice, signature, biography, quotes, jersey, or handle is not automatically ownership of a photograph or video. The creator may hold copyright unless rights are transferred or another rule applies. Music, logos, locations, uniforms, artwork, and other people may require separate permission.",
        "Ask who owns final content and raw files, who may edit them, whether the athlete may use them in a portfolio, and what happens after the license ends. Define media, channels, territory, duration, purpose, paid advertising, boosting, whitelisting, derivative works, AI uses, sublicensing, transfer, archives, and takedown.",
        "Words such as ‘perpetual,’ ‘irrevocable,’ ‘worldwide,’ and ‘all media now known or later developed’ create broad rights. They are not automatically improper, but the athlete should understand their future reach, conflicts, and value."
      ]},
      { heading: "Examine exclusivity, termination, and disputes", paragraphs: [
        "Exclusivity can prevent work with competitors. Define the product category narrowly, identify competitors where possible, and limit geography and duration. Broad restrictions on food, apparel, technology, or financial services can block opportunities no one discussed.",
        "Termination should state who may end the deal, for what reason, after what notice, and whether a problem can be cured. Define payment for completed work, removal of content, surviving rights, products, expenses, confidentiality, and conduct obligations.",
        "Dispute terms may require negotiation, mediation, arbitration, a particular court, fee shifting, or a distant location. These provisions can change the practical cost of enforcing rights and deserve legal review before conflict occurs."
      ]},
      { heading: "Manage the agreement after signature", paragraphs: [
        "Save the executed agreement, exhibits, approvals, brief, deliverables, invoices, payments, disclosures, links, analytics, and correspondence in one campaign folder. Maintain an obligation calendar with reminders ahead of every deadline.",
        "Document changes through the people authorized to make them. Follow a call with written confirmation. If a campaign expands, use an amendment or change order covering compensation, deliverables, rights, expenses, and dates.",
        "After completion, confirm payment, deliver agreed reports, record when rights expire, and check whether licensed content remains live. Good contract management protects the relationship as much as contract language."
      ]}
    ],
    actionPlan: ["Collect every document and incorporated policy.", "Highlight services, payment, rights, exclusivity, termination, and disputes.", "Turn ambiguous language into plain questions.", "Send proposed changes in writing.", "Calendar deliverables, invoices, renewals, and license expiration.", "Store the signed agreement and campaign proof securely."],
    faqs: [
      { question: "Is a one-page contract automatically safe?", answer: "No. A short document can grant broad rights, incorporate external policies, impose exclusivity, or omit important protections." },
      { question: "Who owns photos from an NIL shoot?", answer: "Ownership depends on the facts and agreements. Copyright may initially belong to the creator while the athlete and brand receive defined licenses." },
      { question: "Can an athlete cancel after signing?", answer: "It depends on the agreement and applicable law. Review notice, cure, cancellation, payment, and continuing-rights provisions with qualified counsel." }
    ], sources: [copyright, ftcEndorsement, ncaaNil, irsNil]
  },
  {
    slug: "athlete-personal-brand-development-guide",
    title: "Athlete Personal-Brand Development Guide",
    description: "A practical system for defining identity, audience, content pillars, proof, media assets, reputation standards, and a 90-day athlete brand-building rhythm.",
    audience: "Athletes at every competitive level", category: "Athlete Branding", image: "/images/editorial/athlete-branding.png", authorSlug: "jerome-jordan", publishedAt: "2026-10-01", reviewedAt: "2026-10-01", readMinutes: 12,
    keyTakeaways: ["A brand is a consistent reputation—not a logo or follower count.", "Real story, values, conduct, and verified proof should lead strategy.", "Content pillars make consistency and partner evaluation easier.", "A media kit should be accurate, dated, verifiable, and maintained."],
    sections: [
      { heading: "Build from identity, not decoration", paragraphs: [
        "An athlete brand is the pattern people recognize across performance, communication, values, conduct, community, interests, and follow-through. Visual design can make that pattern recognizable, but a logo cannot repair an unclear reputation.",
        "Ask what the athlete wants to be known for beyond statistics, which experiences shaped the athlete, what communities matter, what subjects the athlete can discuss honestly, and which opportunities would feel wrong even if compensation looked attractive.",
        "Write a one-sentence positioning statement naming the athlete, competitive identity, distinctive qualities, audience, and broader direction. It is a decision compass, not a slogan that must appear in every caption."
      ]},
      { heading: "Separate proof from aspiration", paragraphs: [
        "School, team, class year, position, statistics, awards, academic information, professional status, and commitments should be verified and dated. Goals may be shared, but they should not be presented as completed achievements.",
        "Maintain a source sheet with official rosters, statistics, announcements, interviews, and approved media. When information changes, update the website, media kit, one-sheet, social biographies, outreach, and stored PDFs together. Contradictions damage sponsor confidence.",
        "Audience metrics also need dates and context. Record platform, measurement date, relevant locations when legitimately available, consistent view or engagement measures, and examples that demonstrate how the audience responds."
      ]},
      { heading: "Choose sustainable content pillars", paragraphs: [
        "Content pillars are recurring themes that help an audience understand the athlete. A balanced structure might include performance and preparation, personality and life, education or ownership, community, and partner-compatible interests.",
        "Give each pillar repeatable formats. Performance might include film study, workouts, recovery, or competition lessons. Personality might include music, fashion, gaming, or family. Education might include financial habits, academics, careers, or technology. Community might include youth work, local businesses, service, or hometown stories.",
        "Avoid publishing merely to fill a calendar. One authentic, useful piece can create more value than generic posts. Build a capture habit around the real schedule, then adapt content thoughtfully for each platform."
      ]},
      { heading: "Create athlete-owned media and reputation systems", paragraphs: [
        "Organize headshots, action photos, vertical and horizontal video, highlights, biographies, statistics, interviews, press, brand guidelines, and releases. Use clear file names, backups, and a record of who created each asset and what uses are permitted.",
        "A media kit should quickly explain who the athlete is, where the athlete competes, relevant markets, values, formats, verified proof, and inquiry method. Avoid promising reach, sales, or demographics that have not been verified.",
        "Partnership readiness also includes communication habits, account security, disclosure, response time, calendar management, conflict checks, and a correction plan. Use multifactor authentication and never send credentials through ordinary messages."
      ]},
      { heading: "Operate the brand for 90 days", paragraphs: [
        "During days 1–30, verify facts, define positioning, organize assets, secure accounts, choose pillars, and update profiles. During days 31–60, publish consistently, test formats, collect signals, and build the media kit. During days 61–90, develop campaign concepts, begin focused outreach, and review what the audience values.",
        "Prepare three partnership concepts before outreach. Name the objective, audience, creative idea, deliverables, activation, and measurement approach. Outreach should explain the genuine connection, include one relevant proof point, propose a clear next step, and link to a current kit.",
        "Hold a monthly review. Update performance and audience data, audit profiles, save best content, remove outdated links, check conflicts, and plan around competition. Long-term value grows from disciplined preparation, honest storytelling, responsible partnerships, and reliable delivery."
      ]}
    ],
    actionPlan: ["Write positioning and non-negotiable values.", "Build a verified fact-and-source sheet.", "Choose four content pillars and two formats for each.", "Organize approved media and permissions.", "Update the profile, one-sheet, and media kit from the same data.", "Create three brand-fit campaign concepts.", "Review the system monthly for 90 days."],
    faqs: [
      { question: "Does an athlete need a large following?", answer: "No. A clear identity, credible proof, local relevance, useful content, and dependable execution can create value before an audience becomes large." },
      { question: "Should every post be about sports?", answer: "Not necessarily. The mix should reflect the athlete honestly while protecting privacy, eligibility, team responsibilities, and long-term reputation." },
      { question: "How often should a media kit be updated?", answer: "Review it after changes to team, school, statistics, biography, availability, contact details, audience metrics, markets, or partnership status." }
    ], sources: [nilAssist, ncaaNil, ftcDisclosure, copyright]
  },
  {
    slug: "financial-preparation-for-nil-income",
    title: "Financial Preparation for NIL Income",
    description: "An educational system for organizing NIL payments, taxes, records, cash flow, expenses, professional help, and long-term decisions before income arrives.",
    audience: "Athletes and families", category: "Financial Literacy", image: "/images/editorial/financial-literacy.png", authorSlug: "jerome-jordan", publishedAt: "2026-10-01", reviewedAt: "2026-10-01", readMinutes: 13,
    keyTakeaways: ["Cash, property, services, and other benefits may create taxable NIL income.", "Income should be tracked even when no tax form arrives.", "Good records matter more than a complicated business structure.", "Build tax, operating, goal, and emergency plans before spending."],
    sections: [
      { heading: "Prepare before the first payment", paragraphs: [
        "NIL income can be irregular: a product one month, an appearance fee the next, then a larger campaign later. Before value arrives, decide where agreements, invoices, receipts, payment confirmations, tax forms, mileage, and product-value records will be stored.",
        "The IRS states that NIL income may include monetary or financial gain in cash, property, or services. Income generally must be reported even when it is temporary, noncash, or not shown on an information return. Exact treatment depends on the athlete’s facts.",
        "Do not spend based on the gross contract amount. Payment may be reduced by commissions, production, travel, platform fees, taxes, or other expenses. Plan from net cash after known obligations and a professionally informed tax reserve."
      ]},
      { heading: "Create a simple money map", paragraphs: [
        "Separate incoming value into planning categories: taxes, campaign operations, short-term goals, and long-term reserves or ownership goals. Percentages must be personalized; no universal split accounts for income, state taxes, employment, dependency, expenses, or family circumstances.",
        "Use appropriate accounts and records that distinguish campaign activity from personal spending. A separate account can simplify tracking, but it does not automatically create a legal entity, change tax treatment, or make every purchase deductible.",
        "For noncash compensation, record the item or service, date, stated value, agreement, and obligation. An athlete may owe tax without receiving cash in that transaction, so product-heavy deals require cash-flow planning."
      ]},
      { heading: "Track income and expenses", paragraphs: [
        "Maintain a ledger with payer, campaign, service date, invoice date, gross amount, payment form, product value, fees, reimbursements, payment date, and tax-document status. Reconcile it with bank and platform statements monthly.",
        "Save Forms 1099 and other returns, but do not treat their absence as proof that income is not reportable. The IRS notes that gig income must be reported even when an information return is not issued. Contact the issuer about inaccurate forms and obtain tax guidance.",
        "Keep receipts and business-purpose notes for professional fees, production, equipment, software, travel, shipping, supplies, and platform fees. Do not assume a cost is deductible because it supports a brand; mixed personal and business expenses can involve detailed rules."
      ]},
      { heading: "Plan taxes and professional support", paragraphs: [
        "Independent-contractor income may create income and self-employment tax obligations. The IRS explains that gig workers may need estimated payments. Whether an athlete must pay, how much, and when depends on the complete situation.",
        "Schedule tax guidance before filing season. Bring agreements, the ledger, prior returns, product values, expense records, other employment, state activity, and questions about dependency or entity structure. Put estimated payments, form follow-ups, filing deadlines, and entity obligations on a calendar.",
        "Different professionals serve different functions. Ask about credentials, scope, fees, commissions, conflicts, security, and athlete-income experience. Never share passwords, verification codes, blank signatures, or unrestricted financial access because someone promises opportunities or savings."
      ]},
      { heading: "Turn temporary income into durable progress", paragraphs: [
        "NIL income may change with eligibility, performance, injury, team, platform, audience, market conditions, and schedule. Avoid building fixed expenses around the best month. Establish an emergency reserve and define goals such as taxes, education, transportation, housing, equipment, debt reduction, or professional development.",
        "Be cautious with guaranteed returns, urgent investments, secret tax strategies, credit schemes, or expensive entity packages. A qualified professional should explain purpose, cost, risk, and alternatives without hype.",
        "Review the system quarterly: reconcile income, update tax estimates, evaluate expenses, check contracts and commissions, confirm account security, measure goals, and revise the budget. Financial confidence grows through accurate records and repeated decisions—not one large payment."
      ]}
    ],
    actionPlan: ["Create secure folders for income, expenses, agreements, invoices, and tax forms.", "Start a ledger that includes noncash compensation.", "Set aside a tax reserve based on qualified advice.", "Reconcile campaign activity monthly.", "Schedule guidance before deadlines or major payments.", "Review account access and multifactor authentication.", "Hold a quarterly money review."],
    faqs: [
      { question: "Is free product taxable?", answer: "It may be. The IRS describes NIL income as potentially including cash, property, or services. Record noncash compensation and seek qualified advice." },
      { question: "What if an athlete never receives a 1099?", answer: "The absence of an information return does not automatically remove reporting obligations. Maintain independent records and obtain tax guidance." },
      { question: "Should every athlete create an LLC?", answer: "Not automatically. An entity can carry costs, filings, legal effects, and tax considerations. Choose structure after qualified advice based on actual activity and goals." }
    ], sources: [irsNil, irsGig, nilAssist, ncaaNil]
  }
];

export function getNilGuide(slug: string) {
  return nilGuides.find((guide) => guide.slug === slug);
}
