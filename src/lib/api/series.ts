import { mapCryptoChart, mapFiatRows } from "@/lib/mappers/series";
import type { Pair } from "@/types/pair";
import type { PairSeries } from "@/types/series";
import { fetchCryptoChart } from "./coingecko";
import { fetchFiatRows } from "./frankfurter";

export const CRYPTO_DAYS = 365;
export const FIAT_DAYS = 1095;

const isoDaysAgo = (d: number) =>
  new Date(Date.now() - d * 86_400_000).toISOString().slice(0, 10);

export async function fetchPairSeries(
  pair: Pair,
  signal?: AbortSignal,
): Promise<PairSeries> {
  if (pair.base.kind === "crypto") {
    const chart = await fetchCryptoChart(
      pair.base.coingeckoId ?? "",
      pair.quote.code.toLowerCase(),
      CRYPTO_DAYS,
      signal,
    );
    return mapCryptoChart(pair.id, chart);
  }
  const rows = await fetchFiatRows(
    pair.base.code,
    pair.quote.code,
    isoDaysAgo(FIAT_DAYS),
    signal,
  );
  return mapFiatRows(pair.id, pair.base.code, pair.quote.code, rows);
}
