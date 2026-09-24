import type { Metadata } from "next";
import { Clock, Headset, MapPin } from "lucide-react";
import PageHero from "@/components/page/PageHero";
import { FeatureCards, Section } from "@/components/page/blocks";
import ContactCTA from "@/components/ContactCTA";
import { LABELLED_HUBS, TOTAL_HUBS } from "@/lib/kenya";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Awake Technologies | Start Your Project",
  description:
    "Tell us what's broken and we'll audit your systems in 45 minutes. Awake Technologies, Nairobi — we reply within 2 hours, even on Sunday.",
  path: "/contact",
});

const regional = LABELLED_HUBS.filter((h) => h.tier === "regional").map((h) => h.name);

export default function ContactPage() {
  return (
    <>
      <PageHero
        tone="light"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        eyebrow="We reply within 2 hours"
        title="Talk to Awake Technologies"
        intro="Leave your number and a line about what you want to build. A senior engineer — not a sales script — will call or WhatsApp you back."
      />
      <ContactCTA />
      <Section id="reach" tone="white" eyebrow="Good to know" title="Other ways we can help">
        <FeatureCards
          items={[
            { title: "Fast replies", desc: "Enquiries are answered within 2 hours — including weekends.", Icon: Clock },
            {
              title: `${site.location} HQ`,
              desc: `Plus ${TOTAL_HUBS} support hubs, including ${regional.slice(0, -1).join(", ")} and ${regional.at(-1)}.`,
              Icon: MapPin,
            },
            { title: "Existing clients", desc: "Raise a ticket on SupportDesk by WhatsApp or email for 24/7 help under your SLA.", Icon: Headset },
          ]}
        />
      </Section>
    </>
  );
}
