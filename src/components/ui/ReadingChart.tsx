import { useState } from "react";
import { View } from "react-native";
import Svg, { Polygon, Polyline } from "react-native-svg";
import { scaleXY, toPoints } from "@/lib/chart";
import { useTheme } from "@/hooks/useTheme";
import type { ChartData } from "@/types/sections";

export function ReadingChart({
  data,
  height = 190,
}: {
  data: ChartData;
  height?: number;
}) {
  const { colors } = useTheme();
  const [width, setWidth] = useState(0);

  const all = data.hasFit
    ? [...data.points, ...data.low, ...data.high]
    : data.points;
  const min = Math.min(...all);
  const max = Math.max(...all);
  const price = width > 0 ? scaleXY(data.points, width, height, min, max) : [];
  const line =
    width > 0 && data.hasFit ? scaleXY(data.line, width, height, min, max) : [];
  const lo =
    width > 0 && data.hasFit ? scaleXY(data.low, width, height, min, max) : [];
  const hi =
    width > 0 && data.hasFit ? scaleXY(data.high, width, height, min, max) : [];

  return (
    <View
      style={{ height }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {width > 0 && (
        <Svg width={width} height={height}>
          {data.hasFit && (
            <Polygon
              points={toPoints([...hi, ...lo.slice().reverse()])}
              fill={colors.brandSoft}
            />
          )}
          {data.hasFit && (
            <Polyline
              points={toPoints(line)}
              fill="none"
              stroke={colors.brand}
              strokeWidth={1.5}
              strokeDasharray="5 4"
            />
          )}
          <Polyline
            points={toPoints(price)}
            fill="none"
            stroke={colors.heading}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </View>
  );
}
