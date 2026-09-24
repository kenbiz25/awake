import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

type PageHeroProps = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  tone?: "dark" | "light";
};

/** Sub-page hero: breadcrumbs + H1 + intro. Bottom padding leaves room for the next section's 40px cascade overlap. */
export default function PageHero({ crumbs, eyebrow, title, intro, actions, aside, tone = "dark" }: PageHeroProps) {
  const dark = tone === "dark";
  return (
    <section className={`relative overflow-hidden ${dark ? "bg-ink text-white" : "bg-sky text-ink"}`}>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div
        aria-hidden
        className={`absolute inset-0 [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] ${
          dark
            ? "opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]"
            : "opacity-[0.5] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]"
        }`}
      />
      {dark && <div aria-hidden className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-water/25 blur-[110px]" />}

      <div className="container-x relative pb-[112px] pt-[112px] md:pb-[136px] md:pt-[136px]">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className={`flex flex-wrap items-center gap-1.5 text-[12px] ${dark ? "text-white/50" : "text-ink/50"}`}>
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={c.href} className="flex items-center gap-1.5">
                  {last ? (
                    <span aria-current="page" className={dark ? "text-white/80" : "text-ink/80"}>
                      {c.label}
                    </span>
                  ) : (
                    <>
                      <Link href={c.href} className={`transition-colors ${dark ? "hover:text-white" : "hover:text-ink"}`}>
                        {c.label}
                      </Link>
                      <ChevronRight className="h-3 w-3" aria-hidden />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className={`grid gap-10 ${aside ? "lg:grid-cols-[1fr_340px] lg:items-end" : ""}`}>
          <div className="max-w-[820px]">
            {eyebrow && (
              <p
                className={`mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium tracking-wide ${
                  dark ? "border-white/15 bg-white/10 text-white/80" : "border-ink/10 bg-white text-ink/70"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-gold" aria-hidden />
                {eyebrow}
              </p>
            )}
            <h1 className="text-[40px] leading-[0.95] sm:text-[52px] lg:text-[64px] lg:leading-[0.92]">{title}</h1>
            <p className={`mt-6 max-w-[620px] text-[16px] leading-[1.6] md:text-[18px] ${dark ? "text-white/70" : "text-ink/65"}`}>{intro}</p>
            {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

export function HeroStat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
      <p className="font-display text-[48px] font-extrabold leading-none tracking-[-0.04em] text-white">{value}</p>
      <p className="mt-3 text-[12px] font-semibold uppercase tracking-widest text-white/50">{label}</p>
      {note && <p className="mt-4 border-t border-white/10 pt-4 text-[13px] leading-[1.5] text-white/60">{note}</p>}
    </div>
  );
}
