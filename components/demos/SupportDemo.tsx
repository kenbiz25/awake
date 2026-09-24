"use client";

import { useState } from "react";
import { Check, Headset, Mail, MessageCircle, Smartphone } from "lucide-react";
import { AppBar, Kpi, Panel, Segmented, StatusPill, type Tone } from "./ui";
import { supportDesk } from "@/lib/case-studies";

type Channel = "WhatsApp" | "Email" | "USSD";
type Priority = "Urgent" | "High" | "Normal" | "Low";
type Status = "Open" | "Resolved";

const CHANNEL_ICON: Record<Channel, typeof Mail> = { WhatsApp: MessageCircle, Email: Mail, USSD: Smartphone };
const PRIORITY_TONE: Record<Priority, Tone> = { Urgent: "red", High: "amber", Normal: "blue", Low: "gray" };

type Ticket = { id: string; subject: string; org: string; channel: Channel; age: string; firstReply: string | null; priority: Priority; status: Status };

const TICKETS: Ticket[] = [
  { id: "#2841", subject: "Market fee receipt not printing", org: "County revenue desk", channel: "USSD", age: "2m", firstReply: null, priority: "High", status: "Open" },
  { id: "#2840", subject: "M-Pesa till reconciliation mismatch", org: "Retail · Mombasa branch", channel: "WhatsApp", age: "12m", firstReply: "4m", priority: "Urgent", status: "Open" },
  { id: "#2839", subject: "Staff leave approval stuck", org: "NGO HR team", channel: "Email", age: "24m", firstReply: "9m", priority: "Low", status: "Open" },
  { id: "#2838", subject: "Password reset for field tablet", org: "NGO field team", channel: "WhatsApp", age: "41m", firstReply: "3m", priority: "Normal", status: "Resolved" },
  { id: "#2837", subject: "Payroll export to bank CSV", org: "Finance · HQ", channel: "Email", age: "1h", firstReply: "11m", priority: "Normal", status: "Resolved" },
  { id: "#2836", subject: "Permit payment not reflecting", org: "County licensing", channel: "USSD", age: "2h", firstReply: "7m", priority: "High", status: "Resolved" },
];

const FILTERS = ["Open", "Resolved", "All"] as const;
type Filter = (typeof FILTERS)[number];

// Avg first-reply minutes per hour, 08:00 → 17:00. Mean equals supportDesk.avgFirstReplyMin.
const HOURLY = [9, 14, 12, 16, 11, 10, 13, 12, 11, 12];
const HOURS = ["8", "9", "10", "11", "12", "1", "2", "3", "4", "5"];
const CHANNEL_MIX: { c: Channel; pct: number; bar: string }[] = [
  { c: "WhatsApp", pct: 64, bar: "bg-earth" },
  { c: "Email", pct: 22, bar: "bg-water" },
  { c: "USSD", pct: 14, bar: "bg-gold" },
];

function Sparkline() {
  const W = 280;
  const H = 96;
  const max = 20;
  const x = (i: number) => (i / (HOURLY.length - 1)) * W;
  const y = (v: number) => H - (v / max) * H;
  const line = HOURLY.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const area = `0,${H} ${line} ${W},${H}`;
  const avg = supportDesk.avgFirstReplyMin;

  return (
    <figure aria-label={`First reply time today ranged from ${Math.min(...HOURLY)} to ${Math.max(...HOURLY)} minutes, averaging ${avg}.`}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-24 w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="reply-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2A2FFF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2A2FFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#reply-fill)" />
        <line x1="0" x2={W} y1={y(avg)} y2={y(avg)} stroke="#0A0F1E" strokeOpacity="0.25" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        <polyline points={line} fill="none" stroke="#2A2FFF" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div aria-hidden className="mt-1.5 flex justify-between text-[10px] text-ink/35">
        {HOURS.map((h, i) => (
          <span key={i}>{h}</span>
        ))}
      </div>
    </figure>
  );
}

export default function SupportDemo() {
  const [filter, setFilter] = useState<Filter>("Open");
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  const statusOf = (t: Ticket): Status => (resolved.has(t.id) ? "Resolved" : t.status);
  const open = TICKETS.filter((t) => statusOf(t) === "Open").length;
  const counts = { Open: open, Resolved: TICKETS.length - open, All: TICKETS.length };
  const rows = filter === "All" ? TICKETS : TICKETS.filter((t) => statusOf(t) === filter);

  const resolve = (id: string) => setResolved((prev) => new Set(prev).add(id));

  return (
    <div className="bg-sky-mist">
      <AppBar
        icon={<Headset className="h-4 w-4" />}
        title="SupportDesk · Unified inbox"
        subtitle="WhatsApp · Email · USSD"
        right={<StatusPill tone="green" dot>{supportDesk.slaUptime}% SLA</StatusPill>}
      />

      <div className="space-y-4 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <Kpi label="Open now" value={open} hint={open ? "In queue" : "Inbox zero"} />
          <Kpi dark label="Avg first reply" value={`${supportDesk.avgFirstReplyMin} min`} hint="Today" />
          <Kpi label="Tickets today" value="186" hint={`${supportDesk.ticketsPerWeek.toLocaleString("en-KE")} / week`} />
          <Kpi label="CSAT" value="4.8 / 5" hint="Last 30 days" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
          <Panel title="Tickets" action={<Segmented label="Filter tickets" options={FILTERS} value={filter} onChange={setFilter} counts={counts} />}>
            {rows.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-earth-soft text-earth">
                  <Check className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-3 text-[13px] font-semibold text-ink">Inbox zero</p>
                <p className="text-[11px] text-ink/50">Every ticket has been resolved.</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {rows.map((t) => {
                  const s = statusOf(t);
                  const Icon = CHANNEL_ICON[t.channel];
                  return (
                    <li key={t.id} className="rounded-[12px] border border-ink/[0.06] bg-sky-mist p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3">
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-ink/70 shadow-sm" title={t.channel}>
                            <Icon className="h-3.5 w-3.5" aria-hidden />
                            <span className="sr-only">{t.channel}</span>
                          </span>
                          <div className="min-w-0">
                            <p className={`truncate text-[13px] font-semibold ${s === "Resolved" ? "text-ink/50" : "text-ink"}`}>{t.subject}</p>
                            <p className="truncate text-[11px] text-ink/50">
                              <span className="font-mono">{t.id}</span> · {t.org} · {t.age} ago
                            </p>
                          </div>
                        </div>
                        <StatusPill tone={s === "Open" ? "blue" : "green"} dot>
                          {s}
                        </StatusPill>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between gap-2 pl-10">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <StatusPill tone={PRIORITY_TONE[t.priority]}>{t.priority}</StatusPill>
                          <span className="text-[11px] text-ink/45">
                            {t.firstReply ? `First reply ${t.firstReply}` : "Awaiting first reply"}
                          </span>
                        </div>
                        {s === "Open" && (
                          <button
                            type="button"
                            onClick={() => resolve(t.id)}
                            aria-label={`Resolve ticket ${t.id}`}
                            className="btn h-7 shrink-0 bg-ink px-3 text-[11px] text-white"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>

          <div className="space-y-4">
            <Panel title="First reply time · today" action={<span className="text-[11px] font-semibold text-water">avg {supportDesk.avgFirstReplyMin} min</span>}>
              <Sparkline />
            </Panel>
            <Panel title="Channel mix">
              <div className="flex h-2.5 overflow-hidden rounded-full" aria-hidden>
                {CHANNEL_MIX.map((m) => (
                  <span key={m.c} className={m.bar} style={{ width: `${m.pct}%` }} />
                ))}
              </div>
              <ul className="mt-4 space-y-2.5">
                {CHANNEL_MIX.map((m) => {
                  const Icon = CHANNEL_ICON[m.c];
                  return (
                    <li key={m.c} className="flex items-center justify-between text-[12px]">
                      <span className="flex items-center gap-2 text-ink/70">
                        <span className={`h-2 w-2 rounded-full ${m.bar}`} aria-hidden />
                        <Icon className="h-3.5 w-3.5" aria-hidden /> {m.c}
                      </span>
                      <span className="font-semibold tabular-nums text-ink">{m.pct}%</span>
                    </li>
                  );
                })}
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
