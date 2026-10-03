import type { SeriesPoint } from "@/types/series";

export const mean = (a: number[]) =>
  a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0;

export function median(a: number[]): number {
  if (!a.length) return 0;
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export function pctChanges(points: SeriesPoint[]): number[] {
  const out: number[] = [];
  for (let i = 1; i < points.length; i++)
    out.push((points[i].v / points[i - 1].v - 1) * 100);
  return out;
}
