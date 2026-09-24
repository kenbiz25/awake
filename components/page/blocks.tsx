import Link from "next/link";
import { ArrowRight, Plus, type LucideIcon } from "lucide-react";
import JsonLd from "./JsonLd";
import { faqSchema, type Faq } from "@/lib/schema";

/* ─────────────── Section shell ─────────────── */

const TONES = {
  white: "bg-white",
  soft: "bg-sky-soft",
  mist: "bg-sky-mist",
  sky: "bg-sky",
} as const;

type SectionProps = {
  id?: string;
  tone?: keyof typeof TONES;
  eyebrow?: string;
  title: string;
  intro?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
};

/** Cascading content section with the locked container + heading pattern. */
export function Section({ id, tone = "white", eyebrow, title, intro, aside, children }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`section-cascade ${TONES[tone]}`}>
      <div className="container-x py-16 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 lg:flex-row lg:items-end">
          <div className="max-w-[720px]">
            {eyebrow && <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-ink/40">{eyebrow}</p>}
            <h2 id={headingId} className="text-[32px] leading-[0.95] md:text-[48px] md:leading-[0.92]">
              {title}
            </h2>
            {intro && <p className="mt-4 max-w-[560px] text-[15px] leading-[1.6] text-ink/60 md:text-[16px]">{intro}</p>}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
}

/* ─────────────── Feature cards ─────────────── */

export type Feature = { title: string; desc: string; Icon: LucideIcon };

const ICON_TONES = ["bg-water text-white", "bg-earth text-white", "bg-gold text-ink"];

export function FeatureCards({ items }: { items: Feature[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
      {items.map(({ title, desc, Icon }, i) => (
        <li
          key={title}
          className="rounded-[24px] border border-ink/5 bg-white p-7 shadow-[0_1px_2px_rgba(10,15,30,0.04),0_8px_24px_rgba(10,15,30,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/[0.08]"
        >
          <span className={`flex h-11 w-11 items-center justify-center rounded-full ${ICON_TONES[i % ICON_TONES.length]}`} aria-hidden>
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="mt-6 font-display text-[20px] font-extrabold leading-[1.15] tracking-[-0.02em]">{title}</h3>
          <p className="mt-3 text-[14px] leading-[1.6] text-ink/60">{desc}</p>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────── Process steps ─────────────── */

export type Step = { title: string; desc: string; when?: string };

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {/* connector (desktop) */}
      <span aria-hidden className="absolute left-[10%] right-[10%] top-[27px] hidden h-px bg-ink/10 lg:block" />
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-[24px] border border-ink/5 bg-white p-7">
          <div className="flex items-center justify-between">
            <span className="relative flex h-[34px] w-[34px] items-center justify-center rounded-full bg-ink font-display text-[14px] font-extrabold text-white">
              {i + 1}
            </span>
            {s.when && <span className="rounded-full bg-sky-soft px-2.5 py-1 text-[11px] font-semibold text-ink/60">{s.when}</span>}
          </div>
          <h3 className="mt-5 font-display text-[18px] font-extrabold tracking-[-0.02em]">{s.title}</h3>
          <p className="mt-2 text-[14px] leading-[1.6] text-ink/60">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

/* ─────────────── FAQ (no JS, with FAQPage schema) ─────────────── */

export function FAQList({ faqs }: { faqs: Faq[] }) {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <div className="mx-auto max-w-[880px] divide-y divide-ink/10 rounded-[24px] border border-ink/10 bg-white">
        {faqs.map((f, i) => (
          <details key={f.q} className="group" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 md:px-8 md:py-6 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-[17px] font-extrabold leading-[1.3] tracking-[-0.02em] md:text-[19px]">{f.q}</h3>
              <span
                aria-hidden
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-soft transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white"
              >
                <Plus className="h-4 w-4" />
              </span>
            </summary>
            <p className="-mt-1 px-6 pb-6 text-[15px] leading-[1.7] text-ink/65 md:px-8">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}

/* ─────────────── Link cards (related solutions / industries) ─────────────── */

export type LinkCard = { title: string; desc: string; href: string; Icon?: LucideIcon; meta?: string };

export function LinkCardItem({ title, desc, href, Icon, meta, dark = false }: LinkCard & { dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col rounded-[24px] border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        dark ? "border-white/10 bg-white/[0.06] text-white hover:shadow-black/30" : "border-ink/10 bg-sky-mist hover:shadow-ink/[0.08]"
      }`}
    >
      <div className="flex items-center justify-between">
        {Icon && (
          <span className={`flex h-10 w-10 items-center justify-center rounded-full ${dark ? "bg-white/10" : "bg-white shadow-sm"}`} aria-hidden>
            <Icon className="h-5 w-5" />
          </span>
        )}
        {meta && <span className="rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-ink">{meta}</span>}
      </div>
      <h3 className="mt-6 font-display text-[19px] font-extrabold leading-[1.15] tracking-[-0.02em]">{title}</h3>
      <p className={`mt-2 flex-1 text-[13px] leading-[1.6] ${dark ? "text-white/60" : "text-ink/60"}`}>{desc}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold">
        Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

export function LinkCards({ items, dark = false }: { items: LinkCard[]; dark?: boolean }) {
  return (
    <ul className={`grid gap-4 md:gap-6 ${items.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
      {items.map((item) => (
        <li key={item.href}>
          <LinkCardItem {...item} dark={dark} />
        </li>
      ))}
    </ul>
  );
}

/* ─────────────── Hero buttons ─────────────── */

export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn h-12 bg-white px-7 text-[15px] text-ink">
      {children} <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

export function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="btn h-12 border border-white/15 bg-white/10 px-7 text-[15px] font-medium text-white backdrop-blur hover:bg-white/15"
    >
      {children}
    </Link>
  );
}
