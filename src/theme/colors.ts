import { useColorScheme, vars } from "nativewind";

export const palette = {
  light: {
    bg: "#ffffff", // Pure, bright canvas
    card: "#fcfcfd", // Off-white surface with subtle definition
    surface: "#f3f4f6", // Soft contrast grey for inputs/pills
    text: "#374151", // Charcoal grey for readable paragraphs
    heading: "#09090b", // Rich onyx-black for punchy typography
    muted: "#6b7280", // Balanced grey for secondary labels
    border: "#e5e7eb", // Crisp hairline borders
    brand: "#0284c7", // Electric sky blue (Active accent)
    primary: "#09090b", // Dark actionable buttons
    onPrimary: "#ffffff", // Clear text over dark buttons
    danger: "#ef4444", // Vibrant warning/destructive red
    warning: "#f59e0b", // Smooth amber warning
  },
  dark: {
    bg: "#09090b", // Deep obsidian black for true OLED/modern feel
    card: "#121214", // Subtle slate-tinted black for elevated cards
    surface: "#1a1a1e", // Secondary dark surface for contrast
    text: "#a1a1aa", // Smooth zinc grey for readable body text
    heading: "#f4f4f5", // High contrast clean white for headings
    muted: "#71717a", // Muted steel grey for secondary labels
    border: "#27272a", // Subtle dark border to avoid harsh lines
    brand: "#38bdf8", // Neon glow active blue
    primary: "#f4f4f5", // Bright actionable elements
    onPrimary: "#09090b", // Deep dark text inside white buttons
    danger: "#f87171", // Punchy, accessible pastel red
    warning: "#fbbf24", // Warm glowing amber
  },
} as const;

export type ThemeName = keyof typeof palette;
type Palette = Record<keyof typeof palette.light, string>;

// "#0f172a" -> "15 23 42" (the channel format Tailwind's <alpha-value> needs)
const hexToChannels = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};
const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

const toVars = (p: Palette) =>
  vars(
    Object.fromEntries(
      Object.entries(p).map(([k, v]) => [
        `--app-${kebab(k)}`,
        hexToChannels(v),
      ]),
    ) as Parameters<typeof vars>[0],
  );

const themeVars = { light: toVars(palette.light), dark: toVars(palette.dark) };

export function useTheme() {
  const { colorScheme } = useColorScheme();
  const name: ThemeName = colorScheme === "dark" ? "dark" : "light";
  return { name, colors: palette[name], style: themeVars[name] };
}

// for icons, spinners, tab bar (anything that takes a color, not a className)
export const useThemeColors = () => useTheme().colors;
