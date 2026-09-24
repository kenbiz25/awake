/**
 * Shared primitives for the product demo dashboards.
 * Light product UI, framed inside the dark LiveDemos section.
 */

export type Tone = "green" | "amber" | "red" | "gray" | "blue";

const TONES: Record<Tone, string> = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  red: "border-red-200 bg-red-50 text-red-700",
  gray: "border-ink/10 bg-ink/[0.04] text-ink/60",
  blue: "border-water/20 bg-water/[0.07] text-water",
};

const DOTS: Record<Tone, string> = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  gray: "bg-ink/30",
  blue: "bg-water",
};

export function StatusPill({ tone, children, dot = false }: { tone: Tone; children: React.ReactNode; dot?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold ${TONES[tone]}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${DOTS[tone]}`} aria-hidden />}
      {children}
    </span>
  );
}

type AppBarProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

export function AppBar({ icon, title, subtitle, right }: AppBarProps) {
  return (
    <div className="flex min-h-[60px] flex-wrap items-center justify-between gap-3 border-b border-ink/[0.06] bg-white px-4 py-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-white" aria-hidden>
          {icon}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-ink">{title}</p>
          {subtitle && <p className="truncate text-[11px] text-ink/50">{subtitle}</p>}
        </div>
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}

type KpiProps = {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  dark?: boolean;
};

export function Kpi({ label, value, hint, dark = false }: KpiProps) {
  return (
    <div
      className={`rounded-[14px] border p-3.5 sm:p-4 ${dark ? "border-ink bg-ink text-white" : "border-ink/[0.06] bg-white text-ink"}`}
    >
      <p className={`text-[10px] font-semibold uppercase tracking-widest ${dark ? "text-white/50" : "text-ink/40"}`}>{label}</p>
      <p className="mt-1.5 font-display text-[18px] font-extrabold tracking-[-0.02em] tabular-nums sm:text-[20px]">{value}</p>
      {hint && <p className={`mt-1 text-[11px] ${dark ? "text-white/60" : "text-ink/50"}`}>{hint}</p>}
    </div>
  );
}

type PanelProps = {
  title: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Panel({ title, action, className = "", children }: PanelProps) {
  return (
    <section className={`rounded-[16px] border border-ink/[0.06] bg-white p-4 sm:p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="text-[13px] font-semibold text-ink">{title}</h4>
        {action}
      </div>
      {children}
    </section>
  );
}

type SegmentedProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  counts?: Partial<Record<T, number>>;
};

/** Small pill toggle used for ranges and filters inside dashboards. */
export function Segmented<T extends string>({ options, value, onChange, label, counts }: SegmentedProps<T>) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full border border-ink/10 bg-sky-mist p-0.5">
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o)}
            className={`h-7 whitespace-nowrap rounded-full px-3 text-[11px] font-semibold transition-colors ${
              active ? "bg-ink text-white shadow-sm" : "text-ink/50 hover:text-ink"
            }`}
          >
            {o}
            {counts?.[o] !== undefined && <span className={`ml-1 ${active ? "text-white/60" : "text-ink/35"}`}>{counts[o]}</span>}
          </button>
        );
      })}
    </div>
  );
}

const AVATAR_TONES = ["bg-ink text-white", "bg-water text-white", "bg-earth text-white", "bg-gold text-ink", "bg-sky text-ink"];

export function Avatar({ name, index = 0 }: { name: string; index?: number }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
    >
      {initials}
    </span>
  );
}
