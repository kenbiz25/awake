import CountUp from "./CountUp";

const stats = [
  { end: 120, suffix: "+", label: "Systems shipped" },
  { end: 99.9, decimals: 1, suffix: "%", label: "Uptime SLA" },
  { end: 47, prefix: "KES ", suffix: "M+", label: "Processed via M-Pesa" },
  { end: 30, suffix: " days", label: "Average launch" },
];

export default function StatsBar() {
  return (
    <section aria-label="Awake Technologies in numbers" className="section-cascade bg-[#0B0B0B] text-white">
      <div className="container-x py-12 md:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col md:px-8 md:first:pl-0 md:last:pr-0">
              <dt className="order-2 mt-3 text-[11px] font-semibold uppercase tracking-widest text-white/50 md:text-[12px]">
                {s.label}
              </dt>
              <dd className="order-1 font-display text-[30px] font-extrabold leading-none tracking-[-0.03em] md:text-[40px] lg:text-[48px]">
                <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
