import type {
  BehaviorLabel,
  BehaviorState,
  Direction,
  Magnitude,
  Pace,
} from "@/types/analysis";
import type { PairSeries } from "@/types/series";
import { mean, pctChanges } from "./stats";

export const MIN_CHANGES = 20;
const FLAT_FRACTION = 0.25;

type Sign = -1 | 0 | 1;
const signOf = (r: number, flatBand: number): Sign =>
  Math.abs(r) < flatBand ? 0 : r > 0 ? 1 : -1;

export function buildPrefix(changes: number[]): number[] {
  const prefix: number[] = [];
  let sum = 0;
  for (const c of changes) {
    sum += Math.abs(c);
    prefix.push(sum);
  }
  return prefix;
}

export function stateAt(
  changes: number[],
  end: number,
  prefix: number[],
): BehaviorState | null {
  if (end < 10 || end >= changes.length) return null;
  const vol = prefix[end] / (end + 1);
  if (vol === 0) return null;
  const flatBand = vol * FLAT_FRACTION;
  const lastSign = signOf(changes[end], flatBand);

  if (lastSign === 0) {
    return {
      behavior: "steady",
      direction: "flat",
      streakDays: 0,
      avgDailyPct: changes[end],
      totalPct: 0,
      pace: "constant",
      magnitude: "mild",
    };
  }

  let start = end;
  while (start - 1 >= 0 && signOf(changes[start - 1], flatBand) === lastSign)
    start--;
  const streak = changes.slice(start, end + 1);
  const n = streak.length;
  const avg = mean(streak);
  const totalPct = (streak.reduce((p, r) => p * (1 + r / 100), 1) - 1) * 100;

  let pace: Pace = "constant";
  if (n >= 3) {
    const h = Math.floor(n / 2);
    const first = mean(streak.slice(0, h).map((r) => Math.abs(r)));
    const second = mean(streak.slice(n - h).map((r) => Math.abs(r)));
    if (first > 0) {
      const ratio = second / first;
      pace =
        ratio > 1.15 ? "accelerating" : ratio < 0.87 ? "easing" : "constant";
    }
  }

  const strength = Math.abs(avg) / vol;
  const magnitude: Magnitude =
    strength >= 1.5 ? "fast" : strength <= 0.6 ? "mild" : "normal";
  const direction: Direction = lastSign === 1 ? "up" : "down";

  let prevRun = 0;
  for (
    let j = start - 1;
    j >= 0 && signOf(changes[j], flatBand) === -lastSign;
    j--
  )
    prevRun++;

  let behavior: BehaviorLabel;
  if (n === 1 && prevRun >= 3) behavior = "reversing";
  else if (n >= 3 && pace === "easing") behavior = "stalling";
  else if (direction === "up")
    behavior = magnitude === "fast" ? "surging" : "climbing";
  else behavior = magnitude === "fast" ? "sliding" : "slipping";

  return {
    behavior,
    direction,
    streakDays: n,
    avgDailyPct: avg,
    totalPct,
    pace,
    magnitude,
  };
}

export function behaviorState(series: PairSeries): BehaviorState | null {
  if (series.granularity !== "daily") return null;
  const changes = pctChanges(series.points);
  if (changes.length < MIN_CHANGES) return null;
  return stateAt(changes, changes.length - 1, buildPrefix(changes));
}
