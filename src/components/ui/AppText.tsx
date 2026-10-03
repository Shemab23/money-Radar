import { useTheme } from "@/hooks/useTheme";
import { Text, type TextProps, type TextStyle } from "react-native";

type Variant = "title" | "heading" | "body" | "caption" | "number";
type Tone = "heading" | "text" | "muted" | "brand" | "up" | "down" | "flat";

const base: Record<Variant, TextStyle> = {
  title: { fontSize: 28, fontWeight: "700", letterSpacing: -0.5 },
  heading: { fontSize: 17, fontWeight: "600", letterSpacing: -0.2 },
  body: { fontSize: 15, lineHeight: 22 },
  caption: { fontSize: 12, lineHeight: 17 },
  number: {
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: -1,
    fontVariant: ["tabular-nums"],
  },
};

export function AppText({
  variant = "body",
  tone,
  style,
  ...rest
}: TextProps & { variant?: Variant; tone?: Tone }) {
  const { colors } = useTheme();
  const fallback: Tone =
    variant === "title" || variant === "heading" || variant === "number"
      ? "heading"
      : variant === "caption"
        ? "muted"
        : "text";
  return (
    <Text
      style={[base[variant], { color: colors[tone ?? fallback] }, style]}
      {...rest}
    />
  );
}
