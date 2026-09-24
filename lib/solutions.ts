import {
  BarChart3,
  BellRing,
  CalendarCheck,
  ClipboardCheck,
  Coins,
  CreditCard,
  FileText,
  Filter,
  Gauge,
  Globe,
  Handshake,
  Headset,
  Landmark,
  Layers,
  LineChart,
  Lock,
  MapPin,
  MessageCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Tags,
  Target,
  Users,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import type { Feature, Step } from "@/components/page/blocks";
import type { Faq } from "./schema";
import { TIERS } from "./pricing";
import { countyRevenue, countyRevenueGrowthPct, hrPlatform, retailMpesa, supportDesk } from "./case-studies";

export type Solution = {
  slug: string;
  name: string;
  keyword: string;
  Icon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  stat: { value: string; label: string; note: string };
  features: Feature[];
  process: Step[];
  faqs: Faq[];
  related: string[];
  caseSlug?: string;
};

const starter = TIERS.find((t) => t.id === "starter")!;
const SLA_MINUTES = Math.round(30 * 24 * 60 * (1 - supportDesk.slaUptime / 100)); // ≈ 43 min / month

export const SOLUTIONS: Solution[] = [
  {
    slug: "website-development-kenya",
    name: "Website Development",
    keyword: "Website development Kenya",
    Icon: Globe,
    metaTitle: "Website Development Kenya | Fast, SEO-Ready Websites",
    metaDescription:
      "Mobile-first websites for Kenyan businesses, NGOs and counties, with M-Pesa checkout, SEO and an editor your team can run. Live in 30 days.",
    h1: "Website development in Kenya that brings in business",
    intro:
      "Most Kenyan visitors arrive on a mid-range Android phone over mobile data. We build sites that load fast on that connection, rank on Google and turn visits into calls, WhatsApp chats and M-Pesa payments.",
    stat: { value: "30 days", label: "Kickoff to launch", note: "Including content migration, training and Google setup." },
    features: [
      {
        title: "Mobile-first and fast",
        desc: "Built for 3G and 4G on budget Android phones — lean pages, compressed images and Core Web Vitals checked before launch.",
        Icon: Gauge,
      },
      {
        title: "SEO from day one",
        desc: "Keyword research, clean structure, schema markup and a Google Business Profile, so you show up when customers search.",
        Icon: Search,
      },
      {
        title: "Pay and enquire on the page",
        desc: "M-Pesa STK Push checkout, WhatsApp click-to-chat and lead forms that land straight in your inbox or CRM.",
        Icon: CreditCard,
      },
    ],
    process: [
      { title: "Discover", when: "Week 1", desc: "Goals, audience and keyword research. We agree what the site must achieve and how we'll measure it." },
      { title: "Design", when: "Week 2", desc: "Wireframes and brand-aligned designs you review on your own phone before we write code." },
      { title: "Build", when: "Weeks 2–3", desc: "Development, content, M-Pesa and form integrations, plus speed and accessibility testing." },
      { title: "Launch & grow", when: "Week 4+", desc: "Go-live, team training, analytics and monthly SEO reports so the site keeps improving." },
    ],
    faqs: [
      {
        q: "How much does a website cost in Kenya?",
        a: `Our project websites start from ${starter.price.Project.amount} one-time, or from ${starter.price.Retainer.amount} a month on a retainer that includes hosting, support and improvements. We give you a fixed quote after a free 45-minute audit.`,
      },
      {
        q: "How long does it take to build a website?",
        a: "Most business websites go live in 30 days. Larger portals with integrations take 6–10 weeks, and we agree the timeline in writing before we start.",
      },
      {
        q: "Can we update the website ourselves?",
        a: "Yes. Every site ships with a simple content editor and a training session, so your team can publish news, jobs and tenders without calling us.",
      },
      {
        q: "Do you handle domains and hosting?",
        a: "Yes. We can register your .co.ke, .or.ke or .go.ke domain, host on fast infrastructure with SSL and daily backups, and monitor uptime around the clock.",
      },
    ],
    related: ["payment-integration-mpesa", "dashboard-analytics", "sales-advisory-growth"],
  },
  {
    slug: "hr-platform-africa",
    name: "HR & Payroll Platform",
    keyword: "HR platform Africa",
    Icon: Users,
    metaTitle: "HR Platform Africa | Payroll, Leave & Per Diem Software",
    metaDescription:
      "Payroll, leave, per diem and appraisals in one system, with PAYE, NSSF, SHIF and Housing Levy calculated automatically. For companies and NGOs.",
    h1: "An HR and payroll platform built for teams across Africa",
    intro:
      "Spreadsheets break at 50 staff. Awake HR replaces them with one login for payroll, leave, per diem and appraisals — statutory deductions calculated for you, payslips on every staff phone.",
    stat: {
      value: `${hrPlatform.hoursSavedWeekly} hrs`,
      label: "Admin saved every week",
      note: `Measured at a ${hrPlatform.staff}-staff NGO after replacing Excel payroll and paper leave forms.`,
    },
    features: [
      {
        title: "Payroll that files itself",
        desc: "PAYE, NSSF, SHIF and Housing Levy calculated automatically, bank and M-Pesa salary files generated, payslips sent to staff phones.",
        Icon: Coins,
      },
      {
        title: "Leave and per diem, approved on the go",
        desc: "Staff request, managers approve from their phone and balances update instantly. Field per diem is tracked against budget lines.",
        Icon: CalendarCheck,
      },
      {
        title: "Ready for multi-country teams",
        desc: "Run teams across East Africa with country-specific pay rules, currencies and public holidays in one system.",
        Icon: Globe,
      },
    ],
    process: [
      { title: "Map", when: "Week 1", desc: "Your org structure, pay rules, allowances and approval flows, documented and signed off." },
      { title: "Migrate", when: "Weeks 2–3", desc: "Staff records, leave balances and pay history imported, then one payroll run in parallel with your old process." },
      { title: "Train", when: "Week 4", desc: "HR, managers and staff onboarded — in person for HR, with short guides for everyone else." },
      { title: "Run & support", when: "Ongoing", desc: "We update statutory rules when the law changes and support every payroll run." },
    ],
    faqs: [
      {
        q: "Does it handle Kenyan statutory deductions?",
        a: "Yes. PAYE, NSSF, SHIF and the Affordable Housing Levy are calculated automatically, and we update the rules whenever the law changes.",
      },
      {
        q: "Can staff use it on their phones?",
        a: "Yes. Staff apply for leave, submit per diem claims and download payslips from any smartphone browser — no app install needed.",
      },
      {
        q: "How do you migrate us from Excel or our current system?",
        a: "We import staff records, leave balances and pay history, then run one payroll in parallel with your old process so you can compare every figure before switching.",
      },
      {
        q: "Is it suitable for NGOs with donor-funded staff?",
        a: "Yes. You can allocate salaries and per diem to projects and donor budget lines, and export reports in the format your donors ask for.",
      },
    ],
    related: ["tech-support-systems-sla", "dashboard-analytics", "data-handling-gdpr-kenya"],
    caseSlug: "hr-platform",
  },
  {
    slug: "payment-integration-mpesa",
    name: "M-Pesa Payment Integration",
    keyword: "M-Pesa payment integration",
    Icon: CreditCard,
    metaTitle: "M-Pesa Payment Integration | Daraja API & Reconciliation",
    metaDescription:
      `STK Push, Paybill and Till via the Safaricom Daraja API, reconciled with bank and cash automatically. ${retailMpesa.successRate}% success across ${retailMpesa.branches} branches.`,
    h1: "M-Pesa payment integration, reconciled automatically",
    intro:
      "Accepting M-Pesa is easy. Knowing which payment belongs to which invoice, branch and customer is the hard part. We connect M-Pesa to your systems so every shilling is matched and reported without anyone opening Excel.",
    stat: {
      value: `${retailMpesa.successRate}%`,
      label: "Transaction success rate",
      note: `${retailMpesa.transactionsMillions}M transactions across ${retailMpesa.branches} retail branches, settled in real time.`,
    },
    features: [
      {
        title: "Every way Kenyans pay",
        desc: "STK Push at checkout, Paybill and Till numbers, B2C payouts, and USSD for customers without smartphones.",
        Icon: Smartphone,
      },
      {
        title: "Automatic reconciliation",
        desc: "Each payment is matched to an invoice, branch and customer in real time — with bank transfers and cash in the same ledger.",
        Icon: RefreshCw,
      },
      {
        title: "Finance-ready reports",
        desc: "Daily settlement reports, KRA eTIMS-ready invoicing and an audit trail your accountants will actually like.",
        Icon: FileText,
      },
    ],
    process: [
      { title: "Audit", when: "Week 1", desc: "We map every payment channel you use today and find where money or time is leaking." },
      { title: "Integrate", when: "Weeks 1–2", desc: "Daraja API credentials, secure callbacks and your Paybill or Till connected to your system." },
      { title: "Reconcile", when: "Weeks 2–3", desc: "Matching rules, bank feeds and exception handling, tested against real historical transactions." },
      { title: "Launch & monitor", when: "Week 4", desc: "Safaricom go-live approval, then alerts on failed, reversed or duplicate payments." },
    ],
    faqs: [
      {
        q: "Do we need our own Paybill or Till number?",
        a: "Yes. Payments go straight to your own Safaricom Paybill or Till — we never hold your money. If you don't have one, we help you apply, then connect it through the Daraja API.",
      },
      {
        q: "How long does M-Pesa integration take?",
        a: "A standard STK Push and Paybill integration with reconciliation takes 2–4 weeks, including Safaricom's go-live approval.",
      },
      {
        q: "Can you reconcile M-Pesa with bank and cash payments?",
        a: "Yes. We bring M-Pesa, bank transfers and cash into one ledger and match them to invoices automatically, flagging anything that doesn't match.",
      },
      {
        q: "What happens when a payment fails or is duplicated?",
        a: "Failed STK Push requests are retried or flagged, duplicates are caught before they post, and your team gets an alert with the M-Pesa receipt number to resolve it.",
      },
    ],
    related: ["government-digital-services", "dashboard-analytics", "website-development-kenya"],
    caseSlug: "retail-mpesa",
  },
  {
    slug: "government-digital-services",
    name: "Government Digital Services",
    keyword: "Government digital services Kenya",
    Icon: Landmark,
    metaTitle: "Government Digital Services Kenya | County Revenue Systems",
    metaDescription:
      `Revenue collection, permits and licences for Kenyan counties via M-Pesa, bank and USSD. One county grew collections from KES ${countyRevenue.before / 1e6}M to KES ${countyRevenue.after / 1e6}M.`,
    h1: "Government digital services that raise revenue and cut queues",
    intro:
      "Counties lose revenue to cash handling, paper receipts and systems that don't talk to each other. We build revenue and citizen-service systems that collect through M-Pesa, bank and USSD — and show leadership every shilling in real time.",
    stat: {
      value: `+${countyRevenueGrowthPct}%`,
      label: "County revenue growth",
      note: `KES ${countyRevenue.before / 1e6}M collected manually became KES ${countyRevenue.after / 1e6}M automated within ${countyRevenue.months} months.`,
    },
    features: [
      {
        title: "Revenue collection without leakage",
        desc: "Market fees, parking, business permits and land rates collected digitally, receipts issued instantly, cash desks retired.",
        Icon: Coins,
      },
      {
        title: "Services every citizen can reach",
        desc: "Apply and pay online, on USSD or at an assisted service desk — so traders without smartphones are never left out.",
        Icon: MapPin,
      },
      {
        title: "Built for public accountability",
        desc: "Role-based access, full audit trails and exports your finance team and auditors can work with directly.",
        Icon: ClipboardCheck,
      },
    ],
    process: [
      { title: "Assess", when: "Weeks 1–2", desc: "Revenue streams, leakage points and stakeholders mapped with your finance and revenue teams." },
      { title: "Procure", when: "As required", desc: "A tender-ready proposal and the documentation your procurement team needs." },
      { title: "Pilot & roll out", when: "Weeks 3–8", desc: "One revenue stream goes live first, then the rest follow once the numbers prove it." },
      { title: "Train & embed", when: "Go-live", desc: "On-site training for revenue officers, and our team embedded for two weeks after launch." },
    ],
    faqs: [
      {
        q: "Can you work through government procurement?",
        a: "Yes. We respond to tenders and framework agreements under the Public Procurement and Asset Disposal Act (PPADA) and provide the documentation procurement teams need.",
      },
      {
        q: "How do you stop revenue leakage?",
        a: "Payments go directly into the county's collection accounts via M-Pesa or bank, receipts are generated automatically, and every transaction is traceable to an officer and a location.",
      },
      {
        q: "What about citizens without smartphones?",
        a: "Every service works on USSD and at assisted service desks, so any phone can pay a market fee or check a permit.",
      },
      {
        q: "Where is government data hosted?",
        a: "With providers that meet the requirements of the Kenya Data Protection Act 2019, or on government infrastructure where policy requires it.",
      },
    ],
    related: ["payment-integration-mpesa", "tech-support-systems-sla", "dashboard-analytics"],
    caseSlug: "county-revenue",
  },
  {
    slug: "data-handling-gdpr-kenya",
    name: "GDPR & Kenya DPA Data Handling",
    keyword: "Data handling GDPR Kenya",
    Icon: ShieldCheck,
    metaTitle: "GDPR & Kenya DPA Data Handling | Secure Field Data",
    metaDescription:
      "Encrypted, offline-first field data collection with consent tracking and audit logs, aligned with the Kenya Data Protection Act 2019 and GDPR.",
    h1: "GDPR and Kenya Data Protection Act compliant data handling",
    intro:
      "If you collect names, phone numbers or health data, the Kenya Data Protection Act 2019 applies to you — and GDPR too if you work with European donors or partners. Data Vault lets field teams collect offline, keeps every record encrypted and gives your DPO the evidence regulators and donors ask for.",
    stat: { value: "E2E", label: "Encrypted, offline-first", note: "Records are encrypted on the device, in transit and at rest." },
    features: [
      {
        title: "Offline, encrypted field collection",
        desc: "Forms work with no network on phones and tablets. Records are encrypted on the device and sync when coverage returns.",
        Icon: WifiOff,
      },
      {
        title: "Consent and data-subject rights",
        desc: "Consent captured on every record, and access, correction and erasure requests handled through a logged, repeatable process.",
        Icon: Lock,
      },
      {
        title: "Audit-ready by default",
        desc: "Every view, export and change is logged. Role-based access keeps sensitive fields visible only to people who need them.",
        Icon: ClipboardCheck,
      },
    ],
    process: [
      { title: "Assess", when: "Week 1", desc: "Data mapping and support for your Data Protection Impact Assessment." },
      { title: "Design", when: "Week 2", desc: "Minimum necessary data, consent wording, roles and retention rules." },
      { title: "Deploy", when: "Weeks 3–4", desc: "Forms, devices and hands-on training for enumerators and supervisors." },
      { title: "Operate", when: "Ongoing", desc: "Monitoring, quarterly access reviews and a tested breach-response plan." },
    ],
    faqs: [
      {
        q: "Do we need to register with the Office of the Data Protection Commissioner?",
        a: "Most organisations that process personal data in Kenya must register with the ODPC as data controllers or processors. We prepare the data mapping and technical documentation; your legal counsel confirms your specific obligations.",
      },
      {
        q: "Does Data Vault work without internet?",
        a: "Yes. Enumerators collect data with no network at all; records stay encrypted on the device until they sync.",
      },
      {
        q: "Can you help with a Data Protection Impact Assessment?",
        a: "We support your DPIA with a full data map, a risk register and a description of the technical controls in place. Final sign-off stays with your DPO or legal adviser.",
      },
      {
        q: "What happens when someone withdraws consent?",
        a: "Their record is erased or anonymised across the system, and the request is logged with a timestamp for your records.",
      },
    ],
    related: ["hr-platform-africa", "tech-support-systems-sla", "dashboard-analytics"],
    caseSlug: "data-vault",
  },
  {
    slug: "tech-support-systems-sla",
    name: "Tech Support & SLA",
    keyword: "Tech support systems with SLA",
    Icon: Headset,
    metaTitle: `Tech Support with SLA | ${supportDesk.avgFirstReplyMin}-min Response, 24/7 Helpdesk`,
    metaDescription:
      `Managed 24/7 support with a ${supportDesk.slaUptime}% uptime SLA and ${supportDesk.avgFirstReplyMin}-minute average first reply. WhatsApp, email and USSD tickets in one desk.`,
    h1: "Tech support with an SLA — WhatsApp, email and USSD in one desk",
    intro:
      "Systems only help if someone answers when they break. We run 24/7 support with written SLAs, and SupportDesk puts every WhatsApp message, email and USSD request in one inbox your team can track.",
    stat: {
      value: `${supportDesk.avgFirstReplyMin} min`,
      label: "Average first reply",
      note: `${supportDesk.ticketsPerWeek.toLocaleString("en-KE")} tickets a week handled for counties and companies.`,
    },
    features: [
      {
        title: "One inbox for every channel",
        desc: "WhatsApp, email and USSD requests become tickets automatically, with the full conversation history attached.",
        Icon: MessageCircle,
      },
      {
        title: "SLAs you can hold us to",
        desc: "Response and resolution targets written into your contract, with monthly reports showing exactly how we performed.",
        Icon: Target,
      },
      {
        title: "People on the ground",
        desc: "120 support hubs, and engineers on site within 48 hours when a problem can't be fixed remotely.",
        Icon: MapPin,
      },
    ],
    process: [
      { title: "Onboard", when: "Week 1", desc: "Inventory of your systems, priorities agreed and SLAs defined in writing." },
      { title: "Connect", when: "Week 1–2", desc: "Your WhatsApp Business number, email and USSD channels routed into SupportDesk." },
      { title: "Support", when: "24/7", desc: "Monitoring, triage and fixes around the clock, with on-call escalation for urgent issues." },
      { title: "Review", when: "Monthly", desc: "SLA reports, recurring-issue analysis and an improvement plan you can act on." },
    ],
    faqs: [
      {
        q: `What does a ${supportDesk.slaUptime}% uptime SLA mean?`,
        a: `No more than about ${SLA_MINUTES} minutes of unplanned downtime in a 30-day month. If we miss it, service credits apply as set out in your contract.`,
      },
      {
        q: "Do you support systems you didn't build?",
        a: "Yes. After a short technical review we can take over support for existing websites, payment systems and business software.",
      },
      {
        q: "How fast do you respond?",
        a: `Our average first reply is ${supportDesk.avgFirstReplyMin} minutes. Urgent issues go straight to an on-call engineer, around the clock.`,
      },
      {
        q: "Can our customers contact support on WhatsApp?",
        a: "Yes. Customers message your WhatsApp Business number and SupportDesk turns every conversation into a tracked ticket.",
      },
    ],
    related: ["government-digital-services", "hr-platform-africa", "website-development-kenya"],
    caseSlug: "supportdesk",
  },
  {
    slug: "dashboard-analytics",
    name: "Dashboards & Analytics",
    keyword: "Dashboard and analytics",
    Icon: BarChart3,
    metaTitle: "Dashboards & Analytics Kenya | Real-time BI Dashboards",
    metaDescription:
      "Live dashboards that connect M-Pesa, bank, HR and field data into one view that county leaders, CFOs and donors can trust.",
    h1: "Dashboards and analytics that leadership actually opens",
    intro:
      "Reports that arrive two weeks late don't drive decisions. We connect your payment, HR and field systems into live dashboards — so the numbers in the board meeting match the numbers in the bank.",
    stat: {
      value: `${retailMpesa.transactionsMillions}M+`,
      label: "Transactions in one view",
      note: `Branch-level settlement for a ${retailMpesa.branches}-branch retail chain, updated in real time.`,
    },
    features: [
      {
        title: "One source of truth",
        desc: "M-Pesa, bank, HR and field data combined and cleaned automatically, so every team reads the same numbers.",
        Icon: Layers,
      },
      {
        title: "Built around your decisions",
        desc: "Dashboards designed for your KPIs — collections by ward, sales by branch or programme reach by county.",
        Icon: LineChart,
      },
      {
        title: "Alerts, not just charts",
        desc: "Get a WhatsApp or email alert when revenue dips, targets slip or something looks unusual.",
        Icon: BellRing,
      },
    ],
    process: [
      { title: "Define", when: "Week 1", desc: "The decisions you need to make and the KPIs that inform them." },
      { title: "Connect", when: "Weeks 1–2", desc: "Data sources connected, cleaned and scheduled to refresh automatically." },
      { title: "Visualise", when: "Weeks 2–3", desc: "Dashboards built and refined with the people who will use them." },
      { title: "Adopt", when: "Week 4+", desc: "Training, scheduled reports and alerts so dashboards become a habit." },
    ],
    faqs: [
      {
        q: "Which data sources can you connect?",
        a: "M-Pesa, bank statements, accounting and HR systems, spreadsheets and field data — anything with an export or an API.",
      },
      {
        q: "Do we need to buy a BI tool licence?",
        a: "Not necessarily. We can build dashboards into your own system or use a BI tool you already pay for, whichever keeps your costs lowest.",
      },
      {
        q: "How real-time is real-time?",
        a: "Payment data can update within minutes. Other sources refresh on a schedule that matches how often the underlying data changes.",
      },
      {
        q: "Can donors or board members get access?",
        a: "Yes — through read-only views limited to what they should see, or scheduled PDF reports sent automatically.",
      },
    ],
    related: ["payment-integration-mpesa", "government-digital-services", "sales-advisory-growth"],
  },
  {
    slug: "sales-advisory-growth",
    name: "Sales Advisory & Growth",
    keyword: "Sales advisory for growth",
    Icon: Handshake,
    metaTitle: "Sales Advisory & Growth Consulting Kenya | CRM & Funnels",
    metaDescription:
      "Pipeline design, CRM setup, pricing and sales funnels that connect your website, WhatsApp and M-Pesa into predictable revenue.",
    h1: "Sales advisory that turns your systems into revenue",
    intro:
      "Good systems don't sell themselves. We work with your leadership to design the pipeline, set up the CRM and connect website, WhatsApp and M-Pesa into a sales process you can measure and grow.",
    stat: { value: "45 min", label: "Free growth audit", note: "We review your leads, conversion and sales cycle — and show you the gaps." },
    features: [
      {
        title: "A pipeline you can see",
        desc: "A CRM set up around how you actually sell, with every lead from web, WhatsApp and referrals in one place.",
        Icon: Filter,
      },
      {
        title: "Funnels that convert",
        desc: "Landing pages, offers and follow-up sequences tested against real conversion data — not guesswork.",
        Icon: Target,
      },
      {
        title: "Pricing and packaging",
        desc: "Offers and pricing structured for your market, from SMEs to government tenders.",
        Icon: Tags,
      },
    ],
    process: [
      { title: "Diagnose", when: "Weeks 1–2", desc: "A sales audit: lead sources, conversion rates, deal size and cycle length." },
      { title: "Design", when: "Weeks 3–4", desc: "Pipeline stages, CRM configuration and a sales playbook for your team." },
      { title: "Implement", when: "Months 2–3", desc: "Funnels, automations and team training — built, launched and tested." },
      { title: "Measure", when: "Monthly", desc: "Growth reviews against the targets we agreed at the start." },
    ],
    faqs: [
      {
        q: "Is this consulting or software?",
        a: "Both. We advise on strategy and set up the tools — CRM, funnels and reporting — so the advice becomes a working sales system.",
      },
      {
        q: "Do you work with B2B and government sales?",
        a: "Yes. We help teams selling to companies, NGOs and government, including preparing for tenders and long procurement cycles.",
      },
      {
        q: "How do you measure success?",
        a: "We agree targets up front — leads, conversion rate, deal size and sales cycle — and review them with you every month.",
      },
      {
        q: "How long is an engagement?",
        a: "Most run for 3 months: one month to diagnose and design, two to implement and measure. Many clients then continue on a retainer.",
      },
    ],
    related: ["website-development-kenya", "dashboard-analytics", "payment-integration-mpesa"],
  },
];

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);

