import { formatPrice } from "@/lib/format";
import type { LinearFit } from "@/types/analysis";
import type { VerdictData } from "@/types/sections";
import type { Granularity } from "@/types/series";

export function buildVerdict(
  fit: LinearFit,
  tol: number,
  granularity: Granularity,
  timeframe: string,
): VerdictData {
  const unit = granularity === "daily" ? "day" : "month";
  const lines: string[] = [];
  let headline: string;

  if (fit.fit === "weak") {
    headline = "Not moving in a straight line";
    lines.push(
      "A straight line describes the last " +
        timeframe +
        " poorly (R2 " +
        fit.r2.toFixed(2) +
        "), so treat the band and projection with caution.",
    );
  } else {
    headline =
      "Trending " +
      (fit.slope >= 0 ? "up" : "down") +
      " about " +
      Math.abs(fit.slopePctPerStep).toFixed(2) +
      "% per " +
      unit;
    lines.push(
      "The straight-line fit is " +
        fit.fit +
        " (R2 " +
        fit.r2.toFixed(2) +
        ").",
    );
  }

  if (fit.position === "inside") {
    lines.push(
      "Today sits inside your " + tol.toFixed(2) + "% band: normal wobble.",
    );
  } else {
    lines.push(
      "Today is " +
        Math.abs(fit.deviationPct).toFixed(2) +
        "% " +
        fit.position +
        " the line, outside your " +
        tol.toFixed(2) +
        "% band.",
    );
  }

  const projection = fit.projection.map((p) => ({
    label:
      p.steps === 1 ? "Next " + p.unit : "In " + p.steps + " " + p.unit + "s",
    expectedText: formatPrice(p.expected),
    rangeText: formatPrice(p.low) + " to " + formatPrice(p.high),
  }));

  return { headline, lines, projection };
}
