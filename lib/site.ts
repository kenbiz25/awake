export const site = {
  name: "Awake Technologies",
  shortName: "Awake",
  url: "https://awaketechnologies.co.ke",
  description:
    "Awake Technologies builds websites, platforms, M-Pesa payments, HR, data and support systems for businesses, NGOs and governments across Africa.",
  location: "Nairobi, Kenya",
};

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Industries", href: "/#industries" },
  { label: "Case Studies", href: "/#cases" },
  { label: "Pricing", href: "/#pricing" },
];

// Slugs are shared with /solutions/[slug] (Phase 6)
export const solutions: NavLink[] = [
  { label: "Website Development Kenya", href: "/solutions/website-development-kenya" },
  { label: "HR Platform Africa", href: "/solutions/hr-platform-africa" },
  { label: "M-Pesa Payment Integration", href: "/solutions/payment-integration-mpesa" },
  { label: "Government Digital Services", href: "/solutions/government-digital-services" },
  { label: "GDPR & Kenya DPA Data Handling", href: "/solutions/data-handling-gdpr-kenya" },
  { label: "Tech Support Systems & SLA", href: "/solutions/tech-support-systems-sla" },
  { label: "Dashboards & Analytics", href: "/solutions/dashboard-analytics" },
  { label: "Sales Advisory & Growth", href: "/solutions/sales-advisory-growth" },
];

export const industries: NavLink[] = [
  { label: "County & National Government", href: "/industries/government" },
  { label: "Enterprise & Retail", href: "/industries/enterprise" },
  { label: "NGOs & Donor Programmes", href: "/industries/ngo" },
];

export const company: NavLink[] = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
  { label: "Contact", href: "/contact" },
];

// Every page ends with <ContactCTA id="contact">, so CTAs scroll to the form on the same page
export const CONTACT_HREF = "#contact";
