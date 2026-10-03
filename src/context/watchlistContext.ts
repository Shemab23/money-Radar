import { createContext } from "react";

export interface WatchlistValue {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  ready: boolean;
}

export const WatchlistContext = createContext<WatchlistValue | null>(null);
