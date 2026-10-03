import type { Palette, ThemeMode } from "@/constants/theme";
import { createContext } from "react";

export type ThemeChoice = "system" | "light" | "dark";

export interface ThemeValue {
  mode: ThemeMode; // the resolved palette to use right now
  choice: ThemeChoice; // what the user picked
  colors: Palette;
  setChoice: (c: ThemeChoice) => void;
  toggle: () => void; // kept for the existing quick toggle
}

export const ThemeContext = createContext<ThemeValue | null>(null);
