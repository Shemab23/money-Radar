import { trendPoints } from "@/lib/testing/fixtures";
import { fitLinear, toleranceRange } from "../linear";

test("perfect upward line has R2 near 1 and strong fit", () => {
  const fit = fitLinear(trendPoints(30, 100, 0.5), 0.5, "daily");
  expect(fit).not.toBeNull();
  expect(fit!.r2).toBeGreaterThan(0.99);
  expect(fit!.fit).toBe("strong");
  expect(fit!.slope).toBeGreaterThan(0);
});

test("too few points returns null", () => {
  expect(fitLinear(trendPoints(5, 100, 0.5), 0.5, "daily")).toBeNull();
});

test("toleranceRange returns sane values", () => {
  const r = toleranceRange(trendPoints(60, 100, 0.5));
  expect(r.max).toBeGreaterThan(r.min);
  expect(r.initial).toBeGreaterThanOrEqual(r.min);
  expect(r.initial).toBeLessThanOrEqual(r.max);
});
