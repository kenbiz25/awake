import type { Metadata } from "next";
import { Database, GraduationCap, KeyRound, Link2, ShieldCheck, Target } from "lucide-react";
import PageHero from "@/components/page/PageHero";
import { FAQList, FeatureCards, PrimaryButton, Section } from "@/components/page/blocks";
import Pricing from "@/components/Pricing";
import ContactCTA from "@/components/ContactCTA";
import { STARTS_FROM, TIERS } from "@/lib/pricing";
import { CONTACT_HREF } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `Pricing from ${STARTS_FROM} | Awake Technologies`,
  description:
    `Monthly retainers from ${STARTS_FROM}, fixed-price projects or tender-ready packages for Kenyan businesses, NGOs and government. No lock-in.`,
  path: "/pricing",
});

const starter = TIERS.find((t) => t.id === "starter")!;

const included = [
  { title: "Training for your team", desc: "On-site or remote sessions and short guides, so nobody depends on us for day-to-day work.", Icon: GraduationCap },
  { title: "Data migration", desc: "We move your existing records across and check them with you before go-live.", Icon: Database },
  { title: "M-Pesa built in", desc: "Paybill, Till and STK Push integration included wherever payments are part of the system.", Icon: Link2 },
  { title: "Security & backups", desc: "Encryption, role-based access and daily backups as standard on every plan.", Icon: ShieldCheck },
  { title: "You own your data", desc: "Export everything at any time. If you leave, your data leaves with you.", Icon: KeyRound },
  { title: "Measured outcomes", desc: "We agree what success looks like up front and report against it.", Icon: Target },
];

const faqs = [
  {
    q: "Do your prices include VAT?",
    a: "No. All prices are in Kenya Shillings and exclude 16% VAT, which is added to every invoice.",
  },
  {
    q: "How do we pay?",
    a: "By M-Pesa Paybill or bank transfer. Retainers are billed monthly in advance; projects are billed in milestones; government contracts follow the payment terms in the tender.",
  },
  {
    q: "Can we start with a project and move to a retainer later?",
    a: "Yes. Many clients launch on a fixed-price project, then move to a retainer for hosting, support and continuous improvements.",
  },
  {
    q: "What isn't included?",
    a: "Third-party costs such as M-Pesa and bank transaction fees, SMS or WhatsApp messaging charges and paid software licences are billed at cost, with no mark-up.",
  },
  {
    q: "Is there a minimum contract?",
    a: `No lock-in. Retainers from ${starter.price.Retainer.amount}${starter.price.Retainer.cadence} can be cancelled with 30 days' notice.`,
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pricing", href: "/pricing" },
        ]}
        eyebrow={`Starts from ${STARTS_FROM}`}
        title="Simple pricing for businesses, NGOs and government"
        intro="Monthly retainer, fixed-price project or tender-ready government package — pick the model that fits how you buy. Every plan comes with training, security and a team that answers."
        actions={<PrimaryButton href={CONTACT_HREF}>Get a fixed quote</PrimaryButton>}
      />
      <Pricing />
      <Section id="included" tone="white" eyebrow="On every plan" title="Included as standard">
        <FeatureCards items={included} />
      </Section>
      <Section id="faq" tone="soft" eyebrow="FAQ" title="Pricing questions">
        <FAQList faqs={faqs} />
      </Section>
      <ContactCTA />
    </>
  );
}
