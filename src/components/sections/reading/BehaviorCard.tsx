import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import type { BehaviorCardData } from "@/types/sections";
import { View } from "react-native";

export function BehaviorCard({ data }: { data: BehaviorCardData }) {
  if (!data.available) {
    return (
      <Card>
        <AppText variant="heading">Behaviour</AppText>
        <AppText variant="caption" tone="muted" style={{ marginTop: 4 }}>
          {data.message}
        </AppText>
      </Card>
    );
  }
  return (
    <Card>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <AppText variant="heading">Behaviour</AppText>
        {data.chipText && data.chipTone && (
          <Chip label={data.chipText} tone={data.chipTone} />
        )}
      </View>
      {data.headline && (
        <AppText style={{ marginTop: 6 }}>{data.headline}</AppText>
      )}
      {data.stats && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 10,
          }}
        >
          {data.stats.map((s) => (
            <View key={s.label}>
              <AppText variant="caption" tone="muted">
                {s.label}
              </AppText>
              <AppText variant="heading">{s.value}</AppText>
            </View>
          ))}
        </View>
      )}
      {data.pastCases && (
        <AppText variant="caption" tone="muted" style={{ marginTop: 10 }}>
          {data.pastCases}
        </AppText>
      )}
    </Card>
  );
}
