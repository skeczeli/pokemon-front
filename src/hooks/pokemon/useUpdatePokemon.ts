import { useState } from "react";
import type { CreatePokemonData } from "../../types/pokemon";

const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:3000";

export const useUpdatePokemon = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePokemon = async (id: string, data: CreatePokemonData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/pokemons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error updating pokemon: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const updatedPokemon = await response.json();

      setLoading(false);
      return { success: true, data: updatedPokemon };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return {
    updatePokemon,
    loading,
    error,
  };
};
