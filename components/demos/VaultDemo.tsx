"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Database, FileCheck2, Lock, RefreshCw, ShieldCheck, Tablet, Trash2, UserCog } from "lucide-react";
import { AppBar, Kpi, Panel, StatusPill, type Tone } from "./ui";
import { dataVault } from "@/lib/case-studies";

type FormStatus = "Verified" | "In review";
const FORM_TONE: Record<FormStatus, Tone> = { Verified: "green", "In review": "amber" };

const FORMS: { name: string; submissions: number; synced: number; status: FormStatus }[] = [
  { name: "Beneficiary intake", submissions: 4_281, synced: 100, status: "Verified" },
  { name: "Nutrition follow-up", submissions: 1_137, synced: 99, status: "Verified" },
  { name: "Market assessment", submissions: 892, synced: 98, status: "In review" },
];

const TOTAL = FORMS.reduce((s, f) => s + f.submissions, 0);
const SYNCED_PCT = +(FORMS.reduce((s, f) => s + f.submissions * f.synced, 0) / TOTAL).toFixed(1);

type Device = { id: string; name: string; site: string; pending: number; lastSeen: string };
const DEVICES: Device[] = [
  { id: "t07", name: "Tablet 07", site: "Turkana", pending: 12, lastSeen: "2h ago" },
  { id: "t12", name: "Tablet 12", site: "Garissa", pending: 4, lastSeen: "35m ago" },
  { id: "p03", name: "Phone 03", site: "Kilifi", pending: 0, lastSeen: "Just now" },
];

const AUDIT = [
  { Icon: FileCheck2, text: "Donor export approved", who: "M&E Officer", time: "14:05" },
  { Icon: Trash2, text: "Record #3817 erased on consent withdrawal", who: "DPO", time: "12:41" },
  { Icon: UserCog, text: "Role changed: Field Officer → Supervisor", who: "Admin", time: "11:18" },
  { Icon: Lock, text: "Encryption keys rotated", who: "System", time: "09:00" },
];

type SyncState = "idle" | "syncing" | "done";

export default function VaultDemo() {
  const [sync, setSync] = useState<Record<string, SyncState>>({});
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const syncNow = (id: string) => {
    setSync((s) => ({ ...s, [id]: "syncing" }));
    timers.current.push(window.setTimeout(() => setSync((s) => ({ ...s, [id]: "done" })), 1400));
  };

  const pendingOf = (d: Device) => (sync[d.id] === "done" ? 0 : d.pending);
  const pendingTotal = DEVICES.reduce((s, d) => s + pendingOf(d), 0);

  return (
    <div className="bg-sky-mist">
      <AppBar
        icon={<Database className="h-4 w-4" />}
        title="Data Vault · Field collection"
        subtitle="Humanitarian programme · 3 counties"
        right={
          <StatusPill tone="gray">
            <Lock className="h-3 w-3" aria-hidden /> {dataVault.compliance.join(" + ")}
          </StatusPill>
        }
      />

      <div className="space-y-4 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <Kpi label="Submissions" value={TOTAL.toLocaleString("en-KE")} hint={`${FORMS.length} active forms`} />
          <Kpi label="Synced" value={`${SYNCED_PCT}%`} hint="Weighted by form" />
          <Kpi label="Waiting to sync" value={pendingTotal} hint={pendingTotal ? "Records on devices" : "All devices clear"} />
          <Kpi
            dark
            label="Encryption"
            value={
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden /> E2E
              </span>
            }
            hint="At rest & in transit"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <div className="space-y-4">
            <Panel title="Forms">
              <div className="-mx-4 overflow-x-auto px-4 sm:-mx-5 sm:px-5">
                <table className="w-full min-w-[420px] text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-ink/40">
                      <th scope="col" className="pb-2 font-semibold">Form</th>
                      <th scope="col" className="pb-2 text-right font-semibold">Submissions</th>
                      <th scope="col" className="pb-2 pl-4 font-semibold">Offline sync</th>
                      <th scope="col" className="pb-2 text-right font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/[0.06] text-[12px]">
                    {FORMS.map((f) => (
                      <tr key={f.name}>
                        <th scope="row" className="py-3 text-[13px] font-semibold text-ink">{f.name}</th>
                        <td className="py-3 text-right tabular-nums text-ink/70">{f.submissions.toLocaleString("en-KE")}</td>
                        <td className="py-3 pl-4">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ink/[0.06]">
                              <div className="h-full rounded-full bg-earth" style={{ width: `${f.synced}%` }} />
                            </div>
                            <span className="tabular-nums text-ink/60">{f.synced}%</span>
                          </div>
                        </td>
                        <td className="py-3 text-right">
                          <StatusPill tone={FORM_TONE[f.status]}>{f.status}</StatusPill>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel title="Field devices" action={<span className="text-[11px] text-ink/45">Offline-first</span>}>
              <ul className="space-y-2">
                {DEVICES.map((d) => {
                  const state = sync[d.id] ?? "idle";
                  const pending = pendingOf(d);
                  const clear = pending === 0;
                  return (
                    <li key={d.id} className="flex items-center justify-between gap-3 rounded-[12px] border border-ink/[0.06] bg-sky-mist p-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-ink/70 shadow-sm">
                          <Tablet className="h-4 w-4" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-semibold text-ink">
                            {d.name} · {d.site}
                          </p>
                          <p className="truncate text-[11px] text-ink/50">
                            {clear ? "Up to date" : `${pending} records waiting`} · seen {state === "done" ? "just now" : d.lastSeen}
                          </p>
                        </div>
                      </div>
                      {clear ? (
                        <StatusPill tone="green">Synced</StatusPill>
                      ) : (
                        <button
                          type="button"
                          onClick={() => syncNow(d.id)}
                          disabled={state === "syncing"}
                          aria-label={`Sync ${d.name} now`}
                          className="btn h-7 shrink-0 bg-ink px-3 text-[11px] text-white disabled:cursor-wait disabled:hover:scale-100"
                        >
                          <motion.span
                            animate={state === "syncing" ? { rotate: 360 } : { rotate: 0 }}
                            transition={state === "syncing" ? { repeat: Infinity, duration: 0.9, ease: "linear" } : { duration: 0 }}
                            className="inline-flex"
                          >
                            <RefreshCw className="h-3 w-3" aria-hidden />
                          </motion.span>
                          {state === "syncing" ? "Syncing" : "Sync now"}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Panel>
          </div>

          <Panel title="Audit log" action={<StatusPill tone="green" dot>Immutable</StatusPill>}>
            <ol className="relative space-y-4 before:absolute before:bottom-2 before:left-[13px] before:top-2 before:w-px before:bg-ink/10">
              {AUDIT.map(({ Icon, text, who, time }) => (
                <li key={text} className="relative flex gap-3">
                  <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/[0.08] bg-white text-ink/60">
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[12px] font-semibold leading-[1.35] text-ink">{text}</p>
                    <p className="mt-0.5 text-[11px] text-ink/45">
                      {who} · {time}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-5 rounded-[12px] bg-earth-soft p-3 text-[11px] leading-[1.5] text-earth">
              Consent captured on every record. Erasure and export requests are logged for your DPO and donors.
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
