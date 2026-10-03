import type { FitQuality, LinearFit } from "@/types/analysis";
import type { Granularity, SeriesPoint } from "@/types/series";
import { mean } from "./stats";

const DAY = 86_400_000;
export const MIN_FIT_POINTS = 8;

export function fitLinear(
  points: SeriesPoint[],
  tolerancePct: number,
  granularity: Granularity,
): LinearFit | null {
  const n = points.length;
  if (n < MIN_FIT_POINTS) return null;

  const x0 = points[0].t;
  const xs = points.map((p) => (p.t - x0) / DAY);
  const ys = points.map((p) => p.v);
  const mx = mean(xs);
  const my = mean(ys);
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
    syy += (ys[i] - my) ** 2;
  }
  const slope = sxx === 0 ? 0 : sxy / sxx;
  const intercept = my - slope * mx;
  const r2 = syy === 0 ? 1 : (sxy * sxy) / (sxx * syy);
  const at = (x: number) => intercept + slope * x;

  const tol = tolerancePct / 100;
  const line = xs.map(at);
  const low = line.map((v) => v * (1 - tol));
  const high = line.map((v) => v * (1 + tol));

  const deviationPct = (ys[n - 1] / line[n - 1] - 1) * 100;
  const position =
    Math.abs(deviationPct) <= tolerancePct
      ? "inside"
      : deviationPct > 0
        ? "above"
        : "below";
  let inside = 0;
  for (let i = 0; i < n; i++)
    if (Math.abs(ys[i] / line[i] - 1) * 100 <= tolerancePct) inside++;

  const stepDays = granularity === "daily" ? 1 : 30;
  const unit: "day" | "month" = granularity === "daily" ? "day" : "month";
  const projection = [1, 2].map((steps) => {
    const expected = at(xs[n - 1] + steps * stepDays);
    return {
      steps,
      unit,
      expected,
      low: expected * (1 - tol),
      high: expected * (1 + tol),
    };
  });

  const fit: FitQuality =
    r2 >= 0.8 ? "strong" : r2 >= 0.5 ? "moderate" : "weak";
  return {
    slope,
    slopePctPerStep: ((slope * stepDays) / line[n - 1]) * 100,
    r2,
    fit,
    line,
    low,
    high,
    deviationPct,
    position,
    coveragePct: (inside / n) * 100,
    projection,
  };
}

export function toleranceRange(points: SeriesPoint[]) {
  const fallback = { min: 0.05, max: 2, step: 0.05, initial: 0.5 };
  const fit = fitLinear(points, 0, "daily");
  if (!fit) return fallback;
  const resid = points.map((p, i) => (p.v / fit.line[i] - 1) * 100);
  const rms = Math.sqrt(mean(resid.map((r) => r * r)));
  const max = Math.max(0.2, Math.ceil(rms * 300) / 100);
  const step = max / 100;
  const initial = Math.min(max, Math.max(step, Math.round(rms * 100) / 100));
  return { min: step, max, step, initial };
}
