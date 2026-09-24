import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/solutions";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      <div className="container-x relative flex min-h-[80svh] flex-col justify-center pb-[120px] pt-[140px]">
        <p className="font-display text-[96px] font-extrabold leading-none tracking-[-0.05em] text-water md:text-[160px]">404</p>
        <h1 className="mt-4 text-[36px] leading-[0.95] md:text-[56px]">This page took a wrong turn</h1>
        <p className="mt-5 max-w-[520px] text-[16px] leading-[1.6] text-white/65">
          The link may be old or mistyped. Here are the places people usually mean to go.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn h-12 bg-white px-7 text-[15px] text-ink">
            Back to home <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/#contact" className="btn h-12 border border-white/15 bg-white/10 px-7 text-[15px] font-medium text-white hover:bg-white/15">
            Contact us
          </Link>
        </div>
        <ul className="mt-12 flex flex-wrap gap-2">
          {SOLUTIONS.slice(0, 6).map((s) => (
            <li key={s.slug}>
              <Link
                href={`/solutions/${s.slug}`}
                className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[12px] text-white/70 transition-colors hover:text-white"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
