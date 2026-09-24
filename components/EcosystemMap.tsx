"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import CountUp from "./CountUp";
import { supportDesk } from "@/lib/case-studies";
import {
  FIELD_DOTS,
  LABELLED_HUBS,
  MAP_H,
  MAP_W,
  OUTLINE_PATH,
  TOTAL_HUBS,
  TURKANA_PATH,
  project,
} from "@/lib/kenya";

// We embed for 2 weeks during every go-live
const GO_LIVE = [
  { when: "Week 1", what: "Train the trainers" },
  { when: "Week 2", what: "Go-live, engineers on site" },
  { when: "Then", what: "WhatsApp-first support" },
];

function KenyaMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[420px]">
      {/* SVG: outline, lake, field hubs */}
      <svg
        viewBox={`-8 -8 ${MAP_W + 16} ${MAP_H + 16}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-labelledby="kenya-map-title"
      >
        <title id="kenya-map-title">
          {`Map of Kenya showing ${TOTAL_HUBS} Awake support hubs, headquartered in Nairobi with regional hubs in ${LABELLED_HUBS.filter(
            (h) => h.tier === "regional",
          )
            .map((h) => h.name)
            .join(", ")}.`}
        </title>
        <defs>
          <pattern id="map-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#0A0F1E" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
          <clipPath id="kenya-clip">
            <path d={OUTLINE_PATH} />
          </clipPath>
        </defs>
        <path d={OUTLINE_PATH} fill="#FFFFFF" />
        <rect x="-8" y="-8" width={MAP_W + 16} height={MAP_H + 16} fill="url(#map-grid)" clipPath="url(#kenya-clip)" />
        <path d={TURKANA_PATH} fill="#E0F2FE" />
        <path d={OUTLINE_PATH} fill="none" stroke="#0A0F1E" strokeOpacity="0.18" strokeWidth="1.25" strokeLinejoin="round" />
        <g aria-hidden>
          {FIELD_DOTS.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={2.4}
              fill="#0A0F1E"
              className="transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none"
              style={{
                opacity: inView ? 0.55 : 0,
                transform: inView ? "scale(1)" : "scale(0)",
                transformOrigin: `${d.x}px ${d.y}px`,
                transitionDelay: `${0.25 + d.delay}s`,
              }}
            />
          ))}
        </g>
      </svg>

      {/* HTML overlay: labelled hubs stay crisp at any size */}
      <ul aria-hidden className="pointer-events-none absolute inset-0">
        {LABELLED_HUBS.map((h, i) => {
          const { x, y } = project(h.lon, h.lat);
          const hq = h.tier === "hq";
          return (
            <motion.li
              key={h.name}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: hq ? 0.1 : 0.9 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{ left: `${((x + 8) / (MAP_W + 16)) * 100}%`, top: `${((y + 8) / (MAP_H + 16)) * 100}%` }}
            >
              <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                {hq && <span className="absolute inset-0 animate-ping rounded-full bg-water/40 motion-reduce:animate-none" />}
                <span
                  className={`relative block rounded-full border-2 border-white shadow-[0_2px_6px_rgba(10,15,30,0.25)] ${
                    hq ? "h-4 w-4 bg-water" : "h-3 w-3 bg-earth"
                  }`}
                />
              </span>
              <span
                className={`absolute top-0 -translate-y-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold shadow-sm sm:text-[11px] ${
                  hq ? "bg-water text-white" : "bg-white text-ink"
                } ${h.labelSide === "right" ? "left-3" : "right-3"} ${h.hideLabelOnMobile ? "hidden sm:block" : ""}`}
              >
                {h.name}
              </span>
            </motion.li>
          );
        })}
      </ul>

      <span className="pointer-events-none absolute bottom-[4%] right-0 font-serif text-[13px] italic text-ink/35">Indian Ocean</span>
      <span className="pointer-events-none absolute bottom-[34%] left-0 hidden font-serif text-[12px] italic text-ink/35 sm:block">
        L. Victoria
      </span>
    </div>
  );
}

export default function EcosystemMap() {
  return (
    <section aria-labelledby="eco-title" className="section-cascade bg-sky-soft">
      <div className="container-x py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 id="eco-title" className="text-[32px] leading-[0.92] md:text-[52px] md:leading-[0.9]">
              Support that stays online across Africa
            </h2>
            <p className="mt-5 max-w-[460px] text-[15px] leading-[1.6] text-ink/60">
              We don&apos;t disappear after launch. {TOTAL_HUBS} support hubs, on-call engineers and a WhatsApp-first helpdesk —
              so counties and companies stay running even when the power flickers.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="flex flex-col rounded-[16px] border border-ink/[0.06] bg-white p-4">
                <dt className="order-2 mt-1 text-[10px] font-semibold uppercase tracking-widest text-ink/40 sm:text-[11px]">Support hubs</dt>
                <dd className="order-1 font-display text-[24px] font-extrabold tracking-[-0.03em] sm:text-[28px]">
                  <CountUp end={TOTAL_HUBS} />
                </dd>
              </div>
              <div className="flex flex-col rounded-[16px] border border-ink/[0.06] bg-white p-4">
                <dt className="order-2 mt-1 text-[10px] font-semibold uppercase tracking-widest text-ink/40 sm:text-[11px]">Avg response</dt>
                <dd className="order-1 font-display text-[24px] font-extrabold tracking-[-0.03em] sm:text-[28px]">
                  <CountUp end={supportDesk.avgFirstReplyMin} suffix=" min" />
                </dd>
              </div>
              <div className="flex flex-col rounded-[16px] bg-ink p-4 text-white">
                <dt className="order-2 mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/50 sm:text-[11px]">Uptime team</dt>
                <dd className="order-1 font-display text-[24px] font-extrabold tracking-[-0.03em] sm:text-[28px]">24/7</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] font-medium">
                <MapPin className="h-4 w-4" aria-hidden /> Nairobi · Kisumu · Mombasa
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-earth px-4 py-2 text-[13px] font-medium text-white">
                <Check className="h-4 w-4" aria-hidden /> On-site in 48h
              </span>
            </div>

            <div className="mt-10 rounded-[24px] border border-ink/[0.06] bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-semibold">Training at county offices — not just Zoom</p>
                <span className="shrink-0 rounded-full bg-earth-soft px-2.5 py-1 text-[11px] font-semibold text-earth">On site</span>
              </div>
              <ol className="mt-5 grid grid-cols-3 gap-3">
                {GO_LIVE.map((g, i) => (
                  <li key={g.when} className="relative">
                    <span aria-hidden className={`block h-1.5 rounded-full ${i === 0 ? "bg-water" : i === 1 ? "bg-earth" : "bg-gold"}`} />
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-ink/40">{g.when}</p>
                    <p className="mt-1 text-[13px] font-semibold leading-[1.3]">{g.what}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="rounded-[24px] border border-ink/[0.06] bg-white p-5 shadow-[0_20px_60px_rgba(10,15,30,0.08)] sm:p-8">
            <div className="rounded-[16px] bg-sky px-4 py-6 sm:px-8 sm:py-8">
              <KenyaMap />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-ink/60">
                <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-water" aria-hidden /> Nairobi HQ</li>
                <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-earth" aria-hidden /> Regional hubs</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink/55" aria-hidden /> Field hubs</li>
              </ul>
              <span className="rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold text-white">KE · 47 counties covered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
