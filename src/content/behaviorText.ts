import { formatPct } from "@/lib/format";
import type {
  BehaviorLabel,
  BehaviorState,
  PatternStat,
} from "@/types/analysis";
import type { Tone } from "@/types/sections";

export const behaviorWords: Record<
  BehaviorLabel,
  { word: string; tone: Tone }
> = {
  climbing: { word: "Climbing", tone: "up" },
  surging: { word: "Surging", tone: "up" },
  slipping: { word: "Slipping", tone: "down" },
  sliding: { word: "Sliding", tone: "down" },
  stalling: { word: "Stalling", tone: "flat" },
  steady: { word: "Steady", tone: "flat" },
  reversing: { word: "Reversing", tone: "flat" },
};

export function chipText(s: BehaviorState): string {
  const word = behaviorWords[s.behavior].word;
  return s.streakDays > 0 ? word + " " + s.streakDays + "d" : word;
}

export function buildHeadline(s: BehaviorState): string {
  if (s.behavior === "steady")
    return "Steady: the latest move is within normal wobble";
  const word = behaviorWords[s.behavior].word;
  const days = s.streakDays + (s.streakDays === 1 ? " day" : " days");
  const pace = s.pace === "constant" ? "" : ", " + s.pace;
  return (
    word + " for " + days + pace + " (" + formatPct(s.avgDailyPct) + " per day)"
  );
}

export function pastCasesText(
  stat: PatternStat | null,
  s: BehaviorState,
): string {
  if (!stat) return "No past-case read is available for this situation.";
  if (!stat.reliable)
    return (
      "Only " +
      stat.matches +
      " past cases looked like this, which is too few to read."
    );
  const verb = s.direction === "up" ? "kept rising" : "kept falling";
  const edge = stat.continuedPct - stat.baselinePct;
  const edgeText =
    Math.abs(edge) < 5
      ? "That is about the usual rate, so no clear edge."
      : edge > 0
        ? "That is above the usual rate."
        : "That is below the usual rate.";
  return (
    "In " +
    stat.matches +
    " past cases like this, it " +
    verb +
    " over the next " +
    stat.horizon +
    " days " +
    Math.round(stat.continuedPct) +
    "% of the time. In general it continues " +
    Math.round(stat.baselinePct) +
    "% of the time. " +
    edgeText
  );
}
