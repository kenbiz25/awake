import Link from "next/link";

export default function Logo({ muted = false }: { muted?: boolean }) {
  return (
    <Link href="/" aria-label="Awake Technologies — home" className="flex shrink-0 items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-water font-display text-[16px] font-extrabold text-white">
        A
      </span>
      <span className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-white">Awake</span>
      <span className={`hidden text-[17px] sm:inline ${muted ? "text-white/40" : "text-white/50"}`}>
        Technologies
      </span>
    </Link>
  );
}
