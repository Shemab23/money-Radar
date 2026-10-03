export type XY = [number, number];

export function scaleXY(
  values: number[],
  width: number,
  height: number,
  min: number,
  max: number,
  pad = 4,
): XY[] {
  const n = values.length;
  const span = max - min || 1;
  return values.map(
    (v, i): XY => [
      n === 1 ? width / 2 : (i / (n - 1)) * width,
      pad + (1 - (v - min) / span) * (height - pad * 2),
    ],
  );
}

export const toPoints = (pts: XY[]) =>
  pts.map(([x, y]) => x.toFixed(1) + "," + y.toFixed(1)).join(" ");
