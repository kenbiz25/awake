import { NextResponse } from "next/server";
import { validateLead } from "@/lib/contact";
import { site } from "@/lib/site";

/**
 * POST /api/contact
 * Delivery: set CONTACT_WEBHOOK_URL (Slack, Make, Zapier, Google Apps Script, CRM…).
 * Without it, dev logs the lead; production refuses (503) so leads are never silently dropped.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 5_000) return NextResponse.json({ error: "too_large" }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: real users never see this field. Pretend success so bots don't retry.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { lead, errors } = validateLead(body);
  if (!lead) return NextResponse.json({ error: "invalid", errors }, { status: 422 });

  const record = { ...lead, source: site.url, receivedAt: new Date().toISOString() };
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `New lead: ${lead.name} · ${lead.phone}${lead.email ? ` · ${lead.email}` : ""}${
            lead.plan ? ` · Plan: ${lead.plan}` : ""
          }${lead.interests.length ? ` · Wants: ${lead.interests.join(", ")}` : ""}`,
          lead: record,
        }),
        signal: AbortSignal.timeout(8_000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[contact] delivery failed", err);
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] lead (dev, no CONTACT_WEBHOOK_URL set)", record);
    return NextResponse.json({ ok: true });
  }

  console.error("[contact] CONTACT_WEBHOOK_URL is not configured — lead not delivered");
  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}
