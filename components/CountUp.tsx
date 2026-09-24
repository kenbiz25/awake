"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-KE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Counts from 0 to `end` the first time it scrolls into view — never again.
 * The final value is always exposed to screen readers and crawlers.
 */
export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasRun.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hasRun.current = true;
      setValue(end);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          setValue(t < 1 ? eased * end : end);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  const finalText = `${prefix}${format(end, decimals)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{finalText}</span>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        {format(value, decimals)}
        {suffix}
      </span>
    </span>
  );
}
