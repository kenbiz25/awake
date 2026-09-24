# Awake Technologies — Website

Marketing and SEO site for Awake Technologies, a B2B and GovTech agency in Nairobi. The home page is a single cascading page (hero → proof → ROI calculator → product demos → map → pricing → testimonials → contact form). Around it sit 20 SEO pages: solutions, industries, case studies, pricing, contact and security.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide icons

## Getting started

Requires Node.js 18.17 or later.

```bash
npm install
cp .env.example .env.local   # then fill in CONTACT_WEBHOOK_URL
npm run dev                  # http://localhost:3030
```

The first visit to each page in dev compiles it, which can take a minute or more on Windows. Later reloads are fast. Adding the project folder to Microsoft Defender's exclusions speeds this up considerably.

| Script | What it does |
|---|---|
| `npm run dev` | Dev server on port 3030 |
| `npm run dev:clean` | Clear the `.next` cache, then start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build on port 3030 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

If the dev server shows `Cannot find module './NNN.js'` or pages return 500 after a hot reload, the `.next` cache is corrupted (common on Windows). Stop the server and run `npm run dev:clean`.

To run a production build while `npm run dev` is running, build into a separate folder so they don't share `.next`:

```bash
NEXT_DIST_DIR=.next-verify npx next build
NEXT_DIST_DIR=.next-verify npx next start -p 3100
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `CONTACT_WEBHOOK_URL` | In production | Where contact-form leads are POSTed as JSON. Without it, dev logs leads to the console and production returns **503**, so leads are never silently lost. |
| `NEXT_DIST_DIR` | No | Build output folder (defaults to `.next`). |

## Project structure

```
app/
  page.tsx                  Home — the cascading one-pager
  solutions/[slug]/         8 solution pages (static, from lib/solutions.ts)
  industries/[slug]/        government · enterprise · ngo (lib/industries.ts)
  case-studies/             Index + 5 detail pages (lib/case-studies.ts)
  pricing/ contact/ security/
  api/contact/route.ts      Lead intake: validation, honeypot, webhook delivery
  sitemap.ts robots.ts opengraph-image.tsx not-found.tsx
components/
  Header, Hero, StatsBar, ROICalculator, CaseBento, LiveDemos, EcosystemMap,
  GrowthCarousel, Pricing, Testimonials, ContactCTA, Footer, CountUp
  demos/                    Interactive dashboards (Pay, HR, SupportDesk, Vault)
  page/                     Sub-page building blocks: PageHero, Section, FeatureCards,
                            ProcessSteps, FAQList, LinkCards, CaseCards, JsonLd
lib/                        All content and business data (see below)
```

## Editing content

Copy and numbers live in `lib/`, not in components. Change a figure once and every page that uses it updates.

| File | Controls |
|---|---|
| `lib/site.ts` | Site name, domain, nav, footer links |
| `lib/case-studies.ts` | Every case-study metric (revenue, transactions, hours saved, SLA…) and the detail-page stories |
| `lib/pricing.ts` | Tiers, prices per mode (Retainer / Project / Government), "starts from" |
| `lib/solutions.ts` | The 8 solution pages: H1, meta, features, process, FAQs |
| `lib/industries.ts` | The 3 industry pages |
| `lib/kenya.ts` | Map geometry and the 120 support hubs |
| `lib/contact.ts` | Form interests and validation rules, shared by the form and the API |

Several values are calculated rather than typed in, so they can't drift apart. For example, the county revenue growth % is calculated from its before/after figures, and dashboard totals are calculated from their rows. Update the source number, not the result.

### Adding a solution page

Add an entry to `SOLUTIONS` in `lib/solutions.ts`. The page, the sitemap entry and the structured data are generated from it. Keep `metaTitle` to 60 characters or fewer and `metaDescription` to 160 or fewer; in development, `lib/seo.ts` warns when either is longer. Link it from the footer in `lib/site.ts`.

## Design rules

These are fixed. Keep them consistent when adding sections.

- **Container:** `.container-x` → `max-w-[1280px] mx-auto px-6 md:px-10`
- **Section cascade:** `.section-cascade` → `relative z-10 -mt-10 rounded-t-[40px]`. Alternate background colours between neighbouring sections so the rounded edge shows.
- **Radius:** cards `rounded-[24px]`, buttons `rounded-full`
- **Buttons:** `.btn` (includes `hover:scale-[1.02]`)
- **Type:** Plus Jakarta Sans 800 at `-0.03em` for H1/H2, Inter for body, Instrument Serif italic for quotes
- **Colours** (`tailwind.config.ts`): Sky `sky` #E0F2FE · Water `water` #2A2FFF / `ink` #0A0F1E · Earth `earth` #0B5C2F / `earth-soft` #E8F7EB · `gold` #FACC15

Every page ends with `<ContactCTA />` (`id="contact"`), so CTAs link to `#contact` on the same page.

## SEO

- Page metadata always goes through `pageMetadata()` in `lib/seo.ts`. It sets the canonical URL, Open Graph, Twitter card and share image. Don't set `openGraph` directly on a page: a page's own `openGraph` replaces the parent's and drops the share image.
- Structured data: Organization (site-wide), Service and FAQPage on solution pages, BreadcrumbList on every sub-page.
- FAQs use native `<details>`, so they work without JavaScript.
- `robots.txt` blocks `/api/`, and `sitemap.xml` lists every page.
- The share image (`app/opengraph-image.tsx`) runs on the edge runtime to work around a Next 14 `@vercel/og` bug on Windows.

## Contact API

`POST /api/contact` accepts `{ name, phone, email?, interests[], plan?, website }`.

- It validates with the same rules as the form (`lib/contact.ts`) and normalises Kenyan mobiles (`07…`, `01…`, `254…`) to `+254…`.
- `website` is a honeypot field. When it's filled, the route returns success without delivering anything.
- Responses: `200` ok · `400` bad JSON · `413` too large · `422` invalid fields (`errors` object) · `502` webhook failed · `503` webhook not configured (production).

## Before launch

- [ ] Set the real domain in `lib/site.ts` (`site.url`). It drives canonicals, the sitemap and structured data.
- [ ] Set `CONTACT_WEBHOOK_URL` and send a test lead.
- [ ] Confirm prices in `lib/pricing.ts` (they are placeholders).
- [ ] Confirm case-study metrics and narratives with each client, including the county growth figure (+400% vs +500%) and whether the retail figure is 47M transactions or KES 47M.
- [ ] Have legal counsel review `/security` (privacy notice, retention period, processor commitments).
- [ ] Replace the random picsum photos (hero, growth carousel) with real photography.
- [ ] Submit `sitemap.xml` to Google Search Console and add analytics.
# awake
