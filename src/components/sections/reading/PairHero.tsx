import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { useTheme } from "@/hooks/useTheme";
import type { PairHeroData } from "@/types/sections";
import { View } from "react-native";

export function PairHero({ data }: { data: PairHeroData }) {
  const { colors } = useTheme();
  const tone =
    data.direction === "up"
      ? colors.up
      : data.direction === "down"
        ? colors.down
        : colors.flat;
  return (
    <Card>
      <AppText variant="caption" tone="muted">
        {data.label}
      </AppText>
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          gap: 12,
          marginTop: 4,
        }}
      >
        <AppText variant="number">{data.priceText}</AppText>
        <AppText variant="heading" style={{ color: tone }}>
          {data.changeText}
        </AppText>
      </View>
      <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
        <Chip label={data.sourceText} />
        <Chip label={data.asOfText} tone="flat" />
      </View>
    </Card>
  );
}
