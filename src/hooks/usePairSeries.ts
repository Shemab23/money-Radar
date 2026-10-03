import { useQuery } from "@tanstack/react-query";
import { requirePair } from "@/data/pairs";
import { fetchPairSeries } from "@/lib/api/series";
import { qk } from "@/lib/queryKeys";

export const seriesQueryOptions = (pairId: string) => ({
  queryKey: qk.series(pairId),
  queryFn: ({ signal }: { signal?: AbortSignal }) =>
    fetchPairSeries(requirePair(pairId), signal),
  staleTime: 15 * 60_000,
});

export function usePairSeries(pairId: string) {
  return useQuery(seriesQueryOptions(pairId));
}
