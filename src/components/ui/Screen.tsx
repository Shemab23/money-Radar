import { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Screen({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#0f172a" }}
    >
      <View className="flex-1 px-4">
        <Text className="text-white text-2xl font-bold my-4">
          Hello from {name}
        </Text>
        {children}
      </View>
    </SafeAreaView>
  );
}
