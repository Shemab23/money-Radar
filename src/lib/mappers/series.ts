import { timeframeDays } from "@/data/timeframes";
import { median } from "@/lib/analysis/stats";
import type { CryptoChart } from "@/lib/api/coingecko";
import type { FiatRow } from "@/lib/api/frankfurter";
import type {
  Granularity,
  PairSeries,
  SeriesPoint,
  TimeframeId,
} from "@/types/series";

const DAY = 86_400_000;

export function detectGranularity(points: SeriesPoint[]): Granularity {
  if (points.length < 3) return "daily";
  const gaps: number[] = [];
  for (let i = 1; i < points.length; i++)
    gaps.push((points[i].t - points[i - 1].t) / DAY);
  return median(gaps) >= 20 ? "monthly" : "daily";
}

export function mapFiatRows(
  pairId: string,
  base: string,
  quote: string,
  rows: FiatRow[],
): PairSeries {
  const points = rows
    .filter((r) => r.base === base && r.quote === quote)
    .map((r) => ({ t: Date.parse(r.date + "T00:00:00Z"), v: r.rate }))
    .sort((a, b) => a.t - b.t);
  return {
    pairId,
    points,
    granularity: detectGranularity(points),
    asOf: points.length ? points[points.length - 1].t : Date.now(),
  };
}

export function mapCryptoChart(pairId: string, chart: CryptoChart): PairSeries {
  const byDay = new Map<number, number>();
  for (const [t, v] of chart.prices) byDay.set(Math.floor(t / DAY) * DAY, v);
  const points = Array.from(byDay.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([t, v]) => ({ t, v }));
  const lastRaw = chart.prices.length
    ? chart.prices[chart.prices.length - 1][0]
    : Date.now();
  return { pairId, points, granularity: "daily", asOf: lastRaw };
}

export function sliceTimeframe(
  points: SeriesPoint[],
  tf: TimeframeId,
): SeriesPoint[] {
  if (!points.length) return points;
  const cutoff = points[points.length - 1].t - timeframeDays[tf] * DAY;
  return points.filter((p) => p.t >= cutoff);
}
