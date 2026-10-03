import { PresetRow } from "@/components/sections/addpair/PresetRow";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { presetPairs } from "@/data/pairs";
import { useWatchlist } from "@/hooks/usewatchlist";
import { ScreenLayout } from "@/layouts/ScreenLayout";
import { useRouter } from "expo-router";
import { View } from "react-native";

export function AddPairScreen() {
  const router = useRouter();
  const { has, add, remove } = useWatchlist();
  return (
    <ScreenLayout>
      <ScreenHeader title="Add a pair" icon="close" />
      <View style={{ gap: 12, marginTop: 8 }}>
        {presetPairs.map((p) => {
          const added = has(p.id);
          return (
            <PresetRow
              key={p.id}
              data={{
                pairId: p.id,
                label: p.label,
                subtitle: p.subtitle,
                added,
              }}
              onToggle={() => {
                if (added) remove(p.id);
                else add(p.id);
              }}
            />
          );
        })}
      </View>
    </ScreenLayout>
  );
}
