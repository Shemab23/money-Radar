import { View } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { scaleXY, toPoints } from "@/lib/chart";
import { useTheme } from "@/hooks/useTheme";

export function Sparkline({
  values,
  tone,
  width = 84,
  height = 30,
}: {
  values: number[];
  tone: "up" | "down" | "flat";
  width?: number;
  height?: number;
}) {
  const { colors } = useTheme();
  if (values.length < 2) return <View style={{ width, height }} />;
  const pts = scaleXY(
    values,
    width,
    height,
    Math.min(...values),
    Math.max(...values),
  );
  return (
    <Svg width={width} height={height}>
      <Polyline
        points={toPoints(pts)}
        fill="none"
        stroke={colors[tone]}
        strokeWidth={1.8}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}
