import type { TimeframeId } from "./series";

export type Tone = "up" | "down" | "flat";

export interface HeaderData {
  title: string;
  subtitle: string;
  updatedLabel: string;
}

export interface PairRowData {
  pairId: string;
  label: string;
  status: "ready" | "loading" | "error";
  priceText: string;
  changeText: string;
  direction: Tone;
  sparkline: number[];
  chip: { text: string; tone: Tone } | null;
  note: string | null;
}

export interface EmptyStateData {
  title: string;
  body: string;
  actionLabel: string;
}

export interface PairHeroData {
  label: string;
  priceText: string;
  changeText: string;
  direction: Tone;
  asOfText: string;
  sourceText: string;
}

export interface TimeframeOption {
  id: TimeframeId;
  label: string;
}

export interface ChartData {
  points: number[];
  line: number[];
  low: number[];
  high: number[];
  hasFit: boolean;
  startLabel: string;
  endLabel: string;
}

export interface ToleranceData {
  value: number;
  min: number;
  max: number;
  step: number;
  valueText: string;
  coverageText: string;
}

export interface ProjectionRow {
  label: string;
  expectedText: string;
  rangeText: string;
}

export interface VerdictData {
  headline: string;
  lines: string[];
  projection: ProjectionRow[];
}

export interface BehaviorCardData {
  available: boolean;
  message?: string;
  chipText?: string;
  chipTone?: Tone;
  headline?: string;
  stats?: { label: string; value: string }[];
  pastCases?: string;
}

export interface TextData {
  body: string;
}

export interface PresetOptionData {
  pairId: string;
  label: string;
  subtitle: string;
  added: boolean;
}

export interface ExchangeData {
  rate: number;
  baseSymbol: string;
  quoteCode: string;
  rateText: string;
}
