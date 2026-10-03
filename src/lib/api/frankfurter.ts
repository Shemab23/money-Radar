import { z } from "zod";

const API = "https://api.frankfurter.dev/v2";

const rowsSchema = z.array(
  z.object({
    date: z.string(),
    base: z.string(),
    quote: z.string(),
    rate: z.number(),
  }),
);

export type FiatRow = z.infer<typeof rowsSchema>[number];

export async function fetchFiatRows(
  base: string,
  quote: string,
  fromISO: string,
  signal?: AbortSignal,
): Promise<FiatRow[]> {
  const usesRwf = base === "RWF" || quote === "RWF";
  const root = usesRwf ? API + "/providers/bnrrw/rates" : API + "/rates";
  const url = root + "?base=" + base + "&quotes=" + quote + "&from=" + fromISO;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Frankfurter responded " + res.status);
  return rowsSchema.parse(await res.json());
}
