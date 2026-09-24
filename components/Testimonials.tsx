import Link from "next/link";
import { ArrowRight, Award, Building2, HeartHandshake, Landmark, type LucideIcon } from "lucide-react";
import { countyRevenue, countyRevenueGrowthPct, hrPlatform, retailMpesa } from "@/lib/case-studies";

type Testimonial = {
  industry: string;
  Icon: LucideIcon;
  quote: string;
  name: string;
  org: string;
  metric: string;
  metricSub: string;
  href: string;
  cta: string;
};

// Metrics are derived from lib/case-studies so quotes can never contradict the case cards
const TESTIMONIALS: Testimonial[] = [
  {
    industry: "Government",
    Icon: Landmark,
    quote: `We moved from KES ${countyRevenue.before / 1e6}M to KES ${countyRevenue.after / 1e6}M in ${countyRevenue.months} months. Awake automated everything — no leaks.`,
    name: "County Finance Lead",
    org: "County Government",
    metric: `+${countyRevenueGrowthPct}%`,
    metricSub: `revenue · ${countyRevenue.months} months`,
    href: "/industries/government",
    cta: "Solutions for government",
  },
  {
    industry: "Enterprise",
    Icon: Building2,
    quote: `${retailMpesa.transactionsMillions} million M-Pesa transactions reconciled automatically. My finance team sleeps now.`,
    name: "CFO, Retail Chain",
    org: `${retailMpesa.branches} branches`,
    metric: `${retailMpesa.successRate}%`,
    metricSub: "M-Pesa success rate",
    href: "/industries/enterprise",
    cta: "Solutions for enterprise",
  },
  {
    industry: "NGO",
    Icon: HeartHandshake,
    quote: `Leave, payroll, per diem — one system. We saved ${hrPlatform.hoursSavedWeekly} hours every single week.`,
    name: "HR Director",
    org: `${hrPlatform.staff}-staff NGO`,
    metric: `${hrPlatform.hoursSavedWeekly} hrs`,
    metricSub: "saved every week",
    href: "/industries/ngo",
    cta: "Solutions for NGOs",
  },
];

export default function Testimonials() {
  return (
    <section id="industries" aria-labelledby="testimonials-title" className="section-cascade overflow-hidden bg-white">
      <div className="container-x py-16 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-widest text-ink/40">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white" aria-hidden>
                <Award className="h-4 w-4" />
              </span>
              What leaders say
            </p>
            <h2 id="testimonials-title" className="mt-5 max-w-[560px] text-[32px] leading-[0.92] md:text-[52px] md:leading-[0.9]">
              Trusted by government, enterprise and NGOs
            </h2>
          </div>
          <p className="max-w-[340px] text-[14px] leading-[1.6] text-ink/60">
            Different sectors, same standard: measurable results inside a year.
          </p>
        </div>

        <ul className="scrollbar-none -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-6 pt-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:p-0">
          {TESTIMONIALS.map((t) => (
            <li key={t.industry} className="w-[86%] shrink-0 snap-start md:w-auto">
              <figure className="group flex h-full flex-col rounded-[24px] border border-ink/10 bg-sky-mist p-7 transition-transform duration-300 hover:-translate-y-1 md:p-8">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ink/10 bg-white px-2.5 py-1 text-[11px] font-semibold">
                  <t.Icon className="h-3.5 w-3.5" aria-hidden /> {t.industry}
                </span>

                <blockquote className="mt-6 flex-1 font-serif text-[24px] italic leading-[1.2] md:text-[26px]">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>

                <figcaption className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-5 xl:flex-row xl:items-end xl:justify-between xl:gap-4">
                  <div>
                    <p className="text-[13px] font-semibold">{t.name}</p>
                    <p className="text-[12px] text-ink/50">{t.org}</p>
                  </div>
                  <div className="xl:text-right">
                    <p className="font-display text-[20px] font-extrabold leading-none tracking-[-0.02em] text-earth">{t.metric}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-ink/40">{t.metricSub}</p>
                  </div>
                </figcaption>

                <Link
                  href={t.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors hover:text-water"
                >
                  {t.cta} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
