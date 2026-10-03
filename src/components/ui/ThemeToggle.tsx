import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react-native";
import { Pressable, useColorScheme } from "react-native";

export function ThemeToggle() {
  const { colors, choice, setChoice } = useTheme();
  const systemColorScheme = useColorScheme();

  const isDark =
    choice === "dark" || (choice === "system" && systemColorScheme === "dark");

  const handleToggle = () => {
    setChoice(isDark ? "light" : "dark");
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDark ? "light" : "dark"} mode`}
      onPress={handleToggle}
      hitSlop={8}
      style={({ pressed }) => ({
        position: "absolute",
        top: 50, // 👈 Increased slightly to sit cleanly below the iOS status bar / notch area
        right: 30,
        zIndex: 19, // 👈 High zIndex ensures it stays on top of headers and lists

        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.4 : 0.08,
        shadowRadius: 4,
        elevation: 5,

        opacity: pressed ? 0.8 : 1,
        transform: [{ scale: pressed ? 0.96 : 1 }],
      })}
    >
      {isDark ? (
        <Sun size={18} color={colors.brand} />
      ) : (
        <Moon size={18} color={colors.muted} />
      )}
    </Pressable>
  );
}
