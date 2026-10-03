import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { useTheme } from "@/hooks/useTheme";
import type { ToleranceData } from "@/types/sections";
import Slider from "@react-native-community/slider";
import { View } from "react-native";

export function ToleranceSlider({
  data,
  onChange,
}: {
  data: ToleranceData;
  onChange: (v: number) => void;
}) {
  const { colors } = useTheme();
  return (
    <Card>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AppText variant="heading">Tolerance band</AppText>
        <AppText variant="heading">{data.valueText}</AppText>
      </View>
      <Slider
        minimumValue={data.min}
        maximumValue={data.max}
        step={data.step}
        value={data.value}
        onValueChange={onChange}
        minimumTrackTintColor={colors.brand}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.brand}
        style={{ marginTop: 8 }}
      />
      <AppText variant="caption" tone="muted">
        {data.coverageText}
      </AppText>
    </Card>
  );
}
