"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CONTACT_HREF } from "@/lib/site";

const HERO_IMG = "https://picsum.photos/seed/awake-hero/1920/1280?grayscale";

export default function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink md:items-center"
    >
      {/* Photo is decorative; the ink base + gradients carry the design if it fails to load */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_IMG}
        alt=""
        aria-hidden
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity"
      />
      <div aria-hidden className="absolute inset-0 bg-water/20 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
      />
      <div aria-hidden className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-water/25 blur-[100px]" />

      {/* Bottom padding accounts for the 40px overlap of the stats bar */}
      <div className="container-x relative z-10 pb-[120px] pt-[120px] md:pb-[140px]">
        <div className="max-w-[760px]">
          <motion.div
            {...fadeUp(0)}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] font-medium tracking-wide text-white/80 backdrop-blur"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" aria-hidden />
            Trusted by 120+ teams across East Africa
          </motion.div>

          <motion.h1
            id="hero-title"
            {...fadeUp(0.08)}
            className="text-[44px] leading-[0.95] text-white sm:text-[60px] lg:text-[84px] lg:leading-[0.88]"
          >
            The smarter way to build and scale
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-[560px] text-[17px] leading-[1.55] text-white/70 md:text-[19px]"
          >
            We build websites, platforms, payments, HR, data &amp; support systems for businesses, NGOs and
            governments — systems that actually work.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={CONTACT_HREF} className="btn h-12 bg-white px-7 text-[15px] text-ink">
              Start your project <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/#cases"
              className="btn h-12 border border-white/15 bg-white/10 px-7 text-[15px] font-medium text-white backdrop-blur hover:bg-white/15"
            >
              View case studies
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
