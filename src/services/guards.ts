export type Guard<T> = (data: unknown) => data is T;

export const isRecord = (d: unknown): d is Record<string, unknown> =>
  typeof d === "object" && d !== null;

export const isArrayOf =
  <T>(item: Guard<T>) =>
  (d: unknown): d is T[] =>
    Array.isArray(d) && d.every(item);
