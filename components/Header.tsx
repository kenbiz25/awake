"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { CONTACT_HREF, mainNav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-[#0A0F1E]/70 backdrop-blur-xl">
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-8 text-[14px] text-white/70 lg:flex">
            {mainNav.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link href={CONTACT_HREF} className="btn hidden h-10 bg-white px-5 text-[14px] text-ink md:inline-flex">
            Contact
          </Link>
          <Link href={CONTACT_HREF} className="btn hidden h-10 bg-water px-5 text-[14px] text-white sm:inline-flex">
            Start Project <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/15 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#0A0F1E]/90 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-5">
              {mainNav.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[12px] px-3 py-3 text-[16px] text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href={CONTACT_HREF}
                onClick={() => setOpen(false)}
                className="btn mt-3 h-12 bg-water text-[15px] text-white"
              >
                Start Project <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
