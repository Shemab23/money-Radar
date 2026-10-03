import type { Asset, Pair } from "@/types/pair";

const USD: Asset = { code: "USD", kind: "fiat", name: "US Dollar" };
const EUR: Asset = { code: "EUR", kind: "fiat", name: "Euro" };
const RWF: Asset = { code: "RWF", kind: "fiat", name: "Rwandan Franc" };
const BTC: Asset = {
  code: "BTC",
  kind: "crypto",
  name: "Bitcoin",
  coingeckoId: "bitcoin",
};
const ETH: Asset = {
  code: "ETH",
  kind: "crypto",
  name: "Ethereum",
  coingeckoId: "ethereum",
};

function make(base: Asset, quote: Asset): Pair {
  const touchesRwf = base.code === "RWF" || quote.code === "RWF";
  return {
    id: base.code + "-" + quote.code,
    base,
    quote,
    label: base.code + "/" + quote.code,
    subtitle: base.name + " to " + quote.name,
    sourceText:
      base.kind === "crypto"
        ? "CoinGecko"
        : touchesRwf
          ? "Frankfurter (BNR)"
          : "Frankfurter",
  };
}

export const presetPairs: Pair[] = [
  make(USD, RWF),
  make(EUR, RWF),
  make(USD, EUR),
  make(BTC, USD),
  make(ETH, USD),
];

export const defaultWatchlist: string[] = ["USD-RWF", "EUR-RWF", "BTC-USD"];

export const isKnownPairId = (id: string) =>
  presetPairs.some((p) => p.id === id);

export function requirePair(id: string): Pair {
  const pair = presetPairs.find((p) => p.id === id);
  if (!pair) throw new Error("Unknown pair: " + id);
  return pair;
}
