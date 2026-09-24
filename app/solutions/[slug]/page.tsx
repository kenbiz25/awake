import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero, { HeroStat } from "@/components/page/PageHero";
import JsonLd from "@/components/page/JsonLd";
import { FAQList, FeatureCards, GhostButton, LinkCards, PrimaryButton, ProcessSteps, Section } from "@/components/page/blocks";
import { CaseHighlight } from "@/components/page/CaseCards";
import ContactCTA from "@/components/ContactCTA";
import { SOLUTIONS, getSolution } from "@/lib/solutions";
import { getCaseStudy } from "@/lib/case-studies";
import { serviceSchema } from "@/lib/schema";
import { CONTACT_HREF } from "@/lib/site";
import { leadSentence } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const s = getSolution(params.slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/solutions/${s.slug}` });
}

export default function SolutionPage({ params }: Params) {
  const s = getSolution(params.slug);
  if (!s) notFound();
  const path = `/solutions/${s.slug}`;
  const study = s.caseSlug ? getCaseStudy(s.caseSlug) : undefined;
  const related = s.related.map(getSolution).filter((r): r is NonNullable<typeof r> => !!r);

  return (
    <>
      <JsonLd data={serviceSchema({ name: s.name, description: s.metaDescription, path })} />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/#solutions" },
          { label: s.name, href: path },
        ]}
        eyebrow={s.keyword}
        title={s.h1}
        intro={s.intro}
        actions={
          <>
            <PrimaryButton href={CONTACT_HREF}>Get a free audit</PrimaryButton>
            <GhostButton href="/pricing">See pricing</GhostButton>
          </>
        }
        aside={<HeroStat {...s.stat} />}
      />

      <Section id="features" tone="white" eyebrow="What you get" title={`${s.name}, done properly`}>
        <FeatureCards items={s.features} />
      </Section>

      <Section
        id="process"
        tone="soft"
        eyebrow="How we deliver"
        title="From first call to go-live"
        intro="A fixed plan, agreed in writing before we start — so you always know what happens next."
      >
        <ProcessSteps steps={s.process} />
      </Section>

      {study && (
        <Section id="proof" tone="white" eyebrow="Proof" title="Running in production">
          <CaseHighlight study={study} />
        </Section>
      )}

      <Section id="faq" tone={study ? "soft" : "white"} eyebrow="FAQ" title={`${s.keyword}: your questions answered`}>
        <FAQList faqs={s.faqs} />
      </Section>

      <Section id="related" tone={study ? "white" : "soft"} eyebrow="Works well with" title="Related solutions">
        <LinkCards
          items={related.map((r) => ({ title: r.name, desc: leadSentence(r.metaDescription), href: `/solutions/${r.slug}`, Icon: r.Icon }))}
        />
      </Section>

      <ContactCTA />
    </>
  );
}
