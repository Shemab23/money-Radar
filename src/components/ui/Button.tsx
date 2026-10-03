import { layout } from "@/constants/layout";
import { useTheme } from "@/hooks/useTheme";
import { Pressable } from "react-native";
import { AppText } from "./AppText";

export function Button({
  label,
  onPress,
  variant = "primary",
}: {
  label: string;
  onPress: () => void;
  variant?: "primary" | "ghost";
}) {
  const { colors } = useTheme();
  const primary = variant === "primary";
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
        backgroundColor: colors.brand,
        borderColor: colors.brand,
        borderWidth: 1,
        borderRadius: layout.radius,
        paddingVertical: 18,
        alignItems: "center",
      })}
    >
      <AppText
        style={{
          fontWeight: "800",
          color: colors.text,
        }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}
