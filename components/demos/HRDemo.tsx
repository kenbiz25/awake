"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Check, Search, Users, X } from "lucide-react";
import { AppBar, Avatar, Kpi, Panel, StatusPill, type Tone } from "./ui";
import { hrPlatform } from "@/lib/case-studies";
import { kes } from "@/lib/format";

type StaffStatus = "Active" | "On leave" | "Per diem";
const STAFF_TONE: Record<StaffStatus, Tone> = { Active: "green", "On leave": "amber", "Per diem": "blue" };

const STAFF: { name: string; role: string; dept: string; status: StaffStatus }[] = [
  { name: "Jane Muthoni", role: "Finance Lead", dept: "Finance", status: "On leave" },
  { name: "Brian Otieno", role: "Field Officer", dept: "Programmes", status: "Active" },
  { name: "Aisha Hussein", role: "M&E Officer", dept: "M&E", status: "Active" },
  { name: "Peter Kamau", role: "Driver", dept: "Logistics", status: "Per diem" },
  { name: "Grace Wanjiru", role: "HR Business Partner", dept: "People", status: "Active" },
  { name: "Samuel Njoroge", role: "Procurement Officer", dept: "Finance", status: "Active" },
  { name: "Mercy Achieng", role: "Nurse Supervisor", dept: "Health", status: "On leave" },
  { name: "David Kiprono", role: "ICT Support", dept: "ICT", status: "Active" },
];

type Decision = "Pending" | "Approved" | "Declined";
const LEAVE: { id: string; name: string; type: string; days: number; dates: string }[] = [
  { id: "lv-1", name: "Mercy Achieng", type: "Annual", days: 5, dates: "29 Sep – 3 Oct" },
  { id: "lv-2", name: "David Kiprono", type: "Sick", days: 2, dates: "25 – 26 Sep" },
  { id: "lv-3", name: "Brian Otieno", type: "Compassionate", days: 3, dates: "6 – 8 Oct" },
];

const GROSS = 8_400_000;
const STATUTORY = 1_848_000; // PAYE + NSSF + SHIF + Housing Levy
const NET = GROSS - STATUTORY;
const APPROVED_START = 460;

export default function HRDemo() {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const [payrollRun, setPayrollRun] = useState(false);

  const q = query.trim().toLowerCase();
  const staff = q ? STAFF.filter((s) => `${s.name} ${s.role} ${s.dept}`.toLowerCase().includes(q)) : STAFF;
  const pending = LEAVE.filter((l) => (decisions[l.id] ?? "Pending") === "Pending").length;
  const approved = payrollRun ? hrPlatform.staff : APPROVED_START;

  const decide = (id: string, d: Decision) => setDecisions((prev) => ({ ...prev, [id]: d }));

  return (
    <div className="bg-sky-mist">
      <AppBar
        icon={<Users className="h-4 w-4" />}
        title={`Awake HR · ${hrPlatform.staff} staff`}
        subtitle="September 2026 payroll cycle"
        right={
          <button
            type="button"
            onClick={() => setPayrollRun(true)}
            disabled={payrollRun}
            className={`btn h-8 px-3.5 text-[12px] ${payrollRun ? "cursor-default bg-earth text-white hover:scale-100" : "bg-ink text-white"}`}
          >
            {payrollRun ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden /> Payroll sent to bank
              </>
            ) : (
              "Approve & run payroll"
            )}
          </button>
        }
      />

      <div className="space-y-4 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <Kpi label="Headcount" value={hrPlatform.staff} hint="12 departments" />
          <Kpi label="On leave today" value="23" hint="4.6% of staff" />
          <Kpi label="Pending leave" value={pending} hint={pending ? "Awaiting you" : "All clear"} />
          <Kpi dark label="Admin saved" value={`${hrPlatform.hoursSavedWeekly} hrs`} hint="every week" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          {/* Staff directory */}
          <Panel
            title="Staff directory"
            action={
              <label htmlFor={searchId} className="relative flex items-center">
                <span className="sr-only">Search staff</span>
                <Search className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-ink/35" aria-hidden />
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search staff"
                  className="h-8 w-[140px] rounded-full border border-ink/10 bg-sky-mist pl-8 pr-3 text-[12px] text-ink placeholder:text-ink/35 focus:border-water focus:bg-white sm:w-[180px]"
                />
              </label>
            }
          >
            <div className="-mx-4 overflow-x-auto px-4 sm:-mx-5 sm:px-5">
              <table className="w-full min-w-[440px] text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-ink/40">
                    <th scope="col" className="pb-2 font-semibold">Name</th>
                    <th scope="col" className="pb-2 font-semibold">Department</th>
                    <th scope="col" className="pb-2 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/[0.06]">
                  {staff.map((s) => (
                    <tr key={s.name}>
                      <td className="py-2.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={s.name} index={STAFF.indexOf(s)} />
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-semibold text-ink">{s.name}</p>
                            <p className="truncate text-[11px] text-ink/50">{s.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 text-[12px] text-ink/60">{s.dept}</td>
                      <td className="py-2.5 text-right">
                        <StatusPill tone={STAFF_TONE[s.status]}>{s.status}</StatusPill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {staff.length === 0 && (
                <p className="py-8 text-center text-[12px] text-ink/50">No staff match &ldquo;{query}&rdquo;.</p>
              )}
            </div>
            <p className="mt-3 text-[11px] text-ink/40">
              Showing {staff.length} of {hrPlatform.staff}
            </p>
          </Panel>

          <div className="space-y-4">
            {/* Payroll */}
            <div className="rounded-[16px] bg-ink p-5 text-white">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">September payroll</p>
                <StatusPill tone={payrollRun ? "green" : "amber"}>{payrollRun ? "Paid" : "In approval"}</StatusPill>
              </div>
              <p className="mt-2 font-display text-[26px] font-extrabold tracking-[-0.02em] tabular-nums">KES {kes(GROSS)}</p>
              <dl className="mt-3 space-y-1.5 text-[12px]">
                <div className="flex justify-between">
                  <dt className="text-white/60">Statutory deductions</dt>
                  <dd className="tabular-nums">− KES {kes(STATUTORY)}</dd>
                </div>
                <div className="flex justify-between font-semibold">
                  <dt className="text-white/80">Net to staff</dt>
                  <dd className="tabular-nums">KES {kes(NET)}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["PAYE", "NSSF", "SHIF", "Housing Levy"].map((d) => (
                  <span key={d} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden /> {d}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-[11px] text-white/60">
                  <span>Payslips approved</span>
                  <span className="tabular-nums">
                    {approved} / {hrPlatform.staff}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gold"
                    initial={false}
                    animate={{ width: `${(approved / hrPlatform.staff) * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </div>

            {/* Leave requests */}
            <Panel title="Leave requests" action={<StatusPill tone={pending ? "amber" : "green"}>{pending} pending</StatusPill>}>
              <ul className="space-y-2">
                {LEAVE.map((l) => {
                  const d = decisions[l.id] ?? "Pending";
                  return (
                    <li key={l.id} className="flex items-center justify-between gap-3 rounded-[12px] border border-ink/[0.06] bg-sky-mist p-3">
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-semibold text-ink">{l.name}</p>
                        <p className="truncate text-[11px] text-ink/50">
                          {l.type} · {l.days} days · {l.dates}
                        </p>
                      </div>
                      {d === "Pending" ? (
                        <div className="flex shrink-0 gap-1.5">
                          <button
                            type="button"
                            onClick={() => decide(l.id, "Declined")}
                            aria-label={`Decline leave for ${l.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/60 transition-colors hover:border-red-200 hover:text-red-600"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => decide(l.id, "Approved")}
                            aria-label={`Approve leave for ${l.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-earth text-white transition-transform hover:scale-[1.05]"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex shrink-0 items-center gap-2">
                          <StatusPill tone={d === "Approved" ? "green" : "gray"}>{d}</StatusPill>
                          <button
                            type="button"
                            onClick={() => decide(l.id, "Pending")}
                            className="text-[11px] font-semibold text-ink/40 underline-offset-2 hover:text-ink hover:underline"
                          >
                            Undo
                          </button>
                        </div>
                      )}
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
