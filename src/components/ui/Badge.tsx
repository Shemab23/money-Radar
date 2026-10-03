import { Text, View } from "react-native";

export function Badge({ label }: { label: string }) {
  return (
    <View className="self-start bg-app-brand/10 border border-app-brand/30 rounded-full px-3 py-1">
      <Text className="text-app-brand font-medium">{label}</Text>
    </View>
  );
}
