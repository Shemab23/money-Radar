import { layout } from "@/constants/layout";
import { useTheme } from "@/hooks/useTheme";
import type { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenLayout({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: "100%",
            maxWidth: layout.maxWidth,
            paddingHorizontal: layout.pad,
            gap: layout.gap,
          }}
        >
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
