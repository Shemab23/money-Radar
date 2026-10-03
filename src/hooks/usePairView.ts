import { usePairSeries } from "@/hooks/usePairSeries";
import { behaviorState } from "@/lib/analysis/behavior";
import { fitLinear, toleranceRange } from "@/lib/analysis/linear";
import { patternStat } from "@/lib/analysis/pattern";
import { sliceTimeframe } from "@/lib/mappers/series";
import type { TimeframeId } from "@/types/series";
import { useMemo } from "react";

export function usePairView(
  pairId: string,
  tf: TimeframeId,
  tolerancePct: number,
) {
  const query = usePairSeries(pairId);
  const series = query.data;

  const sliced = useMemo(
    () => (series ? sliceTimeframe(series.points, tf) : []),
    [series, tf],
  );

  const range = useMemo(() => toleranceRange(sliced), [sliced]);
  const fit = useMemo(
    () => (series ? fitLinear(sliced, tolerancePct, series.granularity) : null),
    [series, sliced, tolerancePct],
  );
  const behavior = useMemo(
    () => (series ? behaviorState(series) : null),
    [series],
  );
  const pattern = useMemo(
    () => (series && behavior ? patternStat(series, behavior) : null),
    [series, behavior],
  );

  return { query, series, sliced, range, fit, behavior, pattern };
}
