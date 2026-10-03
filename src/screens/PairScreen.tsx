import { BehaviorCard } from "@/components/sections/reading/BehaviorCard";
import { Disclaimer } from "@/components/sections/reading/Disclaimer";
import { ExchangeCard } from "@/components/sections/reading/ExchangeCard";
import { PairHero } from "@/components/sections/reading/PairHero";
import { ReadingPanel } from "@/components/sections/reading/ReadingPanel";
import { TimeframeRow } from "@/components/sections/reading/TimeframeRow";
import { ToleranceSlider } from "@/components/sections/reading/ToleranceSlider";
import { VerdictCard } from "@/components/sections/reading/VerdictCard";
import { AppText } from "@/components/ui/AppText";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import {
  behaviorWords,
  buildHeadline,
  chipText,
  pastCasesText,
} from "@/content/behaviorText";
import { buildVerdict } from "@/content/verdictText";
import { requirePair } from "@/data/pairs";
import { usePairView } from "@/hooks/usePairView";
import { formatDay, formatPct, formatPrice } from "@/lib/format";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";

import { strings } from "@/content/strings";
import { ScreenLayout } from "@/layouts/ScreenLayout";
import { assetSymbol } from "@/lib/symbols";
import type { TimeframeId } from "@/types/series";

export function PairScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pair = requirePair(id);
  const [tf, setTf] = useState<TimeframeId>("3M");
  const [tol, setTol] = useState(0.5);

  const { query, series, sliced, range, fit, behavior, pattern } = usePairView(
    id,
    tf,
    tol,
  );

  const hero = useMemo(() => {
    if (!series || series.points.length === 0) return null;
    const first = sliced[0]?.v ?? series.points[0].v;
    const last = series.points[series.points.length - 1].v;
    const changePct = (last / first - 1) * 100;
    return {
      label: pair.label,
      priceText: formatPrice(last),
      changeText: formatPct(changePct),
      direction: (changePct > 0 ? "up" : changePct < 0 ? "down" : "flat") as
        | "up"
        | "down"
        | "flat",
      asOfText: "As of " + formatDay(series.asOf),
      sourceText: pair.sourceText,
    };
  }, [series, sliced, pair]);

  const exchange = useMemo(() => {
    if (!series || series.points.length === 0) return null;
    const last = series.points[series.points.length - 1].v;
    return {
      rate: last,
      baseSymbol: assetSymbol(pair.base.code),
      quoteCode: pair.quote.code,
      rateText: formatPrice(last),
    };
  }, [series, pair]);

  const chart = useMemo(() => {
    if (!series || sliced.length < 2) return null;
    const values = sliced.map((p) => p.v);
    return {
      points: values,
      line: fit?.line ?? [],
      low: fit?.low ?? [],
      high: fit?.high ?? [],
      hasFit: !!fit,
      startLabel: formatDay(sliced[0].t),
      endLabel: formatDay(sliced[sliced.length - 1].t),
    };
  }, [series, sliced, fit]);

  const behaviorCard = useMemo(() => {
    if (!series) return { available: false, message: strings.loadingRates };
    if (series.granularity !== "daily")
      return { available: false, message: strings.behaviorNeedsDaily };
    if (!behavior)
      return { available: false, message: strings.behaviorNeedsHistory };
    const tone = behaviorWords[behavior.behavior].tone;
    return {
      available: true,
      chipText: chipText(behavior),
      chipTone: tone,
      headline: buildHeadline(behavior),
      stats: [
        { label: "Streak", value: behavior.streakDays + "d" },
        { label: "Avg/day", value: formatPct(behavior.avgDailyPct) },
        { label: "Total", value: formatPct(behavior.totalPct) },
      ],
      pastCases: pastCasesText(pattern, behavior),
    };
  }, [series, behavior, pattern]);

  const toleranceData = useMemo(
    () => ({
      value: tol,
      min: range.min,
      max: range.max,
      step: range.step,
      valueText: tol.toFixed(2) + "%",
      coverageText: fit
        ? fit.coveragePct.toFixed(0) + "% of days inside the band"
        : "",
    }),
    [tol, range, fit],
  );

  const verdictData = useMemo(
    () => (fit ? buildVerdict(fit, tol, series!.granularity, tf) : null),
    [fit, tol, series, tf],
  );

  if (query.isLoading) {
    return (
      <ScreenLayout>
        <ScreenHeader title={pair.label} />
        <AppText>{strings.loadingRates}</AppText>
      </ScreenLayout>
    );
  }
  if (query.isError || !series) {
    return (
      <ScreenLayout>
        <ScreenHeader title={pair.label} />
        <AppText>{strings.loadError}</AppText>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <ScreenHeader title={pair.label} />
      {exchange && <ExchangeCard data={exchange} />}
      {hero && <PairHero data={hero} />}
      <TimeframeRow value={tf} onChange={setTf} />
      <ReadingPanel data={chart} />
      {fit && <ToleranceSlider data={toleranceData} onChange={setTol} />}
      {verdictData && <VerdictCard data={verdictData} />}
      <BehaviorCard data={behaviorCard} />
      <Disclaimer />
    </ScreenLayout>
  );
}
