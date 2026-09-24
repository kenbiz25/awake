import Link from "next/link";
import Logo from "./Logo";
import { company, industries, site, solutions, type NavLink } from "@/lib/site";

function Column({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h3 className="mb-4 text-[13px] font-semibold text-white">{title}</h3>
      <ul className="space-y-2.5 text-[13px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-cascade bg-[#070B16] text-white/60">
      <div className="container-x py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_1fr_0.8fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo muted />
            <p className="mt-4 max-w-[320px] text-[13px] leading-[1.6] text-white/40">{site.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px]">
              {site.location}
            </div>
          </div>
          <Column title="Solutions" links={solutions} />
          <Column title="Industries" links={industries} />
          <Column title="Company" links={company} />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[11px] text-white/30 md:flex-row md:items-center">
          <p>
            © {year} {site.name} Ltd • Best GovTech Company Kenya 2025
          </p>
          <p className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
            All systems operational • 99.9% uptime
          </p>
        </div>
      </div>
    </footer>
  );
}
