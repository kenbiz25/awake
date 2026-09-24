"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, BarChart3, Check, ChevronDown, Clock, TrendingUp, Zap } from "lucide-react";
import { CONTACT_HREF } from "@/lib/site";
import { kes } from "@/lib/format";

const MIN = 10;
const MAX = 100;

// yearly = hours × 21,250  ⇔  KES 850/hr × 50 working weeks × 50% of lost hours automated
const COST_PER_HOUR = 850;
const WORKING_WEEKS = 50;
const AUTOMATION_SHARE = 0.5;
const YEARLY_PER_WEEKLY_HOUR = COST_PER_HOUR * WORKING_WEEKS * AUTOMATION_SHARE; // 21,250

const SPLIT = [
  { key: "Manual entry", share: 0.42 },
  { key: "Reconciling", share: 0.35 },
  { key: "Follow-ups", share: 0.23 },
];

const benefits = [
  "Automated M-Pesa & bank reconciliation",
  "No double-entry — single source of truth",
  "Audit-ready reports for KRA / donors",
];

export default function ROICalculator() {
  const [hours, setHours] = useState(40);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const sliderId = useId();
  const breakdownId = useId();

  const yearly = hours * YEARLY_PER_WEEKLY_HOUR;
  const threeYear = yearly * 3;
  const hoursBack = Math.round(hours * AUTOMATION_SHARE);
  const hoursBackYearly = hoursBack * WORKING_WEEKS;
  const workWeeksBack = Math.round(hoursBackYearly / 40);
  const fill = ((hours - MIN) / (MAX - MIN)) * 100;

  return (
    <section id="roi" aria-labelledby="roi-title" className="section-cascade overflow-hidden bg-sky-soft">
      <div className="container-x py-16 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-12 lg:flex-row lg:items-end">
          <h2 id="roi-title" className="text-[36px] leading-[0.95] md:text-[56px]">
            Build more, spend less!
          </h2>
          <p className="max-w-[380px] text-[15px] leading-[1.6] text-ink/60">
            Calculate how much you lose to manual work every week. We automate it and you keep the margin.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT — input */}
          <div className="flex flex-col rounded-[24px] border border-ink/[0.06] bg-white p-6 shadow-[0_12px_40px_rgba(10,15,30,0.06)] sm:p-7 md:p-10">
            <div className="mb-10 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky">
                  <Clock className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-widest text-ink/40">Weekly waste audit</p>
                  <label htmlFor={sliderId} className="mt-1 block font-display text-[18px] font-extrabold leading-[1.15] tracking-[-0.02em] md:text-[20px]">
                    How many staff hours lost weekly?
                  </label>
                </div>
              </div>
              <div className="hidden shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-sky-soft px-3 py-1.5 text-[13px] font-semibold md:flex">
                <Activity className="h-4 w-4" aria-hidden /> Live estimate
              </div>
            </div>

            <div className="mb-6 flex items-end justify-between gap-4">
              <p className="font-display text-[64px] font-extrabold leading-[0.9] tracking-[-0.04em] tabular-nums md:text-[72px]">
                {hours}
                <span className="ml-2 text-[28px] text-ink/30 md:text-[32px]">hrs</span>
              </p>
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-ink/40 md:text-[12px]">Cost / hour</p>
                <p className="text-[15px] font-semibold">KES {kes(COST_PER_HOUR)} blended</p>
              </div>
            </div>

            <input
              id={sliderId}
              type="range"
              min={MIN}
              max={MAX}
              step={1}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              aria-valuetext={`${hours} hours per week`}
              className="range-awake"
              style={{ "--fill": `${fill}%` } as React.CSSProperties}
            />
            <div className="mt-4 flex justify-between text-[12px] font-medium text-ink/40">
              <span>10 hrs — lean team</span>
              <span>100 hrs — enterprise chaos</span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 lg:mb-8">
              {SPLIT.map((s) => (
                <div key={s.key} className="rounded-[16px] border border-ink/5 bg-sky-mist p-3 sm:p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-ink/40 sm:text-[11px]">{s.key}</p>
                  <p className="mt-1 font-display text-[16px] font-extrabold tabular-nums sm:text-[18px]">
                    {Math.round(hours * s.share)} hrs
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-[16px] bg-sky p-4 lg:mt-auto">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white" aria-hidden>
                <TrendingUp className="h-5 w-5 text-water" />
              </span>
              <p className="text-[13px] leading-[1.5] text-ink/70">
                That&apos;s <span className="font-semibold text-ink tabular-nums">{kes(hoursBackYearly)} staff hours</span> back every
                year — about <span className="font-semibold text-ink tabular-nums">{workWeeksBack} working weeks</span> your team
                spends on real work instead.
              </p>
            </div>
          </div>

          {/* RIGHT — result */}
          <div className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[24px] bg-earth p-6 text-white sm:p-7 md:p-10">
            <div aria-hidden className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-white/[0.07]" />
            <div aria-hidden className="absolute -right-10 top-20 h-[200px] w-[200px] rounded-full bg-gold/20 blur-[40px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest">
                <Zap className="h-3.5 w-3.5 text-gold" aria-hidden /> Awake Automation ROI
              </div>

              <div className="mt-8" aria-live="polite">
                <p className="font-display text-[clamp(34px,9vw,56px)] font-extrabold leading-[0.95] tracking-[-0.03em] tabular-nums">
                  <span className="mr-2 text-[0.5em] text-white/70">KES</span>
                  {kes(yearly)}
                </p>
                <p className="mt-2 text-[13px] font-semibold uppercase tracking-widest text-white/60">Extra saved yearly</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1.5 text-[13px] font-bold text-ink">
                  <TrendingUp className="h-4 w-4" aria-hidden /> {hoursBack} staff hours back every week
                </div>
              </div>

              <div className="mt-8 rounded-[16px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold uppercase tracking-widest text-white/60">Over 3 years</p>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-ink">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </div>
                <p className="mt-2 font-display text-[26px] font-extrabold tracking-[-0.02em] tabular-nums md:text-[28px]">
                  KES {kes(threeYear)}
                </p>
                <p className="mt-2 text-[13px] leading-[1.5] text-white/60">
                  when you replace manual reconciliation, double-entry and WhatsApp follow-ups with Awake Pay + HR +
                  SupportDesk.
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {benefits.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[13px] text-white/80">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowBreakdown((v) => !v)}
                aria-expanded={showBreakdown}
                aria-controls={breakdownId}
                className="btn h-11 border border-white/25 bg-transparent px-6 text-[14px] text-white hover:bg-white/10"
              >
                <BarChart3 className="h-4 w-4" aria-hidden /> Full Breakdown
                <ChevronDown className={`h-4 w-4 transition-transform ${showBreakdown ? "rotate-180" : ""}`} aria-hidden />
              </button>
              <Link href={CONTACT_HREF} className="btn h-11 bg-white px-6 text-[14px] text-ink">
                Book Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Full breakdown */}
        <AnimatePresence initial={false}>
          {showBreakdown && (
            <motion.div
              id={breakdownId}
              key="breakdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-[24px] border border-ink/[0.06] bg-white p-6 sm:p-7 md:p-10">
                <h3 className="font-display text-[20px] font-extrabold tracking-[-0.02em] md:text-[24px]">
                  Where the KES {kes(yearly)} comes from
                </h3>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[480px] text-left text-[14px]">
                    <thead>
                      <tr className="border-b border-ink/10 text-[11px] uppercase tracking-widest text-ink/40">
                        <th scope="col" className="pb-3 font-semibold">Lost work</th>
                        <th scope="col" className="pb-3 text-right font-semibold">Hrs / week</th>
                        <th scope="col" className="pb-3 text-right font-semibold">Saved / month</th>
                        <th scope="col" className="pb-3 text-right font-semibold">Saved / year</th>
                      </tr>
                    </thead>
                    <tbody className="tabular-nums">
                      {SPLIT.map((s) => {
                        const y = yearly * s.share;
                        return (
                          <tr key={s.key} className="border-b border-ink/5">
                            <th scope="row" className="py-3 font-medium">{s.key}</th>
                            <td className="py-3 text-right">{(hours * s.share).toFixed(1)}</td>
                            <td className="py-3 text-right">KES {kes(y / 12)}</td>
                            <td className="py-3 text-right font-semibold">KES {kes(y)}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <th scope="row" className="pt-4 font-display font-extrabold">Total</th>
                        <td className="pt-4 text-right font-semibold">{hours}</td>
                        <td className="pt-4 text-right font-semibold">KES {kes(yearly / 12)}</td>
                        <td className="pt-4 text-right font-display font-extrabold text-earth">KES {kes(yearly)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 rounded-[16px] bg-sky-mist p-4 text-[13px] leading-[1.6] text-ink/60">
                  <span className="font-semibold text-ink">Assumptions:</span> KES {kes(COST_PER_HOUR)} blended staff cost
                  per hour × {WORKING_WEEKS} working weeks × {AUTOMATION_SHARE * 100}% of lost hours automated ={" "}
                  <span className="font-semibold text-ink">KES {kes(YEARLY_PER_WEEKLY_HOUR)}</span> saved per year for
                  every weekly hour lost. Excludes error, penalty and leakage reduction, so the real figure is usually higher.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
