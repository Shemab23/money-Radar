import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import type { PresetOptionData } from "@/types/sections";
import { Pressable, View } from "react-native";

export function PresetRow({
  data,
  onToggle,
}: {
  data: PresetOptionData;
  onToggle: () => void;
}) {
  return (
    <Pressable onPress={onToggle} accessibilityRole="button">
      {({ pressed }) => (
        <Card style={{ opacity: pressed ? 0.8 : 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <AppText variant="heading">{data.label}</AppText>
              <AppText variant="caption" tone="muted">
                {data.subtitle}
              </AppText>
            </View>
            <Chip
              label={data.added ? "Added" : "Add"}
              tone={data.added ? "flat" : "brand"}
              selected={data.added}
            />
          </View>
        </Card>
      )}
    </Pressable>
  );
}
