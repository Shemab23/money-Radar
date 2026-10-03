const FIAT_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  RWF: "FRw",
  KES: "KSh",
  NGN: "₦",
  ZAR: "R",
  CAD: "C$",
  AUD: "A$",
  CHF: "CHF",
};

export function assetSymbol(code: string): string {
  return FIAT_SYMBOLS[code] ?? code;
}
