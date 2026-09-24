/**
 * Pricing — single source for the home section now and /pricing (Phase 6).
 * ⚠ Business placeholders: confirm every figure before launch.
 */

export const PRICING_MODES = ["Retainer", "Project", "Government"] as const;
export type PricingMode = (typeof PRICING_MODES)[number];

export const STARTS_FROM = "KES 75k/month";

export const MODE_NOTE: Record<PricingMode, string> = {
  Retainer: "Monthly. Hosting, support and continuous improvements included. Cancel with 30 days' notice.",
  Project: "Fixed scope and fixed price. 30-day launch, 90-day warranty, then optional retainer.",
  Government: "Tender-ready documentation, milestone payments and on-site training. We respond to PPADA tenders and frameworks.",
};

type Price = { amount: string; cadence: string };

export type Tier = {
  id: "starter" | "growth" | "enterprise";
  name: string;
  blurb: string;
  price: Record<PricingMode, Price>;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    blurb: "For SMEs automating their first system",
    price: {
      Retainer: { amount: "KES 75k", cadence: "/month" },
      Project: { amount: "KES 450k", cadence: " one-time" },
      Government: { amount: "KES 2.5M", cadence: " per module" },
    },
    features: ["1 system — Pay, HR or SupportDesk", "M-Pesa integration", "Email + WhatsApp support, weekdays 8–6", "Monthly performance report"],
    cta: "Start with Starter",
  },
  {
    id: "growth",
    name: "Growth",
    blurb: "Most popular for counties & growing companies",
    price: {
      Retainer: { amount: "KES 250k", cadence: "/month" },
      Project: { amount: "KES 1.8M", cadence: " one-time" },
      Government: { amount: "KES 9.5M", cadence: " per platform" },
    },
    features: ["Up to 3 systems, fully integrated", "M-Pesa + bank + USSD", "24/7 support · 12-min avg first reply", "On-site training during go-live", "KRA & audit-ready reports"],
    cta: "Choose Growth",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "For governments & NGOs operating at scale",
    price: {
      Retainer: { amount: "Custom", cadence: "" },
      Project: { amount: "Custom", cadence: "" },
      Government: { amount: "Custom", cadence: "" },
    },
    features: ["Unlimited systems", "Dedicated delivery team", "On-prem or private cloud", "99.9% uptime SLA", "Quarterly impact review"],
    cta: "Talk to us",
  },
];
