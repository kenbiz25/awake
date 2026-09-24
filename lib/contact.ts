/**
 * Contact lead schema — shared by the form (instant feedback) and /api/contact (the real gate).
 */

export const INTERESTS = [
  "Revenue system",
  "M-Pesa integration",
  "HR & Payroll",
  "Data Vault",
  "SupportDesk",
  "Full platform",
] as const;

export type Lead = {
  name: string;
  email: string;
  phone: string;
  interests: string[];
  plan?: string;
};

export type LeadErrors = Partial<Record<"name" | "email" | "phone", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Kenyan mobile → E.164. Accepts 0712…, 712…, 254712…, +254 712 … and the newer 01xx range.
 * Returns null when it isn't a valid Kenyan mobile number.
 */
export function normalizeKenyanPhone(raw: string): string | null {
  let d = raw.replace(/[\s\-().]/g, "");
  if (d.startsWith("+")) d = d.slice(1);
  if (d.startsWith("254")) d = d.slice(3);
  else if (d.startsWith("0")) d = d.slice(1);
  return /^[17]\d{8}$/.test(d) ? `+254${d}` : null;
}

export function validateLead(input: Partial<Lead>): { lead: Lead | null; errors: LeadErrors } {
  const errors: LeadErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim().toLowerCase();
  const phone = normalizeKenyanPhone(input.phone ?? "");

  if (name.length < 2) errors.name = "Tell us who we're talking to.";
  else if (name.length > 80) errors.name = "That name is a little long.";
  if (email && (!EMAIL_RE.test(email) || email.length > 120)) errors.email = "That email doesn't look right.";
  if (!phone) errors.phone = "Enter a Kenyan mobile number, e.g. 712 345 678.";

  const allowed = new Set<string>(INTERESTS);
  const interests = Array.isArray(input.interests) ? input.interests.filter((i) => allowed.has(i)).slice(0, INTERESTS.length) : [];
  const plan = typeof input.plan === "string" ? input.plan.slice(0, 60) : undefined;

  if (Object.keys(errors).length) return { lead: null, errors };
  return { lead: { name, email, phone: phone!, interests, plan }, errors };
}
