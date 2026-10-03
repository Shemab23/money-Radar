import { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { useApiQuery } from "../../hooks/useApiQuery";
import { isRecord } from "../../services/guards";
import type { HomeScreenModel, UserDTO } from "./types";

const isUserDTO = (d: unknown): d is UserDTO =>
  isRecord(d) &&
  typeof d.id === "number" &&
  typeof d.name === "string" &&
  typeof d.email === "string";

export function useHomeModel() {
  const { favorites } = useApp();

  const query = useApiQuery({
    key: ["user", 1],
    endpoint: "/users/1",
    guard: isUserDTO,
  });

  // server data + context data -> one object
  const model = useMemo<HomeScreenModel | undefined>(
    () =>
      query.data
        ? {
            userName: query.data.name,
            email: query.data.email,
            favoritesCount: favorites.length,
          }
        : undefined,
    [query.data, favorites.length],
  );

  return {
    model,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
