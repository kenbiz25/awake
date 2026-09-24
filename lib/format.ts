/** 4281920 → "4,281,920" */
export const kes = (n: number) => Math.round(n).toLocaleString("en-KE");

/** 482300 → "482k", 3440000 → "3.44M" — for chart axes and tooltips. */
export const compact = (n: number) =>
  n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(2)}M` : n >= 1_000 ? `${Math.round(n / 1_000)}k` : `${n}`;

/** Percentage change, one decimal: pctChange(3120000, 3440000) → 10.3 */
export const pctChange = (from: number, to: number) => +(((to - from) / from) * 100).toFixed(1);

/** First sentence of a paragraph — for card blurbs derived from longer copy. */
export const leadSentence = (text: string) => text.split(/(?<=\.) /)[0];
