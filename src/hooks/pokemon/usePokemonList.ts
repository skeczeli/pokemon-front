import { useState, useCallback } from "react";
import type { Pokemon } from "../../types/pokemon";

export interface PokemonListParams {
  page: number;
  limit: number;
  search?: string;
}

export interface PokemonListResponse {
  items: Pokemon[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UsePokemonListReturn {
  fetchPokemonList: (params: PokemonListParams) => Promise<PokemonListResponse>;
  loading: boolean;
  error: string | null;
}

export const usePokemonList = (): UsePokemonListReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemonList = useCallback(
    async (params: PokemonListParams): Promise<PokemonListResponse> => {
      setLoading(true);
      setError(null);

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

      try {
        const queryParams = new URLSearchParams({
          page: params.page.toString(),
          limit: params.limit.toString(),
        });

        if (params.search?.trim()) {
          queryParams.append("search", params.search.trim());
        }

        const url = `${API_URL}/pokemons?${queryParams.toString()}`;
        console.log("🚀 Calling URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.items || typeof data.total !== "number") {
          throw new Error("Invalid response format from API");
        }

        return {
          items: data.items,
          total: data.total,
          page: data.page || params.page,
          limit: data.limit || params.limit,
          totalPages: data.totalPages || Math.ceil(data.total / params.limit),
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch Pokemon list";
        setError(errorMessage);

        return {
          items: [],
          total: 0,
          page: params.page,
          limit: params.limit,
          totalPages: 0,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    fetchPokemonList,
    loading,
    error,
  };
};
