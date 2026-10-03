import { View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import type { VerdictData } from "@/types/sections";

export function VerdictCard({ data }: { data: VerdictData }) {
  return (
    <Card>
      <AppText variant="heading">{data.headline}</AppText>
      {data.lines.map((l, i) => (
        <AppText key={i} style={{ marginTop: 6 }}>
          {l}
        </AppText>
      ))}
      {data.projection.length > 0 && (
        <View style={{ marginTop: 12, gap: 8 }}>
          {data.projection.map((p) => (
            <View
              key={p.label}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <AppText tone="muted">{p.label}</AppText>
              <AppText>
                {p.expectedText} · {p.rangeText}
              </AppText>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}
