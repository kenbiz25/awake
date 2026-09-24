import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import { PrimaryButton, Section } from "@/components/page/blocks";
import { CaseCard, CaseHighlight } from "@/components/page/CaseCards";
import ContactCTA from "@/components/ContactCTA";
import { CASE_STUDIES, footprint } from "@/lib/case-studies";
import { CONTACT_HREF } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies | Real Systems, Real Numbers",
  description:
    `Case studies from ${footprint.counties} counties and ${footprint.companies}+ companies: county revenue, M-Pesa, HR, secure field data and 24/7 support, with the numbers.`,
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const [featured, ...rest] = CASE_STUDIES;
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
        ]}
        eyebrow={`${footprint.counties} counties · ${footprint.companies}+ companies`}
        title="Case studies: real systems, real numbers"
        intro="We don't show dribbble shots. Every project below is running in production — measured in revenue collected, hours saved and uptime delivered."
        actions={<PrimaryButton href={CONTACT_HREF}>Start your project</PrimaryButton>}
      />

      <Section id="featured" tone="white" eyebrow="Featured" title="The one counties ask about">
        <CaseHighlight study={featured} />
      </Section>

      <Section id="all" tone="soft" eyebrow="More results" title="Across government, enterprise and NGOs">
        <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
          {rest.map((c) => (
            <li key={c.slug}>
              <CaseCard study={c} />
            </li>
          ))}
        </ul>
      </Section>

      <ContactCTA />
    </>
  );
}
