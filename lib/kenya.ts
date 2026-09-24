/**
 * Stylised Kenya map geometry — equirectangular projection of real lon/lat points.
 * Everything is computed with plain arithmetic + integer PRNG (no Math.sin/log),
 * so server and browser produce byte-identical output (no hydration drift).
 */

const K = 40; // px per degree
const LON0 = 33.8;
const LAT0 = 5.1;
export const MAP_W = 328;
export const MAP_H = 396;

type LonLat = readonly [number, number];

export const project = (lon: number, lat: number) => ({
  x: +((lon - LON0) * K).toFixed(1),
  y: +((LAT0 - lat) * K).toFixed(1),
});

// Clockwise from the north-west (Ilemi) — simplified national border
const BORDER: LonLat[] = [
  [33.99, 4.22], [34.39, 4.61], [35.3, 5.02], [35.92, 4.62], [36.04, 4.45], [36.85, 4.45],
  [38.12, 3.6], [38.67, 3.62], [39.56, 3.42], [39.86, 3.87], [40.77, 4.26], [41.17, 3.92],
  [41.89, 3.98], [40.99, 2.78], [40.99, -0.85], [41.56, -1.67], [41.0, -2.05], [40.63, -2.55],
  [40.26, -2.57], [40.12, -3.27], [39.8, -3.68], [39.6, -4.35], [39.2, -4.68], [37.76, -3.68],
  [37.7, -3.1], [34.07, -1.06], [33.95, -0.55], [34.25, -0.32], [33.95, 0.1], [34.09, 0.37],
  [34.58, 1.1], [34.79, 1.22], [35.02, 1.9], [34.91, 2.52], [34.64, 3.1], [34.44, 3.67],
];

const TURKANA: LonLat[] = [
  [36.0, 4.5], [36.25, 4.2], [36.4, 3.5], [36.65, 2.9], [36.6, 2.45], [36.45, 2.6], [36.1, 3.3], [35.95, 4.0],
];

const toPath = (pts: LonLat[]) =>
  pts.map(([lon, lat], i) => {
    const { x, y } = project(lon, lat);
    return `${i ? "L" : "M"}${x} ${y}`;
  }).join(" ") + " Z";

export const OUTLINE_PATH = toPath(BORDER);
export const TURKANA_PATH = toPath(TURKANA);

function inside([lon, lat]: LonLat, poly: LonLat[]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

export type Hub = { name: string; lon: number; lat: number; tier: "hq" | "regional"; labelSide: "left" | "right"; hideLabelOnMobile?: boolean };

export const LABELLED_HUBS: Hub[] = [
  { name: "Nairobi HQ", lon: 36.82, lat: -1.29, tier: "hq", labelSide: "right" },
  { name: "Mombasa", lon: 39.67, lat: -4.04, tier: "regional", labelSide: "left" },
  { name: "Kisumu", lon: 34.76, lat: -0.09, tier: "regional", labelSide: "left" },
  { name: "Eldoret", lon: 35.27, lat: 0.51, tier: "regional", labelSide: "right" },
  { name: "Nakuru", lon: 36.07, lat: -0.3, tier: "regional", labelSide: "right", hideLabelOnMobile: true },
  { name: "Garissa", lon: 39.65, lat: -0.45, tier: "regional", labelSide: "left" },
  { name: "Lodwar", lon: 35.6, lat: 3.12, tier: "regional", labelSide: "left" },
];

export const TOTAL_HUBS = 120;

// Population-weighted seeds so field hubs cluster where people are
const SEEDS: (readonly [number, number, number])[] = [
  [36.82, -1.29, 6], [39.67, -4.04, 3], [34.76, -0.09, 3], [36.07, -0.3, 2], [35.27, 0.51, 2],
  [37.65, 0.05, 1], [37.26, -1.52, 1], [34.75, 0.28, 2], [35.0, 1.0, 1], [39.85, -3.63, 1],
  [38.56, -3.4, 1], [40.06, 1.75, 1], [37.99, 2.33, 1], [36.95, -0.42, 1], [35.28, -0.37, 1],
  [34.77, -0.68, 2], [40.12, -3.22, 1], [37.58, 0.35, 1], [35.87, -1.08, 1], [38.01, -1.37, 1],
  [39.65, -0.45, 1], [35.6, 3.12, 1],
];
const SEED_WEIGHT = SEEDS.reduce((s, [, , w]) => s + w, 0);

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Dot = { x: number; y: number; delay: number };

function generateFieldDots(count: number): Dot[] {
  const rand = mulberry32(2026);
  const MIN_D2 = 0.13 * 0.13;
  const taken: LonLat[] = LABELLED_HUBS.map((h) => [h.lon, h.lat] as const);
  const dots: LonLat[] = [];

  for (let attempt = 0; dots.length < count && attempt < 40_000; attempt++) {
    let p: LonLat;
    if (rand() < 0.72) {
      let pick = rand() * SEED_WEIGHT;
      let s = SEEDS[0];
      for (const seed of SEEDS) {
        pick -= seed[2];
        if (pick <= 0) { s = seed; break; }
      }
      // Irwin–Hall ≈ gaussian jitter, arithmetic only
      p = [s[0] + (rand() + rand() + rand() - 1.5) * 0.6, s[1] + (rand() + rand() + rand() - 1.5) * 0.6];
    } else {
      p = [33.9 + rand() * 8, -4.7 + rand() * 9.7];
    }
    if (!inside(p, BORDER) || inside(p, TURKANA)) continue;
    if (taken.some(([a, b]) => (a - p[0]) * (a - p[0]) + (b - p[1]) * (b - p[1]) < MIN_D2)) continue;
    taken.push(p);
    dots.push(p);
  }

  // Delay grows with distance from HQ → dots ripple outward from Nairobi
  const hq = project(36.82, -1.29);
  const pts = dots.map(([lon, lat]) => project(lon, lat));
  const d2 = pts.map(({ x, y }) => (x - hq.x) * (x - hq.x) + (y - hq.y) * (y - hq.y));
  const max = Math.max(...d2);
  return pts.map((pt, i) => ({ ...pt, delay: +((d2[i] / max) * 1.1).toFixed(3) }));
}

export const FIELD_DOTS = generateFieldDots(TOTAL_HUBS - LABELLED_HUBS.length);
