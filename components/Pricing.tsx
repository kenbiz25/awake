"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { CONTACT_HREF } from "@/lib/site";
import { announceIntent } from "@/lib/intent";
import { MODE_NOTE, PRICING_MODES, STARTS_FROM, TIERS, type PricingMode } from "@/lib/pricing";

export default function Pricing() {
  const [mode, setMode] = useState<PricingMode>("Retainer");

  return (
    <MotionConfig reducedMotion="user">
      <section id="pricing" aria-labelledby="pricing-title" className="section-cascade bg-sky">
        <div className="container-x py-16 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <h2 id="pricing-title" className="text-[32px] leading-[0.92] md:text-[52px] md:leading-[0.9]">
                Pricing that scales with you
              </h2>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2 text-[15px] text-ink/60">
                Starts from
                <span className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-ink md:text-[28px]">{STARTS_FROM}</span>
                · no lock-in
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <div role="group" aria-label="Pricing model" className="flex w-fit rounded-full border border-ink/10 bg-white p-1 shadow-sm">
                {PRICING_MODES.map((m) => {
                  const active = m === mode;
                  return (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setMode(m)}
                      className={`relative h-9 rounded-full px-4 text-[13px] font-semibold transition-colors sm:px-5 ${active ? "text-white" : "text-ink/60 hover:text-ink"}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="pricing-mode"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                          className="absolute inset-0 rounded-full bg-ink shadow"
                          aria-hidden
                        />
                      )}
                      <span className="relative">{m}</span>
                    </button>
                  );
                })}
              </div>
              <p aria-live="polite" className="max-w-[420px] text-[12px] leading-[1.5] text-ink/55 lg:text-right">
                {MODE_NOTE[mode]}
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {TIERS.map((t) => {
              const price = t.price[mode];
              const dark = !!t.featured;
              return (
                <li
                  key={t.id}
                  className={`relative flex flex-col rounded-[24px] border p-7 transition-transform duration-300 hover:-translate-y-1 md:p-8 ${
                    dark ? "border-ink bg-ink text-white shadow-[0_20px_60px_rgba(10,15,30,0.25)]" : "border-ink/10 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[13px] font-semibold uppercase tracking-widest opacity-60">{t.name}</h3>
                    {dark && <span className="rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-ink">Most picked</span>}
                  </div>

                  <div className="mt-4 flex h-[44px] items-baseline gap-1 overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.p
                        key={`${t.id}-${mode}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-baseline gap-1"
                      >
                        <span className="font-display text-[36px] font-extrabold leading-none tracking-[-0.03em]">{price.amount}</span>
                        <span className="text-[14px] opacity-60">{price.cadence}</span>
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <p className={`mt-3 text-[13px] leading-[1.5] ${dark ? "text-white/60" : "text-ink/60"}`}>{t.blurb}</p>

                  <ul className="mb-10 mt-8 flex-1 space-y-3">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] leading-[1.45]">
                        <span
                          className={`mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${dark ? "bg-white/15" : "bg-earth-soft"}`}
                          aria-hidden
                        >
                          <Check className={`h-3 w-3 ${dark ? "text-white" : "text-earth"}`} strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={CONTACT_HREF}
                    onClick={() => announceIntent({ plan: `${t.name} · ${mode}` })}
                    className={`btn h-11 text-[14px] ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}
                  >
                    {t.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-center text-[12px] text-ink/45">
            Prices in Kenya Shillings, excluding 16% VAT. M-Pesa and bank transaction fees are billed at cost.
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}
