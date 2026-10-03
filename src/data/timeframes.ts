import type { TimeframeOption } from "@/types/sections";
import type { TimeframeId } from "@/types/series";

export const timeframes: TimeframeOption[] = [
  { id: "1M", label: "1M" },
  { id: "3M", label: "3M" },
  { id: "1Y", label: "1Y" },
];

export const timeframeDays: Record<TimeframeId, number> = {
  "1M": 30,
  "3M": 90,
  "1Y": 365,
};
