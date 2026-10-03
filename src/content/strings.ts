import type { EmptyStateData } from "@/types/sections";

export const strings = {
  appName: "Money Radar",
  tagline: "Read how a currency is behaving",
  loadingRates: "Loading rates...",
  loadError: "Could not load this pair. Check your connection and try again.",
  notEnoughPoints:
    "Not enough points in this window for a straight-line view. Try a longer timeframe.",
  behaviorNeedsDaily:
    "Behaviour reading needs daily data, and this pair only publishes monthly rates. The straight-line view still works.",
  behaviorNeedsHistory:
    "Not enough history yet to read behaviour for this pair.",
  disclaimer:
    "Based on past data. Patterns can stop at any time. This is not financial advice.",
  emptyWatchlist: {
    title: "Nothing on your radar yet",
    body: "Add a currency or crypto pair to start reading how it behaves.",
    actionLabel: "Add a pair",
  } satisfies EmptyStateData,
};
