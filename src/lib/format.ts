export function formatPrice(v: number): string {
  const max = v >= 1000 ? 2 : v >= 10 ? 3 : 4;
  return v.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: max,
  });
}

export function formatPct(v: number): string {
  const sign = v > 0 ? "+" : v < 0 ? "-" : "";
  return sign + Math.abs(v).toFixed(2) + "%";
}

export function formatDay(t: number): string {
  return new Date(t).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
