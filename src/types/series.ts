export interface SeriesPoint {
  t: number;
  v: number;
}

export type Granularity = "daily" | "monthly";
export type TimeframeId = "1M" | "3M" | "1Y";

export interface PairSeries {
  pairId: string;
  points: SeriesPoint[];
  granularity: Granularity;
  asOf: number;
}
