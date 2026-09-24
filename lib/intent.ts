/**
 * Tiny event bus so any CTA (pricing card, carousel…) can pre-fill the contact form
 * without prop drilling or URL params on a statically rendered page.
 */

export type Intent = { plan?: string; interest?: string };

const EVENT = "awake:intent";

export function announceIntent(intent: Intent) {
  window.dispatchEvent(new CustomEvent<Intent>(EVENT, { detail: intent }));
}

export function onIntent(cb: (intent: Intent) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<Intent>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
