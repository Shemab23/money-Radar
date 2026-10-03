import { palettes, type ThemeMode } from "@/constants/theme";
import { ThemeContext, type ThemeChoice } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme } from "react-native";

const KEY = "money-radar:theme:v1";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [choice, setChoiceState] = useState<ThemeChoice>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw === "light" || raw === "dark" || raw === "system") {
          setChoiceState(raw);
        }
      } catch {
        // ignore, default to system
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const setChoice = useCallback((c: ThemeChoice) => {
    setChoiceState(c);
    AsyncStorage.setItem(KEY, c).catch(() => {});
  }, []);

  const mode: ThemeMode =
    choice === "system" ? (system === "dark" ? "dark" : "light") : choice;

  const value = useMemo(
    () => ({
      mode,
      choice,
      colors: palettes[mode],
      setChoice,
      toggle: () => setChoice(mode === "dark" ? "light" : "dark"),
    }),
    [mode, choice, setChoice],
  );

  if (!ready) return null;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
