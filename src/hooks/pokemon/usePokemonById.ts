import { useState, useEffect, useCallback } from "react";
import type { Pokemon } from "../../types/pokemon";

export const usePokemonById = (id: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const refetch = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/pokemons/${id}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error("Pokémon not found");
        throw new Error(`Error ${response.status}`);
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }, [API_URL, id]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { pokemon, loading, error, refetch, setPokemon };
};
