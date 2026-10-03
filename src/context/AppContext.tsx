import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { colorScheme } from "nativewind";

export type ThemePref = "system" | "light" | "dark";

type AppContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  themePref: ThemePref;
  setThemePref: (p: ThemePref) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [themePref, setThemePrefState] = useState<ThemePref>("system");

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const setThemePref = useCallback((p: ThemePref) => {
    setThemePrefState(p);
    colorScheme.set(p);
  }, []);

  const value = useMemo(
    () => ({ favorites, toggleFavorite, themePref, setThemePref }),
    [favorites, toggleFavorite, themePref, setThemePref],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
