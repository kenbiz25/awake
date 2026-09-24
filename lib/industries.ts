import { Building2, FileCheck2, HeartHandshake, Landmark, Scale, ShieldCheck, Store, WifiOff, type LucideIcon } from "lucide-react";
import type { Faq } from "./schema";
import type { Feature } from "@/components/page/blocks";
import { countyRevenue, countyRevenueGrowthPct, hrPlatform, retailMpesa } from "./case-studies";

export type Industry = {
  slug: "government" | "enterprise" | "ngo";
  name: string;
  Icon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  stat: { value: string; label: string; note: string };
  pains: { title: string; desc: string }[];
  solutions: string[]; // solution slugs
  assurances: Feature[];
  cases: string[]; // case-study slugs
  faqs: Faq[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "government",
    name: "Government",
    Icon: Landmark,
    metaTitle: "Digital Systems for Kenyan County & National Government",
    metaDescription: `Revenue, citizen-service and support systems for Kenyan counties and ministries: PPADA-ready, USSD-inclusive, audit-friendly. +${countyRevenueGrowthPct}% revenue in ${countyRevenue.months} months.`,
    h1: "Digital systems for county and national government",
    intro:
      "Citizens expect to pay and apply from their phones. Auditors expect every shilling accounted for. We build public-sector systems that do both — and keep running when the power or the network doesn't.",
    stat: {
      value: `+${countyRevenueGrowthPct}%`,
      label: "County revenue growth",
      note: `KES ${countyRevenue.before / 1e6}M to KES ${countyRevenue.after / 1e6}M in ${countyRevenue.months} months.`,
    },
    pains: [
      { title: "Revenue leaks at the cash desk", desc: "Paper receipts and cash handling make it impossible to know what was really collected." },
      { title: "Citizens queue for simple services", desc: "Permits and licences that could be paid on a phone still need an office visit." },
      { title: "Reports arrive too late to act on", desc: "Leadership sees last month's numbers, reconciled by hand, long after decisions are made." },
    ],
    solutions: ["government-digital-services", "payment-integration-mpesa", "dashboard-analytics", "tech-support-systems-sla"],
    assurances: [
      { title: "Procurement-ready", desc: "Tender and framework responses under PPADA, with the documentation your procurement team needs.", Icon: Scale },
      { title: "Audit trails on everything", desc: "Every transaction and change is logged to a user, a time and a location.", Icon: FileCheck2 },
      { title: "Kenya DPA 2019 aligned", desc: "Citizen data handled under the Data Protection Act, hosted where policy requires.", Icon: ShieldCheck },
    ],
    cases: [countyRevenue.slug, "supportdesk"],
    faqs: [
      {
        q: "Do you work with county governments directly or through tenders?",
        a: "Both. We respond to open tenders and framework agreements under PPADA, and can support pilots where procurement rules allow.",
      },
      {
        q: "Can your systems integrate with existing government platforms?",
        a: "Yes. We integrate with existing finance and service platforms through their APIs or exports, so data doesn't have to be entered twice.",
      },
      {
        q: "How do you train county staff?",
        a: "On site. Our team trains revenue and service officers in person and stays embedded for two weeks after go-live.",
      },
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    Icon: Building2,
    metaTitle: "Payment, HR & Analytics Systems for Kenyan Enterprise",
    metaDescription: `M-Pesa reconciliation, payroll, dashboards and 24/7 support for multi-branch companies. ${retailMpesa.transactionsMillions}M transactions at ${retailMpesa.successRate}% success across ${retailMpesa.branches} branches.`,
    h1: "Systems for enterprise and retail that scale with every branch",
    intro:
      "Every new branch adds tills, staff and spreadsheets. We give growing companies one system for payments, people and performance — so head office sees everything, as it happens.",
    stat: {
      value: `${retailMpesa.transactionsMillions}M`,
      label: "Transactions reconciled",
      note: `${retailMpesa.successRate}% success rate across ${retailMpesa.branches} branches.`,
    },
    pains: [
      { title: "End-of-day Excel", desc: "Branches reconcile tills by hand and head office waits days for a clear picture." },
      { title: "Payroll that grows with headcount", desc: "Every new hire adds another row to a spreadsheet nobody trusts." },
      { title: "Support that disappears", desc: "When a system breaks at a branch, there's nobody accountable to call." },
    ],
    solutions: ["payment-integration-mpesa", "hr-platform-africa", "dashboard-analytics", "sales-advisory-growth"],
    assurances: [
      { title: "KRA eTIMS-ready", desc: "Invoicing and reporting structured for KRA's electronic tax invoice requirements.", Icon: FileCheck2 },
      { title: "Role-based access", desc: "Branch managers see their branch; finance sees everything; every change is logged.", Icon: ShieldCheck },
      { title: "Built for multi-branch", desc: "Branch tagging, consolidated reporting and central control from day one.", Icon: Store },
    ],
    cases: ["retail-mpesa", "supportdesk"],
    faqs: [
      {
        q: "Can you work with the ERP or accounting system we already use?",
        a: "Yes. We integrate with your existing accounting or ERP system through its API or scheduled exports rather than replacing it.",
      },
      {
        q: "How quickly can a new branch be added?",
        a: "Once the system is live, a new branch is a configuration change — tills, staff and reports can be ready the same day.",
      },
      {
        q: "Do you offer support outside business hours?",
        a: "Yes. Growth and Enterprise plans include 24/7 support with written SLAs.",
      },
    ],
  },
  {
    slug: "ngo",
    name: "NGOs",
    Icon: HeartHandshake,
    metaTitle: "Technology for NGOs & Donor-funded Programmes in Kenya",
    metaDescription: `Secure offline field data, HR and payroll, and donor-ready reporting for NGOs, aligned with GDPR and the Kenya DPA. ${hrPlatform.hoursSavedWeekly} hours of admin saved weekly.`,
    h1: "Technology for NGOs and donor-funded programmes",
    intro:
      "Donors want evidence, regulators want compliance, and field teams need tools that work without a signal. We build systems for programmes that have to deliver all three.",
    stat: {
      value: `${hrPlatform.hoursSavedWeekly} hrs`,
      label: "HR admin saved weekly",
      note: `At a ${hrPlatform.staff}-staff NGO running payroll, leave and per diem in one system.`,
    },
    pains: [
      { title: "Field data on paper", desc: "Beneficiary data collected on paper or personal phones is slow to use and hard to protect." },
      { title: "Donor reports by hand", desc: "Every report means another week of pulling figures from different spreadsheets." },
      { title: "Per diem and payroll overhead", desc: "Staff costs split across projects and donors, reconciled manually every month." },
    ],
    solutions: ["data-handling-gdpr-kenya", "hr-platform-africa", "dashboard-analytics", "tech-support-systems-sla"],
    assurances: [
      { title: "GDPR & Kenya DPA", desc: "Consent, access and erasure handled properly, with evidence for your DPO and donors.", Icon: ShieldCheck },
      { title: "Offline-first", desc: "Field tools that collect with no network and sync securely when coverage returns.", Icon: WifiOff },
      { title: "Donor-ready reporting", desc: "Costs and results allocated to projects and budget lines, exported in donor formats.", Icon: FileCheck2 },
    ],
    cases: ["hr-platform", "data-vault"],
    faqs: [
      {
        q: "Do you offer pricing for non-profits?",
        a: "Yes. Tell us about your programme and funding model and we'll structure a plan that fits your budget cycle.",
      },
      {
        q: "Can we allocate staff costs to different donors?",
        a: "Yes. Salaries and per diem can be split across projects and donor budget lines, with reports in the format each donor requires.",
      },
      {
        q: "Will the tools work in areas with poor network coverage?",
        a: "Yes. Field collection works fully offline and syncs automatically — and securely — when a connection is available.",
      },
    ],
  },
];

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
