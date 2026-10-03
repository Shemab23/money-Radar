import {
  detectGranularity,
  mapFiatRows,
  sliceTimeframe,
} from "@/lib/mappers/series";
import type { SeriesPoint } from "@/types/series";

const daily: SeriesPoint[] = Array.from({ length: 30 }, (_, i) => ({
  t: Date.parse("2024-01-01T00:00:00Z") + i * 86_400_000,
  v: 100 + i,
}));

const monthly: SeriesPoint[] = Array.from({ length: 30 }, (_, i) => ({
  t: Date.parse("2024-01-01T00:00:00Z") + i * 30 * 86_400_000,
  v: 100 + i,
}));

test("detects daily", () => expect(detectGranularity(daily)).toBe("daily"));
test("detects monthly", () =>
  expect(detectGranularity(monthly)).toBe("monthly"));
test("too few points defaults to daily", () =>
  expect(detectGranularity(daily.slice(0, 2))).toBe("daily"));

test("sliceTimeframe 1M keeps last 30 days", () => {
  const sliced = sliceTimeframe(daily, "1M");
  expect(sliced.length).toBeLessThanOrEqual(31);
  expect(sliced.length).toBeGreaterThan(25);
});

test("mapFiatRows filters by base and quote", () => {
  const rows = [
    { date: "2024-01-01", base: "USD", quote: "RWF", rate: 1300 },
    { date: "2024-01-02", base: "USD", quote: "RWF", rate: 1305 },
    { date: "2024-01-01", base: "EUR", quote: "RWF", rate: 1400 },
  ];
  const s = mapFiatRows("USD-RWF", "USD", "RWF", rows);
  expect(s.points.length).toBe(2);
  expect(s.granularity).toBe("daily");
});
