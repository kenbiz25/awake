"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, Loader2, X } from "lucide-react";
import { INTERESTS, validateLead, type LeadErrors } from "@/lib/contact";
import { onIntent } from "@/lib/intent";

type Status = "idle" | "submitting" | "success" | "error";

const promises = ["No lock-in", "30-day launch", "KRA / donor ready"];

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-[12px] font-semibold">
        {label}
        {optional && <span className="font-normal text-ink/40">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 pl-4 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (invalid: boolean) =>
  `mt-2 h-11 w-full rounded-full border bg-sky-mist px-4 text-[14px] text-ink placeholder:text-ink/35 transition-colors focus:bg-white ${
    invalid ? "border-red-300 focus:border-red-400" : "border-ink/10 focus:border-water"
  }`;

export default function ContactCTA() {
  const uid = useId();
  const ids = { name: `${uid}-name`, email: `${uid}-email`, phone: `${uid}-phone`, interests: `${uid}-interests` };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [interests, setInterests] = useState<string[]>([]);
  const [plan, setPlan] = useState<string | null>(null);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState("");

  useEffect(
    () =>
      onIntent(({ plan: p, interest }) => {
        if (p) setPlan(p);
        if (interest) setInterests((prev) => (prev.includes(interest) ? prev : [...prev, interest]));
        setStatus((s) => (s === "success" ? "idle" : s));
      }),
    [],
  );

  const toggle = (i: string) => setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, email, phone, interests, plan: plan ?? undefined };
    const { lead, errors: errs } = validateLead(payload);
    setErrors(errs);
    if (!lead) {
      const first = (["name", "phone", "email"] as const).find((k) => errs[k]);
      if (first) document.getElementById(ids[first])?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, website }),
      });
      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.errors ?? {});
        setStatus("idle");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setSentTo(lead.phone.replace(/^\+254(\d{3})(\d{3})(\d{3})$/, "+254 $1 $2 $3"));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setInterests([]);
    setPlan(null);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-cascade overflow-hidden bg-ink text-white">
      {/* grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div aria-hidden className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-water/20 blur-[100px]" />
      <div aria-hidden className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-earth/25 blur-[100px]" />

      <div className="container-x relative py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="contact-title" className="text-[36px] leading-[0.92] md:text-[64px] md:leading-[0.9]">
              Ready to make the switch?
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.6] text-white/60 md:text-[17px]">
              We&apos;ll audit your current systems in 45 minutes and show you exactly how much you&apos;ll save. No sales deck
              — just numbers.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[13px] text-white/75">
                  <Check className="h-4 w-4 text-gold" aria-hidden /> {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[24px] bg-white p-6 text-ink shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center"
                  role="status"
                >
                  <CheckCircle2 className="mx-auto h-12 w-12 text-earth" aria-hidden />
                  <h3 className="mt-4 font-display text-[26px] font-extrabold tracking-[-0.03em]">
                    Asante, {name.trim().split(" ")[0]}!
                  </h3>
                  <p className="mx-auto mt-2 max-w-[320px] text-[14px] leading-[1.6] text-ink/60">
                    We&apos;ll call or WhatsApp you on <span className="font-semibold text-ink">{sentTo}</span> within 2 hours.
                  </p>
                  <button type="button" onClick={reset} className="mt-6 text-[13px] font-semibold text-water hover:underline">
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-[13px] font-semibold uppercase tracking-widest text-ink/40">Start your project</p>
                  <h3 className="mt-2 font-display text-[24px] font-extrabold leading-[1.1] tracking-[-0.03em]">Tell us what&apos;s broken</h3>

                  {plan && (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-earth-soft py-1 pl-3 pr-1 text-[12px] font-semibold text-earth">
                      Plan: {plan}
                      <button
                        type="button"
                        onClick={() => setPlan(null)}
                        aria-label="Remove selected plan"
                        className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-earth/10"
                      >
                        <X className="h-3 w-3" aria-hidden />
                      </button>
                    </p>
                  )}

                  <div className="mt-6 space-y-4">
                    <Field id={ids.name} label="Your name" error={errors.name}>
                      <input
                        id={ids.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        placeholder="Wanjiku Kamau"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? `${ids.name}-error` : undefined}
                        className={inputCls(!!errors.name)}
                      />
                    </Field>

                    <Field id={ids.phone} label="Phone / WhatsApp" error={errors.phone}>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-[14px] font-semibold text-ink/60">
                          +254
                        </span>
                        <input
                          id={ids.phone}
                          type="tel"
                          inputMode="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          autoComplete="tel-national"
                          placeholder="712 345 678"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? `${ids.phone}-error` : undefined}
                          className={`${inputCls(!!errors.phone)} pl-[62px]`}
                        />
                      </div>
                    </Field>

                    <Field id={ids.email} label="Work email" error={errors.email} optional>
                      <input
                        id={ids.email}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        placeholder="you@company.co.ke"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? `${ids.email}-error` : undefined}
                        className={inputCls(!!errors.email)}
                      />
                    </Field>

                    <fieldset>
                      <legend className="text-[12px] font-semibold">What do you want to build?</legend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {INTERESTS.map((i) => {
                          const on = interests.includes(i);
                          return (
                            <button
                              key={i}
                              type="button"
                              aria-pressed={on}
                              onClick={() => toggle(i)}
                              className={`flex h-10 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 text-left text-[12px] font-medium transition-colors ${
                                on ? "border-ink bg-ink text-white" : "border-ink/10 bg-sky-mist hover:border-ink hover:bg-white"
                              }`}
                            >
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                  on ? "border-white bg-white text-ink" : "border-ink/20"
                                }`}
                                aria-hidden
                              >
                                {on && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                              </span>
                              <span>{i}</span>
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    {/* Honeypot — hidden from people and assistive tech */}
                    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                      <label>
                        Website
                        <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn h-12 w-full bg-water text-[14px] text-white disabled:cursor-wait disabled:opacity-80 disabled:hover:scale-100"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                        </>
                      ) : (
                        <>
                          I&apos;m Interested <ArrowRight className="h-4 w-4" aria-hidden />
                        </>
                      )}
                    </button>

                    <div aria-live="assertive">
                      {status === "error" && (
                        <p className="rounded-[12px] bg-red-50 px-4 py-3 text-center text-[12px] text-red-700">
                          We couldn&apos;t send that just now. Please try again in a moment.
                        </p>
                      )}
                    </div>

                    <p className="text-center text-[11px] leading-[1.5] text-ink/40">
                      By submitting, you agree to our{" "}
                      <Link href="/security#privacy" className="underline underline-offset-2 hover:text-ink">
                        data policy
                      </Link>
                      . We reply within 2 hours — even on Sunday.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
