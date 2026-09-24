import { site } from "./site";

/** JSON-LD builders. Absolute URLs everywhere — Google ignores relative ones in structured data. */

const abs = (path: string) => new URL(path, site.url).toString();

export type Crumb = { label: string; href: string };

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: abs(c.href) })),
});

export type Faq = { q: string; a: string };

export const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceSchema = ({ name, description, path }: { name: string; description: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: abs(path),
  areaServed: { "@type": "Country", name: "Kenya" },
  provider: { "@type": "Organization", name: site.name, url: site.url },
});
