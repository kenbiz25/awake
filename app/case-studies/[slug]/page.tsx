import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import PageHero, { HeroStat } from "@/components/page/PageHero";
import { GhostButton, LinkCardItem, PrimaryButton, Section } from "@/components/page/blocks";
import { CaseCard } from "@/components/page/CaseCards";
import ContactCTA from "@/components/ContactCTA";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { getSolution } from "@/lib/solutions";
import { CONTACT_HREF } from "@/lib/site";
import { leadSentence } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  const lead = c.metrics[0];
  return pageMetadata({
    title: `${c.title}: ${lead.value} ${lead.label.toLowerCase()}`,
    description: c.summary,
    path: `/case-studies/${c.slug}`,
    type: "article",
  });
}

export default function CaseStudyPage({ params }: Params) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();
  const path = `/case-studies/${c.slug}`;
  const solution = getSolution(c.solution);
  const others = CASE_STUDIES.filter((o) => o.slug !== c.slug).slice(0, 2);
  const [lead, ...metrics] = c.metrics;

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: c.title, href: path },
        ]}
        eyebrow={`${c.sector} · ${c.client}`}
        title={c.title}
        intro={c.summary}
        actions={
          <>
            <PrimaryButton href={CONTACT_HREF}>Get results like this</PrimaryButton>
            {solution && <GhostButton href={`/solutions/${solution.slug}`}>About {solution.name}</GhostButton>}
          </>
        }
        aside={<HeroStat value={lead.value} label={lead.label} />}
      />

      <Section id="numbers" tone="white" eyebrow="The numbers" title="What changed">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {[lead, ...metrics].map((m, i) => (
            <div key={m.label} className={`flex flex-col rounded-[24px] p-6 md:p-7 ${i === 0 ? "bg-earth text-white" : "border border-ink/5 bg-sky-mist"}`}>
              <dt className={`order-2 mt-2 text-[11px] font-semibold uppercase tracking-widest ${i === 0 ? "text-white/60" : "text-ink/40"}`}>{m.label}</dt>
              <dd className="order-1 font-display text-[28px] font-extrabold leading-none tracking-[-0.03em] md:text-[36px]">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="story" tone="soft" eyebrow="The story" title="Challenge, approach, results">
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <article className="rounded-[24px] border border-ink/5 bg-white p-7">
            <h3 className="text-[12px] font-semibold uppercase tracking-widest text-ink/40">The challenge</h3>
            <p className="mt-4 text-[15px] leading-[1.7] text-ink/75">{c.challenge}</p>
          </article>
          <article className="rounded-[24px] border border-ink/5 bg-white p-7">
            <h3 className="text-[12px] font-semibold uppercase tracking-widest text-ink/40">What we did</h3>
            <ol className="mt-4 space-y-4">
              {c.approach.map((a, i) => (
                <li key={a} className="flex gap-3 text-[14px] leading-[1.6] text-ink/75">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">{i + 1}</span>
                  {a}
                </li>
              ))}
            </ol>
          </article>
          <article className="rounded-[24px] bg-ink p-7 text-white">
            <h3 className="text-[12px] font-semibold uppercase tracking-widest text-white/50">The results</h3>
            <ul className="mt-4 space-y-4">
              {c.results.map((r) => (
                <li key={r} className="flex gap-3 text-[14px] leading-[1.6] text-white/85">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-ink" aria-hidden>
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </article>
        </div>

        {c.quote && (
          <figure className="mx-auto mt-12 max-w-[860px] text-center md:mt-16">
            <blockquote className="font-serif text-[28px] italic leading-[1.2] md:text-[40px]">&ldquo;{c.quote.text}&rdquo;</blockquote>
            <figcaption className="mt-5 text-[13px] font-semibold text-ink/50">— {c.quote.who}, {c.client}</figcaption>
          </figure>
        )}
      </Section>

      <Section id="next" tone="white" eyebrow="Keep reading" title="More from our work">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {solution && (
            <LinkCardItem
              title={`The solution: ${solution.name}`}
              desc={leadSentence(solution.metaDescription)}
              href={`/solutions/${solution.slug}`}
              Icon={solution.Icon}
            />
          )}
          {others.map((o) => (
            <CaseCard key={o.slug} study={o} />
          ))}
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
