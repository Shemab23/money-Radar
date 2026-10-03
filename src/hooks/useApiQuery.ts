import { useQuery } from "@tanstack/react-query";
import type { Guard } from "../services/guards";
import { request, type Params } from "../services/http";

type Options<T, M> = {
  key: readonly unknown[];
  endpoint: string;
  params?: Params;
  guard: Guard<T>;
  select?: (data: T) => M; // maps the API shape to the screen model
  enabled?: boolean;
};

export function useApiQuery<T, M = T>({
  key,
  endpoint,
  params,
  guard,
  select,
  enabled,
}: Options<T, M>) {
  return useQuery<T, Error, M>({
    queryKey: key,
    queryFn: ({ signal }) => request({ endpoint, params, guard, signal }),
    select,
    enabled,
  });
}
