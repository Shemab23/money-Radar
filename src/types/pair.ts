export type AssetKind = "fiat" | "crypto";

export interface Asset {
  code: string;
  kind: AssetKind;
  name: string;
  coingeckoId?: string;
}

export interface Pair {
  id: string;
  base: Asset;
  quote: Asset;
  label: string;
  subtitle: string;
  sourceText: string;
}
