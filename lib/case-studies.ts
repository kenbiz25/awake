/**
 * Single source of truth for case-study metrics.
 * Used by the home bento now; testimonials (Phase 5) and /case-studies pages (Phase 6) later.
 * Change a number here and every surface updates.
 */

export const countyRevenue = {
  slug: "county-revenue",
  href: "/case-studies/county-revenue",
  sector: "GovTech",
  title: "County Revenue System",
  summary:
    "Paper receipts and cash desks replaced with M-Pesa, bank and USSD collection — every shilling reconciled automatically.",
  before: 2_000_000,
  after: 12_000_000,
  months: 9,
  rails: ["M-Pesa + Bank", "USSD fallback"],
} as const;

/** Derived, so the badge can never disagree with the before/after figures. */
export const countyRevenueGrowthPct = Math.round(
  ((countyRevenue.after - countyRevenue.before) / countyRevenue.before) * 100,
);

export const retailMpesa = {
  title: "Retail M-Pesa Integration",
  summary: "One Till, 42 branches, real-time settlement. No more end-of-day Excel.",
  transactionsMillions: 47,
  branches: 42,
  successRate: 99.8,
} as const;

export const hrPlatform = {
  title: "HR Platform",
  summary: "One login. Zero paper.",
  staff: 500,
  hoursSavedWeekly: 20,
  modules: ["Leave", "Payroll", "Per diem", "Appraisals"],
} as const;

export const award = {
  title: "Best GovTech Company Kenya",
  year: 2025,
} as const;

export const dataVault = {
  title: "NGO Data Vault",
  summary: "End-to-end encrypted field data. Collects offline, syncs when the network returns.",
  compliance: ["GDPR", "Kenya DPA"],
} as const;

export const supportDesk = {
  title: "SupportDesk",
  summary: "WhatsApp, Email and USSD in one inbox for counties and companies.",
  slaUptime: 99.9,
  avgFirstReplyMin: 12,
  ticketsPerWeek: 1240,
  channels: ["WhatsApp", "Email", "USSD"],
  // Avg first-reply minutes, Mon→Sun. Mean must equal avgFirstReplyMin.
  lastSevenDays: [14, 11, 13, 10, 12, 13, 11],
} as const;

export const footprint = { counties: 12, companies: 40 } as const;

/* ───────────── Case-study detail pages (/case-studies/[slug]) ─────────────
 * ⚠ Narrative (challenge/approach) is drafted from the headline metrics — confirm with each client before launch.
 */

export type CaseSector = "Government" | "Enterprise" | "NGO";

export type CaseStudy = {
  slug: string;
  sector: CaseSector;
  title: string;
  client: string;
  summary: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  results: string[];
  solution: string; // /solutions/[slug]
  quote?: { text: string; who: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: countyRevenue.slug,
    sector: "Government",
    title: countyRevenue.title,
    client: "A county government in Kenya",
    summary: countyRevenue.summary,
    metrics: [
      { value: `+${countyRevenueGrowthPct}%`, label: "Revenue growth" },
      { value: `KES ${countyRevenue.after / 1e6}M`, label: "Collected, automated" },
      { value: `${countyRevenue.months} months`, label: "To result" },
      { value: "3", label: "Payment rails" },
    ],
    challenge: `Market fees, parking and business permits were collected in cash against paper receipt books. Collections had stalled at around KES ${countyRevenue.before / 1e6}M, reconciliation was manual, and leadership had no reliable view of what was collected where.`,
    approach: [
      "Moved every revenue stream onto M-Pesa and bank collection, with USSD for traders without smartphones.",
      "Issued digital receipts instantly and retired cash desks.",
      "Gave leadership a live collections dashboard by revenue stream and location.",
      "Embedded our team on site for two weeks during go-live to train revenue officers.",
    ],
    results: [
      `Collections grew from KES ${countyRevenue.before / 1e6}M to KES ${countyRevenue.after / 1e6}M — a ${countyRevenueGrowthPct}% increase — within ${countyRevenue.months} months.`,
      "Every payment traceable to a payer, an officer and a location.",
      "Reconciliation happens automatically instead of at month-end.",
    ],
    solution: "government-digital-services",
    quote: {
      text: `We moved from KES ${countyRevenue.before / 1e6}M to KES ${countyRevenue.after / 1e6}M in ${countyRevenue.months} months. Awake automated everything — no leaks.`,
      who: "County Finance Lead",
    },
  },
  {
    slug: "retail-mpesa",
    sector: "Enterprise",
    title: retailMpesa.title,
    client: `A ${retailMpesa.branches}-branch retail chain`,
    summary: retailMpesa.summary,
    metrics: [
      { value: `${retailMpesa.transactionsMillions}M`, label: "Transactions" },
      { value: `${retailMpesa.successRate}%`, label: "Success rate" },
      { value: `${retailMpesa.branches}`, label: "Branches" },
      { value: "Real time", label: "Settlement" },
    ],
    challenge:
      "Each branch reconciled its own takings in Excel at the end of the day. Mismatches took days to trace, and head office never had a same-day view of sales.",
    approach: [
      `Brought all ${retailMpesa.branches} branches onto one M-Pesa Till with branch-level tagging.`,
      "Matched M-Pesa and cash to sales automatically, in real time.",
      "Added alerts for failed, reversed and duplicate payments.",
    ],
    results: [
      `${retailMpesa.transactionsMillions}M transactions processed at a ${retailMpesa.successRate}% success rate.`,
      "End-of-day Excel reconciliation eliminated.",
      "Head office sees branch-level sales as they happen.",
    ],
    solution: "payment-integration-mpesa",
    quote: {
      text: `${retailMpesa.transactionsMillions} million M-Pesa transactions reconciled automatically. My finance team sleeps now.`,
      who: "CFO, Retail Chain",
    },
  },
  {
    slug: "hr-platform",
    sector: "NGO",
    title: `${hrPlatform.title} for ${hrPlatform.staff} staff`,
    client: `A ${hrPlatform.staff}-staff NGO`,
    summary: "Payroll, leave, per diem and appraisals moved out of spreadsheets and paper into one system.",
    metrics: [
      { value: `${hrPlatform.hoursSavedWeekly} hrs`, label: "Saved every week" },
      { value: `${hrPlatform.staff}`, label: "Staff" },
      { value: `${hrPlatform.modules.length}`, label: "Modules" },
      { value: "1", label: "Login" },
    ],
    challenge:
      "Payroll lived in spreadsheets, leave was requested on paper, and field per diem was reconciled by hand every month.",
    approach: [
      `Moved ${hrPlatform.modules.join(", ").toLowerCase()} into Awake HR.`,
      "Automated statutory deductions and bank salary files.",
      "Enabled mobile approvals for managers working in the field.",
    ],
    results: [
      `${hrPlatform.hoursSavedWeekly} hours of HR admin saved every week.`,
      "Leave and per diem fully paperless.",
      `One login for all ${hrPlatform.staff} staff.`,
    ],
    solution: "hr-platform-africa",
    quote: {
      text: `Leave, payroll, per diem — one system. We saved ${hrPlatform.hoursSavedWeekly} hours every single week.`,
      who: "HR Director",
    },
  },
  {
    slug: "data-vault",
    sector: "NGO",
    title: dataVault.title,
    client: "A humanitarian programme",
    summary: dataVault.summary,
    metrics: [
      { value: "E2E", label: "Encryption" },
      { value: "Offline", label: "Collection" },
      { value: dataVault.compliance.join(" + "), label: "Compliance" },
      { value: "Full", label: "Audit trail" },
    ],
    challenge:
      "Enumerators collected beneficiary data on paper and personal phones in low-coverage areas, which made consent hard to prove and the data hard to secure.",
    approach: [
      "Deployed offline-capable, encrypted forms on programme devices.",
      "Captured consent on every record.",
      "Added role-based access and full audit logs for the Data Protection Officer.",
    ],
    results: [
      "End-to-end encryption on every beneficiary record.",
      "Collection continues without network coverage.",
      "Audit evidence ready for donor and regulatory reviews.",
    ],
    solution: "data-handling-gdpr-kenya",
  },
  {
    slug: "supportdesk",
    sector: "Enterprise",
    title: supportDesk.title,
    client: "Counties and enterprise clients",
    summary: supportDesk.summary,
    metrics: [
      { value: `${supportDesk.avgFirstReplyMin} min`, label: "Avg first reply" },
      { value: `${supportDesk.slaUptime}%`, label: "Uptime SLA" },
      { value: supportDesk.ticketsPerWeek.toLocaleString("en-KE"), label: "Tickets / week" },
      { value: `${supportDesk.channels.length}`, label: "Channels" },
    ],
    challenge:
      "Support requests arrived by phone, personal WhatsApp and email with no tracking, so issues were lost and nobody could measure response times.",
    approach: [
      `Routed ${supportDesk.channels.join(", ")} into one SupportDesk inbox.`,
      "Agreed priorities and written SLAs with each client.",
      "Set up a 24/7 on-call rota with clear escalation.",
    ],
    results: [
      `${supportDesk.avgFirstReplyMin}-minute average first reply.`,
      `${supportDesk.slaUptime}% uptime SLA met.`,
      `${supportDesk.ticketsPerWeek.toLocaleString("en-KE")} tickets a week tracked end to end.`,
    ],
    solution: "tech-support-systems-sla",
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
