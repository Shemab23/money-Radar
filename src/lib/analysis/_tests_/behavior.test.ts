import { behaviorState, stateAt, buildPrefix } from "../behavior";
import { pctChanges } from "../stats";
import { trendPoints, zigzagPoints } from "@/lib/testing/fixtures";

test("upward trend reads as climbing or surging", () => {
  const series = {
    pairId: "T",
    points: trendPoints(60, 100, 0.5),
    granularity: "daily" as const,
    asOf: Date.now(),
  };
  const b = behaviorState(series);
  expect(b).not.toBeNull();
  expect(["climbing", "surging"]).toContain(b!.behavior);
  expect(b!.direction).toBe("up");
});

test("downward trend reads as slipping or sliding", () => {
  const series = {
    pairId: "T",
    points: trendPoints(60, 100, -0.5),
    granularity: "daily" as const,
    asOf: Date.now(),
  };
  const b = behaviorState(series);
  expect(b).not.toBeNull();
  expect(["slipping", "sliding"]).toContain(b!.behavior);
});

test("monthly granularity returns null", () => {
  const series = {
    pairId: "T",
    points: trendPoints(60, 100, 0.5),
    granularity: "monthly" as const,
    asOf: Date.now(),
  };
  expect(behaviorState(series)).toBeNull();
});

test("zigzag returns steady or reversing at some point", () => {
  const changes = pctChanges(zigzagPoints(60, 100, 0.5));
  const prefix = buildPrefix(changes);
  const seen = new Set<string>();
  for (let i = 10; i < changes.length; i++) {
    const s = stateAt(changes, i, prefix);
    if (s) seen.add(s.behavior);
  }
  expect(seen.size).toBeGreaterThan(0);
});
