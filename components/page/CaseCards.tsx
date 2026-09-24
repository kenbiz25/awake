import Link from "next/link";
import { ArrowRight, Building2, HeartHandshake, Landmark } from "lucide-react";
import type { CaseSector, CaseStudy } from "@/lib/case-studies";

const SECTOR_ICON = { Government: Landmark, Enterprise: Building2, NGO: HeartHandshake } satisfies Record<CaseSector, unknown>;

/** Large proof card: headline metrics + quote, linking to the full case study. */
export function CaseHighlight({ study }: { study: CaseStudy }) {
  const Icon = SECTOR_ICON[study.sector];
  return (
    <article className="grid overflow-hidden rounded-[24px] bg-ink text-white lg:grid-cols-[1.1fr_1fr]">
      <div className="p-7 md:p-10">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold">
          <Icon className="h-3.5 w-3.5" aria-hidden /> {study.sector} · {study.client}
        </p>
        <h3 className="mt-6 font-display text-[28px] font-extrabold leading-[1] tracking-[-0.03em] md:text-[36px]">{study.title}</h3>
        <p className="mt-3 max-w-[460px] text-[14px] leading-[1.6] text-white/60">{study.summary}</p>
        {study.quote && (
          <blockquote className="mt-8 border-l-2 border-gold pl-5">
            <p className="font-serif text-[22px] italic leading-[1.25]">&ldquo;{study.quote.text}&rdquo;</p>
            <footer className="mt-3 text-[12px] font-semibold text-white/50">— {study.quote.who}</footer>
          </blockquote>
        )}
        <Link href={`/case-studies/${study.slug}`} className="btn mt-8 h-11 bg-white px-6 text-[14px] text-ink">
          Read the case study <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <dl className="grid grid-cols-2 gap-px bg-white/10">
        {study.metrics.map((m) => (
          <div key={m.label} className="flex flex-col justify-end bg-ink p-6 md:p-8">
            <dt className="order-2 mt-2 text-[11px] font-semibold uppercase tracking-widest text-white/45">{m.label}</dt>
            <dd className="order-1 font-display text-[28px] font-extrabold leading-none tracking-[-0.03em] md:text-[36px]">{m.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/** Compact card for grids of case studies. */
export function CaseCard({ study }: { study: CaseStudy }) {
  const Icon = SECTOR_ICON[study.sector];
  const [lead, ...rest] = study.metrics;
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col rounded-[24px] border border-ink/5 bg-white p-7 shadow-[0_1px_2px_rgba(10,15,30,0.04),0_8px_24px_rgba(10,15,30,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/[0.08]"
    >
      <p className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ink/10 bg-sky-mist px-2.5 py-1 text-[11px] font-semibold">
        <Icon className="h-3.5 w-3.5" aria-hidden /> {study.sector}
      </p>
      <p className="mt-6 font-display text-[44px] font-extrabold leading-none tracking-[-0.04em] text-earth">{lead.value}</p>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-ink/40">{lead.label}</p>
      <h3 className="mt-6 font-display text-[20px] font-extrabold leading-[1.15] tracking-[-0.02em]">{study.title}</h3>
      <p className="mt-2 flex-1 text-[13px] leading-[1.6] text-ink/60">{study.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {rest.slice(0, 2).map((m) => (
          <li key={m.label} className="rounded-full bg-sky-mist px-2.5 py-1 text-[11px] font-semibold text-ink/70">
            {m.value} <span className="font-normal text-ink/45">{m.label.toLowerCase()}</span>
          </li>
        ))}
      </ul>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold">
        Read case study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
