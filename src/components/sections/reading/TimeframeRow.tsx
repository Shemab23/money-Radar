import { Chip } from "@/components/ui/Chip";
import { timeframes } from "@/data/timeframes";
import type { TimeframeId } from "@/types/series";
import { View } from "react-native";

export function TimeframeRow({
  value,
  onChange,
}: {
  value: TimeframeId;
  onChange: (id: TimeframeId) => void;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {timeframes.map((t) => (
        <Chip
          key={t.id}
          label={t.label}
          selected={value === t.id}
          onPress={() => onChange(t.id)}
        />
      ))}
    </View>
  );
}
