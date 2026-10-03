import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Sparkline } from "@/components/ui/Sparkline";
import { useTheme } from "@/hooks/useTheme";
import type { PairRowData } from "@/types/sections";
import { Pressable, View } from "react-native";

export function PairRow({
  data,
  onPress,
}: {
  data: PairRowData;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  const tone =
    data.direction === "up"
      ? colors.up
      : data.direction === "down"
        ? colors.down
        : colors.flat;
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      {({ pressed }) => (
        <Card style={{ opacity: pressed ? 0.8 : 1 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <AppText variant="heading">{data.label}</AppText>
              <AppText variant="caption" tone="muted" style={{ marginTop: 2 }}>
                {data.status === "loading"
                  ? "Loading…"
                  : data.status === "error"
                    ? "Failed"
                    : data.priceText}
              </AppText>
            </View>
            <View style={{ alignItems: "flex-end", gap: 6 }}>
              {data.status === "ready" && (
                <AppText variant="heading" style={{ color: tone }}>
                  {data.changeText}
                </AppText>
              )}
              <Sparkline values={data.sparkline} tone={data.direction} />
            </View>
          </View>
          {data.chip && (
            <View style={{ marginTop: 8 }}>
              <Chip label={data.chip.text} tone={data.chip.tone} />
            </View>
          )}
          {data.note && (
            <AppText variant="caption" tone="muted" style={{ marginTop: 6 }}>
              {data.note}
            </AppText>
          )}
        </Card>
      )}
    </Pressable>
  );
}
