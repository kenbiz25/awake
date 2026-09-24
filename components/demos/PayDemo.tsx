"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, TrendingUp } from "lucide-react";
import { AppBar, Kpi, Panel, Segmented, StatusPill, type Tone } from "./ui";
import { compact, kes, pctChange } from "@/lib/format";

const RANGES = {
  "7D": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"],
    values: [312_000, 468_000, 401_000, 579_000, 512_000, 688_000, 482_300],
    max: 750_000,
    ticks: [0, 250_000, 500_000, 750_000],
  },
  "4W": {
    labels: ["W1", "W2", "W3", "W4"],
    // W4 = sum of the 7D series, so both views agree
    values: [2_610_000, 2_940_000, 3_120_000, 3_442_300],
    max: 4_000_000,
    ticks: [0, 1_000_000, 2_000_000, 3_000_000, 4_000_000],
  },
} as const;
type Range = keyof typeof RANGES;

type TxStatus = "Settled" | "Pending" | "Reversed";
const STATUS_TONE: Record<TxStatus, Tone> = { Settled: "green", Pending: "amber", Reversed: "gray" };

const TXNS: { code: string; who: string; phone: string; branch: string; amount: number; status: TxStatus; time: string }[] = [
  { code: "SIQ7K2M9TD", who: "Jane M.", phone: "0712 ••• 421", branch: "Westlands", amount: 4_250, status: "Settled", time: "14:32" },
  { code: "SIQ7K1B3XP", who: "Brian O.", phone: "0722 ••• 118", branch: "Kisumu", amount: 1_180, status: "Settled", time: "14:29" },
  { code: "SIQ7JZ8QLM", who: "Aisha H.", phone: "0733 ••• 907", branch: "Mombasa", amount: 6_700, status: "Pending", time: "14:27" },
  { code: "SIQ7JY4NRC", who: "Peter K.", phone: "0701 ••• 356", branch: "Nakuru", amount: 890, status: "Settled", time: "14:22" },
  { code: "SIQ7JW6HVE", who: "Grace W.", phone: "0745 ••• 612", branch: "Eldoret", amount: 2_340, status: "Reversed", time: "14:18" },
  { code: "SIQ7JV1CAK", who: "Samuel N.", phone: "0710 ••• 274", branch: "Thika", amount: 15_600, status: "Settled", time: "14:11" },
];

const FILTERS = ["All", "Settled", "Pending"] as const;
type Filter = (typeof FILTERS)[number];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PayDemo() {
  const [range, setRange] = useState<Range>("7D");
  const [filter, setFilter] = useState<Filter>("All");

  const series = RANGES[range];
  const today = RANGES["7D"].values.at(-1)!;
  const w = RANGES["4W"].values;
  const weekGrowth = pctChange(w[w.length - 2], w[w.length - 1]);

  const counts = useMemo(
    () => ({ All: TXNS.length, Settled: TXNS.filter((t) => t.status === "Settled").length, Pending: TXNS.filter((t) => t.status === "Pending").length }),
    [],
  );
  const rows = filter === "All" ? TXNS : TXNS.filter((t) => t.status === filter);

  return (
    <div className="bg-sky-mist">
      <AppBar
        icon={<CreditCard className="h-4 w-4" />}
        title="Awake Pay · Retail HQ"
        subtitle="42 branches · Till 5xx xxx"
        right={
          <StatusPill tone="green" dot>
            Live settlement
          </StatusPill>
        }
      />

      <div className="space-y-4 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <Kpi
            dark
            label="M-Pesa balance"
            value={`KES ${kes(4_281_920)}`}
            hint={
              <span className="inline-flex items-center gap-1 text-emerald-300">
                <TrendingUp className="h-3 w-3" aria-hidden /> +{weekGrowth}% this week
              </span>
            }
          />
          <Kpi label="Collected today" value={`KES ${kes(today)}`} hint="Across 42 branches" />
          <Kpi label="Branches settled" value="41 / 42" hint="Mombasa pending" />
          <Kpi label="Failed" value="0.21%" hint="Auto-retried" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          {/* Inflow chart */}
          <Panel
            title="M-Pesa inflow"
            action={<Segmented label="Chart range" options={["7D", "4W"] as const} value={range} onChange={setRange} />}
          >
            <figure
              aria-label={`M-Pesa inflow, ${range === "7D" ? "last 7 days" : "last 4 weeks"}: ${series.labels
                .map((l, i) => `${l} KES ${compact(series.values[i])}`)
                .join(", ")}.`}
            >
              <div aria-hidden className="flex h-[200px] gap-2 lg:h-[290px]">
                {/* y-axis */}
                <div className="flex w-9 flex-col-reverse justify-between pb-5 text-right text-[10px] text-ink/35">
                  {series.ticks.map((t) => (
                    <span key={t} className="leading-none">{compact(t)}</span>
                  ))}
                </div>
                <div className="relative flex-1">
                  {/* gridlines */}
                  <div className="absolute inset-x-0 bottom-5 top-0 flex flex-col-reverse justify-between">
                    {series.ticks.map((t) => (
                      <span key={t} className="border-t border-dashed border-ink/[0.07]" />
                    ))}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 top-0 flex items-end gap-2 sm:gap-3">
                    {series.values.map((v, i) => {
                      const pct = (v / series.max) * 100;
                      const isLast = i === series.values.length - 1;
                      return (
                        <div key={`${range}-${i}`} className="group/bar flex h-full flex-1 flex-col items-center justify-end">
                          <div className="relative flex w-full flex-1 items-end justify-center pb-0">
                            <span
                              className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover/bar:opacity-100"
                              style={{ bottom: `calc(${pct}% + 6px)` }}
                            >
                              KES {compact(v)}
                            </span>
                            <motion.div
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
                              style={{ height: `${pct}%` }}
                              className={`w-full max-w-[44px] origin-bottom rounded-t-[8px] transition-colors ${
                                isLast ? "bg-ink group-hover/bar:bg-ink/80" : "bg-water group-hover/bar:bg-water/80"
                              }`}
                            />
                          </div>
                          <span className={`mt-1.5 h-3.5 text-[10px] leading-none ${isLast ? "font-semibold text-ink" : "text-ink/40"}`}>
                            {series.labels[i]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </figure>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-ink/[0.06] pt-4 text-[11px]">
              <div>
                <p className="text-ink/40">Avg ticket</p>
                <p className="mt-0.5 font-semibold tabular-nums">KES 1,420</p>
              </div>
              <div>
                <p className="text-ink/40">Fees saved</p>
                <p className="mt-0.5 font-semibold tabular-nums">KES 12,480</p>
              </div>
              <div>
                <p className="text-ink/40">Reconciled</p>
                <p className="mt-0.5 font-semibold text-earth">100% auto</p>
              </div>
            </div>
          </Panel>

          {/* Transactions */}
          <Panel
            title="Transactions"
            action={<Segmented label="Filter transactions" options={FILTERS} value={filter} onChange={setFilter} counts={counts} />}
          >
            <ul className="divide-y divide-ink/[0.06]">
              {rows.map((t) => (
                <li key={t.code} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[11px] font-semibold text-ink">{t.code}</p>
                    <p className="truncate text-[11px] text-ink/50">
                      {t.who} · {t.phone} · {t.branch}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className={`text-[13px] font-semibold tabular-nums ${t.status === "Reversed" ? "text-ink/40 line-through" : "text-ink"}`}>
                      KES {kes(t.amount)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-[10px] text-ink/35">{t.time}</span>
                      <StatusPill tone={STATUS_TONE[t.status]}>{t.status}</StatusPill>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
