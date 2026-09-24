"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { ArrowRight, CreditCard, Database, Headset, MousePointerClick, Users, type LucideIcon } from "lucide-react";
import PayDemo from "./demos/PayDemo";
import HRDemo from "./demos/HRDemo";
import SupportDemo from "./demos/SupportDemo";
import VaultDemo from "./demos/VaultDemo";
import { CONTACT_HREF } from "@/lib/site";

type Tab = { id: string; label: string; desc: string; Icon: LucideIcon; Demo: () => JSX.Element };

const TABS: Tab[] = [
  { id: "pay", label: "Awake Pay", desc: "M-Pesa & bank settlement", Icon: CreditCard, Demo: PayDemo },
  { id: "hr", label: "Awake HR", desc: "Payroll, leave & per diem", Icon: Users, Demo: HRDemo },
  { id: "support", label: "SupportDesk", desc: "WhatsApp, Email & USSD inbox", Icon: Headset, Demo: SupportDemo },
  { id: "vault", label: "Data Vault", desc: "Encrypted offline field data", Icon: Database, Demo: VaultDemo },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function LiveDemos() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // WAI-ARIA tabs: roving tabindex, arrows in both axes (rail is vertical on desktop, horizontal on mobile)
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = TABS.findIndex((t) => t.id === activeTab);
    let next: number;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (i + 1) % TABS.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (i - 1 + TABS.length) % TABS.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = TABS.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setActiveTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="solutions" aria-labelledby="demos-title" className="section-cascade overflow-clip bg-ink text-white">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-40 h-[480px] w-[480px] rounded-full bg-water/20 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-earth/25 blur-[120px]" />

        <div className="container-x relative py-16 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
            <h2 id="demos-title" className="max-w-[560px] text-[32px] leading-[0.92] md:text-[56px] md:leading-[0.9]">
              Built to keep every system running
            </h2>
            <p className="max-w-[380px] text-[14px] leading-[1.6] text-white/60 md:text-[15px]">
              Not Figma. Real product UI. Switch tabs and click around — these are components we ship to clients in 30 days.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
            {/* Tab rail */}
            <div className="min-w-0 lg:sticky lg:top-[96px] lg:h-fit">
              <div
                role="tablist"
                aria-label="Product demos"
                onKeyDown={onKeyDown}
                className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-1 overflow-x-auto px-6 md:-mx-10 md:px-10 lg:mx-0 lg:flex-col lg:overflow-visible lg:rounded-[20px] lg:border lg:border-white/10 lg:bg-white/[0.06] lg:p-2"
              >
                {TABS.map((t, i) => {
                  const active = t.id === activeTab;
                  return (
                    <button
                      key={t.id}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      id={`demo-tab-${t.id}`}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-controls={`demo-panel-${t.id}`}
                      tabIndex={active ? 0 : -1}
                      onClick={() => setActiveTab(t.id)}
                      className={`relative flex shrink-0 snap-start items-center gap-3 rounded-[12px] px-4 py-3 text-left transition-colors lg:w-full lg:py-3.5 ${
                        active ? "text-ink" : "bg-white/[0.06] text-white/60 hover:bg-white/[0.08] hover:text-white lg:bg-transparent"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="demo-tab-active"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                          className="absolute inset-0 rounded-[12px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                          aria-hidden
                        />
                      )}
                      <span
                        className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                          active ? "bg-ink text-white" : "bg-white/10"
                        }`}
                        aria-hidden
                      >
                        <t.Icon className="h-4 w-4" />
                      </span>
                      <span className="relative min-w-0">
                        <span className="block whitespace-nowrap text-[14px] font-semibold">{t.label}</span>
                        <span className={`hidden text-[12px] lg:block ${active ? "text-ink/50" : "text-white/40"}`}>{t.desc}</span>
                      </span>
                      {active && <ArrowRight className="relative ml-auto hidden h-4 w-4 lg:block" aria-hidden />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 hidden rounded-[16px] border border-gold/20 bg-gold/10 p-4 lg:block">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gold">
                  <MousePointerClick className="h-3.5 w-3.5" aria-hidden /> It actually works
                </p>
                <p className="mt-2 text-[12px] leading-[1.55] text-white/70">
                  Approve leave, resolve tickets, sync a field tablet. Sample data, real components.
                </p>
                <Link href={CONTACT_HREF} className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-white transition-colors hover:text-gold">
                  Book a live walkthrough <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>

            {/* App window */}
            <div className="min-w-0">
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white text-ink shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
                <div className="flex h-10 items-center justify-between gap-3 border-b border-ink/[0.06] bg-white px-4" aria-hidden>
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <span className="truncate text-[11px] font-medium text-ink/40">
                    {TABS.find((t) => t.id === activeTab)?.label} — Awake Cloud
                  </span>
                  <span className="shrink-0 rounded-full bg-sky-mist px-2 py-0.5 text-[10px] font-semibold text-ink/50">Sample data</span>
                </div>

                <div className="lg:min-h-[660px]">
                  {TABS.map(({ id, Demo }) => {
                    const active = id === activeTab;
                    return (
                      <div key={id} id={`demo-panel-${id}`} role="tabpanel" aria-labelledby={`demo-tab-${id}`} hidden={!active}>
                        <motion.div
                          initial={false}
                          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.35, ease: EASE }}
                        >
                          <Demo />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="mt-4 text-center text-[12px] text-white/40 lg:hidden">Sample data — tap around, it works.</p>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
