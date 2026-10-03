import type { Guard } from "./guards";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type Params = Record<string, string | number | boolean | undefined>;

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

type RequestOptions<T> = {
  endpoint: string;
  method?: HttpMethod;
  params?: Params;
  body?: unknown;
  guard: Guard<T>; // validates the response shape
  signal?: AbortSignal;
};

export async function request<T>({
  endpoint,
  method = "GET",
  params,
  body,
  guard,
  signal,
}: RequestOptions<T>): Promise<T> {
  const query = params
    ? "?" +
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(
          ([k, v]) =>
            `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
        )
        .join("&")
    : "";

  const res = await fetch(`${BASE_URL}${endpoint}${query}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (!res.ok) throw new ApiError(res.status, `Request failed (${res.status})`);

  const data: unknown = await res.json();
  if (!guard(data)) throw new ApiError(500, "Unexpected response shape");
  return data;
}
