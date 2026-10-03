import { z } from "zod";

const API = "https://api.coingecko.com/api/v3";

const chartSchema = z.object({
  prices: z.array(z.tuple([z.number(), z.number()])),
});

export type CryptoChart = z.infer<typeof chartSchema>;

export async function fetchCryptoChart(
  coinId: string,
  vs: string,
  days: number,
  signal?: AbortSignal,
): Promise<CryptoChart> {
  const key = process.env.EXPO_PUBLIC_COINGECKO_KEY;
  const url =
    API +
    "/coins/" +
    coinId +
    "/market_chart?vs_currency=" +
    vs +
    "&days=" +
    days +
    "&interval=daily";
  const res = await fetch(url, {
    signal,
    headers: key ? { "x-cg-demo-api-key": key } : undefined,
  });
  if (!res.ok) throw new Error("CoinGecko responded " + res.status);
  return chartSchema.parse(await res.json());
}
