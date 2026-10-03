import type { SeriesPoint } from "@/types/series";

export function trendPoints(
  n: number,
  start: number,
  dailyPct: number,
): SeriesPoint[] {
  const out: SeriesPoint[] = [];
  let v = start;
  const t0 = Date.parse("2024-01-01T00:00:00Z");
  for (let i = 0; i < n; i++) {
    out.push({ t: t0 + i * 86_400_000, v });
    v = v * (1 + dailyPct / 100);
  }
  return out;
}

export function zigzagPoints(
  n: number,
  start: number,
  pct: number,
): SeriesPoint[] {
  const out: SeriesPoint[] = [];
  let v = start;
  const t0 = Date.parse("2024-01-01T00:00:00Z");
  for (let i = 0; i < n; i++) {
    out.push({ t: t0 + i * 86_400_000, v });
    v = v * (1 + (i % 2 === 0 ? pct : -pct) / 100);
  }
  return out;
}
