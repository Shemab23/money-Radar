import { useTheme } from "@/hooks/useTheme";
import type { LucideIcon } from "lucide-react-native";
import { Pressable } from "react-native";

export function IconButton({
  icon: Icon,
  onPress,
  label,
}: {
  icon: LucideIcon;
  onPress: () => void;
  label: string;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Icon size={18} color={colors.heading} />
    </Pressable>
  );
}
