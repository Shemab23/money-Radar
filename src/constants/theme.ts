export type ThemeMode = "light" | "dark";

export interface Palette {
  bg: string;
  card: string;
  text: string;
  heading: string;
  muted: string;
  border: string;
  brand: string;
  brandSoft: string;
  onBrand: string;
  up: string;
  down: string;
  flat: string;
}

export const palettes: Record<ThemeMode, Palette> = {
  light: {
    bg: "#FBFCFA",
    card: "#F2F5EF",
    text: "#2A2F26",
    heading: "#151812",
    muted: "#6B7366",
    border: "#E1E6DB",
    brand: "#7B9A6D",
    brandSoft: "rgba(123,154,109,0.14)",
    onBrand: "#151812",
    up: "#3F8F68",
    down: "#C0624A",
    flat: "#8A9282",
  },
  dark: {
    bg: "#2B3028",
    card: "#343A31",
    text: "#D5DBCF",
    heading: "#F1F4EC",
    muted: "#9CA596",
    border: "#454C41",
    brand: "#7B9A6D",
    brandSoft: "rgba(123,154,109,0.22)",
    onBrand: "#151812",
    up: "#74C49A",
    down: "#E48C76",
    flat: "#9CA596",
  },
};
