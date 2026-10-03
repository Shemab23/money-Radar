export type Direction = "up" | "down" | "flat";
export type Pace = "accelerating" | "easing" | "constant";
export type Magnitude = "mild" | "normal" | "fast";
export type BehaviorLabel =
  | "climbing"
  | "surging"
  | "slipping"
  | "sliding"
  | "stalling"
  | "steady"
  | "reversing";
export type FitQuality = "strong" | "moderate" | "weak";

export interface BehaviorState {
  behavior: BehaviorLabel;
  direction: Direction;
  streakDays: number;
  avgDailyPct: number;
  totalPct: number;
  pace: Pace;
  magnitude: Magnitude;
}

export interface PatternStat {
  horizon: number;
  matches: number;
  continuedPct: number;
  medianMovePct: number;
  worstPct: number;
  bestPct: number;
  baselinePct: number;
  reliable: boolean;
}

export interface ProjectionStep {
  steps: number;
  unit: "day" | "month";
  expected: number;
  low: number;
  high: number;
}

export interface LinearFit {
  slope: number;
  slopePctPerStep: number;
  r2: number;
  fit: FitQuality;
  line: number[];
  low: number[];
  high: number[];
  deviationPct: number;
  position: "inside" | "above" | "below";
  coveragePct: number;
  projection: ProjectionStep[];
}
