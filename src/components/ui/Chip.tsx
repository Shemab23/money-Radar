import { useTheme } from "@/hooks/useTheme";
import { Pressable } from "react-native";
import { AppText } from "./AppText";

type Tone = "brand" | "up" | "down" | "flat";

export function Chip({
  label,
  tone = "brand",
  selected = false,
  onPress,
}: {
  label: string;
  tone?: Tone;
  selected?: boolean;
  onPress?: () => void;
}) {
  const { colors } = useTheme();
  const accent = tone === "brand" ? colors.brand : colors[tone];
  const background = selected
    ? colors.brand
    : tone === "brand"
      ? colors.brandSoft
      : accent + "22";
  const textColor = selected
    ? colors.onBrand
    : tone === "brand"
      ? colors.heading
      : accent;
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      accessibilityRole={onPress ? "button" : "text"}
      style={({ pressed }) => ({
        alignSelf: "flex-start",
        backgroundColor: background,
        borderColor: selected ? colors.brand : accent + "55",
        borderWidth: 1,
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 5,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <AppText
        variant="caption"
        style={{ color: textColor, fontWeight: "600" }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}
