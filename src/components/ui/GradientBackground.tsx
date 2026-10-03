import { LinearGradient } from "expo-linear-gradient";
import { type ColorValue, type ViewProps } from "react-native";

function calculateGradientAngle(degree: number) {
  const angle = (degree % 360) * (Math.PI / 180);
  return {
    start: { x: 0.5 - Math.sin(angle) / 2, y: 0.5 + Math.cos(angle) / 2 },
    end: { x: 0.5 + Math.sin(angle) / 2, y: 0.5 - Math.cos(angle) / 2 },
  };
}

/**
 * Helper to apply alpha transparency to Hex color values dynamically
 */
function applyOpacityToColor(color: ColorValue, opacity: number): ColorValue {
  const strColor = String(color);
  // Check if it's a hex code (e.g., #ffffff or #fff)
  if (strColor.startsWith("#")) {
    const cleanHex = strColor.replace("#", "");
    let r = 0,
      g = 0,
      b = 0;

    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else if (cleanHex.length === 6 || cleanHex.length === 8) {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    } else {
      return color; // Fallback for irregular values
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color; // Return unchanged if it's already rgba or a system color string
}

interface GradientBackgroundProps extends ViewProps {
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  angle?: number;
  locations?: readonly [number, number, ...number[]];
  /** Global opacity scalar for the gradient background colors. Values from 0 to 1 (e.g. 0.5 for 50% opacity) */
  opacity?: number;
  className?: string;
}

export function GradientBackground({
  colors,
  angle = 45,
  locations,
  opacity,
  children,
  className,
  style,
  ...props
}: GradientBackgroundProps) {
  const { start, end } = calculateGradientAngle(angle);

  // Convert human-readable 0-100 integers to native 0.0-1.0 floats
  const nativeLocations = locations
    ? (locations.map((val) => val / 100) as unknown as readonly [
        number,
        number,
        ...number[],
      ])
    : undefined;

  // Map over the colors tuple and apply transparency parameters if provided
  const processedColors =
    opacity !== undefined
      ? (colors.map((color) =>
          applyOpacityToColor(color, opacity),
        ) as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]])
      : colors;

  return (
    <LinearGradient
      colors={processedColors}
      start={start}
      end={end}
      locations={nativeLocations}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}
