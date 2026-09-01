"use client";

import { useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

import { apiFetch } from "@/lib/api/client";

export function useAuthenticatedApi() {
  const { getToken } = useAuth();

  return useCallback(
    async <TResponse,>(path: string, init?: RequestInit) => {
      const token = await getToken();

      return apiFetch<TResponse>(path, {
        ...init,
        token,
      });
    },
    [getToken],
  );
}
