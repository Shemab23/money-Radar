import { EmptyState } from "@/components/sections/watchlist/EmptyState";
import { Header } from "@/components/sections/watchlist/Header";
import { PairRow } from "@/components/sections/watchlist/PairRow";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { chipText } from "@/content/behaviorText";
import { strings } from "@/content/strings";
import { requirePair } from "@/data/pairs";
import { seriesQueryOptions } from "@/hooks/usePairSeries";
import { useWatchlist } from "@/hooks/usewatchlist";
import { ScreenLayout } from "@/layouts/ScreenLayout";
import { behaviorState } from "@/lib/analysis/behavior";
import { formatPct, formatPrice } from "@/lib/format";
import { sliceTimeframe } from "@/lib/mappers/series";
import type { PairRowData } from "@/types/sections";
import { useQueries } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";

export function WatchlistScreen() {
  const router = useRouter();
  const { ids } = useWatchlist();
  const results = useQueries({
    queries: ids.map((id) => seriesQueryOptions(id)),
  });

  const rows: PairRowData[] = useMemo(() => {
    return ids.map((id, i) => {
      const pair = requirePair(id);
      const q = results[i];
      if (q.isLoading) {
        return {
          pairId: id,
          label: pair.label,
          status: "loading",
          priceText: "",
          changeText: "",
          direction: "flat",
          sparkline: [],
          chip: null,
          note: null,
        };
      }
      if (q.isError || !q.data) {
        return {
          pairId: id,
          label: pair.label,
          status: "error",
          priceText: "",
          changeText: "",
          direction: "flat",
          sparkline: [],
          chip: null,
          note: "Could not load",
        };
      }
      const series = q.data;
      const tf = sliceTimeframe(series.points, "1M");
      const spark = tf.map((p) => p.v);
      const first = tf[0]?.v ?? series.points[0].v;
      const last = series.points[series.points.length - 1].v;
      const changePct = (last / first - 1) * 100;
      const b = behaviorState(series);
      return {
        pairId: id,
        label: pair.label,
        status: "ready",
        priceText: formatPrice(last),
        changeText: formatPct(changePct),
        direction: (changePct > 0 ? "up" : changePct < 0 ? "down" : "flat") as
          | "up"
          | "down"
          | "flat",
        sparkline: spark,
        chip: b
          ? {
              text: chipText(b),
              tone:
                b.direction === "up"
                  ? "up"
                  : b.direction === "down"
                    ? "down"
                    : "flat",
            }
          : null,
        note:
          series.granularity === "monthly"
            ? "Monthly data — straight-line view only"
            : null,
      };
    });
  }, [ids, results]);

  return (
    <ScreenLayout>
      <Header onAdd={() => router.push({ pathname: "/add-pair" })} />
      {rows.length === 0 ? (
        <EmptyState
          data={strings.emptyWatchlist}
          onAdd={() => router.push({ pathname: "/add-pair" })}
        />
      ) : (
        <View style={{ gap: 12 }}>
          {rows.map((r) => (
            <PairRow
              key={r.pairId}
              data={r}
              onPress={() =>
                router.push({
                  pathname: "/pair/[id]",
                  params: { id: r.pairId },
                })
              }
            />
          ))}
        </View>
      )}
    </ScreenLayout>
  );
}
