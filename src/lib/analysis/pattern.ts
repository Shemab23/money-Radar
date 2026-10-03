import type { BehaviorState, PatternStat } from "@/types/analysis";
import type { PairSeries } from "@/types/series";
import { buildPrefix, stateAt } from "./behavior";
import { median, pctChanges } from "./stats";

export const MIN_MATCHES = 15;

export const stateKey = (s: BehaviorState) =>
  s.direction + "|" + Math.min(s.streakDays, 4) + "|" + s.pace;

export function patternStat(
  series: PairSeries,
  today: BehaviorState,
  horizon = 2,
): PatternStat | null {
  if (series.granularity !== "daily" || today.direction === "flat") return null;
  const changes = pctChanges(series.points);
  const prefix = buildPrefix(changes);
  const key = stateKey(today);

  const moves: number[] = [];
  let kept = 0;
  let allCases = 0;
  let allKept = 0;

  for (let i = 10; i + horizon < changes.length; i++) {
    const s = stateAt(changes, i, prefix);
    if (!s || s.direction === "flat") continue;
    let growth = 1;
    for (let k = 1; k <= horizon; k++) growth *= 1 + changes[i + k] / 100;
    const move = (growth - 1) * 100;
    const continued = (s.direction === "up" ? move : -move) > 0;
    allCases++;
    if (continued) allKept++;
    if (stateKey(s) === key) {
      moves.push(move);
      if (continued) kept++;
    }
  }

  return {
    horizon,
    matches: moves.length,
    continuedPct: moves.length ? (kept / moves.length) * 100 : 0,
    medianMovePct: median(moves),
    worstPct: moves.length ? Math.min(...moves) : 0,
    bestPct: moves.length ? Math.max(...moves) : 0,
    baselinePct: allCases ? (allKept / allCases) * 100 : 0,
    reliable: moves.length >= MIN_MATCHES,
  };
}
