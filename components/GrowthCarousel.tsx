"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, ChevronLeft, ChevronRight, Coins, Database, Zap, type LucideIcon } from "lucide-react";
import { hrPlatform, retailMpesa } from "@/lib/case-studies";

type Slide = { title: string; desc: string; stat: string; img: string; Icon: LucideIcon; href: string };

const SLIDES: Slide[] = [
  {
    title: "Launch in 30 days",
    desc: "From kickoff to a live system — with training and data migration included.",
    stat: "30 days to go-live",
    img: "https://picsum.photos/seed/awake-launch/720/480?grayscale",
    Icon: Zap,
    href: "/solutions/website-development-kenya",
  },
  {
    title: "Handles heavy data",
    desc: "Built for millions of transactions. No lag when traffic spikes at month-end.",
    stat: `${retailMpesa.transactionsMillions}M+ transactions`,
    img: "https://picsum.photos/seed/awake-data/720/480?grayscale",
    Icon: Database,
    href: "/solutions/dashboard-analytics",
  },
  {
    title: "Track every shilling",
    desc: "Real-time M-Pesa, bank and cash reconciliation. KRA-ready from day one.",
    stat: "100% auto-reconciled",
    img: "https://picsum.photos/seed/awake-shilling/720/480?grayscale",
    Icon: Coins,
    href: "/solutions/payment-integration-mpesa",
  },
  {
    title: "Built for teams",
    desc: "HR, payroll, per diem and leave in one place — no more Excel.",
    stat: `${hrPlatform.staff} staff, one login`,
    img: "https://picsum.photos/seed/awake-teams/720/480?grayscale",
    Icon: Building2,
    href: "/solutions/hr-platform-africa",
  },
];

const GAP = 16; // matches gap-4

export default function GrowthCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    sync();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [sync]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + GAP), behavior: reduce ? "auto" : "smooth" });
  };

  const navBtn =
    "flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-all hover:scale-[1.05] disabled:cursor-not-allowed disabled:bg-ink/10 disabled:text-ink/30 disabled:hover:scale-100";

  return (
    <section aria-labelledby="growth-title" className="section-cascade overflow-hidden bg-white">
      <div className="container-x py-16 md:py-24">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 id="growth-title" className="text-[28px] leading-[0.95] md:text-[44px]">
              Scale without the chaos
            </h2>
            <p className="mt-3 max-w-[420px] text-[14px] leading-[1.6] text-ink/60 md:text-[15px]">
              The boring infrastructure that lets you grow — already built, tested and running in production.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label="Previous" aria-controls="growth-track" className={navBtn}>
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button type="button" onClick={() => scrollByCard(1)} disabled={!canNext} aria-label="Next" aria-controls="growth-track" className={navBtn}>
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        <ul
          id="growth-track"
          ref={trackRef}
          tabIndex={0}
          aria-label="Growth capabilities"
          className="scrollbar-none -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-8 pt-2 md:-mx-10 md:scroll-px-10 md:px-10"
        >
          {SLIDES.map((s) => (
            <li
              key={s.title}
              className="group w-[82%] shrink-0 snap-start sm:w-[340px] md:w-[360px]"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-ink/10 bg-sky-mist transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/[0.08]">
                <div className="relative h-[200px] overflow-hidden bg-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={720}
                    height={480}
                    className="h-full w-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/60 via-water/10 to-transparent" />
                  <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow" aria-hidden>
                    <s.Icon className="h-4 w-4" />
                  </span>
                  <span className="absolute bottom-4 left-4 rounded-full bg-gold px-3 py-1 text-[12px] font-bold text-ink">{s.stat}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[20px] font-extrabold leading-[1.1] tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.55] text-ink/60">{s.desc}</p>
                  <Link
                    href={s.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold transition-colors hover:text-water"
                  >
                    Learn more <span className="sr-only">about {s.title.toLowerCase()}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div aria-hidden className="mt-0 h-1 overflow-hidden rounded-full bg-ink/[0.06]">
          <div
            className="h-full rounded-full bg-ink transition-[width] duration-150"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
