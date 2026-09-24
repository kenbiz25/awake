"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  Check,
  Lock,
  Mail,
  MessageCircle,
  RefreshCw,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  WifiOff,
  Zap,
} from "lucide-react";
import CountUp from "./CountUp";
import { CONTACT_HREF } from "@/lib/site";
import {
  award,
  countyRevenue,
  countyRevenueGrowthPct,
  dataVault,
  footprint,
  hrPlatform,
  retailMpesa,
  supportDesk,
} from "@/lib/case-studies";

const EASE = [0.22, 1, 0.36, 1] as const;

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ───────────────────────── Card shell ───────────────────────── */

type CardProps = {
  span: string;
  border?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Reveal motion lives on the wrapper, hover lift on the inner card —
 * framer's inline `transform` would otherwise override Tailwind's hover translate.
 */
function Card({ span, border = "border-ink/5", className = "", children }: CardProps) {
  return (
    <motion.div variants={rise} className={span}>
      <article
        className={`group relative h-full overflow-hidden rounded-[24px] border bg-white p-7 shadow-[0_1px_2px_rgba(10,15,30,0.04),0_8px_24px_rgba(10,15,30,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/[0.08] ${border} ${className}`}
      >
        {children}
      </article>
    </motion.div>
  );
}

function IconBadge({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${className}`} aria-hidden>
      {children}
    </span>
  );
}

function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${className}`}>
      {children}
    </span>
  );
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold uppercase tracking-widest text-ink/40">{children}</p>
);

/* ───────────────────────── Visuals ───────────────────────── */

function BeforeAfterChart() {
  const beforePct = (countyRevenue.before / countyRevenue.after) * 100;
  const bars = [
    { label: "Before", sub: "Manual", pct: beforePct, value: countyRevenue.before / 1e6, tone: "bg-ink/15" },
    { label: "After", sub: "Automated", pct: 100, value: countyRevenue.after / 1e6, tone: "bg-water" },
  ];

  return (
    <figure
      aria-label={`Revenue collected rose from KES ${countyRevenue.before / 1e6} million with manual collection to KES ${countyRevenue.after / 1e6} million automated, a ${countyRevenueGrowthPct}% increase.`}
      className="relative flex h-full min-h-[300px] flex-col rounded-[20px] bg-sky-soft p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <Eyebrow>Revenue collected</Eyebrow>
        <Pill className="bg-gold text-[12px] font-bold text-ink">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden /> +{countyRevenueGrowthPct}%
        </Pill>
      </div>

      <div aria-hidden className="relative mt-6 flex flex-1 items-end gap-4 border-b border-dashed border-ink/15 px-2">
        {bars.map((b, i) => (
          <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end">
            <span className={`mb-2 font-display text-[18px] font-extrabold tracking-[-0.02em] ${i ? "text-ink" : "text-ink/50"}`}>
              KES {b.value}M
            </span>
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.2, ease: EASE }}
              style={{ height: `${b.pct}%` }}
              className={`w-full max-w-[88px] origin-bottom rounded-t-[12px] ${b.tone}`}
            />
          </div>
        ))}
      </div>

      <div aria-hidden className="mt-3 flex gap-4 px-2">
        {bars.map((b) => (
          <div key={b.label} className="flex-1 text-center">
            <p className="text-[12px] font-semibold">{b.label}</p>
            <p className="text-[11px] text-ink/50">{b.sub}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}

const FEED = [
  { code: "SIK4H7TQ2", branch: "Westlands", amount: 1250 },
  { code: "SIK4H9XB7", branch: "Kisumu", amount: 640 },
  { code: "SIK4J2MC5", branch: "Mombasa", amount: 3400 },
  { code: "SIK4J6RW1", branch: "Eldoret", amount: 980 },
  { code: "SIK4K1DP8", branch: "Nakuru", amount: 2150 },
  { code: "SIK4K5LV3", branch: "Thika", amount: 470 },
  { code: "SIK4L0NZ6", branch: "Nyali", amount: 1890 },
  { code: "SIK4L3GE9", branch: "Karen", amount: 5200 },
];

/** Settlement ticker: cycles only while on screen, never for reduced-motion users. */
function SettlementFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [head, setHead] = useState(2);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setHead((n) => n + 1), 2400);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const rows = [head, head - 1, head - 2];

  return (
    <div ref={ref} className="rounded-[16px] border border-ink/5 bg-sky-mist p-3">
      <div className="flex items-center justify-between px-1 pb-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-ink/40">Settlement feed</p>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-earth">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden /> Live
        </span>
      </div>
      <ul aria-hidden className="relative space-y-1.5">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((k) => {
            const tx = FEED[((k % FEED.length) + FEED.length) % FEED.length];
            return (
              <motion.li
                key={k}
                layout
                initial={{ opacity: 0, y: -14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex items-center justify-between gap-3 rounded-[12px] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(10,15,30,0.05)]"
              >
                <div className="min-w-0">
                  <p className="truncate font-mono text-[11px] font-semibold">{tx.code}</p>
                  <p className="text-[11px] text-ink/50">{tx.branch}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-[13px] font-semibold tabular-nums">KES {tx.amount.toLocaleString("en-KE")}</span>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-earth text-white">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function ResponseChart() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const data = supportDesk.lastSevenDays;
  const max = 16;
  const avg = supportDesk.avgFirstReplyMin;

  return (
    <figure
      aria-label={`Average first reply over the last 7 days ranged from ${Math.min(...data)} to ${Math.max(...data)} minutes, averaging ${avg} minutes.`}
      className="flex h-full min-h-[260px] flex-col rounded-[20px] bg-sky-soft p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <Eyebrow>First reply · last 7 days</Eyebrow>
        <span className="flex shrink-0 items-center gap-3 whitespace-nowrap text-[11px] text-ink/50">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-water" /> ≤ avg</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ink/20" /> above</span>
        </span>
      </div>

      <div aria-hidden className="relative mt-8 flex flex-1 items-end gap-2 border-b border-ink/10 sm:gap-3">
        <div className="absolute inset-x-0 border-t border-dashed border-water/60" style={{ bottom: `${(avg / max) * 100}%` }}>
          <span className="absolute -top-3 right-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-water shadow-sm">
            avg {avg} min
          </span>
        </div>
        {data.map((v, i) => {
          const pct = (v / max) * 100;
          return (
            <div key={i} className="group/bar relative flex h-full flex-1 items-end">
              <span
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-ink px-1.5 py-0.5 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover/bar:opacity-100"
                style={{ bottom: `calc(${pct}% + 6px)` }}
              >
                {v}m
              </span>
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                style={{ height: `${pct}%` }}
                className={`w-full origin-bottom rounded-t-[8px] transition-colors ${v <= avg ? "bg-water" : "bg-ink/15 group-hover/bar:bg-ink/25"}`}
              />
            </div>
          );
        })}
      </div>
      <div aria-hidden className="mt-2 flex gap-2 sm:gap-3">
        {days.map((d, i) => (
          <span key={i} className="flex-1 text-center text-[10px] font-medium text-ink/40">{d}</span>
        ))}
      </div>
    </figure>
  );
}

/** Masked record: shows encryption visually without faking readable personal data. */
function VaultRecord() {
  const fields = [
    { label: "Name", widths: ["w-14", "w-20"] },
    { label: "Phone", widths: ["w-10", "w-16"] },
    { label: "ID No.", widths: ["w-24"] },
  ];
  return (
    <div aria-hidden className="rounded-[16px] border border-ink/5 bg-sky-mist p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] font-semibold">Beneficiary #4281</p>
        <Lock className="h-3.5 w-3.5 text-earth" />
      </div>
      <div className="mt-3 space-y-2">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center gap-3">
            <span className="w-12 text-[11px] text-ink/40">{f.label}</span>
            <span className="flex gap-1.5">
              {f.widths.map((w, i) => (
                <span key={i} className={`h-2.5 rounded-full bg-ink/10 ${w}`} />
              ))}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold">
        <span className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-ink/60">
          <WifiOff className="h-3 w-3" /> Collected offline
        </span>
        <ArrowRight className="h-3 w-3 text-ink/30" />
        <span className="flex items-center gap-1 rounded-full bg-earth-soft px-2 py-1 text-earth">
          <RefreshCw className="h-3 w-3" /> Synced
        </span>
      </div>
    </div>
  );
}

/* ───────────────────────── Section ───────────────────────── */

export default function CaseBento() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="cases" aria-labelledby="cases-title" className="section-cascade bg-white">
        <div className="container-x py-16 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 lg:flex-row lg:items-end">
            <div className="max-w-[720px]">
              <h2 id="cases-title" className="text-[36px] leading-[0.92] md:text-[64px] md:leading-[0.9]">
                Real systems. Real numbers.
              </h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-ink/60 md:text-[18px]">
                We don&apos;t show dribbble shots. We show revenue, hours saved, uptime.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Pill className="border border-ink/10 bg-sky-mist px-3 py-1.5 text-[12px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden /> {footprint.counties} counties live
              </Pill>
              <Pill className="border border-ink/10 bg-sky-mist px-3 py-1.5 text-[12px]">{footprint.companies}+ companies</Pill>
              <Link
                href="/case-studies"
                className="ml-1 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors hover:text-water"
              >
                All case studies <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>

          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-12 gap-4"
          >
            {/* 1 · County Revenue — hero case */}
            <Card span="col-span-12 lg:col-span-8">
              <div className="grid h-full gap-8 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px]">
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill className="bg-gold font-bold tracking-wide text-ink">{countyRevenue.sector.toUpperCase()}</Pill>
                    <Pill className="border border-emerald-200 bg-emerald-50 text-emerald-700">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden /> Live in production
                    </Pill>
                  </div>

                  <h3 className="mt-6 font-display text-[28px] font-extrabold leading-[1] tracking-[-0.03em] md:text-[36px]">
                    {countyRevenue.title}
                  </h3>
                  <p className="mt-3 max-w-[420px] text-[14px] leading-[1.6] text-ink/60">{countyRevenue.summary}</p>

                  <dl className="mt-6 grid max-w-[420px] grid-cols-2 overflow-hidden rounded-[16px] border border-ink/10">
                    <div className="p-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-widest text-ink/40">Before</dt>
                      <dd className="mt-1 font-display text-[20px] font-extrabold tracking-[-0.02em] text-ink/50 line-through decoration-ink/30">
                        KES {countyRevenue.before / 1e6}M
                      </dd>
                      <dd className="text-[12px] text-ink/50">manual</dd>
                    </div>
                    <div className="border-l border-ink/10 bg-sky-mist p-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-widest text-water">After</dt>
                      <dd className="mt-1 font-display text-[20px] font-extrabold tracking-[-0.02em]">
                        KES {countyRevenue.after / 1e6}M
                      </dd>
                      <dd className="text-[12px] text-ink/50">automated · {countyRevenue.months} months</dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {countyRevenue.rails.map((r) => (
                      <Pill key={r} className="border border-ink/10 bg-white px-3 py-1.5 text-[12px] font-medium">
                        {r}
                      </Pill>
                    ))}
                  </div>

                  <div className="mt-8 md:mt-auto md:pt-8">
                    <Link href={countyRevenue.href} className="btn h-11 bg-ink px-6 text-[14px] text-white">
                      View Case <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
                <BeforeAfterChart />
              </div>
            </Card>

            {/* 2 · Retail M-Pesa */}
            <Card span="col-span-12 md:col-span-6 lg:col-span-4" className="flex flex-col">
              <div className="flex items-center justify-between">
                <IconBadge className="bg-ink text-gold"><Zap className="h-5 w-5" /></IconBadge>
                <Pill className="border border-ink/10 bg-sky-mist">{retailMpesa.branches} branches</Pill>
              </div>
              <h3 className="mt-6 font-display text-[22px] font-extrabold leading-[1.1] tracking-[-0.02em]">{retailMpesa.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.5] text-ink/60">{retailMpesa.summary}</p>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.04em]">
                  <CountUp end={retailMpesa.transactionsMillions} suffix="M" />
                </span>
                <span className="text-[13px] font-semibold text-ink/50">transactions</span>
              </p>
              <div className="mt-5">
                <SettlementFeed />
              </div>
              <div className="mt-5 lg:mt-auto lg:pt-5">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-ink/50">Success rate</span>
                  <span className="font-semibold tabular-nums">{retailMpesa.successRate}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/5">
                  <div className="h-full rounded-full bg-earth" style={{ width: `${retailMpesa.successRate}%` }} />
                </div>
              </div>
            </Card>

            {/* 3 · HR Platform */}
            <Card span="col-span-12 md:col-span-6 lg:col-span-4" className="flex flex-col">
              <div className="flex items-center justify-between">
                <IconBadge className="bg-sky text-ink"><Users className="h-5 w-5" /></IconBadge>
                <Pill className="border border-ink/10 bg-sky-mist">{hrPlatform.staff} staff</Pill>
              </div>
              <h3 className="mt-6 font-display text-[22px] font-extrabold leading-[1.1] tracking-[-0.02em]">
                {hrPlatform.title} — {hrPlatform.staff} staff
              </h3>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.04em] text-earth">
                  <CountUp end={hrPlatform.hoursSavedWeekly} suffix=" hrs" />
                </span>
                <span className="text-[13px] font-semibold text-ink/50">saved every week</span>
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {hrPlatform.modules.map((m) => (
                  <li key={m}>
                    <Pill className="bg-earth-soft text-earth">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden /> {m}
                    </Pill>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-3 lg:mt-auto lg:pt-6">
                <div className="flex -space-x-2" aria-hidden>
                  {[
                    ["JM", "bg-ink text-white"],
                    ["BO", "bg-water text-white"],
                    ["AH", "bg-earth text-white"],
                    ["PK", "bg-gold text-ink"],
                  ].map(([initials, tone]) => (
                    <span key={initials} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold ${tone}`}>
                      {initials}
                    </span>
                  ))}
                </div>
                <p className="text-[12px] text-ink/50">
                  +{hrPlatform.staff - 4} more · {hrPlatform.summary}
                </p>
              </div>
            </Card>

            {/* 4 · Award — gold border */}
            <Card span="col-span-12 md:col-span-6 lg:col-span-4" border="border-gold/70" className="flex flex-col">
              <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-[50px]" />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -right-2 select-none font-display text-[120px] font-extrabold leading-none tracking-[-0.06em] text-gold/15"
              >
                {award.year}
              </span>
              {/* hover sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
              />
              <div className="relative">
                <IconBadge className="bg-gold text-ink"><Award className="h-5 w-5" /></IconBadge>
                <div className="mt-8">
                  <Eyebrow>Awarded</Eyebrow>
                  <h3 className="mt-2 font-serif text-[30px] italic leading-[1.05]">
                    {award.title} {award.year}
                  </h3>
                  <div className="mt-4 flex gap-1" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] text-gold">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* 5 · NGO Data Vault */}
            <Card span="col-span-12 md:col-span-6 lg:col-span-4" className="flex flex-col">
              <div className="flex items-center justify-between">
                <IconBadge className="bg-earth-soft text-earth"><Shield className="h-5 w-5" /></IconBadge>
                <div className="flex gap-1.5">
                  {dataVault.compliance.map((c) => (
                    <Pill key={c} className="bg-ink text-white">
                      <Lock className="h-3 w-3" aria-hidden /> {c}
                    </Pill>
                  ))}
                </div>
              </div>
              <h3 className="mt-6 font-display text-[22px] font-extrabold leading-[1.1] tracking-[-0.02em]">{dataVault.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.5] text-ink/60">{dataVault.summary}</p>
              <div className="mt-5 lg:mt-auto lg:pt-5">
                <VaultRecord />
              </div>
            </Card>

            {/* 6 · SupportDesk */}
            <Card span="col-span-12 lg:col-span-8">
              <div className="grid h-full gap-8 md:grid-cols-[1fr_1.1fr]">
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <IconBadge className="bg-water text-white"><BarChart3 className="h-5 w-5" /></IconBadge>
                    <Pill className="ml-1 border border-emerald-200 bg-emerald-50 text-emerald-700">{supportDesk.slaUptime}% SLA</Pill>
                    <Pill className="bg-ink font-bold tracking-wide text-white">ENTERPRISE</Pill>
                  </div>
                  <h3 className="mt-6 font-display text-[28px] font-extrabold leading-[1] tracking-[-0.03em]">{supportDesk.title}</h3>
                  <p className="mt-2 max-w-[360px] text-[14px] leading-[1.6] text-ink/60">{supportDesk.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      { c: supportDesk.channels[0], Icon: MessageCircle },
                      { c: supportDesk.channels[1], Icon: Mail },
                      { c: supportDesk.channels[2], Icon: Smartphone },
                    ].map(({ c, Icon }) => (
                      <Pill key={c} className="border border-ink/10 bg-white px-3 py-1.5 text-[12px] font-medium">
                        <Icon className="h-3.5 w-3.5" aria-hidden /> {c}
                      </Pill>
                    ))}
                  </div>
                  <dl className="mt-8 grid grid-cols-3 gap-3 md:mt-auto md:pt-8">
                    {[
                      { k: "Avg first reply", v: <CountUp end={supportDesk.avgFirstReplyMin} suffix=" min" /> },
                      { k: "Uptime SLA", v: <CountUp end={supportDesk.slaUptime} decimals={1} suffix="%" /> },
                      { k: "Tickets / week", v: <CountUp end={supportDesk.ticketsPerWeek} /> },
                    ].map((s) => (
                      <div key={s.k} className="flex flex-col">
                        <dt className="order-2 mt-1 text-[10px] font-semibold uppercase tracking-widest text-ink/40 sm:text-[11px]">{s.k}</dt>
                        <dd className="order-1 font-display text-[20px] font-extrabold tracking-[-0.02em] sm:text-[24px]">{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <ResponseChart />
              </div>
            </Card>

            {/* 7 · CTA — closes the 12-col grid */}
            <motion.div variants={rise} className="col-span-12 lg:col-span-4">
              <div className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[24px] bg-water p-7 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-water/30">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_75%)]"
                />
                <div className="relative">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">The next case study</p>
                  <h3 className="mt-3 font-display text-[30px] font-extrabold leading-[1] tracking-[-0.03em]">Your system is next.</h3>
                  <p className="mt-3 max-w-[300px] text-[14px] leading-[1.6] text-white/70">
                    Tell us what&apos;s broken. We&apos;ll audit it in 45 minutes and show you the numbers.
                  </p>
                </div>
                <div className="relative mt-8">
                  <Link href={CONTACT_HREF} className="btn h-11 bg-white px-6 text-[14px] text-ink">
                    Start your project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
