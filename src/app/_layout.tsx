import { useTheme } from "@/hooks/useTheme";
import { AppProviders } from "@/providers/AppProviders";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../../global.css";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function RootStack() {
  const { colors, mode } = useTheme();
  return (
    <>
      <ThemeToggle />
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="pair/[id]" />
        <Stack.Screen name="add-pair" options={{ presentation: "modal" }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootStack />
    </AppProviders>
  );
}
