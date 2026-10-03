import { trendPoints } from "@/lib/testing/fixtures";
import { behaviorState } from "../behavior";
import { patternStat } from "../pattern";

test("steady upward trend yields a pattern stat with baseline", () => {
  const series = {
    pairId: "T",
    points: trendPoints(120, 100, 0.3),
    granularity: "daily" as const,
    asOf: Date.now(),
  };
  const b = behaviorState(series);
  expect(b).not.toBeNull();
  const stat = patternStat(series, b!);
  expect(stat).not.toBeNull();
  expect(stat!.matches).toBeGreaterThan(0);
  expect(stat!.baselinePct).toBeGreaterThan(0);
});

test("monthly returns null", () => {
  const series = {
    pairId: "T",
    points: trendPoints(120, 100, 0.3),
    granularity: "monthly" as const,
    asOf: Date.now(),
  };
  const b = behaviorState(series);
  expect(
    patternStat(
      series,
      b ??
        ({
          direction: "up",
          streakDays: 1,
          pace: "constant",
          behavior: "climbing",
          avgDailyPct: 0,
          totalPct: 0,
          magnitude: "normal",
        } as any),
    ),
  ).toBeNull();
});
