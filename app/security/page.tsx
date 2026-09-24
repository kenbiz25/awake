import type { Metadata } from "next";
import { Activity, Code2, DatabaseBackup, Fingerprint, Lock, ShieldCheck } from "lucide-react";
import PageHero from "@/components/page/PageHero";
import { FeatureCards, PrimaryButton, Section } from "@/components/page/blocks";
import ContactCTA from "@/components/ContactCTA";
import { CONTACT_HREF } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

/* ⚠ Security and privacy commitments below must be reviewed by legal counsel before launch. */

export const metadata: Metadata = pageMetadata({
  title: "Security & Data Protection | Awake Technologies",
  description:
    "How we protect client and citizen data: encryption, least-privilege access, backups, 24/7 monitoring and breach response under the Kenya DPA 2019.",
  path: "/security",
});

const controls = [
  { title: "Encryption everywhere", desc: "Data is encrypted in transit and at rest. Field devices encrypt records before they ever leave the phone.", Icon: Lock },
  { title: "Least-privilege access", desc: "Role-based access, multi-factor authentication for our staff and quarterly access reviews.", Icon: Fingerprint },
  { title: "Backups & recovery", desc: "Automated daily backups with restores tested regularly, so a bad day never becomes lost data.", Icon: DatabaseBackup },
  { title: "24/7 monitoring", desc: "Uptime and security monitoring around the clock, with an on-call engineer and a written incident-response plan.", Icon: Activity },
  { title: "Secure development", desc: "Peer-reviewed code, dependency updates and security testing before every major release.", Icon: Code2 },
  { title: "Privacy by design", desc: "We collect the minimum data a system needs, capture consent and set retention rules from the start.", Icon: ShieldCheck },
];

const rights = [
  "Be told how your personal data is used",
  "Access the personal data we hold about you",
  "Correct inaccurate or incomplete data",
  "Have your data deleted or its use restricted",
  "Object to processing, including for marketing",
  "Complain to the Office of the Data Protection Commissioner (ODPC)",
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Security", href: "/security" },
        ]}
        eyebrow="Kenya DPA 2019 · GDPR"
        title="Security and data protection"
        intro="Counties, companies and NGOs trust us with revenue, payroll and beneficiary data. Here is exactly how we protect it — and how we handle the details you share with us."
        actions={<PrimaryButton href={CONTACT_HREF}>Ask a security question</PrimaryButton>}
      />

      <Section id="controls" tone="white" eyebrow="How we protect systems" title="Security controls on every project">
        <FeatureCards items={controls} />
      </Section>

      <Section
        id="compliance"
        tone="soft"
        eyebrow="Compliance"
        title="Built around the Kenya Data Protection Act"
        intro="When we build or run a system for you, we act as your data processor under a written agreement. You stay in control of your data; we provide the technical and organisational measures the law requires."
      >
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <article className="rounded-[24px] border border-ink/5 bg-white p-7">
            <h3 className="font-display text-[20px] font-extrabold tracking-[-0.02em]">Breach response</h3>
            <p className="mt-3 text-[14px] leading-[1.7] text-ink/65">
              If a personal-data breach affects your system, we notify you without delay and support you in notifying the Data
              Commissioner within the 72 hours the Act requires — with the facts, the impact and what we have done about it.
            </p>
          </article>
          <article className="rounded-[24px] border border-ink/5 bg-white p-7">
            <h3 className="font-display text-[20px] font-extrabold tracking-[-0.02em]">GDPR for international partners</h3>
            <p className="mt-3 text-[14px] leading-[1.7] text-ink/65">
              Working with European donors or partners? The same controls — consent, data-subject rights, audit logs and
              processor agreements — support your GDPR obligations too.
            </p>
          </article>
        </div>
      </Section>

      <Section id="privacy" tone="white" eyebrow="Privacy notice" title="When you contact us">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="space-y-6 text-[15px] leading-[1.75] text-ink/70">
            <p>
              <strong className="text-ink">What we collect.</strong> Your name, phone number, optional work email, the systems
              you&apos;re interested in and any plan you selected.
            </p>
            <p>
              <strong className="text-ink">Why.</strong> Only to respond to your enquiry and, if you become a client, to deliver
              our services. We never sell your data or share it for third-party marketing.
            </p>
            <p>
              <strong className="text-ink">Who sees it.</strong> Our team, and the tools we use to manage enquiries, under
              agreements that protect your data.
            </p>
            <p>
              <strong className="text-ink">How long.</strong> Enquiries are kept for up to 24 months unless you become a client
              or ask us to delete them sooner.
            </p>
          </div>
          <div className="rounded-[24px] bg-ink p-7 text-white">
            <h3 className="font-display text-[20px] font-extrabold tracking-[-0.02em]">Your rights</h3>
            <ul className="mt-5 space-y-3">
              {rights.map((r) => (
                <li key={r} className="flex gap-3 text-[14px] leading-[1.5] text-white/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/10 pt-5 text-[13px] leading-[1.6] text-white/60">
              To use any of these rights — or to report a security vulnerability — contact us through the form below. We
              verify your identity before acting on a data request.
            </p>
          </div>
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
