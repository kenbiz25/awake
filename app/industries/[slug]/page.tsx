import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PageHero, { HeroStat } from "@/components/page/PageHero";
import { FAQList, FeatureCards, GhostButton, LinkCards, PrimaryButton, Section } from "@/components/page/blocks";
import { CaseCard, CaseHighlight } from "@/components/page/CaseCards";
import ContactCTA from "@/components/ContactCTA";
import { INDUSTRIES, getIndustry } from "@/lib/industries";
import { getSolution } from "@/lib/solutions";
import { getCaseStudy } from "@/lib/case-studies";
import { CONTACT_HREF } from "@/lib/site";
import { leadSentence } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const ind = getIndustry(params.slug);
  if (!ind) return {};
  return pageMetadata({ title: ind.metaTitle, description: ind.metaDescription, path: `/industries/${ind.slug}` });
}

export default function IndustryPage({ params }: Params) {
  const ind = getIndustry(params.slug);
  if (!ind) notFound();
  const path = `/industries/${ind.slug}`;
  const audience = ind.slug === "ngo" ? "NGOs" : ind.name.toLowerCase();
  const solutions = ind.solutions.map(getSolution).filter((s): s is NonNullable<typeof s> => !!s);
  const [lead, ...more] = ind.cases.map(getCaseStudy).filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/#industries" },
          { label: ind.name, href: path },
        ]}
        eyebrow={`For ${audience}`}
        title={ind.h1}
        intro={ind.intro}
        actions={
          <>
            <PrimaryButton href={CONTACT_HREF}>Book a 45-minute audit</PrimaryButton>
            <GhostButton href="/case-studies">See case studies</GhostButton>
          </>
        }
        aside={<HeroStat {...ind.stat} />}
      />

      <Section id="challenges" tone="white" eyebrow="Sound familiar?" title="The problems we solve">
        <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
          {ind.pains.map((p, i) => (
            <li key={p.title} className="rounded-[24px] border border-ink/5 bg-sky-mist p-7">
              <span className="font-display text-[40px] font-extrabold leading-none tracking-[-0.04em] text-ink/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-[20px] font-extrabold leading-[1.15] tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-ink/60">{p.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="solutions-for" tone="soft" eyebrow="What we build" title={`Solutions for ${audience}`}>
        <LinkCards
          items={solutions.map((s) => ({ title: s.name, desc: leadSentence(s.metaDescription), href: `/solutions/${s.slug}`, Icon: s.Icon }))}
        />
      </Section>

      {lead && (
        <Section
          id="proof"
          tone="white"
          eyebrow="Proof"
          title="Results, not promises"
          aside={
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-[13px] font-semibold hover:text-water">
              All case studies <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          }
        >
          <CaseHighlight study={lead} />
          {more.length > 0 && (
            <div className="mt-4 grid gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
              {more.map((c) => (
                <CaseCard key={c.slug} study={c} />
              ))}
            </div>
          )}
        </Section>
      )}

      <Section id="assurance" tone="soft" eyebrow="Built for accountability" title="What you can rely on">
        <FeatureCards items={ind.assurances} />
      </Section>

      <Section id="faq" tone="white" eyebrow="FAQ" title="Questions we hear most">
        <FAQList faqs={ind.faqs} />
      </Section>

      <ContactCTA />
    </>
  );
}
