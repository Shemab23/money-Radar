import { WatchlistContext } from "@/context/watchlistContext";
import { useContext } from "react";

export function useWatchlist() {
  const v = useContext(WatchlistContext);
  if (!v) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return v;
}
